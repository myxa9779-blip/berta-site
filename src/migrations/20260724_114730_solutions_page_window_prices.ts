import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`solutions_page_window_prices_cards\` (
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
  await db.run(sql`CREATE INDEX \`solutions_page_window_prices_cards_order_idx\` ON \`solutions_page_window_prices_cards\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`solutions_page_window_prices_cards_parent_id_idx\` ON \`solutions_page_window_prices_cards\` (\`_parent_id\`);`)
  await db.run(sql`ALTER TABLE \`solutions_page\` ADD \`window_prices_eyebrow\` text DEFAULT 'Тёплые алюминиевые окна';`)
  await db.run(sql`ALTER TABLE \`solutions_page\` ADD \`window_prices_title\` text DEFAULT 'Оконные решения для дома и бизнеса';`)
  await db.run(sql`ALTER TABLE \`solutions_page\` ADD \`window_prices_description\` text DEFAULT 'Варианты тёплых окон на базе системы БЕРТА AS63. Укажите размеры и конфигурацию — подготовим точный расчёт для вашего проекта.';`)
  await db.run(sql`ALTER TABLE \`solutions_page\` ADD \`window_prices_cta_label\` text DEFAULT 'Рассчитать окна';`)
  await db.run(sql`ALTER TABLE \`solutions_page\` ADD \`window_prices_cta_href\` text DEFAULT '/#contact';`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`solutions_page_window_prices_cards\`;`)
  await db.run(sql`ALTER TABLE \`solutions_page\` DROP COLUMN \`window_prices_eyebrow\`;`)
  await db.run(sql`ALTER TABLE \`solutions_page\` DROP COLUMN \`window_prices_title\`;`)
  await db.run(sql`ALTER TABLE \`solutions_page\` DROP COLUMN \`window_prices_description\`;`)
  await db.run(sql`ALTER TABLE \`solutions_page\` DROP COLUMN \`window_prices_cta_label\`;`)
  await db.run(sql`ALTER TABLE \`solutions_page\` DROP COLUMN \`window_prices_cta_href\`;`)
}
