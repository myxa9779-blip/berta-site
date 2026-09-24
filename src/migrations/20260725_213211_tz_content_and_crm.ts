import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`projects_gallery\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`projects\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`projects_gallery_order_idx\` ON \`projects_gallery\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`projects_gallery_parent_id_idx\` ON \`projects_gallery\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`projects_gallery_image_idx\` ON \`projects_gallery\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`_projects_v_version_gallery\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`_uuid\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_projects_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_projects_v_version_gallery_order_idx\` ON \`_projects_v_version_gallery\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_projects_v_version_gallery_parent_id_idx\` ON \`_projects_v_version_gallery\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_projects_v_version_gallery_image_idx\` ON \`_projects_v_version_gallery\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`offices_services\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`offices\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`offices_services_order_idx\` ON \`offices_services\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`offices_services_parent_id_idx\` ON \`offices_services\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`other_products_applications\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`other_products\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`other_products_applications_order_idx\` ON \`other_products_applications\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`other_products_applications_parent_id_idx\` ON \`other_products_applications\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`other_products\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`slug\` text NOT NULL,
  	\`description\` text NOT NULL,
  	\`image_id\` integer,
  	\`legacy_image\` text,
  	\`order\` numeric DEFAULT 0,
  	\`published\` integer DEFAULT true,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`other_products_slug_idx\` ON \`other_products\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`other_products_image_idx\` ON \`other_products\` (\`image_id\`);`)
  await db.run(sql`CREATE INDEX \`other_products_updated_at_idx\` ON \`other_products\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`other_products_created_at_idx\` ON \`other_products\` (\`created_at\`);`)
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_homepage\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`eyebrow\` text DEFAULT 'Собственная системная линейка',
  	\`title\` text DEFAULT 'Прежде чем заказать окна — сравните предложение БЕРТЫ.',
  	\`description\` text DEFAULT 'Собственное производство. Честные цены. Более 20 лет опыта и более 1 000 000 установленных окон. Получите предложение и убедитесь сами.',
  	\`hero_image_id\` integer,
  	\`legacy_hero_image\` text,
  	\`promo_banner_enabled\` integer DEFAULT true,
  	\`promo_banner_image_id\` integer,
  	\`promo_banner_legacy_image\` text DEFAULT '/images/promo-decor-launch-50.png',
  	\`promo_banner_discount\` text DEFAULT '−50%',
  	\`promo_banner_title\` text DEFAULT 'Декор изделия',
  	\`promo_banner_subtitle\` text DEFAULT 'Только на момент запуска системы',
  	\`promo_banner_deadline\` text DEFAULT 'До конца августа',
  	\`promo_banner_expires_at\` text,
  	\`promo_banner_footnote\` text DEFAULT 'Скидка 50% предоставляется на услугу ламинации',
  	\`promo_banner_alt\` text DEFAULT 'Скидка 50% на декор изделия до конца августа',
  	\`promo_banner_href\` text DEFAULT '#contact',
  	\`primary_action_label\` text,
  	\`primary_action_href\` text,
  	\`secondary_action_label\` text,
  	\`secondary_action_href\` text,
  	\`section_titles_systems\` text,
  	\`section_titles_solutions\` text,
  	\`section_titles_projects\` text,
  	\`section_titles_contact\` text,
  	\`seeded\` integer DEFAULT false,
  	\`_status\` text DEFAULT 'draft',
  	\`updated_at\` text,
  	\`created_at\` text,
  	FOREIGN KEY (\`hero_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`promo_banner_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`INSERT INTO \`__new_homepage\`("id", "eyebrow", "title", "description", "hero_image_id", "legacy_hero_image", "promo_banner_enabled", "promo_banner_image_id", "promo_banner_legacy_image", "promo_banner_discount", "promo_banner_title", "promo_banner_subtitle", "promo_banner_deadline", "promo_banner_expires_at", "promo_banner_footnote", "promo_banner_alt", "promo_banner_href", "primary_action_label", "primary_action_href", "secondary_action_label", "secondary_action_href", "section_titles_systems", "section_titles_solutions", "section_titles_projects", "section_titles_contact", "seeded", "_status", "updated_at", "created_at") SELECT "id", "eyebrow", "title", "description", "hero_image_id", "legacy_hero_image", "promo_banner_enabled", "promo_banner_image_id", "promo_banner_legacy_image", '−50%', 'Декор изделия', 'Только на момент запуска системы', 'До конца августа', NULL, 'Скидка 50% предоставляется на услугу ламинации', "promo_banner_alt", "promo_banner_href", "primary_action_label", "primary_action_href", "secondary_action_label", "secondary_action_href", "section_titles_systems", "section_titles_solutions", "section_titles_projects", "section_titles_contact", "seeded", "_status", "updated_at", "created_at" FROM \`homepage\`;`)
  await db.run(sql`DROP TABLE \`homepage\`;`)
  await db.run(sql`ALTER TABLE \`__new_homepage\` RENAME TO \`homepage\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`CREATE INDEX \`homepage_hero_image_idx\` ON \`homepage\` (\`hero_image_id\`);`)
  await db.run(sql`CREATE INDEX \`homepage_promo_banner_promo_banner_image_idx\` ON \`homepage\` (\`promo_banner_image_id\`);`)
  await db.run(sql`CREATE INDEX \`homepage__status_idx\` ON \`homepage\` (\`_status\`);`)
  await db.run(sql`CREATE TABLE \`__new__homepage_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`version_eyebrow\` text DEFAULT 'Собственная системная линейка',
  	\`version_title\` text DEFAULT 'Прежде чем заказать окна — сравните предложение БЕРТЫ.',
  	\`version_description\` text DEFAULT 'Собственное производство. Честные цены. Более 20 лет опыта и более 1 000 000 установленных окон. Получите предложение и убедитесь сами.',
  	\`version_hero_image_id\` integer,
  	\`version_legacy_hero_image\` text,
  	\`version_promo_banner_enabled\` integer DEFAULT true,
  	\`version_promo_banner_image_id\` integer,
  	\`version_promo_banner_legacy_image\` text DEFAULT '/images/promo-decor-launch-50.png',
  	\`version_promo_banner_discount\` text DEFAULT '−50%',
  	\`version_promo_banner_title\` text DEFAULT 'Декор изделия',
  	\`version_promo_banner_subtitle\` text DEFAULT 'Только на момент запуска системы',
  	\`version_promo_banner_deadline\` text DEFAULT 'До конца августа',
  	\`version_promo_banner_expires_at\` text,
  	\`version_promo_banner_footnote\` text DEFAULT 'Скидка 50% предоставляется на услугу ламинации',
  	\`version_promo_banner_alt\` text DEFAULT 'Скидка 50% на декор изделия до конца августа',
  	\`version_promo_banner_href\` text DEFAULT '#contact',
  	\`version_primary_action_label\` text,
  	\`version_primary_action_href\` text,
  	\`version_secondary_action_label\` text,
  	\`version_secondary_action_href\` text,
  	\`version_section_titles_systems\` text,
  	\`version_section_titles_solutions\` text,
  	\`version_section_titles_projects\` text,
  	\`version_section_titles_contact\` text,
  	\`version_seeded\` integer DEFAULT false,
  	\`version__status\` text DEFAULT 'draft',
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`latest\` integer,
  	FOREIGN KEY (\`version_hero_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_promo_banner_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`INSERT INTO \`__new__homepage_v\`("id", "version_eyebrow", "version_title", "version_description", "version_hero_image_id", "version_legacy_hero_image", "version_promo_banner_enabled", "version_promo_banner_image_id", "version_promo_banner_legacy_image", "version_promo_banner_discount", "version_promo_banner_title", "version_promo_banner_subtitle", "version_promo_banner_deadline", "version_promo_banner_expires_at", "version_promo_banner_footnote", "version_promo_banner_alt", "version_promo_banner_href", "version_primary_action_label", "version_primary_action_href", "version_secondary_action_label", "version_secondary_action_href", "version_section_titles_systems", "version_section_titles_solutions", "version_section_titles_projects", "version_section_titles_contact", "version_seeded", "version__status", "version_updated_at", "version_created_at", "created_at", "updated_at", "latest") SELECT "id", "version_eyebrow", "version_title", "version_description", "version_hero_image_id", "version_legacy_hero_image", "version_promo_banner_enabled", "version_promo_banner_image_id", "version_promo_banner_legacy_image", '−50%', 'Декор изделия', 'Только на момент запуска системы', 'До конца августа', NULL, 'Скидка 50% предоставляется на услугу ламинации', "version_promo_banner_alt", "version_promo_banner_href", "version_primary_action_label", "version_primary_action_href", "version_secondary_action_label", "version_secondary_action_href", "version_section_titles_systems", "version_section_titles_solutions", "version_section_titles_projects", "version_section_titles_contact", "version_seeded", "version__status", "version_updated_at", "version_created_at", "created_at", "updated_at", "latest" FROM \`_homepage_v\`;`)
  await db.run(sql`DROP TABLE \`_homepage_v\`;`)
  await db.run(sql`ALTER TABLE \`__new__homepage_v\` RENAME TO \`_homepage_v\`;`)
  await db.run(sql`CREATE INDEX \`_homepage_v_version_version_hero_image_idx\` ON \`_homepage_v\` (\`version_hero_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_homepage_v_version_promo_banner_version_promo_banner_im_idx\` ON \`_homepage_v\` (\`version_promo_banner_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_homepage_v_version_version__status_idx\` ON \`_homepage_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_homepage_v_created_at_idx\` ON \`_homepage_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_homepage_v_updated_at_idx\` ON \`_homepage_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_homepage_v_latest_idx\` ON \`_homepage_v\` (\`latest\`);`)
  await db.run(sql`ALTER TABLE \`projects\` ADD \`city\` text;`)
  await db.run(sql`ALTER TABLE \`projects\` ADD \`is_real\` integer DEFAULT true;`)
  await db.run(sql`ALTER TABLE \`_projects_v\` ADD \`version_city\` text;`)
  await db.run(sql`ALTER TABLE \`_projects_v\` ADD \`version_is_real\` integer DEFAULT true;`)
  await db.run(sql`ALTER TABLE \`documents\` ADD \`version\` text;`)
  await db.run(sql`ALTER TABLE \`documents\` ADD \`document_date\` text;`)
  await db.run(sql`ALTER TABLE \`documents\` ADD \`description\` text;`)
  await db.run(sql`ALTER TABLE \`documents\` ADD \`order\` numeric DEFAULT 0;`)
  await db.run(sql`ALTER TABLE \`_documents_v\` ADD \`version_version\` text;`)
  await db.run(sql`ALTER TABLE \`_documents_v\` ADD \`version_document_date\` text;`)
  await db.run(sql`ALTER TABLE \`_documents_v\` ADD \`version_description\` text;`)
  await db.run(sql`ALTER TABLE \`_documents_v\` ADD \`version_order\` numeric DEFAULT 0;`)
  await db.run(sql`ALTER TABLE \`offices\` ADD \`working_hours\` text;`)
  await db.run(sql`ALTER TABLE \`offices\` ADD \`route_url\` text;`)
  await db.run(sql`ALTER TABLE \`offices\` ADD \`photo_id\` integer REFERENCES media(id);`)
  await db.run(sql`ALTER TABLE \`offices\` ADD \`card_style\` text DEFAULT 'light';`)
  await db.run(sql`CREATE INDEX \`offices_photo_idx\` ON \`offices\` (\`photo_id\`);`)
  await db.run(sql`ALTER TABLE \`leads\` ADD \`city\` text NOT NULL;`)
  await db.run(sql`ALTER TABLE \`leads\` ADD \`source_page\` text NOT NULL;`)
  await db.run(sql`ALTER TABLE \`leads\` ADD \`crm_status\` text DEFAULT 'disabled' NOT NULL;`)
  await db.run(sql`ALTER TABLE \`leads\` ADD \`crm_attempts\` numeric DEFAULT 0;`)
  await db.run(sql`ALTER TABLE \`leads\` ADD \`crm_response\` text;`)
  await db.run(sql`ALTER TABLE \`leads\` ADD \`crm_updated_at\` text;`)
  await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD \`other_products_id\` integer REFERENCES other_products(id);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_other_products_id_idx\` ON \`payload_locked_documents_rels\` (\`other_products_id\`);`)
  await db.run(sql`ALTER TABLE \`site_settings\` ADD \`crm_enabled\` integer DEFAULT false;`)
  await db.run(sql`ALTER TABLE \`site_settings\` ADD \`crm_mode\` text DEFAULT 'webhook';`)
  await db.run(sql`ALTER TABLE \`site_settings\` ADD \`crm_endpoint\` text;`)
  await db.run(sql`UPDATE \`site_settings_navigation\` SET \`label\` = 'Продукты БЕРТА', \`href\` = '/products' WHERE \`href\` = '/systems';`)
  await db.run(sql`DELETE FROM \`site_settings_navigation\` WHERE \`href\` IN ('/architects', '/partners');`)
  await db.run(sql`UPDATE \`systems\` SET \`name\` = 'БЕРТА AS63', \`code\` = 'БЕРТА AS63' WHERE \`slug\` = 'as63';`)
  await db.run(sql`UPDATE \`systems\` SET \`name\` = 'БЕРТА F50', \`code\` = 'БЕРТА F50' WHERE \`slug\` IN ('sr50', 'f50');`)
  await db.run(sql`UPDATE \`systems\` SET \`name\` = 'БЕРТА AS70', \`code\` = 'БЕРТА AS70', \`status_label\` = 'Скоро в продаже' WHERE \`slug\` = 'as70';`)
  await db.run(sql`UPDATE \`systems\` SET \`name\` = 'БЕРТА AS45', \`code\` = 'БЕРТА AS45', \`status_label\` = 'Скоро в продаже' WHERE \`slug\` = 'as45';`)
  await db.run(sql`UPDATE \`projects\` SET \`is_real\` = false;`)
  await db.run(sql`UPDATE \`projects\` SET \`system\` = REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(\`system\`, 'SR50', 'БЕРТА F50'), 'AS63', 'БЕРТА AS63'), 'AS70', 'БЕРТА AS70'), 'AS45', 'БЕРТА AS45'), 'БЕРТА БЕРТА', 'БЕРТА');`)
  await db.run(sql`UPDATE \`documents\` SET \`system\` = REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(\`system\`, 'SR50', 'БЕРТА F50'), 'AS63', 'БЕРТА AS63'), 'AS70', 'БЕРТА AS70'), 'AS45', 'БЕРТА AS45'), 'БЕРТА БЕРТА', 'БЕРТА');`)
  await db.run(sql`UPDATE \`solutions_systems\` SET \`name\` = REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(\`name\`, 'SR50', 'БЕРТА F50'), 'AS63', 'БЕРТА AS63'), 'AS70', 'БЕРТА AS70'), 'AS45', 'БЕРТА AS45'), 'БЕРТА БЕРТА', 'БЕРТА');`)
  await db.run(sql`UPDATE \`homepage\` SET \`promo_banner_discount\` = '−50%', \`promo_banner_title\` = 'Декор изделия', \`promo_banner_subtitle\` = 'Только на момент запуска системы', \`promo_banner_deadline\` = 'До конца августа', \`promo_banner_footnote\` = 'Скидка 50% предоставляется на услугу ламинации';`)
  await db.run(sql`DELETE FROM \`homepage_facts\`;`)
  await db.run(sql`INSERT INTO \`homepage_facts\` (\`_order\`, \`_parent_id\`, \`id\`, \`value\`, \`label\`) SELECT 0, \`id\`, 'tz-experience', 'С 2005 года', 'Опыт производства' FROM \`homepage\` LIMIT 1;`)
  await db.run(sql`INSERT INTO \`homepage_facts\` (\`_order\`, \`_parent_id\`, \`id\`, \`value\`, \`label\`) SELECT 1, \`id\`, 'tz-windows', 'Более 1 000 000', 'Установленных окон' FROM \`homepage\` LIMIT 1;`)
  await db.run(sql`INSERT INTO \`homepage_facts\` (\`_order\`, \`_parent_id\`, \`id\`, \`value\`, \`label\`) SELECT 2, \`id\`, 'tz-offices', '14', 'Офисов на Северном Кавказе' FROM \`homepage\` LIMIT 1;`)
  await db.run(sql`INSERT INTO \`homepage_facts\` (\`_order\`, \`_parent_id\`, \`id\`, \`value\`, \`label\`) SELECT 3, \`id\`, 'tz-systems', '4', 'Системы в линейке БЕРТА' FROM \`homepage\` LIMIT 1;`)
  await db.run(sql`DELETE FROM \`pages\` WHERE \`slug\` IN ('architects', 'partners');`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`projects_gallery\`;`)
  await db.run(sql`DROP TABLE \`_projects_v_version_gallery\`;`)
  await db.run(sql`DROP TABLE \`offices_services\`;`)
  await db.run(sql`DROP TABLE \`other_products_applications\`;`)
  await db.run(sql`DROP TABLE \`other_products\`;`)
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_offices\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`region\` text NOT NULL,
  	\`city\` text NOT NULL,
  	\`address\` text NOT NULL,
  	\`phone\` text NOT NULL,
  	\`order\` numeric DEFAULT 0,
  	\`published\` integer DEFAULT true,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`INSERT INTO \`__new_offices\`("id", "region", "city", "address", "phone", "order", "published", "updated_at", "created_at") SELECT "id", "region", "city", "address", "phone", "order", "published", "updated_at", "created_at" FROM \`offices\`;`)
  await db.run(sql`DROP TABLE \`offices\`;`)
  await db.run(sql`ALTER TABLE \`__new_offices\` RENAME TO \`offices\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`CREATE INDEX \`offices_updated_at_idx\` ON \`offices\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`offices_created_at_idx\` ON \`offices\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`__new_payload_locked_documents_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`admins_id\` integer,
  	\`media_id\` integer,
  	\`pages_id\` integer,
  	\`systems_id\` integer,
  	\`solutions_id\` integer,
  	\`projects_id\` integer,
  	\`documents_id\` integer,
  	\`offices_id\` integer,
  	\`leads_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_locked_documents\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`admins_id\`) REFERENCES \`admins\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`pages_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`systems_id\`) REFERENCES \`systems\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`solutions_id\`) REFERENCES \`solutions\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`projects_id\`) REFERENCES \`projects\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`documents_id\`) REFERENCES \`documents\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`offices_id\`) REFERENCES \`offices\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`leads_id\`) REFERENCES \`leads\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_payload_locked_documents_rels\`("id", "order", "parent_id", "path", "admins_id", "media_id", "pages_id", "systems_id", "solutions_id", "projects_id", "documents_id", "offices_id", "leads_id") SELECT "id", "order", "parent_id", "path", "admins_id", "media_id", "pages_id", "systems_id", "solutions_id", "projects_id", "documents_id", "offices_id", "leads_id" FROM \`payload_locked_documents_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_locked_documents_rels\`;`)
  await db.run(sql`ALTER TABLE \`__new_payload_locked_documents_rels\` RENAME TO \`payload_locked_documents_rels\`;`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_order_idx\` ON \`payload_locked_documents_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_parent_idx\` ON \`payload_locked_documents_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_path_idx\` ON \`payload_locked_documents_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_admins_id_idx\` ON \`payload_locked_documents_rels\` (\`admins_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_media_id_idx\` ON \`payload_locked_documents_rels\` (\`media_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_pages_id_idx\` ON \`payload_locked_documents_rels\` (\`pages_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_systems_id_idx\` ON \`payload_locked_documents_rels\` (\`systems_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_solutions_id_idx\` ON \`payload_locked_documents_rels\` (\`solutions_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_projects_id_idx\` ON \`payload_locked_documents_rels\` (\`projects_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_documents_id_idx\` ON \`payload_locked_documents_rels\` (\`documents_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_offices_id_idx\` ON \`payload_locked_documents_rels\` (\`offices_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_leads_id_idx\` ON \`payload_locked_documents_rels\` (\`leads_id\`);`)
  await db.run(sql`CREATE TABLE \`__new_homepage\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`eyebrow\` text DEFAULT 'Собственная системная линейка',
  	\`title\` text DEFAULT 'Декор изделия по обычной цене',
  	\`description\` text,
  	\`hero_image_id\` integer,
  	\`legacy_hero_image\` text,
  	\`primary_action_label\` text,
  	\`primary_action_href\` text,
  	\`secondary_action_label\` text,
  	\`secondary_action_href\` text,
  	\`section_titles_systems\` text,
  	\`section_titles_solutions\` text,
  	\`section_titles_projects\` text,
  	\`section_titles_contact\` text,
  	\`seeded\` integer DEFAULT false,
  	\`_status\` text DEFAULT 'draft',
  	\`updated_at\` text,
  	\`created_at\` text,
  	FOREIGN KEY (\`hero_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`INSERT INTO \`__new_homepage\`("id", "eyebrow", "title", "description", "hero_image_id", "legacy_hero_image", "primary_action_label", "primary_action_href", "secondary_action_label", "secondary_action_href", "section_titles_systems", "section_titles_solutions", "section_titles_projects", "section_titles_contact", "seeded", "_status", "updated_at", "created_at") SELECT "id", "eyebrow", "title", "description", "hero_image_id", "legacy_hero_image", "primary_action_label", "primary_action_href", "secondary_action_label", "secondary_action_href", "section_titles_systems", "section_titles_solutions", "section_titles_projects", "section_titles_contact", "seeded", "_status", "updated_at", "created_at" FROM \`homepage\`;`)
  await db.run(sql`DROP TABLE \`homepage\`;`)
  await db.run(sql`ALTER TABLE \`__new_homepage\` RENAME TO \`homepage\`;`)
  await db.run(sql`CREATE INDEX \`homepage_hero_image_idx\` ON \`homepage\` (\`hero_image_id\`);`)
  await db.run(sql`CREATE INDEX \`homepage__status_idx\` ON \`homepage\` (\`_status\`);`)
  await db.run(sql`CREATE TABLE \`__new__homepage_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`version_eyebrow\` text DEFAULT 'Собственная системная линейка',
  	\`version_title\` text DEFAULT 'Декор изделия по обычной цене',
  	\`version_description\` text,
  	\`version_hero_image_id\` integer,
  	\`version_legacy_hero_image\` text,
  	\`version_primary_action_label\` text,
  	\`version_primary_action_href\` text,
  	\`version_secondary_action_label\` text,
  	\`version_secondary_action_href\` text,
  	\`version_section_titles_systems\` text,
  	\`version_section_titles_solutions\` text,
  	\`version_section_titles_projects\` text,
  	\`version_section_titles_contact\` text,
  	\`version_seeded\` integer DEFAULT false,
  	\`version__status\` text DEFAULT 'draft',
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`latest\` integer,
  	FOREIGN KEY (\`version_hero_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`INSERT INTO \`__new__homepage_v\`("id", "version_eyebrow", "version_title", "version_description", "version_hero_image_id", "version_legacy_hero_image", "version_primary_action_label", "version_primary_action_href", "version_secondary_action_label", "version_secondary_action_href", "version_section_titles_systems", "version_section_titles_solutions", "version_section_titles_projects", "version_section_titles_contact", "version_seeded", "version__status", "version_updated_at", "version_created_at", "created_at", "updated_at", "latest") SELECT "id", "version_eyebrow", "version_title", "version_description", "version_hero_image_id", "version_legacy_hero_image", "version_primary_action_label", "version_primary_action_href", "version_secondary_action_label", "version_secondary_action_href", "version_section_titles_systems", "version_section_titles_solutions", "version_section_titles_projects", "version_section_titles_contact", "version_seeded", "version__status", "version_updated_at", "version_created_at", "created_at", "updated_at", "latest" FROM \`_homepage_v\`;`)
  await db.run(sql`DROP TABLE \`_homepage_v\`;`)
  await db.run(sql`ALTER TABLE \`__new__homepage_v\` RENAME TO \`_homepage_v\`;`)
  await db.run(sql`CREATE INDEX \`_homepage_v_version_version_hero_image_idx\` ON \`_homepage_v\` (\`version_hero_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_homepage_v_version_version__status_idx\` ON \`_homepage_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_homepage_v_created_at_idx\` ON \`_homepage_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_homepage_v_updated_at_idx\` ON \`_homepage_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_homepage_v_latest_idx\` ON \`_homepage_v\` (\`latest\`);`)
  await db.run(sql`ALTER TABLE \`projects\` DROP COLUMN \`city\`;`)
  await db.run(sql`ALTER TABLE \`projects\` DROP COLUMN \`is_real\`;`)
  await db.run(sql`ALTER TABLE \`_projects_v\` DROP COLUMN \`version_city\`;`)
  await db.run(sql`ALTER TABLE \`_projects_v\` DROP COLUMN \`version_is_real\`;`)
  await db.run(sql`ALTER TABLE \`documents\` DROP COLUMN \`version\`;`)
  await db.run(sql`ALTER TABLE \`documents\` DROP COLUMN \`document_date\`;`)
  await db.run(sql`ALTER TABLE \`documents\` DROP COLUMN \`description\`;`)
  await db.run(sql`ALTER TABLE \`documents\` DROP COLUMN \`order\`;`)
  await db.run(sql`ALTER TABLE \`_documents_v\` DROP COLUMN \`version_version\`;`)
  await db.run(sql`ALTER TABLE \`_documents_v\` DROP COLUMN \`version_document_date\`;`)
  await db.run(sql`ALTER TABLE \`_documents_v\` DROP COLUMN \`version_description\`;`)
  await db.run(sql`ALTER TABLE \`_documents_v\` DROP COLUMN \`version_order\`;`)
  await db.run(sql`ALTER TABLE \`leads\` DROP COLUMN \`city\`;`)
  await db.run(sql`ALTER TABLE \`leads\` DROP COLUMN \`source_page\`;`)
  await db.run(sql`ALTER TABLE \`leads\` DROP COLUMN \`crm_status\`;`)
  await db.run(sql`ALTER TABLE \`leads\` DROP COLUMN \`crm_attempts\`;`)
  await db.run(sql`ALTER TABLE \`leads\` DROP COLUMN \`crm_response\`;`)
  await db.run(sql`ALTER TABLE \`leads\` DROP COLUMN \`crm_updated_at\`;`)
  await db.run(sql`ALTER TABLE \`site_settings\` DROP COLUMN \`crm_enabled\`;`)
  await db.run(sql`ALTER TABLE \`site_settings\` DROP COLUMN \`crm_mode\`;`)
  await db.run(sql`ALTER TABLE \`site_settings\` DROP COLUMN \`crm_endpoint\`;`)
}
