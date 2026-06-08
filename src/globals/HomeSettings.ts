import type { GlobalConfig } from 'payload'

const ICON_OPTIONS = [
  { label: '❤️  Corazón (heart)',          value: 'heart'        },
  { label: '💡 Bombilla (lightbulb)',       value: 'lightbulb'    },
  { label: '📈 Tendencia (trending-up)',     value: 'trending-up'  },
  { label: '🛡️  Escudo (shield)',           value: 'shield'       },
  { label: '⭐ Estrella (star)',            value: 'star'         },
  { label: '👥 Personas (users)',           value: 'users'        },
  { label: '🏆 Premio (award)',             value: 'award'        },
  { label: '🎯 Objetivo (target)',          value: 'target'       },
  { label: '🌿 Hoja (leaf)',               value: 'leaf'         },
  { label: '🤝 Mano-corazón (hand-heart)', value: 'hand-heart'   },
  { label: '🧠 Cerebro (brain)',           value: 'brain'        },
  { label: '📖 Libro (book-open)',         value: 'book-open'    },
  { label: '🚀 Cohete (rocket)',           value: 'rocket'       },
  { label: '✅ Check (circle-check)',      value: 'circle-check' },
]

export const HomeSettings: GlobalConfig = {
  slug: 'home-settings',
  label: 'Inicio',
  admin: {
    group: 'Páginas',
    description: {
      es: 'Contenido de la página principal. Cada sección en su pestaña correspondiente.',
      en: 'Home page content. Each section in its corresponding tab.',
    },
  },
  access: { read: () => true },
  fields: [
    {
      type: 'tabs',
      tabs: [

        // ── TAB 1: HERO ───────────────────────────────────────────────────────
        {
          label: '🎠 Hero (Carrusel)',
          description: 'Slides del carrusel de portada',
          fields: [
            {
              name: 'heroSlides',
              type: 'array',
              label: { es: 'Slides del carrusel', en: 'Carousel slides' },
              admin: {
                description: {
                  es: 'Arrastra para reordenar. Cada slide es una pantalla completa.',
                  en: 'Drag to reorder. Each slide is a full screen.',
                },
              },
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'tag',
                      type: 'text',
                      label: { es: 'Etiqueta (eyebrow)', en: 'Tag (eyebrow)' },
                      localized: true,
                      admin: {
                        width: '40%',
                        description: 'Ej: INNOVACIÓN FARMACÉUTICA',
                      },
                    },
                    {
                      name: 'title',
                      type: 'text',
                      label: { es: 'Título principal', en: 'Main title' },
                      required: true,
                      localized: true,
                      admin: { width: '60%' },
                    },
                  ],
                },
                {
                  name: 'subtitle',
                  type: 'textarea',
                  label: { es: 'Subtítulo', en: 'Subtitle' },
                  localized: true,
                },
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                  label: { es: 'Imagen de fondo', en: 'Background image' },
                  required: true,
                },
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'ctaText',
                      type: 'text',
                      label: { es: 'Texto del botón CTA', en: 'CTA button text' },
                      localized: true,
                      admin: { width: '50%', description: 'Ej: Ver productos' },
                    },
                    {
                      name: 'ctaLink',
                      type: 'text',
                      label: { es: 'Enlace del botón', en: 'Button link' },
                      admin: { width: '50%', description: 'Ej: /products' },
                    },
                  ],
                },
              ],
            },
          ],
        },

        // ── TAB 2: HISTORIA ───────────────────────────────────────────────────
        {
          label: '📖 Historia',
          description: 'Sección "Nuestra Historia" del home',
          fields: [
            {
              name: 'histTitle',
              type: 'text',
              label: { es: 'Título de la sección', en: 'Section title' },
              required: true,
              localized: true,
              defaultValue: 'Nuestra Historia',
            },
            {
              name: 'histDescription',
              type: 'textarea',
              label: { es: 'Descripción (párrafo)', en: 'Description (paragraph)' },
              required: true,
              localized: true,
              admin: { description: 'Separa párrafos con saltos de línea.' },
              defaultValue: 'Desde nuestros inicios hemos estado comprometidos con la salud de la población...',
            },
            {
              name: 'histImage',
              type: 'upload',
              relationTo: 'media',
              label: { es: 'Imagen', en: 'Image' },
            },
          ],
        },

        // ── TAB 3: QUIÉNES SOMOS ──────────────────────────────────────────────
        {
          label: '🏢 Quiénes Somos',
          description: 'Sección de presentación de la empresa',
          fields: [
            {
              name: 'whoTitle',
              type: 'text',
              label: { es: 'Título', en: 'Title' },
              required: true,
              localized: true,
              defaultValue: 'Quiénes Somos',
            },
            {
              name: 'whoDescription',
              type: 'textarea',
              label: { es: 'Descripción', en: 'Description' },
              required: true,
              localized: true,
              admin: { description: 'Separa párrafos con saltos de línea.' },
              defaultValue: 'Somos una empresa farmacéutica comprometida con la calidad y el bienestar...',
            },
            {
              name: 'whoImage',
              type: 'upload',
              relationTo: 'media',
              label: { es: 'Imagen', en: 'Image' },
            },
          ],
        },

        // ── TAB 4: NUESTROS VALORES ───────────────────────────────────────────
        {
          label: '💚 Nuestros Valores',
          description: 'Valores corporativos de la empresa (máx. 6)',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'valSectionTitle',
                  type: 'text',
                  label: { es: 'Título de la sección', en: 'Section title' },
                  required: true,
                  localized: true,
                  defaultValue: 'Nuestros Valores',
                  admin: { width: '60%' },
                },
                {
                  name: 'valImage',
                  type: 'upload',
                  relationTo: 'media',
                  label: { es: 'Imagen decorativa', en: 'Decorative image' },
                  admin: { width: '40%', description: 'Imagen con forma de hoja (opcional)' },
                },
              ],
            },
            {
              name: 'values',
              type: 'array',
              label: { es: 'Valores', en: 'Values' },
              minRows: 1,
              maxRows: 6,
              admin: {
                description: 'Cada valor tiene un ícono, un título y sus puntos descriptivos.',
              },
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'icon',
                      type: 'select',
                      label: 'Ícono',
                      required: true,
                      options: ICON_OPTIONS,
                      defaultValue: 'heart',
                      admin: { width: '40%' },
                    },
                    {
                      name: 'title',
                      type: 'text',
                      label: { es: 'Nombre del valor', en: 'Value name' },
                      required: true,
                      localized: true,
                      admin: { width: '60%', placeholder: 'Ej: Integridad' },
                    },
                  ],
                },
                {
                  name: 'points',
                  type: 'array',
                  label: { es: 'Puntos del valor', en: 'Value points' },
                  minRows: 1,
                  maxRows: 5,
                  fields: [
                    {
                      type: 'row',
                      fields: [
                        {
                          name: 'label',
                          type: 'text',
                          label: { es: 'Etiqueta (negrita)', en: 'Label (bold)' },
                          required: true,
                          localized: true,
                          admin: { width: '35%', placeholder: 'Ej: Integridad' },
                        },
                        {
                          name: 'description',
                          type: 'textarea',
                          label: { es: 'Descripción', en: 'Description' },
                          required: true,
                          localized: true,
                          admin: { width: '65%', rows: 3 },
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
    },
  ],
}
