// ────────────────────────────────────────────────────────────
// Tipos compartidos para el flujo de generación de contenido IA
// Avivamiento Oaxaca — Pasión 2026
// ────────────────────────────────────────────────────────────

export interface AIProcessRequest {
  audioUrl: string;
  metadata?: {
    title?: string;
    author?: string;
    date?: string;
    youtubeVideoId?: string;
  };
}

export interface AITranscriptionResult {
  text: string;
  confidence: number;
  duration: number;
  language: string;
}

export interface AISocialMediaCopy {
  facebook: string;
  instagram: string;
  twitter: string;
}

export interface AISeoContent {
  title: string;
  description: string;
  keywords: string[];
  socialMediaCopy: AISocialMediaCopy;
  hashtags: string[];
}

export interface AIVisualMetadata {
  suggestedImages: string[];
  colorPalette: string[];
  thumbnailUrl?: string;
}

export interface AIProcessResult {
  success: boolean;
  data?: {
    transcription: AITranscriptionResult;
    seoContent: AISeoContent;
    visualMetadata: AIVisualMetadata;
  };
  error?: string;
}

// Registro guardado en Supabase (tabla ai_generated_content)
export interface AIGeneratedContent {
  id: string;
  source_url: string;
  transcription_text: string;
  seo_title: string;
  seo_description: string;
  keywords: string[];
  social_copy_facebook: string;
  social_copy_instagram: string;
  social_copy_twitter: string;
  hashtags: string[];
  status: 'pending' | 'approved' | 'rejected' | 'published';
  created_at: string;
  updated_at: string;
  youtube_video_id?: string;
  author_name?: string;
}

export type AIContentStatus = AIGeneratedContent['status'];
