import { MigrateDownArgs, MigrateUpArgs, sql } from "@payloadcms/db-sqlite";

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.run(
    sql`ALTER TABLE \`homepage\` ADD \`promo_banner_enabled\` integer DEFAULT true;`,
  );
  await db.run(
    sql`ALTER TABLE \`homepage\` ADD \`promo_banner_image_id\` integer REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null;`,
  );
  await db.run(
    sql`ALTER TABLE \`homepage\` ADD \`promo_banner_legacy_image\` text DEFAULT '/images/promo-decor-launch-50.png';`,
  );
  await db.run(
    sql`ALTER TABLE \`homepage\` ADD \`promo_banner_alt\` text DEFAULT 'Скидка 50% на декор изделия до конца августа';`,
  );
  await db.run(
    sql`ALTER TABLE \`homepage\` ADD \`promo_banner_href\` text DEFAULT '#contact';`,
  );
  await db.run(
    sql`CREATE INDEX \`homepage_promo_banner_image_idx\` ON \`homepage\` (\`promo_banner_image_id\`);`,
  );

  await db.run(
    sql`ALTER TABLE \`_homepage_v\` ADD \`version_promo_banner_enabled\` integer DEFAULT true;`,
  );
  await db.run(
    sql`ALTER TABLE \`_homepage_v\` ADD \`version_promo_banner_image_id\` integer REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null;`,
  );
  await db.run(
    sql`ALTER TABLE \`_homepage_v\` ADD \`version_promo_banner_legacy_image\` text DEFAULT '/images/promo-decor-launch-50.png';`,
  );
  await db.run(
    sql`ALTER TABLE \`_homepage_v\` ADD \`version_promo_banner_alt\` text DEFAULT 'Скидка 50% на декор изделия до конца августа';`,
  );
  await db.run(
    sql`ALTER TABLE \`_homepage_v\` ADD \`version_promo_banner_href\` text DEFAULT '#contact';`,
  );
  await db.run(
    sql`CREATE INDEX \`_homepage_v_version_promo_banner_image_idx\` ON \`_homepage_v\` (\`version_promo_banner_image_id\`);`,
  );
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP INDEX \`homepage_promo_banner_image_idx\`;`);
  await db.run(
    sql`ALTER TABLE \`homepage\` DROP COLUMN \`promo_banner_enabled\`;`,
  );
  await db.run(
    sql`ALTER TABLE \`homepage\` DROP COLUMN \`promo_banner_image_id\`;`,
  );
  await db.run(
    sql`ALTER TABLE \`homepage\` DROP COLUMN \`promo_banner_legacy_image\`;`,
  );
  await db.run(sql`ALTER TABLE \`homepage\` DROP COLUMN \`promo_banner_alt\`;`);
  await db.run(sql`ALTER TABLE \`homepage\` DROP COLUMN \`promo_banner_href\`;`);

  await db.run(
    sql`DROP INDEX \`_homepage_v_version_promo_banner_image_idx\`;`,
  );
  await db.run(
    sql`ALTER TABLE \`_homepage_v\` DROP COLUMN \`version_promo_banner_enabled\`;`,
  );
  await db.run(
    sql`ALTER TABLE \`_homepage_v\` DROP COLUMN \`version_promo_banner_image_id\`;`,
  );
  await db.run(
    sql`ALTER TABLE \`_homepage_v\` DROP COLUMN \`version_promo_banner_legacy_image\`;`,
  );
  await db.run(
    sql`ALTER TABLE \`_homepage_v\` DROP COLUMN \`version_promo_banner_alt\`;`,
  );
  await db.run(
    sql`ALTER TABLE \`_homepage_v\` DROP COLUMN \`version_promo_banner_href\`;`,
  );
}
