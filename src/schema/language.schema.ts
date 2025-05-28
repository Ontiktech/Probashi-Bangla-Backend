import { z } from 'zod';

export const createLanguageSchema = z.object({
  language: z
    .string({ required_error: 'Langauge is required.' })
    .trim()
    .max(255, { message: 'Langauge cannot exceed 255 characters.' }),
});

export const updateLanguageSchema = z.object({
  language: z
    .string({ required_error: 'Langauge is required.' })
    .trim()
    .max(255, { message: 'Langauge cannot exceed 255 characters.' })
    .optional()
    .nullable(),
});