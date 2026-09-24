import { MigrateDownArgs, MigrateUpArgs, sql } from "@payloadcms/db-sqlite";

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.run(sql`UPDATE \`homepage\`
    SET \`legacy_hero_image\` = '/images/hero-20260727/home.jpg',
        \`updated_at\` = strftime('%Y-%m-%dT%H:%M:%fZ', 'now')
    WHERE \`hero_image_id\` IS NULL;`);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.run(sql`UPDATE \`homepage\`
    SET \`legacy_hero_image\` = '/images/home-redesign/hero-house.jpg',
        \`updated_at\` = strftime('%Y-%m-%dT%H:%M:%fZ', 'now')
    WHERE \`hero_image_id\` IS NULL;`);
}
