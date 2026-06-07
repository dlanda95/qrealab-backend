import type { CollectionConfig } from 'payload'

export const History: CollectionConfig = {
  slug: 'history',
  admin: { useAsTitle: 'title' },
  access: { read: () => true },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Título',
      required: true,
      localized: true,
    },
    {
      name: 'description',
      type: 'textarea', // Texto plano, sin HTML ni JSON de formato
      label: 'Descripción de la historia',
      required: true,
      localized: true,
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Imagen',
    },
  ],
}