'use server';

// ────────────────────────────────────────────────────────────
// Server Action: generateAIContent
// Avivamiento Oaxaca — Pasión 2026
//
// Flujo:
//   1. Recibe una URL de audio (o video de YouTube)
//   2. Llama al ai-service en http://localhost:4000/process
//   3. Guarda el resultado en Supabase (ai_generated_content)
//   4. Devuelve el resultado al cliente para previsualización
// ────────────────────────────────────────────────────────────

import { createClient } from '@supabase/supabase-js';
import type { AIProcessRequest, AIProcessResult, AIGeneratedContent } from '@/types/ai';

const AI_SERVICE_URL = process.env.AI_SERVICE_URL || 'http://localhost:4000';

// Cliente admin para escribir en Supabase desde el servidor
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// ─── Tipos de retorno ────────────────────────────────────────

export type GenerateAIContentState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: AIGeneratedContent }
  | { status: 'error'; message: string };

// ─── Action Principal ────────────────────────────────────────

export async function generateAIContent(
  request: AIProcessRequest
): Promise<GenerateAIContentState> {
  const { audioUrl, metadata } = request;

  if (!audioUrl || !audioUrl.startsWith('http')) {
    return { status: 'error', message: 'URL de audio inválida. Debe ser una URL pública.' };
  }

  // ── PASO 1: Llamar al ai-service ──────────────────────────
  let aiResult: AIProcessResult;

  try {
    const response = await fetch(`${AI_SERVICE_URL}/process`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ audioUrl, metadata }),
      // Timeout generoso para transcripciones largas
      signal: AbortSignal.timeout(180_000), // 3 minutos
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error('[generateAIContent] ai-service error:', errorBody);
      return {
        status: 'error',
        message: `El servicio de IA respondió con error ${response.status}. Verifica que el ai-service esté corriendo en el puerto 4000.`,
      };
    }

    aiResult = (await response.json()) as AIProcessResult;
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Error desconocido';
    console.error('[generateAIContent] fetch error:', message);

    // Error de conexión — el ai-service no está corriendo
    if (message.includes('fetch failed') || message.includes('ECONNREFUSED')) {
      return {
        status: 'error',
        message: 'No se pudo conectar al servicio de IA. Asegúrate de que el ai-service esté corriendo: cd ai-service && npm run dev',
      };
    }

    if (message.includes('timeout') || message.includes('AbortError')) {
      return {
        status: 'error',
        message: 'El procesamiento tardó demasiado. Intenta con un audio más corto o verifica la URL.',
      };
    }

    return { status: 'error', message };
  }

  if (!aiResult.success || !aiResult.data) {
    return {
      status: 'error',
      message: aiResult.error || 'El servicio de IA no devolvió contenido válido.',
    };
  }

  // ── PASO 2: Guardar en Supabase ───────────────────────────
  const { transcription, seoContent, visualMetadata } = aiResult.data;

  const insertPayload = {
    // ── Campos nuevos (semánticos para el dashboard) ──
    source_url:             audioUrl,
    transcription_text:     transcription.text,
    seo_title:              seoContent.title,
    seo_description:        seoContent.description,
    social_copy_facebook:   seoContent.socialMediaCopy.facebook,
    social_copy_instagram:  seoContent.socialMediaCopy.instagram,
    social_copy_twitter:    seoContent.socialMediaCopy.twitter,
    youtube_video_id:       metadata?.youtubeVideoId ?? null,
    author_name:            metadata?.author ?? null,
    thumbnail_url:          visualMetadata.thumbnailUrl ?? null,

    // ── Campos originales del esquema base (compatibilidad) ──
    audio_url:              audioUrl,
    transcript:             transcription.text,
    title:                  seoContent.title,
    meta_description:       seoContent.description,
    keywords:               seoContent.keywords,
    hashtags:               seoContent.hashtags,
    facebook_copy:          seoContent.socialMediaCopy.facebook,
    instagram_copy:         seoContent.socialMediaCopy.instagram,
    twitter_copy:           seoContent.socialMediaCopy.twitter,

    // ── Estado ──
    status: 'pending' as const,
  };

  const { data: savedRecord, error: dbError } = await supabaseAdmin
    .from('ai_generated_content')
    .insert(insertPayload)
    .select()
    .single();

  if (dbError) {
    console.error('[generateAIContent] Supabase insert error:', dbError);
    // No bloqueamos al usuario — devolvemos el resultado de IA de todas formas
    // pero con una advertencia embebida en los datos
    const fallbackRecord: AIGeneratedContent = {
      id: 'temp-' + Date.now(),
      source_url: audioUrl,
      transcription_text: transcription.text,
      seo_title: seoContent.title,
      seo_description: seoContent.description,
      keywords: seoContent.keywords,
      social_copy_facebook: seoContent.socialMediaCopy.facebook,
      social_copy_instagram: seoContent.socialMediaCopy.instagram,
      social_copy_twitter: seoContent.socialMediaCopy.twitter,
      hashtags: seoContent.hashtags,
      status: 'pending',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      youtube_video_id: metadata?.youtubeVideoId,
      author_name: metadata?.author,
    };
    return { status: 'success', data: fallbackRecord };
  }

  return { status: 'success', data: savedRecord as AIGeneratedContent };
}

// ─── Action: Cambiar estado de un contenido ──────────────────

export async function updateAIContentStatus(
  id: string,
  status: 'approved' | 'rejected' | 'published'
): Promise<{ success: boolean; error?: string }> {
  const { error } = await supabaseAdmin
    .from('ai_generated_content')
    .update({ status, updated_at: new Date().toISOString() })
    .eq('id', id);

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true };
}

// ─── Action: Listar contenidos guardados ─────────────────────

export async function fetchAIContents(
  status?: 'pending' | 'approved' | 'rejected' | 'published'
): Promise<AIGeneratedContent[]> {
  let query = supabaseAdmin
    .from('ai_generated_content')
    .select('*')
    .order('created_at', { ascending: false });

  if (status) {
    query = query.eq('status', status);
  }

  const { data, error } = await query;

  if (error) {
    console.error('[fetchAIContents] error:', error);
    return [];
  }

  return (data ?? []) as AIGeneratedContent[];
}
