import { CollectionConfig } from 'payload/types';

export const Events: CollectionConfig = {
  slug: 'events',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'date', 'location', 'status'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Nombre del Evento',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      label: 'Slug',
    },
    {
      name: 'description',
      type: 'richText',
      required: true,
      label: 'Descripción',
    },
    {
      name: 'date',
      type: 'date',
      required: true,
      label: 'Fecha del Evento',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'endDate',
      type: 'date',
      label: 'Fecha de Finalización',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
        description: 'Opcional, para eventos de múltiples días',
      },
    },
    {
      name: 'location',
      type: 'text',
      required: true,
      label: 'Ubicación',
    },
    {
      name: 'address',
      type: 'textarea',
      label: 'Dirección Completa',
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Imagen del Evento',
    },
    {
      name: 'registrationLink',
      type: 'text',
      label: 'Link de Registro',
      admin: {
        description: 'URL para registrarse al evento',
      },
    },
    {
      name: 'capacity',
      type: 'number',
      label: 'Capacidad',
      admin: {
        description: 'Número máximo de asistentes',
      },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      label: 'Estado',
      options: [
        { label: 'Próximo', value: 'upcoming' },
        { label: 'En Curso', value: 'ongoing' },
        { label: 'Finalizado', value: 'completed' },
        { label: 'Cancelado', value: 'cancelled' },
      ],
      defaultValue: 'upcoming',
    },
  ],
};