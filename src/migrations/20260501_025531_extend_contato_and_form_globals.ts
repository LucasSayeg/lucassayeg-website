import { MigrateUpArgs, MigrateDownArgs, sql } from "@payloadcms/db-vercel-postgres";

/*
  Extend `home_contato` with the right-rail blocks (response time, WhatsApp
  block label, sigilo) and add the new `home_contact_form` global. Adds
  the contato columns as nullable, backfills from the canonical pt-BR
  fallback strings, then enforces NOT NULL — so any existing CMS row is
  preserved without operator intervention.
*/

const RESPONSE_TIME_LABEL = "Tempo de resposta";
const RESPONSE_TIME_BODY = "Respondo pessoalmente, em geral em até um dia útil.";
const WHATSAPP_BLOCK_LABEL = "WhatsApp";
const SIGILO_LABEL = "Sigilo";
const SIGILO_BODY = "Apenas eu recebo. Tratadas com sigilo.";

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    CREATE TABLE "home_contact_form" (
      "id" serial PRIMARY KEY NOT NULL,
      "aria_label" varchar NOT NULL,
      "name_label" varchar NOT NULL,
      "name_placeholder" varchar NOT NULL,
      "name_valid_hint" varchar NOT NULL,
      "email_label" varchar NOT NULL,
      "email_placeholder" varchar NOT NULL,
      "email_valid_hint" varchar NOT NULL,
      "message_label" varchar NOT NULL,
      "message_placeholder" varchar NOT NULL,
      "message_valid_hint" varchar NOT NULL,
      "disclaimer" varchar NOT NULL,
      "required_hint" varchar NOT NULL,
      "submit_label" varchar NOT NULL,
      "submit_loading_label" varchar NOT NULL,
      "success_heading" varchar NOT NULL,
      "success_body" varchar NOT NULL,
      "success_whatsapp_prompt" varchar NOT NULL,
      "success_whatsapp_label" varchar NOT NULL,
      "success_reset_label" varchar NOT NULL,
      "updated_at" timestamp(3) with time zone,
      "created_at" timestamp(3) with time zone
    );
  `);

  await db.execute(sql`ALTER TABLE "home_contato" ADD COLUMN "response_time_label" varchar;`);
  await db.execute(sql`ALTER TABLE "home_contato" ADD COLUMN "response_time_body" varchar;`);
  await db.execute(sql`ALTER TABLE "home_contato" ADD COLUMN "whatsapp_block_label" varchar;`);
  await db.execute(sql`ALTER TABLE "home_contato" ADD COLUMN "sigilo_label" varchar;`);
  await db.execute(sql`ALTER TABLE "home_contato" ADD COLUMN "sigilo_body" varchar;`);

  await db.execute(sql`
    UPDATE "home_contato"
    SET
      "response_time_label" = ${RESPONSE_TIME_LABEL},
      "response_time_body" = ${RESPONSE_TIME_BODY},
      "whatsapp_block_label" = ${WHATSAPP_BLOCK_LABEL},
      "sigilo_label" = ${SIGILO_LABEL},
      "sigilo_body" = ${SIGILO_BODY};
  `);

  await db.execute(
    sql`ALTER TABLE "home_contato" ALTER COLUMN "response_time_label" SET NOT NULL;`,
  );
  await db.execute(sql`ALTER TABLE "home_contato" ALTER COLUMN "response_time_body" SET NOT NULL;`);
  await db.execute(
    sql`ALTER TABLE "home_contato" ALTER COLUMN "whatsapp_block_label" SET NOT NULL;`,
  );
  await db.execute(sql`ALTER TABLE "home_contato" ALTER COLUMN "sigilo_label" SET NOT NULL;`);
  await db.execute(sql`ALTER TABLE "home_contato" ALTER COLUMN "sigilo_body" SET NOT NULL;`);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`DROP TABLE "home_contact_form" CASCADE;`);
  await db.execute(sql`ALTER TABLE "home_contato" DROP COLUMN "response_time_label";`);
  await db.execute(sql`ALTER TABLE "home_contato" DROP COLUMN "response_time_body";`);
  await db.execute(sql`ALTER TABLE "home_contato" DROP COLUMN "whatsapp_block_label";`);
  await db.execute(sql`ALTER TABLE "home_contato" DROP COLUMN "sigilo_label";`);
  await db.execute(sql`ALTER TABLE "home_contato" DROP COLUMN "sigilo_body";`);
}
