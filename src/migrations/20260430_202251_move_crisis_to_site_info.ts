import { MigrateUpArgs, MigrateDownArgs, sql } from "@payloadcms/db-vercel-postgres";

/*
  Move the crisis line (CVV/SAMU) from `home_contato` to `site_info` so it can
  render in the site-wide footer instead of only on the contact section.
  Backfills from the existing `home_contato.crisis` value (both tables hold a
  single global row) before enforcing NOT NULL on the new column, so any copy
  the practitioner has edited in the CMS is preserved.
*/

const FALLBACK_CRISIS =
  "Em caso de emergência ou risco imediato, ligue 188 (CVV) ou 192 (SAMU). Esses serviços oferecem escuta e atendimento 24 horas.";

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`ALTER TABLE "site_info" ADD COLUMN "crisis" varchar;`);
  await db.execute(sql`
    UPDATE "site_info" si
    SET "crisis" = COALESCE(
      (SELECT hc."crisis" FROM "home_contato" hc ORDER BY hc."id" LIMIT 1),
      ${FALLBACK_CRISIS}
    );
  `);
  await db.execute(sql`ALTER TABLE "site_info" ALTER COLUMN "crisis" SET NOT NULL;`);
  await db.execute(sql`ALTER TABLE "home_contato" DROP COLUMN "crisis";`);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`ALTER TABLE "home_contato" ADD COLUMN "crisis" varchar;`);
  await db.execute(sql`
    UPDATE "home_contato" hc
    SET "crisis" = COALESCE(
      (SELECT si."crisis" FROM "site_info" si ORDER BY si."id" LIMIT 1),
      ${FALLBACK_CRISIS}
    );
  `);
  await db.execute(sql`ALTER TABLE "home_contato" ALTER COLUMN "crisis" SET NOT NULL;`);
  await db.execute(sql`ALTER TABLE "site_info" DROP COLUMN "crisis";`);
}
