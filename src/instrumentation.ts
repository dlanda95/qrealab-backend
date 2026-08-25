// Next.js corre register() una única vez al arrancar el servidor real
// (`next start` / runtime), nunca durante `next build`. Es el lugar correcto
// para el fail-fast de variables de entorno requeridas — antes vivía en
// payload.config.ts, pero ese módulo también se importa durante el build
// (page data collection de las rutas de Payload), lo que rompía el build en
// Railway aunque las variables sólo faltaran ahí, no en runtime.
export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    for (const key of ['PAYLOAD_SECRET', 'DATABASE_URL', 'R2_PUBLIC_URL'] as const) {
      if (!process.env[key]) {
        throw new Error(`[qrealab-cms] Variable de entorno requerida no configurada: ${key}`)
      }
    }
  }
}
