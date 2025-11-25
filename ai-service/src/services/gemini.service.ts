import { SeoContent } from '../types';

export class GeminiService {
  private apiKey: string;
  private apiUrl: string;
  private targetAudience: string;
  private targetLanguage: string;

  constructor() {
    this.apiKey = process.env.GEMINI_API_KEY || '';
    this.apiUrl = process.env.GEMINI_API_URL || '';
    this.targetAudience = process.env.TARGET_AUDIENCE || 'mujeres 25-44 años';
    this.targetLanguage = process.env.TARGET_LANGUAGE || 'es';
  }

  /**
   * Genera contenido SEO optimizado a partir de una transcripción
   * @param transcript Texto transcrito del audio
   * @returns Contenido SEO optimizado para la audiencia objetivo
   */
  async generateSeoContent(transcript: string): Promise<SeoContent> {
    console.log(`[Gemini] Generando contenido SEO para audiencia: ${this.targetAudience}`);
    
    // TODO: Implementar llamada real a Gemini API
    // const prompt = this.buildPrompt(transcript);
    // const response = await axios.post(`${this.apiUrl}/models/gemini-pro:generateContent`, {
    //   contents: [{
    //     parts: [{ text: prompt }]
    //   }]
    // }, {
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'x-goog-api-key': this.apiKey
    //   }
    // });

    // PLACEHOLDER: Simular respuesta de Gemini
    await this.simulateDelay(3000);
    
    return {
      title: 'La Fe que Transforma: Un Mensaje de Esperanza para la Comunidad',
      description: 'Descubre cómo la fe y la comunidad pueden transformar tu vida. Un mensaje inspirador sobre la importancia de mantenernos unidos en Cristo y apoyarnos mutuamente en nuestro caminar espiritual.',
      keywords: [
        'fe cristiana',
        'comunidad iglesia',
        'esperanza',
        'transformación espiritual',
        'AVIVA',
        'mensaje inspirador',
        'vida cristiana',
        'unidad en Cristo'
      ],
      socialMediaCopy: {
        facebook: '✨ ¡Un mensaje que tocará tu corazón! 💖\n\nDescubre cómo la fe y la comunidad pueden transformar tu vida. En AVIVA creemos en el poder de estar unidos en Cristo.\n\n🙏 Comparte este mensaje con alguien que necesite esperanza hoy.\n\n#FeQueTransforma #ComunidadAVIVA',
        instagram: '✨ La fe mueve montañas cuando estamos unidos 💖\n\n🌟 Un mensaje de esperanza para ti\n💪 Juntos somos más fuertes\n🙏 La comunidad que transforma vidas\n\n#AVIVA #FeEnAcción #ComunidadCristiana #Esperanza #VidaEnCristo',
        twitter: '✨ La fe y la comunidad transforman vidas 💖\n\nUn mensaje de esperanza que necesitas escuchar hoy.\n\n🙏 #FeQueTransforma #AVIVA'
      },
      hashtags: [
        '#AVIVA',
        '#FeQueTransforma',
        '#ComunidadCristiana',
        '#Esperanza',
        '#VidaEnCristo',
        '#IglesiaAVIVA',
        '#MensajeInsp irador',
        '#FeEnAcción'
      ]
    };
  }

  /**
   * Construye el prompt optimizado para Gemini
   * @param transcript Transcripción del audio
   * @returns Prompt para Gemini
   */
  private buildPrompt(transcript: string): string {
    return `
Eres un experto en marketing de contenido religioso y SEO. Tu audiencia objetivo son ${this.targetAudience}.

Analiza la siguiente transcripción de un mensaje/sermón y genera contenido optimizado para redes sociales y SEO:

TRANSCRIPCIÓN:
${transcript}

INSTRUCCIONES:
1. Crea un título atractivo y optimizado para SEO (máximo 60 caracteres)
2. Escribe una descripción meta convincente (máximo 160 caracteres)
3. Genera 8 palabras clave relevantes
4. Crea copys específicos para:
   - Facebook (tono cálido y comunitario, 2-3 párrafos)
   - Instagram (tono inspirador con emojis, formato de lista)
   - Twitter (conciso y directo, máximo 280 caracteres)
5. Sugiere 8 hashtags relevantes

El contenido debe:
- Resonar con ${this.targetAudience}
- Ser en idioma ${this.targetLanguage}
- Mantener un tono inspirador y acogedor
- Incluir llamados a la acción sutiles
- Usar emojis apropiados para cada plataforma

Responde en formato JSON.
    `.trim();
  }

  private simulateDelay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}