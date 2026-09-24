import { MigrateDownArgs, MigrateUpArgs, sql } from "@payloadcms/db-sqlite";

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.run(sql`
    UPDATE \`homepage_facts\`
    SET \`value\` = '15'
    WHERE \`label\` LIKE '%фис%';
  `);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.run(sql`
    UPDATE \`homepage_facts\`
    SET \`value\` = '14'
    WHERE \`label\` LIKE '%фис%';
  `);
}
