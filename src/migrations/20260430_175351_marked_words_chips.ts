import { MigrateUpArgs, MigrateDownArgs, sql } from "@payloadcms/db-vercel-postgres";

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "home_hero_quick_pick_topics" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL
  );
  
  ALTER TABLE "site_info" ADD COLUMN "whatsapp_topic_template" varchar;
  ALTER TABLE "home_hero" ADD COLUMN "quick_pick_intro" varchar;
  ALTER TABLE "home_hero_quick_pick_topics" ADD CONSTRAINT "home_hero_quick_pick_topics_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_hero"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "home_hero_quick_pick_topics_order_idx" ON "home_hero_quick_pick_topics" USING btree ("_order");
  CREATE INDEX "home_hero_quick_pick_topics_parent_id_idx" ON "home_hero_quick_pick_topics" USING btree ("_parent_id");`);
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "home_hero_quick_pick_topics" CASCADE;
  ALTER TABLE "site_info" DROP COLUMN "whatsapp_topic_template";
  ALTER TABLE "home_hero" DROP COLUMN "quick_pick_intro";`);
}
