import type { GlobalConfig } from 'payload'

export const NavSettings: GlobalConfig = {
  slug: 'nav-settings',
  label: 'Menú Principal',
  admin: {
    group: 'Navegación',
    description: {
      es: 'Ítems del menú de navegación y texto del botón de contacto. Activa o desactiva cada ítem sin eliminarlo.',
      en: 'Navigation menu items and contact button text. Enable or disable each item without deleting it.',
    },
  },
  access: { read: () => true },
  fields: [
    {
      type: 'tabs',
      tabs: [

        // ── TAB 1: ÍTEMS DEL MENÚ ─────────────────────────────────────────────
        {
          label: '📋 Menú de Navegación',
          description: 'El orden aquí es el orden en el header. Arrastra para reordenar.',
          fields: [
            {
              name: 'items',
              type: 'array',
              label: { es: 'Ítems del menú', en: 'Menu items' },
              admin: {
                description: {
                  es: 'Desactiva un ítem para ocultarlo sin eliminarlo.',
                  en: 'Deactivate an item to hide it without deleting it.',
                },
              },
              defaultValue: [
                { etiqueta: 'Inicio',             ruta: '/',          activo: true },
                { etiqueta: 'Nosotros',           ruta: '/about',     activo: true },
                { etiqueta: 'Línea de Productos', ruta: '/products',  activo: true },
                { etiqueta: 'Farmacovigilancia',  ruta: '/vigilance', activo: true },
              ],
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'etiqueta',
                      type: 'text',
                      label: { es: 'Etiqueta visible', en: 'Display label' },
                      required: true,
                      localized: true,
                      admin: { width: '50%' },
                    },
                    {
                      name: 'ruta',
                      type: 'text',
                      label: { es: 'Ruta', en: 'Route' },
                      required: true,
                      admin: {
                        width: '35%',
                        description: 'Ej: /about · /products',
                      },
                    },
                    {
                      name: 'activo',
                      type: 'checkbox',
                      label: { es: 'Visible', en: 'Visible' },
                      localized: true,
                      defaultValue: true,
                      admin: {
                        width: '15%',
                        description: 'Activa o desactiva por idioma de forma independiente.',
                      },
                    },
                  ],
                },
              ],
            },
          ],
        },

        // ── TAB 2: BOTÓN CTA ──────────────────────────────────────────────────
        {
          label: '🔘 Botón de Contacto',
          description: 'Botón CTA que aparece al final del menú (abre el modal de contacto)',
          fields: [
            {
              name: 'ctaLabel',
              type: 'text',
              label: { es: 'Texto del botón', en: 'Button text' },
              localized: true,
              defaultValue: 'Contáctenos',
              admin: { description: 'Ej: Contáctenos · Hablar con nosotros · Contact Us' },
            },
          ],
        },

      ],
    },
  ],
}
