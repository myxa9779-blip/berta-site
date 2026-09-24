/* eslint-disable @typescript-eslint/no-unused-vars */
import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`admins_sessions\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`created_at\` text,
  	\`expires_at\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`admins\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`admins_sessions_order_idx\` ON \`admins_sessions\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`admins_sessions_parent_id_idx\` ON \`admins_sessions\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`admins\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`role\` text DEFAULT 'administrator' NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`email\` text NOT NULL,
  	\`reset_password_token\` text,
  	\`reset_password_expiration\` text,
  	\`salt\` text,
  	\`hash\` text,
  	\`login_attempts\` numeric DEFAULT 0,
  	\`lock_until\` text
  );
  `)
  await db.run(sql`CREATE INDEX \`admins_updated_at_idx\` ON \`admins\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`admins_created_at_idx\` ON \`admins\` (\`created_at\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`admins_email_idx\` ON \`admins\` (\`email\`);`)
  await db.run(sql`CREATE TABLE \`media\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`alt\` text,
  	\`caption\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`url\` text,
  	\`thumbnail_u_r_l\` text,
  	\`filename\` text,
  	\`mime_type\` text,
  	\`filesize\` numeric,
  	\`width\` numeric,
  	\`height\` numeric,
  	\`focal_x\` numeric,
  	\`focal_y\` numeric,
  	\`sizes_thumbnail_url\` text,
  	\`sizes_thumbnail_width\` numeric,
  	\`sizes_thumbnail_height\` numeric,
  	\`sizes_thumbnail_mime_type\` text,
  	\`sizes_thumbnail_filesize\` numeric,
  	\`sizes_thumbnail_filename\` text,
  	\`sizes_card_url\` text,
  	\`sizes_card_width\` numeric,
  	\`sizes_card_height\` numeric,
  	\`sizes_card_mime_type\` text,
  	\`sizes_card_filesize\` numeric,
  	\`sizes_card_filename\` text,
  	\`sizes_wide_url\` text,
  	\`sizes_wide_width\` numeric,
  	\`sizes_wide_height\` numeric,
  	\`sizes_wide_mime_type\` text,
  	\`sizes_wide_filesize\` numeric,
  	\`sizes_wide_filename\` text
  );
  `)
  await db.run(sql`CREATE INDEX \`media_updated_at_idx\` ON \`media\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`media_created_at_idx\` ON \`media\` (\`created_at\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`media_filename_idx\` ON \`media\` (\`filename\`);`)
  await db.run(sql`CREATE INDEX \`media_sizes_thumbnail_sizes_thumbnail_filename_idx\` ON \`media\` (\`sizes_thumbnail_filename\`);`)
  await db.run(sql`CREATE INDEX \`media_sizes_card_sizes_card_filename_idx\` ON \`media\` (\`sizes_card_filename\`);`)
  await db.run(sql`CREATE INDEX \`media_sizes_wide_sizes_wide_filename_idx\` ON \`media\` (\`sizes_wide_filename\`);`)
  await db.run(sql`CREATE TABLE \`pages\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`slug\` text,
  	\`eyebrow\` text,
  	\`hero_title\` text,
  	\`hero_description\` text,
  	\`hero_image_id\` integer,
  	\`body\` text,
  	\`seo_title\` text,
  	\`seo_description\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`_status\` text DEFAULT 'draft',
  	FOREIGN KEY (\`hero_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_slug_idx\` ON \`pages\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`pages_hero_image_idx\` ON \`pages\` (\`hero_image_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_updated_at_idx\` ON \`pages\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`pages_created_at_idx\` ON \`pages\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`pages__status_idx\` ON \`pages\` (\`_status\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`parent_id\` integer,
  	\`version_title\` text,
  	\`version_slug\` text,
  	\`version_eyebrow\` text,
  	\`version_hero_title\` text,
  	\`version_hero_description\` text,
  	\`version_hero_image_id\` integer,
  	\`version_body\` text,
  	\`version_seo_title\` text,
  	\`version_seo_description\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`version__status\` text DEFAULT 'draft',
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`latest\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_hero_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_parent_idx\` ON \`_pages_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_version_version_slug_idx\` ON \`_pages_v\` (\`version_slug\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_version_version_hero_image_idx\` ON \`_pages_v\` (\`version_hero_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_version_version_updated_at_idx\` ON \`_pages_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_version_version_created_at_idx\` ON \`_pages_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_version_version__status_idx\` ON \`_pages_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_created_at_idx\` ON \`_pages_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_updated_at_idx\` ON \`_pages_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_latest_idx\` ON \`_pages_v\` (\`latest\`);`)
  await db.run(sql`CREATE TABLE \`systems_audience\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`text\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`systems\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`systems_audience_order_idx\` ON \`systems_audience\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`systems_audience_parent_id_idx\` ON \`systems_audience\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`systems_applications\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`text\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`systems\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`systems_applications_order_idx\` ON \`systems_applications\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`systems_applications_parent_id_idx\` ON \`systems_applications\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`systems_construction_types\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`text\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`systems\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`systems_construction_types_order_idx\` ON \`systems_construction_types\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`systems_construction_types_parent_id_idx\` ON \`systems_construction_types\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`systems_benefits\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`description\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`systems\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`systems_benefits_order_idx\` ON \`systems_benefits\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`systems_benefits_parent_id_idx\` ON \`systems_benefits\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`systems_gallery\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`legacy_image\` text,
  	\`alt\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`systems\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`systems_gallery_order_idx\` ON \`systems_gallery\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`systems_gallery_parent_id_idx\` ON \`systems_gallery\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`systems_gallery_image_idx\` ON \`systems_gallery\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`systems_specifications\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text,
  	\`value\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`systems\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`systems_specifications_order_idx\` ON \`systems_specifications\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`systems_specifications_parent_id_idx\` ON \`systems_specifications\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`systems_faqs\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`question\` text,
  	\`answer\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`systems\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`systems_faqs_order_idx\` ON \`systems_faqs\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`systems_faqs_parent_id_idx\` ON \`systems_faqs\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`systems\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`slug\` text,
  	\`code\` text,
  	\`category\` text,
  	\`category_label\` text,
  	\`status\` text,
  	\`status_label\` text,
  	\`tagline\` text,
  	\`summary\` text,
  	\`image_id\` integer,
  	\`legacy_image\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`_status\` text DEFAULT 'draft',
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`systems_slug_idx\` ON \`systems\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`systems_image_idx\` ON \`systems\` (\`image_id\`);`)
  await db.run(sql`CREATE INDEX \`systems_updated_at_idx\` ON \`systems\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`systems_created_at_idx\` ON \`systems\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`systems__status_idx\` ON \`systems\` (\`_status\`);`)
  await db.run(sql`CREATE TABLE \`_systems_v_version_audience\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`text\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_systems_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_systems_v_version_audience_order_idx\` ON \`_systems_v_version_audience\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_systems_v_version_audience_parent_id_idx\` ON \`_systems_v_version_audience\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_systems_v_version_applications\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`text\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_systems_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_systems_v_version_applications_order_idx\` ON \`_systems_v_version_applications\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_systems_v_version_applications_parent_id_idx\` ON \`_systems_v_version_applications\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_systems_v_version_construction_types\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`text\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_systems_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_systems_v_version_construction_types_order_idx\` ON \`_systems_v_version_construction_types\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_systems_v_version_construction_types_parent_id_idx\` ON \`_systems_v_version_construction_types\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_systems_v_version_benefits\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`description\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_systems_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_systems_v_version_benefits_order_idx\` ON \`_systems_v_version_benefits\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_systems_v_version_benefits_parent_id_idx\` ON \`_systems_v_version_benefits\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_systems_v_version_gallery\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`legacy_image\` text,
  	\`alt\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_systems_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_systems_v_version_gallery_order_idx\` ON \`_systems_v_version_gallery\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_systems_v_version_gallery_parent_id_idx\` ON \`_systems_v_version_gallery\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_systems_v_version_gallery_image_idx\` ON \`_systems_v_version_gallery\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`_systems_v_version_specifications\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`label\` text,
  	\`value\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_systems_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_systems_v_version_specifications_order_idx\` ON \`_systems_v_version_specifications\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_systems_v_version_specifications_parent_id_idx\` ON \`_systems_v_version_specifications\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_systems_v_version_faqs\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`question\` text,
  	\`answer\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_systems_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_systems_v_version_faqs_order_idx\` ON \`_systems_v_version_faqs\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_systems_v_version_faqs_parent_id_idx\` ON \`_systems_v_version_faqs\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_systems_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`parent_id\` integer,
  	\`version_name\` text,
  	\`version_slug\` text,
  	\`version_code\` text,
  	\`version_category\` text,
  	\`version_category_label\` text,
  	\`version_status\` text,
  	\`version_status_label\` text,
  	\`version_tagline\` text,
  	\`version_summary\` text,
  	\`version_image_id\` integer,
  	\`version_legacy_image\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`version__status\` text DEFAULT 'draft',
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`latest\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`systems\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_systems_v_parent_idx\` ON \`_systems_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_systems_v_version_version_slug_idx\` ON \`_systems_v\` (\`version_slug\`);`)
  await db.run(sql`CREATE INDEX \`_systems_v_version_version_image_idx\` ON \`_systems_v\` (\`version_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_systems_v_version_version_updated_at_idx\` ON \`_systems_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_systems_v_version_version_created_at_idx\` ON \`_systems_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_systems_v_version_version__status_idx\` ON \`_systems_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_systems_v_created_at_idx\` ON \`_systems_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_systems_v_updated_at_idx\` ON \`_systems_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_systems_v_latest_idx\` ON \`_systems_v\` (\`latest\`);`)
  await db.run(sql`CREATE TABLE \`solutions_systems\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`solutions\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`solutions_systems_order_idx\` ON \`solutions_systems\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`solutions_systems_parent_id_idx\` ON \`solutions_systems\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`solutions_objects\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`solutions\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`solutions_objects_order_idx\` ON \`solutions_objects\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`solutions_objects_parent_id_idx\` ON \`solutions_objects\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`solutions\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`slug\` text,
  	\`description\` text,
  	\`order\` numeric DEFAULT 0,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`_status\` text DEFAULT 'draft'
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`solutions_slug_idx\` ON \`solutions\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`solutions_updated_at_idx\` ON \`solutions\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`solutions_created_at_idx\` ON \`solutions\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`solutions__status_idx\` ON \`solutions\` (\`_status\`);`)
  await db.run(sql`CREATE TABLE \`_solutions_v_version_systems\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_solutions_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_solutions_v_version_systems_order_idx\` ON \`_solutions_v_version_systems\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_solutions_v_version_systems_parent_id_idx\` ON \`_solutions_v_version_systems\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_solutions_v_version_objects\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_solutions_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_solutions_v_version_objects_order_idx\` ON \`_solutions_v_version_objects\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_solutions_v_version_objects_parent_id_idx\` ON \`_solutions_v_version_objects\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_solutions_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`parent_id\` integer,
  	\`version_title\` text,
  	\`version_slug\` text,
  	\`version_description\` text,
  	\`version_order\` numeric DEFAULT 0,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`version__status\` text DEFAULT 'draft',
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`latest\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`solutions\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_solutions_v_parent_idx\` ON \`_solutions_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_solutions_v_version_version_slug_idx\` ON \`_solutions_v\` (\`version_slug\`);`)
  await db.run(sql`CREATE INDEX \`_solutions_v_version_version_updated_at_idx\` ON \`_solutions_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_solutions_v_version_version_created_at_idx\` ON \`_solutions_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_solutions_v_version_version__status_idx\` ON \`_solutions_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_solutions_v_created_at_idx\` ON \`_solutions_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_solutions_v_updated_at_idx\` ON \`_solutions_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_solutions_v_latest_idx\` ON \`_solutions_v\` (\`latest\`);`)
  await db.run(sql`CREATE TABLE \`projects\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`slug\` text,
  	\`category\` text,
  	\`system\` text,
  	\`note\` text,
  	\`order\` numeric DEFAULT 0,
  	\`image_id\` integer,
  	\`legacy_image\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`_status\` text DEFAULT 'draft',
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`projects_slug_idx\` ON \`projects\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`projects_image_idx\` ON \`projects\` (\`image_id\`);`)
  await db.run(sql`CREATE INDEX \`projects_updated_at_idx\` ON \`projects\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`projects_created_at_idx\` ON \`projects\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`projects__status_idx\` ON \`projects\` (\`_status\`);`)
  await db.run(sql`CREATE TABLE \`_projects_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`parent_id\` integer,
  	\`version_title\` text,
  	\`version_slug\` text,
  	\`version_category\` text,
  	\`version_system\` text,
  	\`version_note\` text,
  	\`version_order\` numeric DEFAULT 0,
  	\`version_image_id\` integer,
  	\`version_legacy_image\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`version__status\` text DEFAULT 'draft',
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`latest\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`projects\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_projects_v_parent_idx\` ON \`_projects_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_projects_v_version_version_slug_idx\` ON \`_projects_v\` (\`version_slug\`);`)
  await db.run(sql`CREATE INDEX \`_projects_v_version_version_image_idx\` ON \`_projects_v\` (\`version_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_projects_v_version_version_updated_at_idx\` ON \`_projects_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_projects_v_version_version_created_at_idx\` ON \`_projects_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_projects_v_version_version__status_idx\` ON \`_projects_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_projects_v_created_at_idx\` ON \`_projects_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_projects_v_updated_at_idx\` ON \`_projects_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_projects_v_latest_idx\` ON \`_projects_v\` (\`latest\`);`)
  await db.run(sql`CREATE TABLE \`documents\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`slug\` text,
  	\`system\` text,
  	\`category\` text,
  	\`format\` text,
  	\`size\` text,
  	\`status\` text DEFAULT 'demo',
  	\`file_id\` integer,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`_status\` text DEFAULT 'draft',
  	FOREIGN KEY (\`file_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`documents_slug_idx\` ON \`documents\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`documents_file_idx\` ON \`documents\` (\`file_id\`);`)
  await db.run(sql`CREATE INDEX \`documents_updated_at_idx\` ON \`documents\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`documents_created_at_idx\` ON \`documents\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`documents__status_idx\` ON \`documents\` (\`_status\`);`)
  await db.run(sql`CREATE TABLE \`_documents_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`parent_id\` integer,
  	\`version_title\` text,
  	\`version_slug\` text,
  	\`version_system\` text,
  	\`version_category\` text,
  	\`version_format\` text,
  	\`version_size\` text,
  	\`version_status\` text DEFAULT 'demo',
  	\`version_file_id\` integer,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`version__status\` text DEFAULT 'draft',
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`latest\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`documents\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_file_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_documents_v_parent_idx\` ON \`_documents_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_documents_v_version_version_slug_idx\` ON \`_documents_v\` (\`version_slug\`);`)
  await db.run(sql`CREATE INDEX \`_documents_v_version_version_file_idx\` ON \`_documents_v\` (\`version_file_id\`);`)
  await db.run(sql`CREATE INDEX \`_documents_v_version_version_updated_at_idx\` ON \`_documents_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_documents_v_version_version_created_at_idx\` ON \`_documents_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_documents_v_version_version__status_idx\` ON \`_documents_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_documents_v_created_at_idx\` ON \`_documents_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_documents_v_updated_at_idx\` ON \`_documents_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_documents_v_latest_idx\` ON \`_documents_v\` (\`latest\`);`)
  await db.run(sql`CREATE TABLE \`offices\` (
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
  await db.run(sql`CREATE INDEX \`offices_updated_at_idx\` ON \`offices\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`offices_created_at_idx\` ON \`offices\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`leads\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`phone\` text NOT NULL,
  	\`email\` text,
  	\`company\` text,
  	\`role\` text,
  	\`message\` text,
  	\`status\` text DEFAULT 'new' NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`leads_updated_at_idx\` ON \`leads\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`leads_created_at_idx\` ON \`leads\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`payload_kv\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`key\` text NOT NULL,
  	\`data\` text NOT NULL
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`payload_kv_key_idx\` ON \`payload_kv\` (\`key\`);`)
  await db.run(sql`CREATE TABLE \`payload_locked_documents\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`global_slug\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_global_slug_idx\` ON \`payload_locked_documents\` (\`global_slug\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_updated_at_idx\` ON \`payload_locked_documents\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_created_at_idx\` ON \`payload_locked_documents\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`payload_locked_documents_rels\` (
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
  await db.run(sql`CREATE TABLE \`payload_preferences\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`key\` text,
  	\`value\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_preferences_key_idx\` ON \`payload_preferences\` (\`key\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_updated_at_idx\` ON \`payload_preferences\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_created_at_idx\` ON \`payload_preferences\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`payload_preferences_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`admins_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_preferences\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`admins_id\`) REFERENCES \`admins\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_order_idx\` ON \`payload_preferences_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_parent_idx\` ON \`payload_preferences_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_path_idx\` ON \`payload_preferences_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_admins_id_idx\` ON \`payload_preferences_rels\` (\`admins_id\`);`)
  await db.run(sql`CREATE TABLE \`payload_migrations\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`batch\` numeric,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_migrations_updated_at_idx\` ON \`payload_migrations\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_migrations_created_at_idx\` ON \`payload_migrations\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`site_settings_navigation\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text NOT NULL,
  	\`href\` text NOT NULL,
  	\`enabled\` integer DEFAULT true,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site_settings\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`site_settings_navigation_order_idx\` ON \`site_settings_navigation\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`site_settings_navigation_parent_id_idx\` ON \`site_settings_navigation\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`site_settings\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`company_name\` text DEFAULT 'Берта' NOT NULL,
  	\`description\` text NOT NULL,
  	\`phone\` text NOT NULL,
  	\`email\` text,
  	\`address\` text NOT NULL,
  	\`logo_id\` integer,
  	\`socials_telegram\` text,
  	\`socials_vk\` text,
  	\`seo_default_title\` text,
  	\`seo_default_description\` text,
  	\`seeded\` integer DEFAULT false,
  	\`updated_at\` text,
  	\`created_at\` text,
  	FOREIGN KEY (\`logo_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`site_settings_logo_idx\` ON \`site_settings\` (\`logo_id\`);`)
  await db.run(sql`CREATE TABLE \`homepage_facts\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`value\` text,
  	\`label\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`homepage\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`homepage_facts_order_idx\` ON \`homepage_facts\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`homepage_facts_parent_id_idx\` ON \`homepage_facts\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`homepage\` (
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
  await db.run(sql`CREATE INDEX \`homepage_hero_image_idx\` ON \`homepage\` (\`hero_image_id\`);`)
  await db.run(sql`CREATE INDEX \`homepage__status_idx\` ON \`homepage\` (\`_status\`);`)
  await db.run(sql`CREATE TABLE \`_homepage_v_version_facts\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`value\` text,
  	\`label\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_homepage_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_homepage_v_version_facts_order_idx\` ON \`_homepage_v_version_facts\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_homepage_v_version_facts_parent_id_idx\` ON \`_homepage_v_version_facts\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_homepage_v\` (
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
  await db.run(sql`CREATE INDEX \`_homepage_v_version_version_hero_image_idx\` ON \`_homepage_v\` (\`version_hero_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_homepage_v_version_version__status_idx\` ON \`_homepage_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_homepage_v_created_at_idx\` ON \`_homepage_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_homepage_v_updated_at_idx\` ON \`_homepage_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_homepage_v_latest_idx\` ON \`_homepage_v\` (\`latest\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`admins_sessions\`;`)
  await db.run(sql`DROP TABLE \`admins\`;`)
  await db.run(sql`DROP TABLE \`media\`;`)
  await db.run(sql`DROP TABLE \`pages\`;`)
  await db.run(sql`DROP TABLE \`_pages_v\`;`)
  await db.run(sql`DROP TABLE \`systems_audience\`;`)
  await db.run(sql`DROP TABLE \`systems_applications\`;`)
  await db.run(sql`DROP TABLE \`systems_construction_types\`;`)
  await db.run(sql`DROP TABLE \`systems_benefits\`;`)
  await db.run(sql`DROP TABLE \`systems_gallery\`;`)
  await db.run(sql`DROP TABLE \`systems_specifications\`;`)
  await db.run(sql`DROP TABLE \`systems_faqs\`;`)
  await db.run(sql`DROP TABLE \`systems\`;`)
  await db.run(sql`DROP TABLE \`_systems_v_version_audience\`;`)
  await db.run(sql`DROP TABLE \`_systems_v_version_applications\`;`)
  await db.run(sql`DROP TABLE \`_systems_v_version_construction_types\`;`)
  await db.run(sql`DROP TABLE \`_systems_v_version_benefits\`;`)
  await db.run(sql`DROP TABLE \`_systems_v_version_gallery\`;`)
  await db.run(sql`DROP TABLE \`_systems_v_version_specifications\`;`)
  await db.run(sql`DROP TABLE \`_systems_v_version_faqs\`;`)
  await db.run(sql`DROP TABLE \`_systems_v\`;`)
  await db.run(sql`DROP TABLE \`solutions_systems\`;`)
  await db.run(sql`DROP TABLE \`solutions_objects\`;`)
  await db.run(sql`DROP TABLE \`solutions\`;`)
  await db.run(sql`DROP TABLE \`_solutions_v_version_systems\`;`)
  await db.run(sql`DROP TABLE \`_solutions_v_version_objects\`;`)
  await db.run(sql`DROP TABLE \`_solutions_v\`;`)
  await db.run(sql`DROP TABLE \`projects\`;`)
  await db.run(sql`DROP TABLE \`_projects_v\`;`)
  await db.run(sql`DROP TABLE \`documents\`;`)
  await db.run(sql`DROP TABLE \`_documents_v\`;`)
  await db.run(sql`DROP TABLE \`offices\`;`)
  await db.run(sql`DROP TABLE \`leads\`;`)
  await db.run(sql`DROP TABLE \`payload_kv\`;`)
  await db.run(sql`DROP TABLE \`payload_locked_documents\`;`)
  await db.run(sql`DROP TABLE \`payload_locked_documents_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_preferences\`;`)
  await db.run(sql`DROP TABLE \`payload_preferences_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_migrations\`;`)
  await db.run(sql`DROP TABLE \`site_settings_navigation\`;`)
  await db.run(sql`DROP TABLE \`site_settings\`;`)
  await db.run(sql`DROP TABLE \`homepage_facts\`;`)
  await db.run(sql`DROP TABLE \`homepage\`;`)
  await db.run(sql`DROP TABLE \`_homepage_v_version_facts\`;`)
  await db.run(sql`DROP TABLE \`_homepage_v\`;`)
}
