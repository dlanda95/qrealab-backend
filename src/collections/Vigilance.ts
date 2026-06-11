import type { CollectionConfig } from 'payload'

// ============================================================
//  VIGILANCE — Contenido de la página de Farmacovigilancia
//  Colección singleton (un solo documento).
// ============================================================

export const Vigilance: CollectionConfig = {
  slug: 'vigilance',
  labels: { singular: 'Farmacovigilancia', plural: 'Farmacovigilancia' },
  admin: {
    group: 'Páginas',
    // Página: Farmacovigilancia — singleton (un documento)
    useAsTitle: 'pageTitle',
    description: 'Contenido de la página de Farmacovigilancia. Solo debe existir UN documento.',
  },
  access: { read: () => true },
  fields: [
    {
      name: 'pageTitle',
      type: 'text',
      label: 'Título de página (interno CMS)',
      defaultValue: 'Farmacovigilancia',
      admin: { position: 'sidebar' },
    },

    {
      type: 'tabs',
      tabs: [
        // ── Tab 1: Hero ────────────────────────────────────────
        {
          label: 'Hero',
          description: 'Textos del encabezado principal de la página.',
          fields: [
            {
              name: 'heroEyebrow',
              type: 'text',
              label: 'Etiqueta (eyebrow)',
              localized: true,
              defaultValue: 'Farmacovigilancia',
              admin: { description: 'Texto pequeño en verde sobre el título.' },
            },
            {
              name: 'heroTitulo',
              type: 'text',
              label: 'Título principal',
              localized: true,
              defaultValue: 'Tu seguridad, nuestra responsabilidad',
            },
            {
              name: 'heroSubtitulo',
              type: 'textarea',
              label: 'Subtítulo / Descripción',
              localized: true,
              defaultValue: 'Reporta cualquier efecto adverso de nuestros medicamentos y contribuye a la seguridad de todos los pacientes.',
            },
          ],
        },

        // ── Tab 2: Bloques de Información ──────────────────────
        {
          label: 'Bloques de Información',
          description: 'Encabezado y bloques de contenido que aparecen debajo del hero.',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'infoEyebrow',
                  type: 'text',
                  label: 'Etiqueta (eyebrow)',
                  localized: true,
                  defaultValue: 'Información Importante',
                  admin: { width: '50%' },
                },
                {
                  name: 'infoTitulo',
                  type: 'text',
                  label: 'Título de la sección',
                  localized: true,
                  defaultValue: '¿Qué necesitas saber?',
                  admin: { width: '50%' },
                },
              ],
            },
            {
              name: 'infoBlocks',
              type: 'array',
              label: 'Bloques de información',
              minRows: 1,
              maxRows: 8,
              admin: {
                description: 'Aparecen de 2 en 2, con navegación entre pares.',
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
                    { label: 'Viñetas (•)',       value: 'bullet'   },
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
        },
      ],
    },
  ],
}
