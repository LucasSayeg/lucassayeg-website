import { MigrateUpArgs, MigrateDownArgs, sql } from "@payloadcms/db-vercel-postgres";

/*
  Adds the SiteInfo logo upload (+ alt). The auto-generated version of this
  migration also re-emitted the illustration/hero statements from the two
  snapshot-less hand-written migrations (20260511, 20260519) — those are
  already applied, so this file keeps only the logo delta. The committed
  .json snapshot is current again as of this migration.
*/

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
  ALTER TABLE "site_info" ADD COLUMN IF NOT EXISTS "logo_id" integer;
  ALTER TABLE "site_info" ADD COLUMN IF NOT EXISTS "logo_alt" varchar;
  DO $$ BEGIN
    ALTER TABLE "site_info" ADD CONSTRAINT "site_info_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  CREATE INDEX IF NOT EXISTS "site_info_logo_idx" ON "site_info" USING btree ("logo_id");`);
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
  ALTER TABLE "site_info" DROP CONSTRAINT IF EXISTS "site_info_logo_id_media_id_fk";
  DROP INDEX IF EXISTS "site_info_logo_idx";
  ALTER TABLE "site_info" DROP COLUMN IF EXISTS "logo_id";
  ALTER TABLE "site_info" DROP COLUMN IF EXISTS "logo_alt";`);
}
