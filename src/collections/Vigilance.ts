import type { CollectionConfig } from 'payload'

// ============================================================
//  VIGILANCE — Contenido de la página de Farmacovigilancia
//  Colección singleton (un solo documento).
// ============================================================

export const Vigilance: CollectionConfig = {
  slug: 'vigilance',
  admin: {
    useAsTitle: 'pageTitle',
    description: 'Contenido de la página de Farmacovigilancia. Solo debe existir UN documento.',
  },
  access: { read: () => true },
  fields: [

    // ── Identificación interna ───────────────────────────────
    {
      name: 'pageTitle',
      type: 'text',
      label: 'Título de página (interno CMS)',
      defaultValue: 'Farmacovigilancia',
    },

    // ── Slides del hero ──────────────────────────────────────
    {
      name: 'slides',
      type: 'array',
      label: 'Slides del hero (1–2)',
      minRows: 1,
      maxRows: 2,
      admin: {
        description: 'Mismo formato que el home. Puedes usar 1 o 2 slides.',
      },
      fields: [
        {
          name: 'tag',
          type: 'text',
          label: 'Etiqueta superior (ej: FARMACOVIGILANCIA)',
          localized: true,
        },
        {
          name: 'title',
          type: 'text',
          label: 'Título principal',
          required: true,
          localized: true,
        },
        {
          name: 'subtitle',
          type: 'textarea',
          label: 'Descripción / subtítulo',
          localized: true,
        },
        {
          type: 'row',
          fields: [
            {
              name: 'ctaText',
              type: 'text',
              label: 'Texto del botón (ej: VER MÁS)',
              localized: true,
            },
            {
              name: 'ctaLink',
              type: 'text',
              label: 'Enlace del botón',
              defaultValue: '#informacion',
            },
          ],
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: 'Imagen de fondo',
          required: true,
        },
      ],
    },

    // ── Bloques de información ───────────────────────────────
    {
      name: 'infoBlocks',
      type: 'array',
      label: 'Bloques de información',
      minRows: 1,
      maxRows: 8,
      admin: {
        description: 'Aparecen debajo del hero, de 2 en 2 (con navegación entre pares).',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Título del bloque',
          required: true,
          localized: true,
        },
        {
          name: 'style',
          type: 'select',
          label: 'Estilo de lista',
          defaultValue: 'bullet',
          options: [
            { label: 'Viñetas (•)', value: 'bullet' },
            { label: 'Numerada (1. 2. …)', value: 'numbered' },
          ],
        },
        {
          name: 'items',
          type: 'array',
          label: 'Elementos de la lista',
          minRows: 1,
          fields: [
            {
              name: 'text',
              type: 'text',
              label: 'Texto',
              required: true,
              localized: true,
            },
          ],
        },
      ],
    },

  ],
}
