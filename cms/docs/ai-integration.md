# Integración CMS → Motor de IA

## Descripción

El CMS está integrado con el Motor de IA para automatizar la generación de contenido a partir de audio/video.

## Flujo de Automatización

1. **Usuario crea un Post** en el CMS con un `audioUrl`
2. **Hook afterChange** detecta el nuevo post con audio
3. **Verifica disponibilidad** del servicio de IA
4. **Envía petición** al Motor de IA con el audioUrl
5. **Motor de IA procesa** el audio en 3 pasos:
   - Transcripción (Deepgram)
   - Generación de contenido SEO (Gemini)
   - Metadatos visuales (nano-banana)
6. **CMS actualiza** el post con el contenido generado
7. **Usuario revisa** y publica el contenido

## Campos Agregados a Posts

### audioUrl
- **Tipo**: Text
- **Descripción**: URL del archivo de audio o video
- **Uso**: Trigger para procesamiento automático

### aiProcessed
- **Tipo**: Checkbox
- **Descripción**: Indica si el post fue procesado por IA
- **Solo lectura**: Sí

### aiGeneratedContent
- **Tipo**: Group
- **Campos**:
  - `transcription`: Texto transcrito del audio
  - `seoTitle`: Título optimizado para SEO
  - `seoDescription`: Descripción meta
  - `keywords`: Palabras clave (separadas por comas)
  - `socialMediaCopy`: Copys para Facebook, Instagram, Twitter
  - `hashtags`: Hashtags sugeridos

## Configuración

### Variables de Entorno

```env
AI_SERVICE_URL=http://localhost:4000
```

En producción, cambiar a la URL del servicio desplegado.

## Uso

1. Crear un nuevo Post en el CMS
2. Llenar los campos básicos (título, autor, etc.)
3. Agregar la URL del audio en el campo `audioUrl`
4. Guardar el post
5. El procesamiento se inicia automáticamente en segundo plano
6. Refrescar el post después de ~7 segundos para ver el contenido generado
7. Revisar y ajustar el contenido generado según sea necesario
8. Publicar el post

## Notas

- El procesamiento es **asíncrono** y no bloquea la creación del post
- Si el servicio de IA no está disponible, el procesamiento se pospone
- Los resultados se guardan automáticamente en el post
- El contenido generado es una **sugerencia** que puede ser editada

## Troubleshooting

### El contenido no se genera
1. Verificar que el servicio de IA esté corriendo (`http://localhost:4000/health`)
2. Revisar los logs del CMS para errores
3. Verificar que la URL del audio sea accesible
4. Confirmar que `AI_SERVICE_URL` esté configurada correctamente

### El procesamiento es lento
- El procesamiento toma ~7 segundos (normal)
- Verificar la conexión con las APIs externas (Deepgram, Gemini, nano-banana)
- Revisar los logs del Motor de IA para identificar cuellos de botella