import { MigrateUpArgs, MigrateDownArgs, sql } from "@payloadcms/db-vercel-postgres";

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
  DROP TABLE IF EXISTS "settings_social" CASCADE;
  DROP TABLE IF EXISTS "settings" CASCADE;
  ALTER TABLE "home_servicos" ADD COLUMN IF NOT EXISTS "subtitle" varchar NOT NULL;
  ALTER TABLE "home_faq" ADD COLUMN IF NOT EXISTS "subtitle" varchar NOT NULL;
  ALTER TABLE "site_info" DROP COLUMN IF EXISTS "whatsapp_topic_template";
  ALTER TABLE "home_contact_form" DROP COLUMN IF EXISTS "aria_label";
  ALTER TABLE "home_contact_form" DROP COLUMN IF EXISTS "name_label";
  ALTER TABLE "home_contact_form" DROP COLUMN IF EXISTS "email_label";
  ALTER TABLE "home_contact_form" DROP COLUMN IF EXISTS "message_label";
  ALTER TABLE "home_contact_form" DROP COLUMN IF EXISTS "required_hint";
  ALTER TABLE "home_contact_form" DROP COLUMN IF EXISTS "submit_label";
  ALTER TABLE "home_contact_form" DROP COLUMN IF EXISTS "submit_loading_label";
  ALTER TABLE "home_contact_form" DROP COLUMN IF EXISTS "success_whatsapp_label";
  ALTER TABLE "home_contact_form" DROP COLUMN IF EXISTS "success_reset_label";`);
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "settings_social" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE "settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"site_name" varchar NOT NULL,
  	"description" varchar,
  	"og_image_id" integer,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "site_info" ADD COLUMN "whatsapp_topic_template" varchar;
  ALTER TABLE "home_contact_form" ADD COLUMN "aria_label" varchar NOT NULL;
  ALTER TABLE "home_contact_form" ADD COLUMN "name_label" varchar NOT NULL;
  ALTER TABLE "home_contact_form" ADD COLUMN "email_label" varchar NOT NULL;
  ALTER TABLE "home_contact_form" ADD COLUMN "message_label" varchar NOT NULL;
  ALTER TABLE "home_contact_form" ADD COLUMN "required_hint" varchar NOT NULL;
  ALTER TABLE "home_contact_form" ADD COLUMN "submit_label" varchar NOT NULL;
  ALTER TABLE "home_contact_form" ADD COLUMN "submit_loading_label" varchar NOT NULL;
  ALTER TABLE "home_contact_form" ADD COLUMN "success_whatsapp_label" varchar NOT NULL;
  ALTER TABLE "home_contact_form" ADD COLUMN "success_reset_label" varchar NOT NULL;
  ALTER TABLE "settings_social" ADD CONSTRAINT "settings_social_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "settings" ADD CONSTRAINT "settings_og_image_id_media_id_fk" FOREIGN KEY ("og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "settings_social_order_idx" ON "settings_social" USING btree ("_order");
  CREATE INDEX "settings_social_parent_id_idx" ON "settings_social" USING btree ("_parent_id");
  CREATE INDEX "settings_og_image_idx" ON "settings" USING btree ("og_image_id");
  ALTER TABLE "home_servicos" DROP COLUMN "subtitle";
  ALTER TABLE "home_faq" DROP COLUMN "subtitle";`);
}
