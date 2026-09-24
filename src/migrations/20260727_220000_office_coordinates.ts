import { MigrateDownArgs, MigrateUpArgs, sql } from "@payloadcms/db-sqlite";

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`offices\` ADD \`latitude\` numeric;`);
  await db.run(sql`ALTER TABLE \`offices\` ADD \`longitude\` numeric;`);

  const coordinates = [
    ["Пятигорск", "ул. Ермолова, ост. «Аэропорт»", 44.0486, 43.0594],
    ["Ессентуки", "ул. Октябрьская, 341А", 44.0454003, 42.8838936],
    ["Нальчик", "ул. Толстого, 102", 43.4903568, 43.6054167],
    ["Владикавказ", "пр. Коста, 290", 43.0548714, 44.6486842],
    ["Владикавказ", "пр. Коста, 92", 43.0185044, 44.6753435],
    ["Грозный", "ул. Умара Кадырова, 25", 43.3186983, 45.679846],
    ["Назрань", "ул. Московская, 8", 43.2253166, 44.7656219],
    ["Баксан", "ул. Шукова, 15А", 43.6850467, 43.5711219],
    ["Нарткала", "ул. Гурфова, 24", 43.5614501, 43.8557811],
    ["Майский", "ул. Энгельса, 58", 43.6274605, 44.0556971],
    ["Прохладный", "ул. Ленина, 80", 43.7565125, 44.0207802],
    ["Терек", "ул. Ленина, 43", 43.4848705, 44.142825],
    ["Тырныауз", "ул. Энеева, 1", 43.3886973, 42.9184616],
    ["Учкекен", "ул. Ленина, 5А", 43.9498668, 42.5274121],
  ] as const;

  for (const [city, address, latitude, longitude] of coordinates) {
    await db.run(
      sql`UPDATE \`offices\` SET \`latitude\` = ${latitude}, \`longitude\` = ${longitude} WHERE \`city\` = ${city} AND \`address\` = ${address};`,
    );
  }
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`offices\` DROP COLUMN \`latitude\`;`);
  await db.run(sql`ALTER TABLE \`offices\` DROP COLUMN \`longitude\`;`);
}
