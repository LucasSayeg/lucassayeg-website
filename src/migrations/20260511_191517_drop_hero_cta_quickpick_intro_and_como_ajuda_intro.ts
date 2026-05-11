import { MigrateUpArgs, MigrateDownArgs, sql } from "@payloadcms/db-vercel-postgres";

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
  ALTER TABLE "home_hero" DROP COLUMN IF EXISTS "cta";
  ALTER TABLE "home_hero" DROP COLUMN IF EXISTS "quick_pick_intro";
  ALTER TABLE "home_como_ajuda" DROP COLUMN IF EXISTS "intro";`);
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
  ALTER TABLE "home_hero" ADD COLUMN "cta" varchar NOT NULL;
  ALTER TABLE "home_hero" ADD COLUMN "quick_pick_intro" varchar;
  ALTER TABLE "home_como_ajuda" ADD COLUMN "intro" varchar NOT NULL;`);
}
