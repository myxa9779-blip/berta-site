import { MigrateDownArgs, MigrateUpArgs, sql } from "@payloadcms/db-sqlite";
import { otherProducts } from "../data/otherProducts";

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`other_products_technical_characteristics\` (
    \`_order\` integer NOT NULL,
    \`_parent_id\` integer NOT NULL,
    \`id\` text PRIMARY KEY NOT NULL,
    \`title\` text NOT NULL,
    FOREIGN KEY (\`_parent_id\`) REFERENCES \`other_products\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );`);
  await db.run(sql`CREATE INDEX \`other_products_technical_characteristics_order_idx\` ON \`other_products_technical_characteristics\` (\`_order\`);`);
  await db.run(sql`CREATE INDEX \`other_products_technical_characteristics_parent_id_idx\` ON \`other_products_technical_characteristics\` (\`_parent_id\`);`);

  await db.run(sql`CREATE TABLE \`other_products_advantages\` (
    \`_order\` integer NOT NULL,
    \`_parent_id\` integer NOT NULL,
    \`id\` text PRIMARY KEY NOT NULL,
    \`title\` text NOT NULL,
    FOREIGN KEY (\`_parent_id\`) REFERENCES \`other_products\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );`);
  await db.run(sql`CREATE INDEX \`other_products_advantages_order_idx\` ON \`other_products_advantages\` (\`_order\`);`);
  await db.run(sql`CREATE INDEX \`other_products_advantages_parent_id_idx\` ON \`other_products_advantages\` (\`_parent_id\`);`);

  await db.run(sql`ALTER TABLE \`other_products\` ADD \`short_description\` text;`);

  for (const [order, product] of otherProducts.entries()) {
    await db.run(sql`
      INSERT INTO \`other_products\` (
        \`title\`, \`slug\`, \`short_description\`, \`description\`, \`legacy_image\`, \`order\`, \`published\`, \`updated_at\`, \`created_at\`
      ) VALUES (
        ${product.title}, ${product.slug}, ${product.shortDescription || null}, ${product.description}, ${product.image}, ${order}, 1,
        strftime('%Y-%m-%dT%H:%M:%fZ', 'now'), strftime('%Y-%m-%dT%H:%M:%fZ', 'now')
      )
      ON CONFLICT(\`slug\`) DO UPDATE SET
        \`title\` = excluded.\`title\`,
        \`short_description\` = excluded.\`short_description\`,
        \`description\` = excluded.\`description\`,
        \`legacy_image\` = excluded.\`legacy_image\`,
        \`order\` = excluded.\`order\`,
        \`published\` = 1,
        \`updated_at\` = excluded.\`updated_at\`;
    `);

    await db.run(sql`DELETE FROM \`other_products_applications\` WHERE \`_parent_id\` = (SELECT \`id\` FROM \`other_products\` WHERE \`slug\` = ${product.slug});`);
    await db.run(sql`DELETE FROM \`other_products_technical_characteristics\` WHERE \`_parent_id\` = (SELECT \`id\` FROM \`other_products\` WHERE \`slug\` = ${product.slug});`);
    await db.run(sql`DELETE FROM \`other_products_advantages\` WHERE \`_parent_id\` = (SELECT \`id\` FROM \`other_products\` WHERE \`slug\` = ${product.slug});`);

    for (const [index, title] of product.applications.entries()) {
      await db.run(sql`
        INSERT INTO \`other_products_applications\` (\`_order\`, \`_parent_id\`, \`id\`, \`title\`)
        SELECT ${index + 1}, \`id\`, ${`${product.slug}-application-${index + 1}`}, ${title}
        FROM \`other_products\` WHERE \`slug\` = ${product.slug};
      `);
    }

    for (const [index, title] of (product.technicalCharacteristics || []).entries()) {
      await db.run(sql`
        INSERT INTO \`other_products_technical_characteristics\` (\`_order\`, \`_parent_id\`, \`id\`, \`title\`)
        SELECT ${index + 1}, \`id\`, ${`${product.slug}-technical-${index + 1}`}, ${title}
        FROM \`other_products\` WHERE \`slug\` = ${product.slug};
      `);
    }

    for (const [index, title] of (product.advantages || []).entries()) {
      await db.run(sql`
        INSERT INTO \`other_products_advantages\` (\`_order\`, \`_parent_id\`, \`id\`, \`title\`)
        SELECT ${index + 1}, \`id\`, ${`${product.slug}-advantage-${index + 1}`}, ${title}
        FROM \`other_products\` WHERE \`slug\` = ${product.slug};
      `);
    }
  }
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`other_products_technical_characteristics\`;`);
  await db.run(sql`DROP TABLE \`other_products_advantages\`;`);
  await db.run(sql`ALTER TABLE \`other_products\` DROP COLUMN \`short_description\`;`);
}
