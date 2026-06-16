import type { GlobalConfig } from 'payload'

// ============================================================
//  SITE SETTINGS — Feature flags y configuración global del sitio
//
//  Desde aquí el admin puede activar/desactivar secciones y
//  botones sin tocar código. Valores default = comportamiento
//  actual → no rompe nada al desplegarse por primera vez.
// ============================================================

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: { es: 'Ajustes del Sitio', en: 'Site Settings' },
  admin: {
    group: 'Configuración',
    description: {
      es: 'Activa o desactiva secciones y botones del sitio sin tocar código.',
      en: 'Enable or disable site sections and buttons without touching code.',
    },
  },
  access: { read: () => true },
  fields: [
    {
      type: 'collapsible',
      label: '🛍️ Línea de Productos',
      admin: { initCollapsed: false },
      fields: [
        {
          name: 'mostrarBtnContacto',
          type: 'checkbox',
          label: {
            es: 'Mostrar botón "Solicitar información" en el detalle de producto',
            en: 'Show "Request information" button on product detail page',
          },
          defaultValue: true,
          admin: {
            description: {
              es: 'Si está desactivado, el botón no aparece en ningún producto.',
              en: 'If disabled, the button will not appear on any product.',
            },
          },
        },
      ],
    },
  ],
}
