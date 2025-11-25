import { CollectionConfig } from 'payload/types';

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  admin: {
    useAsTitle: 'authorName',
    defaultColumns: ['authorName', 'dateSubmitted', 'status'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'quote',
      type: 'textarea',
      required: true,
      label: 'Testimonio',
      admin: {
        description: 'El contenido del testimonio',
      },
    },
    {
      name: 'authorName',
      type: 'text',
      required: true,
      label: 'Nombre del Autor',
    },
    {
      name: 'authorRole',
      type: 'text',
      label: 'Rol/Posición',
      admin: {
        description: 'Ej: Miembro de la iglesia, Líder de célula, etc.',
      },
    },
    {
      name: 'authorImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Foto del Autor',
    },
    {
      name: 'dateSubmitted',
      type: 'date',
      required: true,
      label: 'Fecha de Envío',
      defaultValue: () => new Date().toISOString(),
      admin: {
        date: {
          pickerAppearance: 'dayOnly',
        },
      },
    },
    {
      name: 'category',
      type: 'select',
      label: 'Categoría',
      options: [
        { label: 'Transformación Personal', value: 'transformation' },
        { label: 'Sanidad', value: 'healing' },
        { label: 'Provisión', value: 'provision' },
        { label: 'Comunidad', value: 'community' },
        { label: 'Otro', value: 'other' },
      ],
    },
    {
      name: 'featured',
      type: 'checkbox',
      label: 'Destacado',
      defaultValue: false,
      admin: {
        description: 'Marcar para mostrar en página principal',
      },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      label: 'Estado',
      options: [
        { label: 'Pendiente', value: 'pending' },
        { label: 'Aprobado', value: 'approved' },
        { label: 'Rechazado', value: 'rejected' },
      ],
      defaultValue: 'pending',
    },
  ],
};