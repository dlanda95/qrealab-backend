import type { CollectionConfig } from 'payload'

// ============================================================
//  FOOTER — Configuración global del pie de página
//
//  Colección singleton (un solo documento).
//  Cubre las 4 columnas del footer:
//    1. Marca: descripción + redes sociales
//    2-3. Columnas de links (navegación)
//    4. Contacto: dirección + email
//  + Barra inferior: texto de copyright
// ============================================================

export const Footer: CollectionConfig = {
  slug: 'footer',

  admin: {
    useAsTitle: 'copyrightText',
    defaultColumns: ['copyrightText', 'updatedAt'],
    description: 'Contenido del pie de página. Solo debe existir UN documento.',
  },

  access: {
    read: () => true,
  },

  fields: [

    // ── Columna 1: Marca ─────────────────────────────────────

    {
      name: 'brandDescription',
      type: 'textarea',
      label: 'Descripción de la marca',
      required: true,
      localized: true,
      admin: {
        description: 'Texto breve bajo el logo (máx. 2 líneas recomendado).',
      },
    },

    {
      name: 'socialLinks',
      type: 'array',
      label: 'Redes sociales',
      minRows: 0,
      maxRows: 6,
      admin: {
        description: 'Botones de redes sociales (LinkedIn, Instagram, etc.).',
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          label: 'Nombre (ej: LinkedIn)',
          required: true,
        },
        {
          name: 'url',
          type: 'text',
          label: 'URL completa',
          required: true,
        },
      ],
    },

    // ── Columnas 2 y 3: Links de navegación ─────────────────

    {
      name: 'linkColumns',
      type: 'array',
      label: 'Columnas de enlaces',
      minRows: 0,
      maxRows: 2,
      admin: {
        description: 'Hasta 2 columnas de links (Compañía, Soporte, etc.).',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Título de la columna',
          required: true,
          localized: true,
        },
        {
          name: 'links',
          type: 'array',
          label: 'Enlaces',
          minRows: 1,
          maxRows: 8,
          fields: [
            {
              name: 'label',
              type: 'text',
              label: 'Texto del enlace',
              required: true,
              localized: true,
            },
            {
              name: 'url',
              type: 'text',
              label: 'URL o ruta (ej: /about)',
              required: true,
            },
          ],
        },
      ],
    },

    // ── Columna 4: Contacto ──────────────────────────────────

    {
      name: 'contactTitle',
      type: 'text',
      label: 'Título columna Contacto',
      defaultValue: 'Contacto',
      required: true,
      localized: true,
    },

    {
      name: 'address',
      type: 'textarea',
      label: 'Dirección (una línea por párrafo)',
      localized: true,
      admin: {
        description: 'Cada salto de línea se muestra como un párrafo separado.',
      },
    },

    {
      name: 'contactEmail',
      type: 'email',
      label: 'Email de contacto',
    },

    // ── Barra inferior ───────────────────────────────────────

    {
      name: 'copyrightText',
      type: 'text',
      label: 'Texto de copyright',
      required: true,
      defaultValue: '2026 Qrealab S.A.C. Todos los derechos reservados.',
      localized: true,
      admin: {
        description: 'El símbolo © se agrega automáticamente al inicio.',
      },
    },

  ],
}
