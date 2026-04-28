import { MigrateUpArgs, MigrateDownArgs, sql } from "@payloadcms/db-vercel-postgres";

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_home_layout_sections_key" AS ENUM('hero', 'comoAjuda', 'sobre', 'servicos', 'faq', 'contato');
  CREATE TABLE "site_info" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"short_mark" varchar NOT NULL,
  	"slogan" varchar NOT NULL,
  	"region" varchar NOT NULL,
  	"address" varchar NOT NULL,
  	"crp" varchar NOT NULL,
  	"email" varchar NOT NULL,
  	"whatsapp_number" varchar NOT NULL,
  	"whatsapp_prefill" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "home_layout_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"key" "enum_home_layout_sections_key" NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"nav_label" varchar
  );
  
  CREATE TABLE "home_layout" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "home_hero" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar NOT NULL,
  	"sub" varchar NOT NULL,
  	"modality_online" varchar NOT NULL,
  	"modality_presencial" varchar NOT NULL,
  	"cta_whatsapp" varchar NOT NULL,
  	"cta" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
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
  
  CREATE TABLE "home_como_ajuda" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"intro" varchar NOT NULL,
  	"closing" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "home_sobre" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"intro" varchar NOT NULL,
  	"body" jsonb NOT NULL,
  	"cta_label" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "home_servicos_items_areas" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL
  );
  
  CREATE TABLE "home_servicos_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"sublabel" varchar NOT NULL,
  	"framing" varchar NOT NULL
  );
  
  CREATE TABLE "home_servicos" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "home_faq_items_answer" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"body" varchar NOT NULL
  );
  
  CREATE TABLE "home_faq_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar NOT NULL
  );
  
  CREATE TABLE "home_faq" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "home_contato" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar NOT NULL,
  	"invite" varchar NOT NULL,
  	"whatsapp_prompt" varchar NOT NULL,
  	"whatsapp_label" varchar NOT NULL,
  	"crisis" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "home_layout_sections" ADD CONSTRAINT "home_layout_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_layout"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_como_ajuda_groups_words" ADD CONSTRAINT "home_como_ajuda_groups_words_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_como_ajuda_groups"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_como_ajuda_groups" ADD CONSTRAINT "home_como_ajuda_groups_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_como_ajuda"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_servicos_items_areas" ADD CONSTRAINT "home_servicos_items_areas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_servicos_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_servicos_items" ADD CONSTRAINT "home_servicos_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_servicos"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_faq_items_answer" ADD CONSTRAINT "home_faq_items_answer_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_faq_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_faq_items" ADD CONSTRAINT "home_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_faq"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "home_layout_sections_order_idx" ON "home_layout_sections" USING btree ("_order");
  CREATE INDEX "home_layout_sections_parent_id_idx" ON "home_layout_sections" USING btree ("_parent_id");
  CREATE INDEX "home_como_ajuda_groups_words_order_idx" ON "home_como_ajuda_groups_words" USING btree ("_order");
  CREATE INDEX "home_como_ajuda_groups_words_parent_id_idx" ON "home_como_ajuda_groups_words" USING btree ("_parent_id");
  CREATE INDEX "home_como_ajuda_groups_order_idx" ON "home_como_ajuda_groups" USING btree ("_order");
  CREATE INDEX "home_como_ajuda_groups_parent_id_idx" ON "home_como_ajuda_groups" USING btree ("_parent_id");
  CREATE INDEX "home_servicos_items_areas_order_idx" ON "home_servicos_items_areas" USING btree ("_order");
  CREATE INDEX "home_servicos_items_areas_parent_id_idx" ON "home_servicos_items_areas" USING btree ("_parent_id");
  CREATE INDEX "home_servicos_items_order_idx" ON "home_servicos_items" USING btree ("_order");
  CREATE INDEX "home_servicos_items_parent_id_idx" ON "home_servicos_items" USING btree ("_parent_id");
  CREATE INDEX "home_faq_items_answer_order_idx" ON "home_faq_items_answer" USING btree ("_order");
  CREATE INDEX "home_faq_items_answer_parent_id_idx" ON "home_faq_items_answer" USING btree ("_parent_id");
  CREATE INDEX "home_faq_items_order_idx" ON "home_faq_items" USING btree ("_order");
  CREATE INDEX "home_faq_items_parent_id_idx" ON "home_faq_items" USING btree ("_parent_id");`);
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "site_info" CASCADE;
  DROP TABLE "home_layout_sections" CASCADE;
  DROP TABLE "home_layout" CASCADE;
  DROP TABLE "home_hero" CASCADE;
  DROP TABLE "home_como_ajuda_groups_words" CASCADE;
  DROP TABLE "home_como_ajuda_groups" CASCADE;
  DROP TABLE "home_como_ajuda" CASCADE;
  DROP TABLE "home_sobre" CASCADE;
  DROP TABLE "home_servicos_items_areas" CASCADE;
  DROP TABLE "home_servicos_items" CASCADE;
  DROP TABLE "home_servicos" CASCADE;
  DROP TABLE "home_faq_items_answer" CASCADE;
  DROP TABLE "home_faq_items" CASCADE;
  DROP TABLE "home_faq" CASCADE;
  DROP TABLE "home_contato" CASCADE;
  DROP TYPE "public"."enum_home_layout_sections_key";`);
}
