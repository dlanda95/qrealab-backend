import { postgresAdapter } from '@payloadcms/db-postgres'
import { s3Storage }       from '@payloadcms/storage-s3'
import { lexicalEditor }   from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users }             from './collections/Users'
import { Media }             from './collections/Media'
import { Documents }         from './collections/Documents'
import { HeroSlides }        from './collections/HeroSlides'
import { History }           from './collections/History'
import { WhoWeAre }          from './collections/WhoWeAre'
import { OurValues }         from './collections/OurValues'
import { Footer }            from './collections/Footer'
import { ProductCategories } from './collections/ProductCategories'
import { Products }          from './collections/Products'
import { Vigilance }         from './collections/Vigilance'
import { ContactSubmissions }          from './collections/ContactSubmissions'
import { PharmavigilanceSubmissions }  from './collections/PharmavigilanceSubmissions'
import { ContactSettings }             from './globals/ContactSettings'
import { PharmavigilanceSettings }     from './globals/PharmavigilanceSettings'
import { AboutSettings }     from './globals/AboutSettings'
import { NavSettings }       from './globals/NavSettings'
import { HomeSettings }      from './globals/HomeSettings'
import { SiteSettings }      from './globals/SiteSettings'

const filename = fileURLToPath(import.meta.url)
const dirname  = path.dirname(filename)

// ── Orígenes CORS permitidos ──────────────────────────────────────────────────
const allowedOrigins = [
  'http://localhost:4200',
  'http://localhost:3000',
  process.env.FRONTEND_URL,
  process.env.PAYLOAD_PUBLIC_SERVER_URL,
].filter((url): url is string => Boolean(url))

// ── Cloudflare R2 — almacenamiento de archivos ────────────────────────────────
// Activo en todos los entornos (local y producción usan el mismo bucket).
// Variables requeridas en .env:
//   R2_ACCOUNT_ID, R2_BUCKET, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_PUBLIC_URL
const r2Plugin = s3Storage({
  collections: {
    media: {
      // URL pública directa desde Cloudflare CDN — no pasa por el servidor de Payload
      generateFileURL: ({ filename }) =>
        `${process.env.R2_PUBLIC_URL}/${filename}`,
      disableLocalStorage: true,
    },
    documents: {
      generateFileURL: ({ filename }) =>
        `${process.env.R2_PUBLIC_URL}/${filename}`,
      disableLocalStorage: true,
    },
  },
  bucket: process.env.R2_BUCKET ?? '',
  config: {
    credentials: {
      accessKeyId:     process.env.R2_ACCESS_KEY_ID     ?? '',
      secretAccessKey: process.env.R2_SECRET_ACCESS_KEY ?? '',
    },
    region:   'auto',
    endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  },
})

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: { baseDir: path.resolve(dirname) },
  },

  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3000',

  cors: allowedOrigins,
  csrf: allowedOrigins,

  // Deshabilitar GraphQL Playground en producción — expone toda la estructura
  // de la BD a cualquier usuario anónimo que visite /api/graphql-playground
  graphQL: {
    disablePlaygroundInProduction: true,
  },

  localization: {
    locales: [
      { label: 'Español', code: 'es' },
      { label: 'English', code: 'en' },
    ],
    defaultLocale: 'es',
    fallback: true,
  },

  collections: [
    Users, Media, Documents,
    HeroSlides, History, WhoWeAre, OurValues,
    Footer, ProductCategories, Products, Vigilance,
    ContactSubmissions, PharmavigilanceSubmissions,
  ],
  globals:  [HomeSettings, NavSettings, ContactSettings, AboutSettings, PharmavigilanceSettings, SiteSettings],
  editor:   lexicalEditor(),
  secret:   process.env.PAYLOAD_SECRET || '',

  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },

  db: postgresAdapter({
    pool: { connectionString: process.env.DATABASE_URL || '' },
  }),

  sharp,
  plugins: [r2Plugin],
})
