import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`documents\` ADD \`preview_image_id\` integer REFERENCES media(id);`)
  await db.run(sql`CREATE INDEX \`documents_preview_image_idx\` ON \`documents\` (\`preview_image_id\`);`)
  await db.run(sql`ALTER TABLE \`_documents_v\` ADD \`version_preview_image_id\` integer REFERENCES media(id);`)
  await db.run(sql`CREATE INDEX \`_documents_v_version_version_preview_image_idx\` ON \`_documents_v\` (\`version_preview_image_id\`);`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP INDEX \`_documents_v_version_version_preview_image_idx\`;`)
  await db.run(sql`ALTER TABLE \`_documents_v\` DROP COLUMN \`version_preview_image_id\`;`)
  await db.run(sql`DROP INDEX \`documents_preview_image_idx\`;`)
  await db.run(sql`ALTER TABLE \`documents\` DROP COLUMN \`preview_image_id\`;`)
}
