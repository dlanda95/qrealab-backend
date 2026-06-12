import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pharmavigilance_submissions_estado" AS ENUM('nuevo', 'revision', 'procesado', 'cerrado');
  CREATE TYPE "public"."enum_pharmavigilance_settings_secciones_campos_tipo" AS ENUM('text', 'email', 'number', 'date', 'textarea', 'radio', 'select');
  CREATE TYPE "public"."enum_pharmavigilance_settings_secciones_campos_ancho" AS ENUM('full', 'half', 'third');
  CREATE TABLE "vigilance_locales" (
  	"hero_eyebrow" varchar DEFAULT 'Farmacovigilancia',
  	"hero_titulo" varchar DEFAULT 'Tu seguridad, nuestra responsabilidad',
  	"hero_subtitulo" varchar DEFAULT 'Reporta cualquier efecto adverso de nuestros medicamentos y contribuye a la seguridad de todos los pacientes.',
  	"info_eyebrow" varchar DEFAULT 'Información Importante',
  	"info_titulo" varchar DEFAULT '¿Qué necesitas saber?',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "pharmavigilance_submissions" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"nombre_remitente" varchar,
  	"correo_remitente" varchar,
  	"respuestas" jsonb,
  	"estado" "enum_pharmavigilance_submissions_estado" DEFAULT 'nuevo',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "pharmavigilance_settings_secciones_campos_opciones" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"valor" varchar,
  	"etiqueta" varchar
  );
  
  CREATE TABLE "pharmavigilance_settings_secciones_campos" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"clave" varchar NOT NULL,
  	"etiqueta" varchar NOT NULL,
  	"tipo" "enum_pharmavigilance_settings_secciones_campos_tipo" NOT NULL,
  	"ancho" "enum_pharmavigilance_settings_secciones_campos_ancho" DEFAULT 'full',
  	"requerido" boolean DEFAULT false,
  	"activo" boolean DEFAULT true,
  	"placeholder" varchar
  );
  
  CREATE TABLE "pharmavigilance_settings_secciones" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"titulo" varchar NOT NULL
  );
  
  CREATE TABLE "pharmavigilance_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"titulo" varchar DEFAULT 'Formulario de reporte',
  	"subtitulo" varchar DEFAULT 'Efectos o reacciones adversas al medicamento',
  	"descripcion" varchar,
  	"email_contacto" varchar DEFAULT 'farmacovigilancia@qrealab.com',
  	"telefono_contacto" varchar,
  	"direccion_contacto" varchar DEFAULT 'Oficina Central — Lima, Perú',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "vigilance_slides" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "vigilance_slides_locales" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "vigilance_slides" CASCADE;
  DROP TABLE "vigilance_slides_locales" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "pharmavigilance_submissions_id" integer;
  ALTER TABLE "vigilance_locales" ADD CONSTRAINT "vigilance_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."vigilance"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pharmavigilance_settings_secciones_campos_opciones" ADD CONSTRAINT "pharmavigilance_settings_secciones_campos_opciones_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pharmavigilance_settings_secciones_campos"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pharmavigilance_settings_secciones_campos" ADD CONSTRAINT "pharmavigilance_settings_secciones_campos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pharmavigilance_settings_secciones"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pharmavigilance_settings_secciones" ADD CONSTRAINT "pharmavigilance_settings_secciones_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pharmavigilance_settings"("id") ON DELETE cascade ON UPDATE no action;
  CREATE UNIQUE INDEX "vigilance_locales_locale_parent_id_unique" ON "vigilance_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pharmavigilance_submissions_updated_at_idx" ON "pharmavigilance_submissions" USING btree ("updated_at");
  CREATE INDEX "pharmavigilance_submissions_created_at_idx" ON "pharmavigilance_submissions" USING btree ("created_at");
  CREATE INDEX "pharmavigilance_settings_secciones_campos_opciones_order_idx" ON "pharmavigilance_settings_secciones_campos_opciones" USING btree ("_order");
  CREATE INDEX "pharmavigilance_settings_secciones_campos_opciones_parent_id_idx" ON "pharmavigilance_settings_secciones_campos_opciones" USING btree ("_parent_id");
  CREATE INDEX "pharmavigilance_settings_secciones_campos_order_idx" ON "pharmavigilance_settings_secciones_campos" USING btree ("_order");
  CREATE INDEX "pharmavigilance_settings_secciones_campos_parent_id_idx" ON "pharmavigilance_settings_secciones_campos" USING btree ("_parent_id");
  CREATE INDEX "pharmavigilance_settings_secciones_order_idx" ON "pharmavigilance_settings_secciones" USING btree ("_order");
  CREATE INDEX "pharmavigilance_settings_secciones_parent_id_idx" ON "pharmavigilance_settings_secciones" USING btree ("_parent_id");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pharmavigilance_submissions_fk" FOREIGN KEY ("pharmavigilance_submissions_id") REFERENCES "public"."pharmavigilance_submissions"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_pharmavigilance_submission_idx" ON "payload_locked_documents_rels" USING btree ("pharmavigilance_submissions_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "vigilance_slides" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"cta_link" varchar DEFAULT '#informacion',
  	"image_id" integer NOT NULL
  );
  
  CREATE TABLE "vigilance_slides_locales" (
  	"tag" varchar,
  	"title" varchar NOT NULL,
  	"subtitle" varchar,
  	"cta_text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  ALTER TABLE "vigilance_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pharmavigilance_submissions" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pharmavigilance_settings_secciones_campos_opciones" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pharmavigilance_settings_secciones_campos" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pharmavigilance_settings_secciones" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pharmavigilance_settings" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "vigilance_locales" CASCADE;
  DROP TABLE "pharmavigilance_submissions" CASCADE;
  DROP TABLE "pharmavigilance_settings_secciones_campos_opciones" CASCADE;
  DROP TABLE "pharmavigilance_settings_secciones_campos" CASCADE;
  DROP TABLE "pharmavigilance_settings_secciones" CASCADE;
  DROP TABLE "pharmavigilance_settings" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_pharmavigilance_submissions_fk";
  
  DROP INDEX "payload_locked_documents_rels_pharmavigilance_submission_idx";
  ALTER TABLE "vigilance_slides" ADD CONSTRAINT "vigilance_slides_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "vigilance_slides" ADD CONSTRAINT "vigilance_slides_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."vigilance"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "vigilance_slides_locales" ADD CONSTRAINT "vigilance_slides_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."vigilance_slides"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "vigilance_slides_order_idx" ON "vigilance_slides" USING btree ("_order");
  CREATE INDEX "vigilance_slides_parent_id_idx" ON "vigilance_slides" USING btree ("_parent_id");
  CREATE INDEX "vigilance_slides_image_idx" ON "vigilance_slides" USING btree ("image_id");
  CREATE UNIQUE INDEX "vigilance_slides_locales_locale_parent_id_unique" ON "vigilance_slides_locales" USING btree ("_locale","_parent_id");
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "pharmavigilance_submissions_id";
  DROP TYPE "public"."enum_pharmavigilance_submissions_estado";
  DROP TYPE "public"."enum_pharmavigilance_settings_secciones_campos_tipo";
  DROP TYPE "public"."enum_pharmavigilance_settings_secciones_campos_ancho";`)
}
