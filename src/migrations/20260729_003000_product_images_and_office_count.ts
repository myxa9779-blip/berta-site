import { MigrateDownArgs, MigrateUpArgs, sql } from "@payloadcms/db-sqlite";

const productImages = [
  ["winter-gardens", "/images/other-products/winter-gardens.png", 1],
  ["metalplastic-products", "/images/other-products/metalplastic-products.png", 2],
  ["berta-silver-eco-70", "/images/other-products/berta-silver-eco-70.png", 3],
  ["berta-silver-eco-58", "/images/other-products/berta-silver-eco-58.png", 4],
  ["proplex-58", "/images/other-products/proplex-58.png", 5],
  ["panoramic-folding-doors", "/images/other-products/panoramic-folding-doors.png", 6],
  ["panoramic-sliding-doors", "/images/other-products/panoramic-sliding-doors.png", 7],
  ["panoramic-sliding-systems", "/images/other-products/panoramic-sliding-systems.png", 8],
] as const;

const previousProductImages = [
  ["winter-gardens", "/images/facade-curve.jpg", 1],
  ["metalplastic-products", "/images/metalplastic-window.jpg", 2],
  ["berta-silver-eco-70", "/images/metalplastic-window.jpg", 4],
  ["berta-silver-eco-58", "/images/metalplastic-window.jpg", 5],
  ["proplex-58", "/images/metalplastic-window.jpg", 6],
  ["panoramic-folding-doors", "/images/products-redesign/door-system.jpg", 7],
  ["panoramic-sliding-doors", "/images/solutions-smart-home.png", 8],
  ["panoramic-sliding-systems", "/images/solutions-smart-home.png", 9],
] as const;

export async function up({ db }: MigrateUpArgs): Promise<void> {
  for (const [slug, image, order] of productImages) {
    await db.run(
      sql`UPDATE \`other_products\` SET \`legacy_image\` = ${image}, \`image_id\` = NULL, \`order\` = ${order}, \`updated_at\` = CURRENT_TIMESTAMP WHERE \`slug\` = ${slug};`,
    );
  }

  await db.run(sql`DELETE FROM \`other_products\` WHERE \`slug\` = 'plastic-windows';`);
  await db.run(sql`UPDATE \`homepage_facts\` SET \`value\` = '15' WHERE lower(\`label\`) LIKE '%офис%';`);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  for (const [slug, image, order] of previousProductImages) {
    await db.run(
      sql`UPDATE \`other_products\` SET \`legacy_image\` = ${image}, \`image_id\` = NULL, \`order\` = ${order}, \`updated_at\` = CURRENT_TIMESTAMP WHERE \`slug\` = ${slug};`,
    );
  }

  await db.run(sql`
    INSERT INTO \`other_products\` (
      \`title\`, \`slug\`, \`short_description\`, \`description\`, \`legacy_image\`, \`order\`, \`published\`, \`updated_at\`, \`created_at\`
    )
    SELECT
      'Пластиковые окна',
      'plastic-windows',
      'ПВХ-окна для квартир, частных домов, балконов и коммерческих объектов.',
      'Оконные системы из ПВХ для квартир, частных домов, балконов и коммерческих объектов.',
      '/images/metalplastic-window.jpg',
      3,
      1,
      CURRENT_TIMESTAMP,
      CURRENT_TIMESTAMP
    WHERE NOT EXISTS (SELECT 1 FROM \`other_products\` WHERE \`slug\` = 'plastic-windows');
  `);

  for (const [order, id, title] of [
    [0, "plastic-windows-apartment", "Квартиры"],
    [1, "plastic-windows-house", "Частные дома"],
    [2, "plastic-windows-balcony", "Балконы"],
  ] as const) {
    await db.run(sql`
      INSERT OR IGNORE INTO \`other_products_applications\` (\`_order\`, \`_parent_id\`, \`id\`, \`title\`)
      SELECT ${order}, \`id\`, ${id}, ${title} FROM \`other_products\` WHERE \`slug\` = 'plastic-windows';
    `);
  }

  await db.run(sql`UPDATE \`homepage_facts\` SET \`value\` = '14' WHERE lower(\`label\`) LIKE '%офис%';`);
}
