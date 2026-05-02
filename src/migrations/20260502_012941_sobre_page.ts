import { MigrateUpArgs, MigrateDownArgs, sql } from "@payloadcms/db-vercel-postgres";

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE IF NOT EXISTS "sobre_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"lede" varchar NOT NULL,
  	"body" jsonb NOT NULL,
  	"bottom_cta_heading" varchar NOT NULL,
  	"bottom_cta_body" varchar NOT NULL,
  	"bottom_cta_whatsapp_label" varchar NOT NULL,
  	"bottom_cta_form_label" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );

  ALTER TABLE "site_info" ADD COLUMN IF NOT EXISTS "portrait_id" integer;
  ALTER TABLE "site_info" ADD COLUMN IF NOT EXISTS "portrait_alt" varchar;
  DO $$ BEGIN
    ALTER TABLE "site_info" ADD CONSTRAINT "site_info_portrait_id_media_id_fk" FOREIGN KEY ("portrait_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  CREATE INDEX IF NOT EXISTS "site_info_portrait_idx" ON "site_info" USING btree ("portrait_id");`);
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "sobre_page" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "sobre_page" CASCADE;
  ALTER TABLE "site_info" DROP CONSTRAINT "site_info_portrait_id_media_id_fk";
  
  DROP INDEX "site_info_portrait_idx";
  ALTER TABLE "site_info" DROP COLUMN "portrait_id";
  ALTER TABLE "site_info" DROP COLUMN "portrait_alt";`);
}
