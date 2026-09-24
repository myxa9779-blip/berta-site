import type { DocumentItem } from "@/types";

export const documents: DocumentItem[] = [
  { id: "as63-catalog", title: "Каталог системы БЕРТА AS63", system: "БЕРТА AS63", category: "Каталоги", format: "PDF", size: "Будет уточнён", status: "demo" },
  { id: "as63-nodes", title: "Типовые узлы БЕРТА AS63", system: "БЕРТА AS63", category: "Узлы", format: "PDF / DWG", size: "Данные готовятся", status: "demo" },
  { id: "sr50-guide", title: "Руководство по системе БЕРТА F50", system: "БЕРТА F50", category: "Технические руководства", format: "PDF", size: "Будет уточнён", status: "demo" },
  { id: "sr50-nodes", title: "Типовые узлы БЕРТА F50", system: "БЕРТА F50", category: "Узлы", format: "DWG", size: "Данные готовятся", status: "demo" },
  { id: "bim-library", title: "BIM-библиотека Берта", system: "Все системы", category: "BIM", format: "RFA / IFC", size: "В разработке", status: "demo" },
  { id: "cad-library", title: "CAD-библиотека Берта", system: "Все системы", category: "CAD", format: "DWG", size: "В разработке", status: "demo" },
];
