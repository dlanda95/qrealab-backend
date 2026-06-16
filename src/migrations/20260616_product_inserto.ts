import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`

    -- ── 1. Nueva colección: documents (insertas / fichas técnicas) ──────────────
    CREATE TABLE IF NOT EXISTS "documents" (
      "id"            serial PRIMARY KEY NOT NULL,
      "title"         varchar,
      "updated_at"    timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at"    timestamp(3) with time zone DEFAULT now() NOT NULL,
      "url"           varchar,
      "thumbnail_u_r_l" varchar,
      "filename"      varchar,
      "mime_type"     varchar,
      "filesize"      numeric,
      "width"         numeric,
      "height"        numeric,
      "focal_x"       numeric,
      "focal_y"       numeric
    );

    CREATE INDEX IF NOT EXISTS "documents_created_at_idx"
      ON "documents" USING btree ("created_at");

    CREATE UNIQUE INDEX IF NOT EXISTS "documents_filename_idx"
      ON "documents" USING btree ("filename");

    -- ── 2. Soporte en payload_locked_documents_rels ─────────────────────────────
    ALTER TABLE "payload_locked_documents_rels"
      ADD COLUMN IF NOT EXISTS "documents_id" integer;

    ALTER TABLE "payload_locked_documents_rels"
      ADD CONSTRAINT "payload_locked_documents_rels_documents_fk"
      FOREIGN KEY ("documents_id") REFERENCES "public"."documents"("id")
      ON DELETE cascade ON UPDATE no action;

    CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_documents_idx"
      ON "payload_locked_documents_rels" USING btree ("documents_id");

    -- ── 3. Campo inserto en productos ───────────────────────────────────────────
    ALTER TABLE "products"
      ADD COLUMN IF NOT EXISTS "inserto_id" integer;

    ALTER TABLE "products"
      ADD CONSTRAINT "products_inserto_id_documents_id_fk"
      FOREIGN KEY ("inserto_id") REFERENCES "public"."documents"("id")
      ON DELETE set null ON UPDATE no action;

    CREATE INDEX IF NOT EXISTS "products_inserto_idx"
      ON "products" USING btree ("inserto_id");

  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`

    ALTER TABLE "products"
      DROP CONSTRAINT IF EXISTS "products_inserto_id_documents_id_fk";
    DROP INDEX IF EXISTS "products_inserto_idx";
    ALTER TABLE "products" DROP COLUMN IF EXISTS "inserto_id";

    ALTER TABLE "payload_locked_documents_rels"
      DROP CONSTRAINT IF EXISTS "payload_locked_documents_rels_documents_fk";
    DROP INDEX IF EXISTS "payload_locked_documents_rels_documents_idx";
    ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "documents_id";

    DROP TABLE IF EXISTS "documents";

  `)
}
