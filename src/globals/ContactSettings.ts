import type { GlobalConfig } from 'payload'

export const ContactSettings: GlobalConfig = {
  slug: 'contact-settings',
  label: { es: 'Configuración: Modal de Contacto', en: 'Settings: Contact Modal' },
  admin: {
    description: {
      es: 'Textos, número de WhatsApp, opciones y política de privacidad del modal "Contáctenos"',
      en: 'Texts, WhatsApp number, options and privacy policy for the Contact modal',
    },
  },
  access: {
    read: () => true, // Público — el frontend lo consume sin autenticación
  },
  fields: [

    // ── ① WhatsApp ────────────────────────────────────────────────────────────
    {
      type: 'collapsible',
      label: '📱 WhatsApp',
      fields: [
        {
          name: 'whatsappNumero',
          type: 'text',
          label: { es: 'Número (código país + número, sin + ni espacios)', en: 'Number (country code + number, no + or spaces)' },
          required: true,
          defaultValue: '51957255145',
          admin: { description: 'Ej: 51957255145 → https://wa.me/51957255145' },
        },
        {
          name: 'whatsappMensaje',
          type: 'text',
          label: { es: 'Mensaje predefinido al abrir el chat', en: 'Pre-filled message when opening chat' },
          localized: true,
          defaultValue: 'Hola, me interesa información sobre Qrealab',
        },
        {
          name: 'whatsappNombreAgente',
          type: 'text',
          label: { es: 'Nombre del agente / empresa', en: 'Agent / company name' },
          defaultValue: 'Qrealab',
        },
        {
          name: 'whatsappRolAgente',
          type: 'text',
          label: { es: 'Rol del agente', en: 'Agent role' },
          localized: true,
          defaultValue: 'Asesor Comercial',
        },
        {
          name: 'whatsappDisponible',
          type: 'checkbox',
          label: { es: 'Mostrar badge "Disponible"', en: 'Show "Available" badge' },
          defaultValue: true,
        },
      ],
    },

    // ── ② Textos del panel WhatsApp ───────────────────────────────────────────
    {
      type: 'collapsible',
      label: '💬 Panel WhatsApp — Textos',
      fields: [
        {
          name: 'waTitulo',
          type: 'text',
          label: { es: 'Título principal', en: 'Main title' },
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

    // ── ③ Opciones de forma de contacto ──────────────────────────────────────
    {
      name: 'opcionesContacto',
      type: 'array',
      label: { es: 'Opciones de forma de contacto', en: 'Contact method options' },
      admin: {
        description: {
          es: 'Activa / desactiva opciones. El orden aquí es el orden en el formulario.',
          en: 'Enable / disable options. Order here is the order in the form.',
        },
        initCollapsed: false,
      },
      defaultValue: [
        { valor: 'whatsapp', etiqueta: 'WhatsApp',  icono: 'message-circle', activo: true },
        { valor: 'telefono', etiqueta: 'Llamada',   icono: 'phone',          activo: true },
        { valor: 'correo',   etiqueta: 'Email',     icono: 'mail',           activo: true },
      ],
      fields: [
        {
          name: 'valor',
          type: 'select',
          label: { es: 'Tipo de contacto', en: 'Contact type' },
          required: true,
          options: [
            { label: 'WhatsApp',                               value: 'whatsapp' },
            { label: { es: 'Llamada', en: 'Call' },            value: 'telefono' },
            { label: { es: 'Correo', en: 'Email' },            value: 'correo'   },
          ],
        },
        {
          name: 'etiqueta',
          type: 'text',
          label: { es: 'Etiqueta visible en el botón', en: 'Label shown on the button' },
          localized: true,
          required: true,
        },
        {
          name: 'icono',
          type: 'text',
          label: { es: 'Nombre del ícono (Lucide)', en: 'Icon name (Lucide)' },
          required: true,
          defaultValue: 'message-circle',
          admin: { description: 'Opciones: message-circle, phone, mail, send, video, etc.' },
        },
        {
          name: 'activo',
          type: 'checkbox',
          label: { es: 'Activo (se muestra en el formulario)', en: 'Active (shown in form)' },
          defaultValue: true,
        },
      ],
    },

    // ── ④ Formulario — Textos ─────────────────────────────────────────────────
    {
      type: 'collapsible',
      label: '📝 Formulario — Textos',
      fields: [
        {
          name: 'formEyebrow',
          type: 'text',
          label: { es: 'Etiqueta superior (eyebrow)', en: 'Top label (eyebrow)' },
          localized: true,
          defaultValue: 'Contáctanos',
        },
        {
          name: 'formTitulo',
          type: 'text',
          label: { es: 'Título del formulario', en: 'Form title' },
          localized: true,
          defaultValue: 'Déjanos un mensaje',
        },
        {
          name: 'formBtnEnviar',
          type: 'text',
          label: { es: 'Texto del botón "Enviar"', en: '"Send" button text' },
          localized: true,
          defaultValue: 'Enviar Mensaje',
        },
        {
          name: 'formTituloExito',
          type: 'text',
          label: { es: 'Título mensaje de éxito', en: 'Success message title' },
          localized: true,
          defaultValue: '¡Mensaje enviado!',
        },
        {
          name: 'formSubtituloExito',
          type: 'textarea',
          label: { es: 'Subtítulo mensaje de éxito', en: 'Success message subtitle' },
          localized: true,
          defaultValue: 'Nos pondremos en contacto contigo a la brevedad.',
        },
      ],
    },

    // ── ⑤ Política de privacidad ──────────────────────────────────────────────
    {
      type: 'collapsible',
      label: '🔒 Política de Privacidad',
      fields: [
        {
          name: 'politicaTexto',
          type: 'textarea',
          label: { es: 'Texto del checkbox (escribe {{link}} donde va el enlace)', en: 'Checkbox text (write {{link}} where the link goes)' },
          localized: true,
          defaultValue: 'He leído y acepto las {{link}}, y autorizo expresamente a Qrealab al uso de mis datos personales según dispuesto en la Ley N° 29733 — Ley de Protección de Datos Personales.',
          admin: {
            description: {
              es: 'Usa {{link}} como marcador de posición para el enlace clicable.',
              en: 'Use {{link}} as placeholder for the clickable link.',
            },
          },
        },
        {
          name: 'politicaLinkTexto',
          type: 'text',
          label: { es: 'Texto del enlace', en: 'Link text' },
          localized: true,
          defaultValue: 'Políticas de Privacidad y Datos Personales',
        },
        {
          name: 'politicaLinkUrl',
          type: 'text',
          label: 'URL del enlace',
          defaultValue: '#',
          admin: { description: 'Ej: /politica-de-privacidad' },
        },
      ],
    },

    // ── ⑥ Datos de contacto directo ──────────────────────────────────────────
    {
      type: 'collapsible',
      label: '📞 Datos de contacto directo',
      fields: [
        {
          name: 'telefono',
          type: 'text',
          label: { es: 'Teléfono (formato visible)', en: 'Phone (display format)' },
          defaultValue: '+51 957 255 145',
          admin: { description: 'Se muestra en el panel izquierdo del modal.' },
        },
        {
          name: 'email',
          type: 'email',
          label: 'Email',
          defaultValue: 'info@qrealab.com',
        },
      ],
    },

  ],
}
