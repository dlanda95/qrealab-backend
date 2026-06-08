import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."_locales" AS ENUM('es', 'en');
  CREATE TYPE "public"."enum_our_values_values_icon" AS ENUM('heart', 'lightbulb', 'trending-up', 'shield', 'star', 'users', 'award', 'target', 'leaf', 'hand-heart', 'brain', 'book-open', 'rocket', 'circle-check');
  CREATE TYPE "public"."enum_products_status" AS ENUM('active', 'inactive');
  CREATE TYPE "public"."enum_vigilance_info_blocks_style" AS ENUM('bullet', 'numbered');
  CREATE TYPE "public"."enum_contact_submissions_forma_contacto" AS ENUM('whatsapp', 'telefono', 'correo');
  CREATE TYPE "public"."enum_contact_submissions_estado" AS ENUM('nuevo', 'seguimiento', 'contactado', 'cerrado');
  CREATE TYPE "public"."enum_home_settings_values_icon" AS ENUM('heart', 'lightbulb', 'trending-up', 'shield', 'star', 'users', 'award', 'target', 'leaf', 'hand-heart', 'brain', 'book-open', 'rocket', 'circle-check');
  CREATE TYPE "public"."enum_contact_settings_opciones_contacto_valor" AS ENUM('whatsapp', 'telefono', 'correo');
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE "hero_slides" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"_order" varchar,
  	"image_id" integer NOT NULL,
  	"cta_link" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "hero_slides_locales" (
  	"tag" varchar,
  	"title" varchar NOT NULL,
  	"subtitle" varchar,
  	"cta_text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "history" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "history_locales" (
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "whoweare" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "whoweare_locales" (
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "our_values_values_points" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "our_values_values_points_locales" (
  	"label" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "our_values_values" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_our_values_values_icon" DEFAULT 'heart' NOT NULL
  );
  
  CREATE TABLE "our_values_values_locales" (
  	"title" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "our_values" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "our_values_locales" (
  	"section_title" varchar DEFAULT 'Nuestros Valores' NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "footer_social_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE "footer_link_columns_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE "footer_link_columns_links_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "footer_link_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "footer_link_columns_locales" (
  	"title" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "footer" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"contact_email" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "footer_locales" (
  	"brand_description" varchar NOT NULL,
  	"contact_title" varchar DEFAULT 'Contacto' NOT NULL,
  	"address" varchar,
  	"copyright_text" varchar DEFAULT '2026 Qrealab S.A.C. Todos los derechos reservados.' NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "product_categories" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"_order" varchar,
  	"slug" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "product_categories_locales" (
  	"name" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "products_presentations" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "products_presentations_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "products" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"_order" varchar,
  	"slug" varchar NOT NULL,
  	"category_id" integer NOT NULL,
  	"active_ingredient" varchar,
  	"image_id" integer,
  	"featured" boolean DEFAULT false,
  	"status" "enum_products_status" DEFAULT 'active',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "products_locales" (
  	"name" varchar NOT NULL,
  	"tagline" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
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
  
  CREATE TABLE "vigilance_info_blocks_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "vigilance_info_blocks_items_locales" (
  	"text" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "vigilance_info_blocks" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"style" "enum_vigilance_info_blocks_style" DEFAULT 'bullet'
  );
  
  CREATE TABLE "vigilance_info_blocks_locales" (
  	"title" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "vigilance" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"page_title" varchar DEFAULT 'Farmacovigilancia',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "contact_submissions" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"nombres" varchar NOT NULL,
  	"apellidos" varchar NOT NULL,
  	"telefono" varchar NOT NULL,
  	"correo" varchar NOT NULL,
  	"forma_contacto" "enum_contact_submissions_forma_contacto" DEFAULT 'whatsapp' NOT NULL,
  	"mensaje" varchar,
  	"acepta_politicas" boolean DEFAULT false NOT NULL,
  	"estado" "enum_contact_submissions_estado" DEFAULT 'nuevo',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer,
  	"media_id" integer,
  	"hero_slides_id" integer,
  	"history_id" integer,
  	"whoweare_id" integer,
  	"our_values_id" integer,
  	"footer_id" integer,
  	"product_categories_id" integer,
  	"products_id" integer,
  	"vigilance_id" integer,
  	"contact_submissions_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "home_settings_hero_slides" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL,
  	"cta_link" varchar
  );
  
  CREATE TABLE "home_settings_hero_slides_locales" (
  	"tag" varchar,
  	"title" varchar NOT NULL,
  	"subtitle" varchar,
  	"cta_text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "home_settings_values_points" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "home_settings_values_points_locales" (
  	"label" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "home_settings_values" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_home_settings_values_icon" DEFAULT 'heart' NOT NULL
  );
  
  CREATE TABLE "home_settings_values_locales" (
  	"title" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "home_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hist_image_id" integer,
  	"who_image_id" integer,
  	"val_image_id" integer,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "home_settings_locales" (
  	"hist_title" varchar DEFAULT 'Nuestra Historia' NOT NULL,
  	"hist_description" varchar DEFAULT 'Desde nuestros inicios hemos estado comprometidos con la salud de la población...' NOT NULL,
  	"who_title" varchar DEFAULT 'Quiénes Somos' NOT NULL,
  	"who_description" varchar DEFAULT 'Somos una empresa farmacéutica comprometida con la calidad y el bienestar...' NOT NULL,
  	"val_section_title" varchar DEFAULT 'Nuestros Valores' NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "nav_settings_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"ruta" varchar NOT NULL
  );
  
  CREATE TABLE "nav_settings_items_locales" (
  	"etiqueta" varchar NOT NULL,
  	"activo" boolean DEFAULT true,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "nav_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "nav_settings_locales" (
  	"cta_label" varchar DEFAULT 'Contáctenos',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "contact_settings_opciones_contacto" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"valor" "enum_contact_settings_opciones_contacto_valor" NOT NULL,
  	"icono" varchar DEFAULT 'message-circle' NOT NULL,
  	"activo" boolean DEFAULT true
  );
  
  CREATE TABLE "contact_settings_opciones_contacto_locales" (
  	"etiqueta" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "contact_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"whatsapp_numero" varchar DEFAULT '51957255145' NOT NULL,
  	"whatsapp_disponible" boolean DEFAULT true,
  	"whatsapp_nombre_agente" varchar DEFAULT 'Qrealab',
  	"politica_link_url" varchar DEFAULT '#',
  	"telefono" varchar DEFAULT '+51 957 255 145',
  	"email" varchar DEFAULT 'info@qrealab.com',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "contact_settings_locales" (
  	"whatsapp_rol_agente" varchar DEFAULT 'Asesor Comercial',
  	"whatsapp_mensaje" varchar DEFAULT 'Hola, me interesa información sobre Qrealab',
  	"wa_titulo" varchar DEFAULT 'Conversemos por WhatsApp',
  	"wa_subtitulo" varchar DEFAULT 'Recibe información personalizada directamente en tu WhatsApp',
  	"wa_btn_texto" varchar DEFAULT 'Iniciar Chat',
  	"form_eyebrow" varchar DEFAULT 'Contáctanos',
  	"form_titulo" varchar DEFAULT 'Déjanos un mensaje',
  	"form_btn_enviar" varchar DEFAULT 'Enviar Mensaje',
  	"form_titulo_exito" varchar DEFAULT '¡Mensaje enviado!',
  	"form_subtitulo_exito" varchar DEFAULT 'Nos pondremos en contacto contigo a la brevedad.',
  	"politica_texto" varchar DEFAULT 'He leído y acepto las {{link}}, y autorizo expresamente a Qrealab al uso de mis datos personales según dispuesto en la Ley N° 29733 — Ley de Protección de Datos Personales.',
  	"politica_link_texto" varchar DEFAULT 'Políticas de Privacidad y Datos Personales',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "about_settings_hero_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"valor" varchar NOT NULL
  );
  
  CREATE TABLE "about_settings_hero_stats_locales" (
  	"etiqueta" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "about_settings_equipo_grupos_miembros" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"nombre" varchar NOT NULL,
  	"foto_id" integer,
  	"linkedin" varchar
  );
  
  CREATE TABLE "about_settings_equipo_grupos_miembros_locales" (
  	"cargo" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "about_settings_equipo_grupos" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "about_settings_equipo_grupos_locales" (
  	"nombre" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "about_settings_aliados" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"nombre" varchar NOT NULL,
  	"url" varchar,
  	"logo_id" integer
  );
  
  CREATE TABLE "about_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_imagen_id" integer,
  	"mision_icono" varchar DEFAULT 'target',
  	"vision_icono" varchar DEFAULT 'eye',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "about_settings_locales" (
  	"hero_eyebrow" varchar DEFAULT 'Nosotros',
  	"hero_titulo" varchar DEFAULT 'Comprometidos con tu salud.',
  	"hero_subtitulo" varchar DEFAULT 'Distribución farmacéutica de calidad',
  	"hero_descripcion" varchar DEFAULT 'Somos una empresa farmacéutica especializada en la distribución y comercialización de productos de alta calidad, comprometidos con la salud y el bienestar de nuestros clientes en todo el país.',
  	"mision_titulo" varchar DEFAULT 'Nuestra Misión',
  	"mision_texto" varchar DEFAULT 'Proveer soluciones farmacéuticas de alta calidad que contribuyan al bienestar de las personas, con un equipo comprometido con la excelencia, la ética profesional y el servicio personalizado.',
  	"vision_titulo" varchar DEFAULT 'Nuestra Visión',
  	"vision_texto" varchar DEFAULT 'Ser la empresa farmacéutica de referencia en el país, reconocida por la calidad de nuestros productos, la solidez de nuestras alianzas y el impacto positivo en la salud de la población.',
  	"equipo_eyebrow" varchar DEFAULT 'Nuestro Equipo',
  	"equipo_titulo" varchar DEFAULT 'Las personas que hacen posible Qrealab',
  	"aliados_eyebrow" varchar DEFAULT 'Aliados Estratégicos',
  	"aliados_titulo" varchar DEFAULT 'Trabajamos con los mejores',
  	"aliados_subtitulo" varchar DEFAULT 'Nuestros socios estratégicos comparten nuestra visión de calidad, ética y compromiso con la salud.',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "hero_slides" ADD CONSTRAINT "hero_slides_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "hero_slides_locales" ADD CONSTRAINT "hero_slides_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."hero_slides"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "history" ADD CONSTRAINT "history_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "history_locales" ADD CONSTRAINT "history_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."history"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "whoweare" ADD CONSTRAINT "whoweare_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "whoweare_locales" ADD CONSTRAINT "whoweare_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."whoweare"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "our_values_values_points" ADD CONSTRAINT "our_values_values_points_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."our_values_values"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "our_values_values_points_locales" ADD CONSTRAINT "our_values_values_points_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."our_values_values_points"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "our_values_values" ADD CONSTRAINT "our_values_values_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."our_values"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "our_values_values_locales" ADD CONSTRAINT "our_values_values_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."our_values_values"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "our_values" ADD CONSTRAINT "our_values_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "our_values_locales" ADD CONSTRAINT "our_values_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."our_values"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_social_links" ADD CONSTRAINT "footer_social_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_link_columns_links" ADD CONSTRAINT "footer_link_columns_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer_link_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_link_columns_links_locales" ADD CONSTRAINT "footer_link_columns_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer_link_columns_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_link_columns" ADD CONSTRAINT "footer_link_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_link_columns_locales" ADD CONSTRAINT "footer_link_columns_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer_link_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_locales" ADD CONSTRAINT "footer_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "product_categories_locales" ADD CONSTRAINT "product_categories_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."product_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_presentations" ADD CONSTRAINT "products_presentations_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_presentations_locales" ADD CONSTRAINT "products_presentations_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products_presentations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products" ADD CONSTRAINT "products_category_id_product_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."product_categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "products" ADD CONSTRAINT "products_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "products_locales" ADD CONSTRAINT "products_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "vigilance_slides" ADD CONSTRAINT "vigilance_slides_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "vigilance_slides" ADD CONSTRAINT "vigilance_slides_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."vigilance"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "vigilance_slides_locales" ADD CONSTRAINT "vigilance_slides_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."vigilance_slides"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "vigilance_info_blocks_items" ADD CONSTRAINT "vigilance_info_blocks_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."vigilance_info_blocks"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "vigilance_info_blocks_items_locales" ADD CONSTRAINT "vigilance_info_blocks_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."vigilance_info_blocks_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "vigilance_info_blocks" ADD CONSTRAINT "vigilance_info_blocks_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."vigilance"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "vigilance_info_blocks_locales" ADD CONSTRAINT "vigilance_info_blocks_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."vigilance_info_blocks"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_hero_slides_fk" FOREIGN KEY ("hero_slides_id") REFERENCES "public"."hero_slides"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_history_fk" FOREIGN KEY ("history_id") REFERENCES "public"."history"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_whoweare_fk" FOREIGN KEY ("whoweare_id") REFERENCES "public"."whoweare"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_our_values_fk" FOREIGN KEY ("our_values_id") REFERENCES "public"."our_values"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_footer_fk" FOREIGN KEY ("footer_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_product_categories_fk" FOREIGN KEY ("product_categories_id") REFERENCES "public"."product_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_products_fk" FOREIGN KEY ("products_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_vigilance_fk" FOREIGN KEY ("vigilance_id") REFERENCES "public"."vigilance"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_contact_submissions_fk" FOREIGN KEY ("contact_submissions_id") REFERENCES "public"."contact_submissions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_settings_hero_slides" ADD CONSTRAINT "home_settings_hero_slides_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_settings_hero_slides" ADD CONSTRAINT "home_settings_hero_slides_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_settings_hero_slides_locales" ADD CONSTRAINT "home_settings_hero_slides_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_settings_hero_slides"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_settings_values_points" ADD CONSTRAINT "home_settings_values_points_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_settings_values"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_settings_values_points_locales" ADD CONSTRAINT "home_settings_values_points_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_settings_values_points"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_settings_values" ADD CONSTRAINT "home_settings_values_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_settings_values_locales" ADD CONSTRAINT "home_settings_values_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_settings_values"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_settings" ADD CONSTRAINT "home_settings_hist_image_id_media_id_fk" FOREIGN KEY ("hist_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_settings" ADD CONSTRAINT "home_settings_who_image_id_media_id_fk" FOREIGN KEY ("who_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_settings" ADD CONSTRAINT "home_settings_val_image_id_media_id_fk" FOREIGN KEY ("val_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_settings_locales" ADD CONSTRAINT "home_settings_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "nav_settings_items" ADD CONSTRAINT "nav_settings_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."nav_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "nav_settings_items_locales" ADD CONSTRAINT "nav_settings_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."nav_settings_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "nav_settings_locales" ADD CONSTRAINT "nav_settings_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."nav_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_settings_opciones_contacto" ADD CONSTRAINT "contact_settings_opciones_contacto_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_settings_opciones_contacto_locales" ADD CONSTRAINT "contact_settings_opciones_contacto_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_settings_opciones_contacto"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_settings_locales" ADD CONSTRAINT "contact_settings_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_settings_hero_stats" ADD CONSTRAINT "about_settings_hero_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_settings_hero_stats_locales" ADD CONSTRAINT "about_settings_hero_stats_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_settings_hero_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_settings_equipo_grupos_miembros" ADD CONSTRAINT "about_settings_equipo_grupos_miembros_foto_id_media_id_fk" FOREIGN KEY ("foto_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "about_settings_equipo_grupos_miembros" ADD CONSTRAINT "about_settings_equipo_grupos_miembros_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_settings_equipo_grupos"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_settings_equipo_grupos_miembros_locales" ADD CONSTRAINT "about_settings_equipo_grupos_miembros_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_settings_equipo_grupos_miembros"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_settings_equipo_grupos" ADD CONSTRAINT "about_settings_equipo_grupos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_settings_equipo_grupos_locales" ADD CONSTRAINT "about_settings_equipo_grupos_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_settings_equipo_grupos"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_settings_aliados" ADD CONSTRAINT "about_settings_aliados_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "about_settings_aliados" ADD CONSTRAINT "about_settings_aliados_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_settings" ADD CONSTRAINT "about_settings_hero_imagen_id_media_id_fk" FOREIGN KEY ("hero_imagen_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "about_settings_locales" ADD CONSTRAINT "about_settings_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_settings"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "hero_slides__order_idx" ON "hero_slides" USING btree ("_order");
  CREATE INDEX "hero_slides_image_idx" ON "hero_slides" USING btree ("image_id");
  CREATE INDEX "hero_slides_updated_at_idx" ON "hero_slides" USING btree ("updated_at");
  CREATE INDEX "hero_slides_created_at_idx" ON "hero_slides" USING btree ("created_at");
  CREATE UNIQUE INDEX "hero_slides_locales_locale_parent_id_unique" ON "hero_slides_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "history_image_idx" ON "history" USING btree ("image_id");
  CREATE INDEX "history_updated_at_idx" ON "history" USING btree ("updated_at");
  CREATE INDEX "history_created_at_idx" ON "history" USING btree ("created_at");
  CREATE UNIQUE INDEX "history_locales_locale_parent_id_unique" ON "history_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "whoweare_image_idx" ON "whoweare" USING btree ("image_id");
  CREATE INDEX "whoweare_updated_at_idx" ON "whoweare" USING btree ("updated_at");
  CREATE INDEX "whoweare_created_at_idx" ON "whoweare" USING btree ("created_at");
  CREATE UNIQUE INDEX "whoweare_locales_locale_parent_id_unique" ON "whoweare_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "our_values_values_points_order_idx" ON "our_values_values_points" USING btree ("_order");
  CREATE INDEX "our_values_values_points_parent_id_idx" ON "our_values_values_points" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "our_values_values_points_locales_locale_parent_id_unique" ON "our_values_values_points_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "our_values_values_order_idx" ON "our_values_values" USING btree ("_order");
  CREATE INDEX "our_values_values_parent_id_idx" ON "our_values_values" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "our_values_values_locales_locale_parent_id_unique" ON "our_values_values_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "our_values_image_idx" ON "our_values" USING btree ("image_id");
  CREATE INDEX "our_values_updated_at_idx" ON "our_values" USING btree ("updated_at");
  CREATE INDEX "our_values_created_at_idx" ON "our_values" USING btree ("created_at");
  CREATE UNIQUE INDEX "our_values_locales_locale_parent_id_unique" ON "our_values_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "footer_social_links_order_idx" ON "footer_social_links" USING btree ("_order");
  CREATE INDEX "footer_social_links_parent_id_idx" ON "footer_social_links" USING btree ("_parent_id");
  CREATE INDEX "footer_link_columns_links_order_idx" ON "footer_link_columns_links" USING btree ("_order");
  CREATE INDEX "footer_link_columns_links_parent_id_idx" ON "footer_link_columns_links" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "footer_link_columns_links_locales_locale_parent_id_unique" ON "footer_link_columns_links_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "footer_link_columns_order_idx" ON "footer_link_columns" USING btree ("_order");
  CREATE INDEX "footer_link_columns_parent_id_idx" ON "footer_link_columns" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "footer_link_columns_locales_locale_parent_id_unique" ON "footer_link_columns_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "footer_updated_at_idx" ON "footer" USING btree ("updated_at");
  CREATE INDEX "footer_created_at_idx" ON "footer" USING btree ("created_at");
  CREATE UNIQUE INDEX "footer_locales_locale_parent_id_unique" ON "footer_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "product_categories__order_idx" ON "product_categories" USING btree ("_order");
  CREATE INDEX "product_categories_updated_at_idx" ON "product_categories" USING btree ("updated_at");
  CREATE INDEX "product_categories_created_at_idx" ON "product_categories" USING btree ("created_at");
  CREATE UNIQUE INDEX "product_categories_locales_locale_parent_id_unique" ON "product_categories_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "products_presentations_order_idx" ON "products_presentations" USING btree ("_order");
  CREATE INDEX "products_presentations_parent_id_idx" ON "products_presentations" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "products_presentations_locales_locale_parent_id_unique" ON "products_presentations_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "products__order_idx" ON "products" USING btree ("_order");
  CREATE INDEX "products_category_idx" ON "products" USING btree ("category_id");
  CREATE INDEX "products_image_idx" ON "products" USING btree ("image_id");
  CREATE INDEX "products_updated_at_idx" ON "products" USING btree ("updated_at");
  CREATE INDEX "products_created_at_idx" ON "products" USING btree ("created_at");
  CREATE UNIQUE INDEX "products_locales_locale_parent_id_unique" ON "products_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "vigilance_slides_order_idx" ON "vigilance_slides" USING btree ("_order");
  CREATE INDEX "vigilance_slides_parent_id_idx" ON "vigilance_slides" USING btree ("_parent_id");
  CREATE INDEX "vigilance_slides_image_idx" ON "vigilance_slides" USING btree ("image_id");
  CREATE UNIQUE INDEX "vigilance_slides_locales_locale_parent_id_unique" ON "vigilance_slides_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "vigilance_info_blocks_items_order_idx" ON "vigilance_info_blocks_items" USING btree ("_order");
  CREATE INDEX "vigilance_info_blocks_items_parent_id_idx" ON "vigilance_info_blocks_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "vigilance_info_blocks_items_locales_locale_parent_id_unique" ON "vigilance_info_blocks_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "vigilance_info_blocks_order_idx" ON "vigilance_info_blocks" USING btree ("_order");
  CREATE INDEX "vigilance_info_blocks_parent_id_idx" ON "vigilance_info_blocks" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "vigilance_info_blocks_locales_locale_parent_id_unique" ON "vigilance_info_blocks_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "vigilance_updated_at_idx" ON "vigilance" USING btree ("updated_at");
  CREATE INDEX "vigilance_created_at_idx" ON "vigilance" USING btree ("created_at");
  CREATE INDEX "contact_submissions_updated_at_idx" ON "contact_submissions" USING btree ("updated_at");
  CREATE INDEX "contact_submissions_created_at_idx" ON "contact_submissions" USING btree ("created_at");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_hero_slides_id_idx" ON "payload_locked_documents_rels" USING btree ("hero_slides_id");
  CREATE INDEX "payload_locked_documents_rels_history_id_idx" ON "payload_locked_documents_rels" USING btree ("history_id");
  CREATE INDEX "payload_locked_documents_rels_whoweare_id_idx" ON "payload_locked_documents_rels" USING btree ("whoweare_id");
  CREATE INDEX "payload_locked_documents_rels_our_values_id_idx" ON "payload_locked_documents_rels" USING btree ("our_values_id");
  CREATE INDEX "payload_locked_documents_rels_footer_id_idx" ON "payload_locked_documents_rels" USING btree ("footer_id");
  CREATE INDEX "payload_locked_documents_rels_product_categories_id_idx" ON "payload_locked_documents_rels" USING btree ("product_categories_id");
  CREATE INDEX "payload_locked_documents_rels_products_id_idx" ON "payload_locked_documents_rels" USING btree ("products_id");
  CREATE INDEX "payload_locked_documents_rels_vigilance_id_idx" ON "payload_locked_documents_rels" USING btree ("vigilance_id");
  CREATE INDEX "payload_locked_documents_rels_contact_submissions_id_idx" ON "payload_locked_documents_rels" USING btree ("contact_submissions_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "home_settings_hero_slides_order_idx" ON "home_settings_hero_slides" USING btree ("_order");
  CREATE INDEX "home_settings_hero_slides_parent_id_idx" ON "home_settings_hero_slides" USING btree ("_parent_id");
  CREATE INDEX "home_settings_hero_slides_image_idx" ON "home_settings_hero_slides" USING btree ("image_id");
  CREATE UNIQUE INDEX "home_settings_hero_slides_locales_locale_parent_id_unique" ON "home_settings_hero_slides_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "home_settings_values_points_order_idx" ON "home_settings_values_points" USING btree ("_order");
  CREATE INDEX "home_settings_values_points_parent_id_idx" ON "home_settings_values_points" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "home_settings_values_points_locales_locale_parent_id_unique" ON "home_settings_values_points_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "home_settings_values_order_idx" ON "home_settings_values" USING btree ("_order");
  CREATE INDEX "home_settings_values_parent_id_idx" ON "home_settings_values" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "home_settings_values_locales_locale_parent_id_unique" ON "home_settings_values_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "home_settings_hist_image_idx" ON "home_settings" USING btree ("hist_image_id");
  CREATE INDEX "home_settings_who_image_idx" ON "home_settings" USING btree ("who_image_id");
  CREATE INDEX "home_settings_val_image_idx" ON "home_settings" USING btree ("val_image_id");
  CREATE UNIQUE INDEX "home_settings_locales_locale_parent_id_unique" ON "home_settings_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "nav_settings_items_order_idx" ON "nav_settings_items" USING btree ("_order");
  CREATE INDEX "nav_settings_items_parent_id_idx" ON "nav_settings_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "nav_settings_items_locales_locale_parent_id_unique" ON "nav_settings_items_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "nav_settings_locales_locale_parent_id_unique" ON "nav_settings_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "contact_settings_opciones_contacto_order_idx" ON "contact_settings_opciones_contacto" USING btree ("_order");
  CREATE INDEX "contact_settings_opciones_contacto_parent_id_idx" ON "contact_settings_opciones_contacto" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "contact_settings_opciones_contacto_locales_locale_parent_id_" ON "contact_settings_opciones_contacto_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "contact_settings_locales_locale_parent_id_unique" ON "contact_settings_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "about_settings_hero_stats_order_idx" ON "about_settings_hero_stats" USING btree ("_order");
  CREATE INDEX "about_settings_hero_stats_parent_id_idx" ON "about_settings_hero_stats" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "about_settings_hero_stats_locales_locale_parent_id_unique" ON "about_settings_hero_stats_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "about_settings_equipo_grupos_miembros_order_idx" ON "about_settings_equipo_grupos_miembros" USING btree ("_order");
  CREATE INDEX "about_settings_equipo_grupos_miembros_parent_id_idx" ON "about_settings_equipo_grupos_miembros" USING btree ("_parent_id");
  CREATE INDEX "about_settings_equipo_grupos_miembros_foto_idx" ON "about_settings_equipo_grupos_miembros" USING btree ("foto_id");
  CREATE UNIQUE INDEX "about_settings_equipo_grupos_miembros_locales_locale_parent_" ON "about_settings_equipo_grupos_miembros_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "about_settings_equipo_grupos_order_idx" ON "about_settings_equipo_grupos" USING btree ("_order");
  CREATE INDEX "about_settings_equipo_grupos_parent_id_idx" ON "about_settings_equipo_grupos" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "about_settings_equipo_grupos_locales_locale_parent_id_unique" ON "about_settings_equipo_grupos_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "about_settings_aliados_order_idx" ON "about_settings_aliados" USING btree ("_order");
  CREATE INDEX "about_settings_aliados_parent_id_idx" ON "about_settings_aliados" USING btree ("_parent_id");
  CREATE INDEX "about_settings_aliados_logo_idx" ON "about_settings_aliados" USING btree ("logo_id");
  CREATE INDEX "about_settings_hero_imagen_idx" ON "about_settings" USING btree ("hero_imagen_id");
  CREATE UNIQUE INDEX "about_settings_locales_locale_parent_id_unique" ON "about_settings_locales" USING btree ("_locale","_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "hero_slides" CASCADE;
  DROP TABLE "hero_slides_locales" CASCADE;
  DROP TABLE "history" CASCADE;
  DROP TABLE "history_locales" CASCADE;
  DROP TABLE "whoweare" CASCADE;
  DROP TABLE "whoweare_locales" CASCADE;
  DROP TABLE "our_values_values_points" CASCADE;
  DROP TABLE "our_values_values_points_locales" CASCADE;
  DROP TABLE "our_values_values" CASCADE;
  DROP TABLE "our_values_values_locales" CASCADE;
  DROP TABLE "our_values" CASCADE;
  DROP TABLE "our_values_locales" CASCADE;
  DROP TABLE "footer_social_links" CASCADE;
  DROP TABLE "footer_link_columns_links" CASCADE;
  DROP TABLE "footer_link_columns_links_locales" CASCADE;
  DROP TABLE "footer_link_columns" CASCADE;
  DROP TABLE "footer_link_columns_locales" CASCADE;
  DROP TABLE "footer" CASCADE;
  DROP TABLE "footer_locales" CASCADE;
  DROP TABLE "product_categories" CASCADE;
  DROP TABLE "product_categories_locales" CASCADE;
  DROP TABLE "products_presentations" CASCADE;
  DROP TABLE "products_presentations_locales" CASCADE;
  DROP TABLE "products" CASCADE;
  DROP TABLE "products_locales" CASCADE;
  DROP TABLE "vigilance_slides" CASCADE;
  DROP TABLE "vigilance_slides_locales" CASCADE;
  DROP TABLE "vigilance_info_blocks_items" CASCADE;
  DROP TABLE "vigilance_info_blocks_items_locales" CASCADE;
  DROP TABLE "vigilance_info_blocks" CASCADE;
  DROP TABLE "vigilance_info_blocks_locales" CASCADE;
  DROP TABLE "vigilance" CASCADE;
  DROP TABLE "contact_submissions" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "home_settings_hero_slides" CASCADE;
  DROP TABLE "home_settings_hero_slides_locales" CASCADE;
  DROP TABLE "home_settings_values_points" CASCADE;
  DROP TABLE "home_settings_values_points_locales" CASCADE;
  DROP TABLE "home_settings_values" CASCADE;
  DROP TABLE "home_settings_values_locales" CASCADE;
  DROP TABLE "home_settings" CASCADE;
  DROP TABLE "home_settings_locales" CASCADE;
  DROP TABLE "nav_settings_items" CASCADE;
  DROP TABLE "nav_settings_items_locales" CASCADE;
  DROP TABLE "nav_settings" CASCADE;
  DROP TABLE "nav_settings_locales" CASCADE;
  DROP TABLE "contact_settings_opciones_contacto" CASCADE;
  DROP TABLE "contact_settings_opciones_contacto_locales" CASCADE;
  DROP TABLE "contact_settings" CASCADE;
  DROP TABLE "contact_settings_locales" CASCADE;
  DROP TABLE "about_settings_hero_stats" CASCADE;
  DROP TABLE "about_settings_hero_stats_locales" CASCADE;
  DROP TABLE "about_settings_equipo_grupos_miembros" CASCADE;
  DROP TABLE "about_settings_equipo_grupos_miembros_locales" CASCADE;
  DROP TABLE "about_settings_equipo_grupos" CASCADE;
  DROP TABLE "about_settings_equipo_grupos_locales" CASCADE;
  DROP TABLE "about_settings_aliados" CASCADE;
  DROP TABLE "about_settings" CASCADE;
  DROP TABLE "about_settings_locales" CASCADE;
  DROP TYPE "public"."_locales";
  DROP TYPE "public"."enum_our_values_values_icon";
  DROP TYPE "public"."enum_products_status";
  DROP TYPE "public"."enum_vigilance_info_blocks_style";
  DROP TYPE "public"."enum_contact_submissions_forma_contacto";
  DROP TYPE "public"."enum_contact_submissions_estado";
  DROP TYPE "public"."enum_home_settings_values_icon";
  DROP TYPE "public"."enum_contact_settings_opciones_contacto_valor";`)
}
