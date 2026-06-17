import type { CollectionConfig, CollectionAfterChangeHook, CollectionBeforeOperationHook } from 'payload'

// ── HTML escaping — previene XSS en plantillas de email ──────────────────────
function escapeHtml(val: unknown): string {
  return String(val ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

// ── Rate limiting en memoria — máx. 5 envíos por IP cada 10 min ──────────────
const rateLimitStore = new Map<string, { count: number; resetAt: number }>()
const RATE_WINDOW_MS = 10 * 60 * 1000
const RATE_MAX       = 5

function checkRateLimit(ip: string): void {
  const now   = Date.now()
  const entry = rateLimitStore.get(ip)
  if (!entry || now > entry.resetAt) {
    rateLimitStore.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS })
    return
  }
  if (entry.count >= RATE_MAX) {
    throw new Error('Demasiadas solicitudes. Por favor, espere unos minutos e intente nuevamente.')
  }
  entry.count++
}

const rateLimit: CollectionBeforeOperationHook = ({ args, operation }) => {
  if (operation !== 'create') return args
  const forwarded = args.req?.headers?.get?.('x-forwarded-for') ?? ''
  const ip = (typeof forwarded === 'string' ? forwarded.split(',')[0].trim() : '') || 'unknown'
  checkRateLimit(ip)
  return args
}

function buildEmailHtml(doc: any): string {
  const respuestas: Record<string, string> = doc.respuestas ?? {}

  const rows = Object.entries(respuestas)
    .filter(([, v]) => v !== '' && v !== null && v !== undefined)
    .map(([k, v]) => `
      <tr>
        <td style="padding:8px 14px;background:#EEF2FF;border-radius:6px;font-size:12px;color:#5C6478;font-weight:600;width:220px;vertical-align:top;">${escapeHtml(k)}</td>
        <td style="padding:8px 14px;font-size:13px;color:#1A1A2E;">${escapeHtml(v)}</td>
      </tr>
      <tr><td colspan="2" style="height:4px;"></td></tr>
    `).join('')

  const remitente = escapeHtml(doc.nombreRemitente ?? 'Anónimo')

  return `
<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#f5f5f7;font-family:Inter,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f7;padding:32px 16px;">
    <tr><td align="center">
      <table width="620" cellpadding="0" cellspacing="0" style="max-width:620px;width:100%;">
        <tr><td style="background:#0A1145;border-radius:16px 16px 0 0;padding:28px 32px;text-align:center;">
          <p style="color:#2EC643;font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;margin:0 0 6px;">Nuevo reporte</p>
          <h1 style="color:#ffffff;font-size:20px;font-weight:800;margin:0;">Reporte de Farmacovigilancia</h1>
          <p style="color:rgba(255,255,255,0.55);font-size:13px;margin:6px 0 0;">Remitente: ${remitente}</p>
        </td></tr>
        <tr><td style="background:#ffffff;padding:32px;">
          <table width="100%" cellpadding="0" cellspacing="0">${rows}</table>
        </td></tr>
        <tr><td style="background:#0A1145;border-radius:0 0 16px 16px;padding:16px 32px;text-align:center;">
          <p style="color:rgba(255,255,255,0.35);font-size:11px;margin:0;">© 2026 Qrealab S.A.C. · Generado automáticamente.</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`
}

const notifyByEmail: CollectionAfterChangeHook = async ({ doc, operation }) => {
  if (operation !== 'create') return doc

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.log('[PharmavigilanceSubmissions] RESEND_API_KEY no configurado — email omitido.')
    return doc
  }

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from:    'Qrealab <noreply@qrealab.com>',
        to:      ['farmacovigilancia@qrealab.com'],
        subject: `Nuevo reporte farmacovigilancia: ${doc.nombreRemitente ?? 'Sin nombre'}`,
        html:    buildEmailHtml(doc),
      }),
    })
    if (!res.ok) console.error('[PharmavigilanceSubmissions] Resend error:', await res.text())
  } catch (err) {
    console.error('[PharmavigilanceSubmissions] Error enviando email:', err)
  }

  return doc
}

export const PharmavigilanceSubmissions: CollectionConfig = {
  slug: 'pharmavigilance-submissions',
  labels: { singular: 'Reporte Recibido', plural: 'Reportes Recibidos' },

  admin: {
    group: 'Farmacovigilancia',
    useAsTitle: 'nombreRemitente',
    description: 'Reportes de efectos adversos recibidos desde el sitio web.',
    defaultColumns: ['nombreRemitente', 'correoRemitente', 'estado', 'createdAt'],
  },

  access: {
    read:   ({ req: { user } }) => Boolean(user),
    create: () => true,
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },

  hooks: {
    beforeOperation: [rateLimit],
    afterChange: [notifyByEmail],
  },

  fields: [
    {
      type: 'row',
      fields: [
        { name: 'nombreRemitente', type: 'text',  label: 'Nombre del remitente', admin: { width: '60%', readOnly: true } },
        { name: 'correoRemitente', type: 'email', label: 'Correo del remitente', admin: { width: '40%', readOnly: true } },
      ],
    },
    {
      name: 'respuestas',
      type: 'json',
      label: 'Respuestas del formulario',
      admin: {
        description: 'Todas las respuestas enviadas desde el formulario web.',
      },
    },
    {
      name: 'estado',
      type: 'select',
      label: 'Estado',
      defaultValue: 'nuevo',
      options: [
        { label: '🟢 Nuevo',          value: 'nuevo'       },
        { label: '🟡 En revisión',    value: 'revision'    },
        { label: '✅ Procesado',      value: 'procesado'   },
        { label: '🔴 Cerrado',        value: 'cerrado'     },
      ],
      admin: { position: 'sidebar' },
    },
  ],
}
