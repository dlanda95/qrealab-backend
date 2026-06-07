import type { CollectionConfig, CollectionAfterChangeHook } from 'payload'

// ============================================================
//  CONTACT SUBMISSIONS
//  Almacena todos los formularios de contacto enviados.
//  Envía email a info@qrealab.com via Resend (si RESEND_API_KEY está configurado).
// ============================================================

// ── Plantilla HTML del email ─────────────────────────────────────────────────
function buildEmailHtml(doc: any): string {
  const formaLabel: Record<string, string> = {
    whatsapp: 'WhatsApp',
    telefono: 'Llamada telefónica',
    correo:   'Correo electrónico',
  }

  return `
<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#f5f5f7;font-family:Inter,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f7;padding:32px 16px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

        <!-- Header -->
        <tr><td style="background:#0A1145;border-radius:16px 16px 0 0;padding:28px 32px;text-align:center;">
          <p style="color:#2EC643;font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;margin:0 0 8px;">Nuevo formulario</p>
          <h1 style="color:#ffffff;font-size:22px;font-weight:800;margin:0;">Solicitud de Contacto</h1>
          <p style="color:rgba(255,255,255,0.55);font-size:13px;margin:6px 0 0;">Qrealab — info@qrealab.com</p>
        </td></tr>

        <!-- Body -->
        <tr><td style="background:#ffffff;padding:32px;">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td style="padding:10px 16px;background:#EEF2FF;border-radius:8px;font-size:13px;color:#5C6478;font-weight:600;width:130px;">Nombre</td>
              <td style="padding:10px 16px;font-size:14px;color:#1A1A2E;font-weight:500;">${doc.nombres} ${doc.apellidos}</td>
            </tr>
            <tr><td colspan="2" style="height:6px;"></td></tr>
            <tr>
              <td style="padding:10px 16px;background:#EEF2FF;border-radius:8px;font-size:13px;color:#5C6478;font-weight:600;">Teléfono</td>
              <td style="padding:10px 16px;font-size:14px;color:#1A1A2E;">${doc.telefono}</td>
            </tr>
            <tr><td colspan="2" style="height:6px;"></td></tr>
            <tr>
              <td style="padding:10px 16px;background:#EEF2FF;border-radius:8px;font-size:13px;color:#5C6478;font-weight:600;">Correo</td>
              <td style="padding:10px 16px;font-size:14px;color:#1A1A2E;">${doc.correo}</td>
            </tr>
            <tr><td colspan="2" style="height:6px;"></td></tr>
            <tr>
              <td style="padding:10px 16px;background:#EEF2FF;border-radius:8px;font-size:13px;color:#5C6478;font-weight:600;">Prefiere</td>
              <td style="padding:10px 16px;">
                <span style="background:#E6F9EA;color:#21963A;font-size:12px;font-weight:700;padding:4px 12px;border-radius:100px;">
                  ${formaLabel[doc.formaContacto] ?? doc.formaContacto}
                </span>
              </td>
            </tr>
            ${doc.mensaje ? `
            <tr><td colspan="2" style="height:6px;"></td></tr>
            <tr>
              <td style="padding:10px 16px;background:#EEF2FF;border-radius:8px;font-size:13px;color:#5C6478;font-weight:600;vertical-align:top;">Mensaje</td>
              <td style="padding:10px 16px;font-size:14px;color:#1A1A2E;line-height:1.6;">${doc.mensaje}</td>
            </tr>` : ''}
          </table>
        </td></tr>

        <!-- CTA -->
        <tr><td style="background:#f5f5f7;padding:24px 32px;text-align:center;">
          <a href="mailto:${doc.correo}" style="display:inline-block;background:#0A1145;color:#ffffff;font-size:13px;font-weight:700;padding:12px 28px;border-radius:100px;text-decoration:none;">
            Responder a ${doc.nombres} →
          </a>
        </td></tr>

        <!-- Footer -->
        <tr><td style="background:#0A1145;border-radius:0 0 16px 16px;padding:20px 32px;text-align:center;">
          <p style="color:rgba(255,255,255,0.35);font-size:11px;margin:0;">
            © 2026 Qrealab S.A.C. · Este correo fue generado automáticamente.
          </p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`
}

// ── After-change hook: envía email de notificación ───────────────────────────
const notifyByEmail: CollectionAfterChangeHook = async ({ doc, operation }) => {
  if (operation !== 'create') return doc

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.log('[ContactSubmissions] RESEND_API_KEY no configurado — email omitido en local.')
    return doc
  }

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from:    'Qrealab <noreply@qrealab.com>',
        to:      ['info@qrealab.com'],
        subject: `Nuevo contacto: ${doc.nombres} ${doc.apellidos}`,
        html:    buildEmailHtml(doc),
      }),
    })

    if (!res.ok) {
      const body = await res.text()
      console.error('[ContactSubmissions] Resend error:', body)
    }
  } catch (err) {
    console.error('[ContactSubmissions] Error enviando email:', err)
  }

  return doc
}

// ── Colección ────────────────────────────────────────────────────────────────
export const ContactSubmissions: CollectionConfig = {
  slug: 'contact-submissions',

  admin: {
    useAsTitle: 'nombres',
    description: 'Formularios de contacto recibidos desde el sitio web.',
    defaultColumns: ['nombres', 'apellidos', 'correo', 'formaContacto', 'estado', 'createdAt'],
  },

  access: {
    read:   ({ req: { user } }) => Boolean(user),   // Solo admins
    create: () => true,                              // Público (formulario web)
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },

  hooks: {
    afterChange: [notifyByEmail],
  },

  fields: [
    // ── Datos personales ─────────────────────────────────────
    {
      type: 'row',
      fields: [
        { name: 'nombres',   type: 'text',  label: 'Nombres',   required: true },
        { name: 'apellidos', type: 'text',  label: 'Apellidos', required: true },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'telefono', type: 'text',  label: 'Teléfono', required: true },
        { name: 'correo',   type: 'email', label: 'Correo',   required: true },
      ],
    },

    // ── Preferencia de contacto ──────────────────────────────
    {
      name: 'formaContacto',
      type: 'select',
      label: 'Forma de contacto preferida',
      required: true,
      defaultValue: 'whatsapp',
      options: [
        { label: 'WhatsApp',            value: 'whatsapp' },
        { label: 'Llamada telefónica',  value: 'telefono' },
        { label: 'Correo electrónico',  value: 'correo'   },
      ],
    },

    // ── Mensaje ──────────────────────────────────────────────
    {
      name: 'mensaje',
      type: 'textarea',
      label: 'Mensaje',
    },

    // ── Política de privacidad ───────────────────────────────
    {
      name: 'aceptaPoliticas',
      type: 'checkbox',
      label: 'Aceptó política de privacidad (Ley N° 29733)',
      required: true,
      defaultValue: false,
      admin: { readOnly: true },
    },

    // ── Estado CRM (solo admin) ──────────────────────────────
    {
      name: 'estado',
      type: 'select',
      label: 'Estado',
      defaultValue: 'nuevo',
      options: [
        { label: '🟢 Nuevo',         value: 'nuevo'       },
        { label: '🟡 En seguimiento', value: 'seguimiento' },
        { label: '✅ Contactado',     value: 'contactado'  },
        { label: '🔴 Cerrado',        value: 'cerrado'     },
      ],
      admin: { position: 'sidebar' },
    },
  ],
}
