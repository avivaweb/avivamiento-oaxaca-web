import axios from 'axios';

interface AIProcessRequest {
  audioUrl: string;
  metadata?: {
    id?: string;
    title?: string;
    author?: string;
    date?: string;
  };
}

interface AIProcessResponse {
  success: boolean;
  data?: {
    transcription: {
      text: string;
      confidence: number;
      duration: number;
      language: string;
    };
    seoContent: {
      title: string;
      description: string;
      keywords: string[];
      socialMediaCopy: {
        facebook: string;
        instagram: string;
        twitter: string;
      };
      hashtags: string[];
    };
    visualMetadata: {
      suggestedImages: string[];
      colorPalette: string[];
      thumbnailUrl?: string;
    };
  };
  error?: string;
}

export class AIIntegrationService {
  private aiServiceUrl: string;

  constructor() {
    this.aiServiceUrl = process.env.AI_SERVICE_URL || 'http://localhost:4000';
  }

  /**
   * Procesa un audio/video con el Motor de IA
   * @param audioUrl URL del archivo de audio
   * @param metadata Metadatos adicionales del post
   * @returns Resultado del procesamiento de IA
   */
  async processAudio(audioUrl: string, metadata?: AIProcessRequest['metadata']): Promise<AIProcessResponse> {
    try {
      console.log(`[AI Integration] Enviando audio para procesamiento: ${audioUrl}`);
      
      const response = await axios.post<AIProcessResponse>(
        `${this.aiServiceUrl}/process`,
        {
          audioUrl,
          metadata,
        },
        {
          timeout: 30000, // 30 segundos timeout
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('[AI Integration] Procesamiento completado exitosamente');
      return response.data;
    } catch (error) {
      console.error('[AI Integration] Error al procesar audio:', error);
      
      if (axios.isAxiosError(error)) {
        return {
          success: false,
          error: error.response?.data?.error || error.message,
        };
      }
      
      return {
        success: false,
        error: 'Error desconocido al procesar audio',
      };
    }
  }

  /**
   * Verifica si el servicio de IA está disponible
   * @returns true si el servicio está disponible
   */
  async healthCheck(): Promise<boolean> {
    try {
      const response = await axios.get(`${this.aiServiceUrl}/health`, {
        timeout: 5000,
      });
      return response.status === 200;
    } catch (error) {
      console.error('[AI Integration] Servicio de IA no disponible:', error);
      return false;
    }
  }
}