import type { CollectionConfig } from 'payload'

export const HeroSlides: CollectionConfig = {
  slug: 'hero-slides',
  labels: { singular: 'Slide del Hero', plural: 'Slides del Hero' },

  orderable: true,
  defaultSort: '_order',

  admin: {
    hidden: true,
    useAsTitle: 'tag',
    defaultColumns: ['_order', 'tag', 'title', 'updatedAt'],
    listSearchableFields: ['tag', 'title'],
    enableRichTextRelationship: true,
  },

  access: {
    read: () => true,
  },

  fields: [
    {
      name: 'tag',
      type: 'text',
      label: 'Etiqueta (Ej: INNOVACIÓN FARMACÉUTICA)',
      localized: true,
    },
    {
      name: 'title',
      type: 'text',
      label: 'Título Principal',
      required: true,
      localized: true,
    },
    {
      name: 'subtitle',
      type: 'textarea',
      label: 'Subtítulo',
      localized: true,
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Imagen de Fondo',
      required: true,
    },
    {
      type: 'row',
      fields: [
        {
          name: 'ctaText',
          type: 'text',
          label: 'Texto del Botón',
          localized: true,
        },
        {
          name: 'ctaLink',
          type: 'text',
          label: 'Enlace del Botón',
        },
      ],
    },
  ],
}