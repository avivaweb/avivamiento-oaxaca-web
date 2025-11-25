# AI Service - Microservicio de Orquestación de IA

Microservicio para orquestar la generación de contenido a partir de audio/video usando múltiples servicios de IA.

## Arquitectura

Este servicio orquesta tres agentes de IA en secuencia:

1. **Deepgram**: Transcripción de audio a texto
2. **Gemini (Google)**: Generación de contenido SEO optimizado
3. **nano-banana**: Generación de metadatos visuales

## Instalación

```bash
npm install
```

## Configuración

1. Copia el archivo de ejemplo:
   ```bash
   cp .env.example .env
   ```

2. Configura las API keys en `.env`:
   - `DEEPGRAM_API_KEY`
   - `GEMINI_API_KEY`
   - `NANO_BANANA_API_KEY`

## Desarrollo

```bash
npm run dev
```

El servidor se iniciará en `http://localhost:4000`

## Producción

```bash
npm run build
npm start
```

## Endpoints

### Health Check
```
GET /health
```

### Procesar Audio
```
POST /process
Content-Type: application/json

{
  "audioUrl": "https://example.com/audio.mp3",
  "metadata": {
    "title": "Título opcional",
    "author": "Autor opcional"
  }
}
```

## Flujo de Procesamiento

1. Recibe URL de audio
2. Transcribe audio con Deepgram
3. Genera contenido SEO con Gemini
4. Genera metadatos visuales con nano-banana
5. Retorna contenido completo optimizado

## Audiencia Objetivo

El contenido generado está optimizado para:
- **Demografía**: Mujeres 25-44 años
- **Idioma**: Español
- **Plataformas**: Facebook, Instagram, Twitter

## Estructura del Proyecto

```
ai-service/
├── src/
│   ├── controllers/      # Controladores de rutas
│   ├── services/         # Lógica de negocio
│   ├── types/           # Tipos TypeScript
│   └── server.ts        # Punto de entrada
├── dist/                # Build de producción
└── package.json