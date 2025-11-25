import { Request, Response } from 'express';
import { DeepgramService } from '../services/deepgram.service';
import { GeminiService } from '../services/gemini.service';
import { NanoBananaService } from '../services/nano-banana.service';
import { ProcessRequest, ProcessResult } from '../types';

export class ProcessController {
  private deepgramService: DeepgramService;
  private geminiService: GeminiService;
  private nanoBananaService: NanoBananaService;

  constructor() {
    this.deepgramService = new DeepgramService();
    this.geminiService = new GeminiService();
    this.nanoBananaService = new NanoBananaService();
  }

  /**
   * Endpoint principal para procesar audio/video
   * Orquesta los 3 servicios de IA en secuencia
   */
  async process(req: Request, res: Response): Promise<void> {
    try {
      const { audioUrl, metadata }: ProcessRequest = req.body;

      // Validar entrada
      if (!audioUrl) {
        res.status(400).json({
          success: false,
          error: 'audioUrl es requerido'
        });
        return;
      }

      console.log('\n🚀 Iniciando procesamiento de contenido...');
      console.log(`📎 Audio URL: ${audioUrl}`);
      if (metadata) {
        console.log(`📋 Metadata:`, metadata);
      }

      // PASO 1: Transcribir audio con Deepgram
      console.log('\n📝 PASO 1: Transcribiendo audio...');
      const transcription = await this.deepgramService.transcribeAudio(audioUrl);
      console.log(`✅ Transcripción completada (${transcription.duration}s, confianza: ${transcription.confidence})`);

      // PASO 2: Generar contenido SEO con Gemini
      console.log('\n🤖 PASO 2: Generando contenido SEO...');
      const seoContent = await this.geminiService.generateSeoContent(transcription.text);
      console.log(`✅ Contenido SEO generado: "${seoContent.title}"`);

      // PASO 3: Generar metadatos visuales con nano-banana
      console.log('\n🎨 PASO 3: Generando metadatos visuales...');
      const visualMetadata = await this.nanoBananaService.generateVisualMetadata(seoContent);
      console.log(`✅ Metadatos visuales generados (${visualMetadata.suggestedImages.length} imágenes sugeridas)`);

      // PASO 4: Retornar resultado final
      console.log('\n✨ Procesamiento completado exitosamente!\n');
      
      const result: ProcessResult = {
        success: true,
        data: {
          transcription,
          seoContent,
          visualMetadata
        }
      };

      res.status(200).json(result);
    } catch (error) {
      console.error('❌ Error en procesamiento:', error);
      
      const result: ProcessResult = {
        success: false,
        error: error instanceof Error ? error.message : 'Error desconocido'
      };

      res.status(500).json(result);
    }
  }
}