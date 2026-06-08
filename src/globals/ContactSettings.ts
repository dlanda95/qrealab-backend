import type { GlobalConfig } from 'payload'

export const ContactSettings: GlobalConfig = {
  slug: 'contact-settings',
  label: 'Contacto',
  admin: {
    group: 'Contacto',
    description: {
      es: 'Textos, datos de WhatsApp, opciones de contacto y privacidad del modal "Contáctenos".',
      en: 'Texts, WhatsApp data, contact options and privacy policy for the Contact modal.',
    },
  },
  access: { read: () => true },
  fields: [
    {
      type: 'tabs',
      tabs: [

        // ── TAB 1: WHATSAPP ───────────────────────────────────────────────────────
        {
          label: '📱 WhatsApp',
          description: 'Configuración del canal de WhatsApp y textos del panel izquierdo',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'whatsappNumero',
                  type: 'text',
                  label: { es: 'Número (con código de país, sin + ni espacios)', en: 'Number (with country code, no + or spaces)' },
                  required: true,
                  defaultValue: '51957255145',
                  admin: {
                    width: '65%',
                    description: 'Ej: 51957255145  →  wa.me/51957255145',
                  },
                },
                {
                  name: 'whatsappDisponible',
                  type: 'checkbox',
                  label: { es: 'Mostrar badge "Disponible"', en: 'Show "Available" badge' },
                  defaultValue: true,
                  admin: { width: '35%' },
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'whatsappNombreAgente',
                  type: 'text',
                  label: { es: 'Nombre del agente / empresa', en: 'Agent / company name' },
                  defaultValue: 'Qrealab',
                  admin: { width: '60%' },
                },
                {
                  name: 'whatsappRolAgente',
                  type: 'text',
                  label: { es: 'Rol del agente', en: 'Agent role' },
                  localized: true,
                  defaultValue: 'Asesor Comercial',
                  admin: { width: '40%' },
                },
              ],
            },
            {
              name: 'whatsappMensaje',
              type: 'text',
              label: { es: 'Mensaje predefinido al abrir el chat', en: 'Pre-filled message when opening chat' },
              localized: true,
              defaultValue: 'Hola, me interesa información sobre Qrealab',
              admin: { description: 'El usuario puede editarlo antes de enviar' },
            },
            {
              type: 'collapsible',
              label: '💬 Textos del panel',
              admin: { initCollapsed: false },
              fields: [
                {
                  name: 'waTitulo',
                  type: 'text',
                  label: { es: 'Título principal del panel', en: 'Panel main title' },
                  localized: true,
                  defaultValue: 'Conversemos por WhatsApp',
                },
                {
                  name: 'waSubtitulo',
                  type: 'textarea',
                  label: { es: 'Subtítulo descriptivo', en: 'Descriptive subtitle' },
                  localized: true,
                  defaultValue: 'Recibe información personalizada directamente en tu WhatsApp',
                },
                {
                  name: 'waBtnTexto',
                  type: 'text',
                  label: { es: 'Texto del botón de chat', en: 'Chat button text' },
                  localized: true,
                  defaultValue: 'Iniciar Chat',
                },
              ],
            },
          ],
        },

        // ── TAB 2: FORMULARIO ─────────────────────────────────────────────────────
        {
          label: '📝 Formulario',
          description: 'Opciones de contacto, textos del formulario y mensaje de éxito',
          fields: [
            {
              name: 'opcionesContacto',
              type: 'array',
              label: { es: 'Opciones de forma de contacto', en: 'Contact method options' },
              admin: {
                description: {
                  es: 'Activa o desactiva opciones. El orden aquí es el orden en el formulario.',
                  en: 'Enable or disable options. Order here is the order in the form.',
                },
              },
              defaultValue: [
                { valor: 'whatsapp', etiqueta: 'WhatsApp', icono: 'message-circle', activo: true },
                { valor: 'telefono', etiqueta: 'Llamada',  icono: 'phone',          activo: true },
                { valor: 'correo',   etiqueta: 'Email',    icono: 'mail',           activo: true },
              ],
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'valor',
                      type: 'select',
                      label: { es: 'Tipo', en: 'Type' },
                      required: true,
                      admin: { width: '25%' },
                      options: [
                        { label: 'WhatsApp',                             value: 'whatsapp' },
                        { label: { es: 'Llamada',    en: 'Call' },       value: 'telefono' },
                        { label: { es: 'Correo',     en: 'Email' },      value: 'correo'   },
                      ],
                    },
                    {
                      name: 'etiqueta',
                      type: 'text',
                      label: { es: 'Etiqueta del botón', en: 'Button label' },
                      localized: true,
                      required: true,
                      admin: { width: '30%' },
                    },
                    {
                      name: 'icono',
                      type: 'text',
                      label: { es: 'Ícono (Lucide)', en: 'Icon (Lucide)' },
                      required: true,
                      defaultValue: 'message-circle',
                      admin: {
                        width: '25%',
                        description: 'message-circle · phone · mail · send',
                      },
                    },
                    {
                      name: 'activo',
                      type: 'checkbox',
                      label: { es: 'Activo', en: 'Active' },
                      defaultValue: true,
                      admin: { width: '20%' },
                    },
                  ],
                },
              ],
            },
            {
              type: 'collapsible',
              label: '✏️ Textos del formulario',
              admin: { initCollapsed: false },
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'formEyebrow',
                      type: 'text',
                      label: { es: 'Etiqueta pequeña', en: 'Small label' },
                      localized: true,
                      defaultValue: 'Contáctanos',
                      admin: { width: '40%', description: 'Ej: "Contáctanos"' },
                    },
                    {
                      name: 'formTitulo',
                      type: 'text',
                      label: { es: 'Título del formulario', en: 'Form title' },
                      localized: true,
                      defaultValue: 'Déjanos un mensaje',
                      admin: { width: '60%' },
                    },
                  ],
                },
                {
                  name: 'formBtnEnviar',
                  type: 'text',
                  label: { es: 'Texto del botón "Enviar"', en: '"Send" button text' },
                  localized: true,
                  defaultValue: 'Enviar Mensaje',
                },
              ],
            },
            {
              type: 'collapsible',
              label: '✅ Mensaje de éxito',
              admin: { initCollapsed: true },
              fields: [
                {
                  name: 'formTituloExito',
                  type: 'text',
                  label: { es: 'Título', en: 'Title' },
                  localized: true,
                  defaultValue: '¡Mensaje enviado!',
                },
                {
                  name: 'formSubtituloExito',
                  type: 'textarea',
                  label: { es: 'Descripción', en: 'Description' },
                  localized: true,
                  defaultValue: 'Nos pondremos en contacto contigo a la brevedad.',
                },
              ],
            },
          ],
        },

        // ── TAB 3: PRIVACIDAD & DATOS ─────────────────────────────────────────────
        {
          label: '🔒 Privacidad & Datos',
          description: 'Texto legal del checkbox de consentimiento y datos de contacto directo',
          fields: [
            {
              name: 'politicaTexto',
              type: 'textarea',
              label: { es: 'Texto del checkbox de consentimiento', en: 'Consent checkbox text' },
              localized: true,
              defaultValue: 'He leído y acepto las {{link}}, y autorizo expresamente a Qrealab al uso de mis datos personales según dispuesto en la Ley N° 29733 — Ley de Protección de Datos Personales.',
              admin: {
                description: {
                  es: 'Usa {{link}} como marcador donde aparecerá el enlace clickeable.',
                  en: 'Use {{link}} as placeholder where the clickable link will appear.',
                },
              },
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'politicaLinkTexto',
                  type: 'text',
                  label: { es: 'Texto del enlace', en: 'Link text' },
                  localized: true,
                  defaultValue: 'Políticas de Privacidad y Datos Personales',
                  admin: { width: '65%' },
                },
                {
                  name: 'politicaLinkUrl',
                  type: 'text',
                  label: 'URL del enlace',
                  defaultValue: '#',
                  admin: {
                    width: '35%',
                    description: 'Ej: /politica-de-privacidad',
                  },
                },
              ],
            },
            {
              type: 'collapsible',
              label: '📞 Datos directos de contacto',
              admin: { initCollapsed: false },
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'telefono',
                      type: 'text',
                      label: { es: 'Teléfono (formato visible)', en: 'Phone (display format)' },
                      defaultValue: '+51 957 255 145',
                      admin: {
                        width: '50%',
                        description: 'Se muestra en el panel izquierdo del modal',
                      },
                    },
                    {
                      name: 'email',
                      type: 'email',
                      label: 'Email',
                      defaultValue: 'info@qrealab.com',
                      admin: { width: '50%' },
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
