import { CollectionConfig } from 'payload/types';
import { AIIntegrationService } from '../services/ai-integration.service';

export const Posts: CollectionConfig = {
  slug: 'posts',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'author', 'category', 'publishedDate', 'status'],
  },
  access: {
    read: () => true, // Público puede leer
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Título',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      label: 'Slug',
      admin: {
        description: 'URL amigable para el post',
      },
    },
    {
      name: 'audioUrl',
      type: 'text',
      label: 'URL de Audio/Video',
      admin: {
        description: 'URL del archivo de audio o video para procesamiento automático con IA',
        placeholder: 'https://example.com/audio.mp3',
      },
    },
    {
      name: 'aiProcessed',
      type: 'checkbox',
      label: 'Procesado con IA',
      defaultValue: false,
      admin: {
        description: 'Indica si este post ya fue procesado por el Motor de IA',
        readOnly: true,
      },
    },
    {
      name: 'aiGeneratedContent',
      type: 'group',
      label: 'Contenido Generado por IA',
      admin: {
        description: 'Contenido generado automáticamente por el Motor de IA',
      },
      fields: [
        {
          name: 'transcription',
          type: 'textarea',
          label: 'Transcripción',
        },
        {
          name: 'seoTitle',
          type: 'text',
          label: 'Título SEO Sugerido',
        },
        {
          name: 'seoDescription',
          type: 'textarea',
          label: 'Descripción SEO Sugerida',
        },
        {
          name: 'keywords',
          type: 'textarea',
          label: 'Palabras Clave',
          admin: {
            description: 'Separadas por comas',
          },
        },
        {
          name: 'socialMediaCopy',
          type: 'group',
          label: 'Copys para Redes Sociales',
          fields: [
            {
              name: 'facebook',
              type: 'textarea',
              label: 'Facebook',
            },
            {
              name: 'instagram',
              type: 'textarea',
              label: 'Instagram',
            },
            {
              name: 'twitter',
              type: 'textarea',
              label: 'Twitter',
            },
          ],
        },
        {
          name: 'hashtags',
          type: 'textarea',
          label: 'Hashtags Sugeridos',
        },
      ],
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      label: 'Categoría',
      options: [
        { label: 'Blog', value: 'blog' },
        { label: 'Mensaje', value: 'mensaje' },
      ],
      defaultValue: 'blog',
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
      label: 'Contenido',
    },
    {
      name: 'excerpt',
      type: 'textarea',
      label: 'Extracto',
      admin: {
        description: 'Breve resumen del contenido',
      },
    },
    {
      name: 'author',
      type: 'text',
      required: true,
      label: 'Autor',
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Imagen Destacada',
    },
    {
      name: 'tags',
      type: 'array',
      label: 'Etiquetas',
      fields: [
        {
          name: 'tag',
          type: 'text',
        },
      ],
    },
    {
      name: 'publishedDate',
      type: 'date',
      required: true,
      label: 'Fecha de Publicación',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      label: 'Estado',
      options: [
        { label: 'Borrador', value: 'draft' },
        { label: 'Publicado', value: 'published' },
      ],
      defaultValue: 'draft',
    },
  ],
  hooks: {
    afterChange: [
      async ({ doc, operation, req }) => {
        // Solo procesar en creación o actualización
        if (operation === 'create' || operation === 'update') {
          // Verificar si hay audioUrl y no ha sido procesado
          if (doc.audioUrl && !doc.aiProcessed) {
            console.log(`[Posts Hook] Nuevo post con audio detectado: ${doc.id}`);
            
            // Inicializar servicio de IA
            const aiService = new AIIntegrationService();
            
            // Verificar disponibilidad del servicio
            const isAvailable = await aiService.healthCheck();
            if (!isAvailable) {
              console.warn('[Posts Hook] Servicio de IA no disponible, procesamiento pospuesto');
              return doc;
            }
            
            // Procesar audio de forma asíncrona (no bloqueante)
            aiService.processAudio(doc.audioUrl, {
              id: doc.id,
              title: doc.title,
              author: doc.author,
              date: doc.publishedDate,
            })
              .then(async (result) => {
                if (result.success && result.data) {
                  console.log('[Posts Hook] Procesamiento de IA completado, actualizando post...');
                  
                  // Actualizar el post con los resultados de IA
                  try {
                    await req.payload.update({
                      collection: 'posts',
                      id: doc.id,
                      data: {
                        aiProcessed: true,
                        aiGeneratedContent: {
                          transcription: result.data.transcription.text,
                          seoTitle: result.data.seoContent.title,
                          seoDescription: result.data.seoContent.description,
                          keywords: result.data.seoContent.keywords.join(', '),
                          socialMediaCopy: {
                            facebook: result.data.seoContent.socialMediaCopy.facebook,
                            instagram: result.data.seoContent.socialMediaCopy.instagram,
                            twitter: result.data.seoContent.socialMediaCopy.twitter,
                          },
                          hashtags: result.data.seoContent.hashtags.join(' '),
                        },
                      },
                    });
                    
                    console.log('[Posts Hook] Post actualizado con contenido generado por IA');
                  } catch (updateError) {
                    console.error('[Posts Hook] Error al actualizar post con resultados de IA:', updateError);
                  }
                } else {
                  console.error('[Posts Hook] Error en procesamiento de IA:', result.error);
                }
              })
              .catch((error) => {
                console.error('[Posts Hook] Error al procesar audio:', error);
              });
            
            console.log('[Posts Hook] Procesamiento de IA iniciado en segundo plano');
          }
        }
        
        return doc;
      },
    ],
  },
};