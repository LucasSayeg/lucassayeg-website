import { MigrateUpArgs, MigrateDownArgs, sql } from "@payloadcms/db-vercel-postgres";

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "home_como_ajuda_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"body" varchar NOT NULL
  );
  
  DROP TABLE "home_como_ajuda_groups_words" CASCADE;
  DROP TABLE "home_como_ajuda_groups" CASCADE;
  ALTER TABLE "home_como_ajuda_items" ADD CONSTRAINT "home_como_ajuda_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_como_ajuda"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "home_como_ajuda_items_order_idx" ON "home_como_ajuda_items" USING btree ("_order");
  CREATE INDEX "home_como_ajuda_items_parent_id_idx" ON "home_como_ajuda_items" USING btree ("_parent_id");
  ALTER TABLE "home_como_ajuda" DROP COLUMN "closing";`);
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "home_como_ajuda_groups_words" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL
  );
  
  CREATE TABLE "home_como_ajuda_groups" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL
  );
  
  DROP TABLE "home_como_ajuda_items" CASCADE;
  ALTER TABLE "home_como_ajuda" ADD COLUMN "closing" varchar NOT NULL;
  ALTER TABLE "home_como_ajuda_groups_words" ADD CONSTRAINT "home_como_ajuda_groups_words_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_como_ajuda_groups"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_como_ajuda_groups" ADD CONSTRAINT "home_como_ajuda_groups_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_como_ajuda"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "home_como_ajuda_groups_words_order_idx" ON "home_como_ajuda_groups_words" USING btree ("_order");
  CREATE INDEX "home_como_ajuda_groups_words_parent_id_idx" ON "home_como_ajuda_groups_words" USING btree ("_parent_id");
  CREATE INDEX "home_como_ajuda_groups_order_idx" ON "home_como_ajuda_groups" USING btree ("_order");
  CREATE INDEX "home_como_ajuda_groups_parent_id_idx" ON "home_como_ajuda_groups" USING btree ("_parent_id");`);
}
