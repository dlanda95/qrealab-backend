import type { CollectionConfig } from 'payload'

// Íconos Lucide disponibles (deben coincidir con los registrados en app.config.ts del frontend)
const ICON_OPTIONS = [
  { label: '❤️  Corazón (heart)',              value: 'heart'          },
  { label: '💡 Bombilla (lightbulb)',           value: 'lightbulb'      },
  { label: '📈 Tendencia (trending-up)',         value: 'trending-up'    },
  { label: '🛡️  Escudo (shield)',               value: 'shield'         },
  { label: '⭐ Estrella (star)',                value: 'star'           },
  { label: '👥 Personas (users)',               value: 'users'          },
  { label: '🏆 Premio (award)',                 value: 'award'          },
  { label: '🎯 Objetivo (target)',              value: 'target'         },
  { label: '🌿 Hoja (leaf)',                    value: 'leaf'           },
  { label: '🤝 Mano-corazón (hand-heart)',      value: 'hand-heart'     },
  { label: '🧠 Cerebro (brain)',                value: 'brain'          },
  { label: '📖 Libro (book-open)',              value: 'book-open'      },
  { label: '🚀 Cohete (rocket)',                value: 'rocket'         },
  { label: '✅ Check (circle-check)',           value: 'circle-check'   },
]

export const OurValues: CollectionConfig = {
  slug: 'our-values',

  admin: {
    useAsTitle:     'sectionTitle',
    description:    'Esta colección controla la sección "Nuestros Valores" del Home. Crea un único documento.',
    defaultColumns: ['sectionTitle', 'updatedAt'],
  },

  access: { read: () => true },

  fields: [

    // ── Título de la sección ────────────────────────────────
    {
      name:     'sectionTitle',
      type:     'text',
      label:    'Título de la sección',
      required: true,
      defaultValue: 'Nuestros Valores',
      admin: { description: 'Ej: "Nuestros Valores" — se muestra como heading principal.' },
    },

    // ── Imagen decorativa (leaf frame) ──────────────────────
    {
      name:      'image',
      type:      'upload',
      relationTo: 'media',
      label:     'Imagen decorativa',
      admin: { description: 'Imagen lateral con forma de hoja. Opcional pero recomendada.' },
    },

    // ── Array de valores ────────────────────────────────────
    {
      name:    'values',
      type:    'array',
      label:   'Valores',
      minRows: 1,
      maxRows: 6,
      admin: {
        description:  'Cada valor tiene un ícono, un título y sus puntos descriptivos.',
        initCollapsed: false,
      },
      fields: [

        // Fila: ícono + título del valor
        {
          type: 'row',
          fields: [
            {
              name:     'icon',
              type:     'select',
              label:    'Ícono',
              required: true,
              options:  ICON_OPTIONS,
              defaultValue: 'heart',
              admin: { width: '40%' },
            },
            {
              name:     'title',
              type:     'text',
              label:    'Nombre del valor',
              required: true,
              admin: {
                width:       '60%',
                placeholder: 'Ej: Integridad, Conocimiento, Crecimiento…',
              },
            },
          ],
        },

        // Array de puntos / bullets del valor
        {
          name:    'points',
          type:    'array',
          label:   'Puntos del valor',
          minRows: 1,
          maxRows: 5,
          admin: {
            description: 'Cada punto tiene una etiqueta en negrita y un texto descriptivo.',
          },
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name:     'label',
                  type:     'text',
                  label:    'Etiqueta (negrita)',
                  required: true,
                  admin: {
                    width:       '35%',
                    placeholder: 'Ej: Integridad',
                  },
                },
                {
                  name:     'description',
                  type:     'textarea',
                  label:    'Descripción',
                  required: true,
                  admin: {
                    width:       '65%',
                    placeholder: 'Texto descriptivo del punto…',
                    rows:        3,
                  },
                },
              ],
            },
          ],
        },

      ],
    },

  ],
}
