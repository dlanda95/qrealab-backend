import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`

    -- ── 1. Global: site_settings (feature flags del sitio) ─────────────────────
    CREATE TABLE IF NOT EXISTS "site_settings" (
      "id"                    serial PRIMARY KEY NOT NULL,
      "mostrar_btn_contacto"  boolean DEFAULT true,
      "updated_at"            timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at"            timestamp(3) with time zone DEFAULT now() NOT NULL
    );

    -- ── 2. About Settings: visibilidad de la sección Aliados ───────────────────
    ALTER TABLE "about_settings"
      ADD COLUMN IF NOT EXISTS "aliados_mostrar" boolean DEFAULT true;

    -- ── 3. Footer: array de múltiples emails de contacto ───────────────────────
    CREATE TABLE IF NOT EXISTS "footer_contact_emails" (
      "_order"    integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id"        varchar PRIMARY KEY NOT NULL,
      "email"     varchar NOT NULL
    );

    ALTER TABLE "footer_contact_emails"
      ADD CONSTRAINT "footer_contact_emails_parent_id_fk"
      FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id")
      ON DELETE cascade ON UPDATE no action;

    CREATE INDEX IF NOT EXISTS "footer_contact_emails_order_idx"
      ON "footer_contact_emails" USING btree ("_order");

    CREATE INDEX IF NOT EXISTS "footer_contact_emails_parent_id_idx"
      ON "footer_contact_emails" USING btree ("_parent_id");

  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`

    DROP TABLE IF EXISTS "site_settings";

    ALTER TABLE "about_settings"
      DROP COLUMN IF EXISTS "aliados_mostrar";

    DROP TABLE IF EXISTS "footer_contact_emails";

  `)
}
