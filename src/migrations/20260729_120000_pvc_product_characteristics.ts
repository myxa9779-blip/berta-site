import { MigrateDownArgs, MigrateUpArgs, sql } from "@payloadcms/db-sqlite";

const currentCharacteristics = {
  "berta-silver-eco-70": [
    "Монтажная ширина: 70 мм",
    "Количество воздушных камер: 5",
    "Толщина стенок профиля: 3 мм",
    "Армирование: 2,2 мм в ламинации, 1,5 мм в белом цвете",
    "Уплотнитель TPE: серый или чёрный",
    "Толщина стеклопакета: 32 мм",
    "Фурнитура: Internika (Европа)",
    "Микропроветривание: трёхступенчатое",
  ],
  "proplex-58": [
    "Монтажная глубина профиля: 58 мм",
    "Количество воздушных камер: 3",
    "Толщина стенок профиля: 3 мм",
    "Толщина стеклопакета (заполнения): 24 мм",
    "Армирование: 1,5 мм в ламинации, 1,2 мм в белом цвете",
    "Уплотнитель TPE: серый или чёрный",
    "Фурнитура: Элементис",
    "Микропроветривание: двухступенчатое",
  ],
} as const;

const previousCharacteristics = {
  "berta-silver-eco-70": [],
  "proplex-58": [
    "Монтажная глубина профиля: 58 мм",
    "Количество воздушных камер: 3",
    "Толщина стеклопакета (заполнения): 24 мм",
    "Армировка: 1,2 мм в белом цвете, 1,5 мм в ламинации",
    "Уплотнитель TPE: серый или чёрный",
  ],
} as const;

async function replaceCharacteristics(
  db: MigrateUpArgs["db"] | MigrateDownArgs["db"],
  products: Record<string, readonly string[]>,
) {
  for (const [slug, characteristics] of Object.entries(products)) {
    await db.run(sql`
      DELETE FROM \`other_products_technical_characteristics\`
      WHERE \`_parent_id\` = (SELECT \`id\` FROM \`other_products\` WHERE \`slug\` = ${slug});
    `);

    for (const [index, title] of characteristics.entries()) {
      await db.run(sql`
        INSERT INTO \`other_products_technical_characteristics\` (\`_order\`, \`_parent_id\`, \`id\`, \`title\`)
        SELECT ${index}, \`id\`, ${`${slug}-technical-${index + 1}`}, ${title}
        FROM \`other_products\` WHERE \`slug\` = ${slug};
      `);
    }
  }
}

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await replaceCharacteristics(db, currentCharacteristics);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await replaceCharacteristics(db, previousCharacteristics);
}
