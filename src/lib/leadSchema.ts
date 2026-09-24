import { z } from "zod";

export const leadSchema = z.object({
  name: z.string().trim().min(2, "Укажите ФИО").max(120, "Слишком длинное значение"),
  phone: z.string().trim().min(7, "Укажите телефон").max(40, "Проверьте телефон"),
  city: z.string().trim().min(2, "Укажите город").max(100, "Слишком длинное значение"),
  sourcePage: z.string().trim().min(1).max(1000),
  consent: z.boolean().refine((value) => value, "Необходимо согласие"),
});

export type LeadData = z.infer<typeof leadSchema>;
