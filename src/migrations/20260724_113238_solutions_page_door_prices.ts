import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`solutions_page_door_prices_cards\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`note\` text NOT NULL,
  	\`old_price\` text,
  	\`price\` text NOT NULL,
  	\`variant\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`solutions_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`solutions_page_door_prices_cards_order_idx\` ON \`solutions_page_door_prices_cards\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`solutions_page_door_prices_cards_parent_id_idx\` ON \`solutions_page_door_prices_cards\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`solutions_page\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`door_prices_eyebrow\` text DEFAULT 'Тёплые входные двери',
  	\`door_prices_title\` text DEFAULT 'Четыре конфигурации для вашего проекта',
  	\`door_prices_description\` text DEFAULT 'Ориентировочная стоимость конструкций на базе тёплой системы БЕРТА AS63. Точный расчёт зависит от размеров, заполнения и комплектации.',
  	\`door_prices_cta_label\` text DEFAULT 'Получить точный расчёт',
  	\`door_prices_cta_href\` text DEFAULT '/#contact',
  	\`seeded\` integer DEFAULT false,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`solutions_page_door_prices_cards\`;`)
  await db.run(sql`DROP TABLE \`solutions_page\`;`)
}
