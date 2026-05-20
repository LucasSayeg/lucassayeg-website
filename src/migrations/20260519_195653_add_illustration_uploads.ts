import { MigrateUpArgs, MigrateDownArgs, sql } from "@payloadcms/db-vercel-postgres";

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
  ALTER TABLE "home_sobre" ADD COLUMN IF NOT EXISTS "illustration_id" integer;
  ALTER TABLE "home_sobre" ADD COLUMN IF NOT EXISTS "illustration_alt" varchar;
  DO $$ BEGIN
    ALTER TABLE "home_sobre" ADD CONSTRAINT "home_sobre_illustration_id_media_id_fk" FOREIGN KEY ("illustration_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  CREATE INDEX IF NOT EXISTS "home_sobre_illustration_idx" ON "home_sobre" USING btree ("illustration_id");

  ALTER TABLE "home_servicos_items" ADD COLUMN IF NOT EXISTS "illustration_id" integer;
  ALTER TABLE "home_servicos_items" ADD COLUMN IF NOT EXISTS "illustration_alt" varchar;
  DO $$ BEGIN
    ALTER TABLE "home_servicos_items" ADD CONSTRAINT "home_servicos_items_illustration_id_media_id_fk" FOREIGN KEY ("illustration_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  CREATE INDEX IF NOT EXISTS "home_servicos_items_illustration_idx" ON "home_servicos_items" USING btree ("illustration_id");`);
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
  ALTER TABLE "home_servicos_items" DROP CONSTRAINT IF EXISTS "home_servicos_items_illustration_id_media_id_fk";
  DROP INDEX IF EXISTS "home_servicos_items_illustration_idx";
  ALTER TABLE "home_servicos_items" DROP COLUMN IF EXISTS "illustration_id";
  ALTER TABLE "home_servicos_items" DROP COLUMN IF EXISTS "illustration_alt";

  ALTER TABLE "home_sobre" DROP CONSTRAINT IF EXISTS "home_sobre_illustration_id_media_id_fk";
  DROP INDEX IF EXISTS "home_sobre_illustration_idx";
  ALTER TABLE "home_sobre" DROP COLUMN IF EXISTS "illustration_id";
  ALTER TABLE "home_sobre" DROP COLUMN IF EXISTS "illustration_alt";`);
}
