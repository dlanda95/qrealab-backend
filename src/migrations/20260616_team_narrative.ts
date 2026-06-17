import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`

    -- ── 1. Visibilidad de las secciones del equipo ─────────────────────────────
    ALTER TABLE "about_settings"
      ADD COLUMN IF NOT EXISTS "equipo_mostrar"           boolean DEFAULT true,
      ADD COLUMN IF NOT EXISTS "equipo_narrativa_mostrar" boolean DEFAULT false,
      ADD COLUMN IF NOT EXISTS "equipo_narrativa_eyebrow" varchar DEFAULT 'Nuestro Equipo',
      ADD COLUMN IF NOT EXISTS "equipo_narrativa_titulo"  varchar DEFAULT 'Las personas detrás de Qrealab tienen más de 25 años de experiencia',
      ADD COLUMN IF NOT EXISTS "equipo_narrativa_texto"   varchar;

    -- ── 2. Array de estadísticas para la sección narrativa ─────────────────────
    CREATE TABLE IF NOT EXISTS "about_settings_equipo_narrativa_stats" (
      "_order"     integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id"         varchar PRIMARY KEY NOT NULL,
      "valor"      varchar,
      "etiqueta"   varchar
    );

    ALTER TABLE "about_settings_equipo_narrativa_stats"
      ADD CONSTRAINT "about_settings_equipo_narrativa_stats_parent_id_fk"
      FOREIGN KEY ("_parent_id") REFERENCES "public"."about_settings"("id")
      ON DELETE cascade ON UPDATE no action;

    CREATE INDEX IF NOT EXISTS "about_settings_equipo_narrativa_stats_order_idx"
      ON "about_settings_equipo_narrativa_stats" USING btree ("_order");

    CREATE INDEX IF NOT EXISTS "about_settings_equipo_narrativa_stats_parent_id_idx"
      ON "about_settings_equipo_narrativa_stats" USING btree ("_parent_id");

  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`

    DROP TABLE IF EXISTS "about_settings_equipo_narrativa_stats";

    ALTER TABLE "about_settings"
      DROP COLUMN IF EXISTS "equipo_mostrar",
      DROP COLUMN IF EXISTS "equipo_narrativa_mostrar",
      DROP COLUMN IF EXISTS "equipo_narrativa_eyebrow",
      DROP COLUMN IF EXISTS "equipo_narrativa_titulo",
      DROP COLUMN IF EXISTS "equipo_narrativa_texto";

  `)
}
