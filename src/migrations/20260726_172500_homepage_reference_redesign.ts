import { MigrateDownArgs, MigrateUpArgs, sql } from "@payloadcms/db-sqlite";

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.run(sql`UPDATE \`homepage\` SET
    \`eyebrow\` = 'Алюминиевые системы БЕРТА',
    \`title\` = 'Прежде чем заказать окна — сравните предложение БЕРТЫ.',
    \`description\` = 'Собственные алюминиевые системы для окон, дверей, фасадов и светопрозрачных конструкций. Технологичность, надёжность и архитектурная эстетика в каждой детали.',
    \`legacy_hero_image\` = '/images/home-redesign/hero-house.jpg',
    \`primary_action_label\` = 'Подобрать систему',
    \`primary_action_href\` = '/products',
    \`secondary_action_label\` = 'Скачать каталог',
    \`secondary_action_href\` = '/documents',
    \`section_titles_systems\` = 'Наши продукты',
    \`section_titles_solutions\` = 'Подбор решения',
    \`section_titles_contact\` = 'Бесплатная консультация',
    \`updated_at\` = strftime('%Y-%m-%dT%H:%M:%fZ', 'now');`);

  await db.run(sql`DELETE FROM \`homepage_facts\`;`);
  await db.run(sql`INSERT INTO \`homepage_facts\` (\`_order\`, \`_parent_id\`, \`id\`, \`value\`, \`label\`) SELECT 0, \`id\`, 'redesign-experience', 'С 2005 года', 'На рынке светопрозрачных конструкций' FROM \`homepage\` LIMIT 1;`);
  await db.run(sql`INSERT INTO \`homepage_facts\` (\`_order\`, \`_parent_id\`, \`id\`, \`value\`, \`label\`) SELECT 1, \`id\`, 'redesign-volume', 'Более 1 000 000', 'Изготовленных алюминиевых изделий' FROM \`homepage\` LIMIT 1;`);
  await db.run(sql`INSERT INTO \`homepage_facts\` (\`_order\`, \`_parent_id\`, \`id\`, \`value\`, \`label\`) SELECT 2, \`id\`, 'redesign-offices', '14', 'Офисов в ключевых городах Юга России' FROM \`homepage\` LIMIT 1;`);
  await db.run(sql`INSERT INTO \`homepage_facts\` (\`_order\`, \`_parent_id\`, \`id\`, \`value\`, \`label\`) SELECT 3, \`id\`, 'redesign-warranty', '5 лет', 'Гарантии на все системы БЕРТА' FROM \`homepage\` LIMIT 1;`);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.run(sql`UPDATE \`homepage\` SET
    \`eyebrow\` = 'Собственная системная линейка',
    \`description\` = 'Собственное производство. Честные цены. Более 20 лет опыта и более 1 000 000 установленных окон. Получите предложение и убедитесь сами.',
    \`legacy_hero_image\` = '/images/hero-building-night.jpg',
    \`primary_action_label\` = 'Получить предложение',
    \`primary_action_href\` = '#contact',
    \`secondary_action_label\` = 'Рассчитать самостоятельно',
    \`secondary_action_href\` = '/solutions#configurator',
    \`section_titles_systems\` = 'Системная линейка',
    \`section_titles_solutions\` = 'Решения по типу задачи',
    \`section_titles_contact\` = 'Обсудить проект',
    \`updated_at\` = strftime('%Y-%m-%dT%H:%M:%fZ', 'now');`);

  await db.run(sql`DELETE FROM \`homepage_facts\`;`);
  await db.run(sql`INSERT INTO \`homepage_facts\` (\`_order\`, \`_parent_id\`, \`id\`, \`value\`, \`label\`) SELECT 0, \`id\`, 'tz-experience', 'С 2005 года', 'Опыт производства' FROM \`homepage\` LIMIT 1;`);
  await db.run(sql`INSERT INTO \`homepage_facts\` (\`_order\`, \`_parent_id\`, \`id\`, \`value\`, \`label\`) SELECT 1, \`id\`, 'tz-windows', 'Более 1 000 000', 'Установленных окон' FROM \`homepage\` LIMIT 1;`);
  await db.run(sql`INSERT INTO \`homepage_facts\` (\`_order\`, \`_parent_id\`, \`id\`, \`value\`, \`label\`) SELECT 2, \`id\`, 'tz-offices', '14', 'Офисов на Северном Кавказе' FROM \`homepage\` LIMIT 1;`);
  await db.run(sql`INSERT INTO \`homepage_facts\` (\`_order\`, \`_parent_id\`, \`id\`, \`value\`, \`label\`) SELECT 3, \`id\`, 'tz-systems', '4', 'Системы в линейке БЕРТА' FROM \`homepage\` LIMIT 1;`);
}
