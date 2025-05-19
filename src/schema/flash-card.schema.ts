import { z } from 'zod';
import { audioValidationRule, imageValidationRule } from './common.schema';
import { FlashCardService } from '../services/admin/flash-card.services';
import { DayService } from '../services/admin/day.services';

const dayService = new DayService()
const flashCardService = new FlashCardService()

export const createFlashCardSchema = z.object({
  dayId: z
    .string({ required_error: 'Day id is required.' })
    .trim(),
  cardOrder: z
    .coerce
    .number({ required_error: 'Flash card order is required.' })
    .min(1, { message: 'Flash card order has to be at least 1.' })
    .max(1000000, { message: 'Flash card order cannot exceed 1000000.' }),
  frontText: z
    .string({ required_error: 'Front text is required.' })
    .trim()
    .max(255, { message: 'Front text cannot exceed 255 characters.' }),
  frontSubtext: z
    .string({ required_error: 'Front subtext is required.' })
    .trim()
    .max(255, { message: 'Front subtext cannot exceed 255 characters.' })
    .optional()
    .nullable(),
  backText: z
    .string({ required_error: 'Back text is required.' })
    .trim()
    .max(255, { message: 'Back text cannot exceed 255 characters.' }),
  backSubtext: z
    .string({ required_error: 'Back subtext is required.' })
    .trim()
    .max(255, { message: 'Back subtext cannot exceed 255 characters.' })
    .optional()
    .nullable(),
  example: z
    .string({ required_error: 'Example is required.' })
    .trim()
    .max(255, { message: 'Example cannot exceed 255 characters.' }),
  exampleTranslation: z
    .string({ required_error: 'Back subtext is required.' })
    .trim()
    .max(255, { message: 'Back subtext cannot exceed 255 characters.' })
    .optional()
    .nullable(),
  usageNotes: z
    .string({ required_error: 'Back subtext is required.' })
    .trim()
    .max(255, { message: 'Back subtext cannot exceed 255 characters.' })
    .optional()
    .nullable(),
  imageUrl: z
    .array(imageValidationRule, {required_error: "Image url is be required." })
    .optional()
    .nullable(),
  audioUrl: z.
    array(audioValidationRule, {required_error: "Audio url is be required." })
    .optional()
    .nullable(),
})
.superRefine(async (data, ctx) => {
  const { dayId, cardOrder } = data;

  const day = await dayService.dayExistsById(dayId)
  if(!day){
    ctx.addIssue({
      code: 'custom',
      path: ['dayId'],
      message: 'Day with this day id doesn\'t exist.',
    });
  }

  // Check if course with day already exists
  const dayWithCardOrder = await flashCardService.dayWithCardOrderExists(dayId, cardOrder);
  if (dayWithCardOrder) {
    ctx.addIssue({
      code: 'custom',
      path: ['dayId'],
      message: 'Day id with this flash card order already exists.',
    });

    ctx.addIssue({
      code: 'custom',
      path: ['cardOrder'],
      message: 'Day id with this flash card order already exists.',
    });
  }
});

export const updateFlashCardSchema = z.object({
  id: z
    .string({ required_error: 'Id is required.' })
    .trim(),
  dayId: z
    .string({ required_error: 'Day id is required.' })
    .trim()
    .optional()
    .nullable(),
  cardOrder: z
    .coerce
    .number({ required_error: 'Flash card order is required.' })
    .min(1, { message: 'Flash card order has to be at least 1.' })
    .max(1000000, { message: 'Flash card order cannot exceed 1000000.' })
    .optional()
    .nullable(),
  frontText: z
    .string({ required_error: 'Front text is required.' })
    .trim()
    .max(255, { message: 'Front text cannot exceed 255 characters.' })
    .optional()
    .nullable(),
  frontSubtext: z
    .string({ required_error: 'Front subtext is required.' })
    .trim()
    .max(255, { message: 'Front subtext cannot exceed 255 characters.' })
    .optional()
    .nullable(),
  backText: z
    .string({ required_error: 'Back text is required.' })
    .trim()
    .max(255, { message: 'Back text cannot exceed 255 characters.' })
    .optional()
    .nullable(),
  backSubtext: z
    .string({ required_error: 'Back subtext is required.' })
    .trim()
    .max(255, { message: 'Back subtext cannot exceed 255 characters.' })
    .optional()
    .nullable(),
  example: z
    .string({ required_error: 'Example is required.' })
    .trim()
    .max(255, { message: 'Example cannot exceed 255 characters.' })
    .optional()
    .nullable(),
  exampleTranslation: z
    .string({ required_error: 'Back subtext is required.' })
    .trim()
    .max(255, { message: 'Back subtext cannot exceed 255 characters.' })
    .optional()
    .nullable(),
  usageNotes: z
    .string({ required_error: 'Back subtext is required.' })
    .trim()
    .max(255, { message: 'Back subtext cannot exceed 255 characters.' })
    .optional()
    .nullable(),
  imageUrl: z
    .array(imageValidationRule, {required_error: "Image url is be required." })
    .optional()
    .nullable(),
  audioUrl: z.
    array(audioValidationRule, {required_error: "Audio url is be required." })
    .optional()
    .nullable(),
})
.superRefine(async (data, ctx) => {
  const { id } = data;
  let { dayId, cardOrder } = data;
  const flashCard = await flashCardService.findFlashCardById(id, ['id', 'dayId', 'cardOrder'])

  if(flashCard){
    if(!dayId)
      dayId = flashCard.dayId
    if(!cardOrder)
      cardOrder = flashCard.cardOrder

    const day = await dayService.dayExistsById(dayId)
    if(!day){
      ctx.addIssue({
        code: 'custom',
        path: ['dayId'],
        message: 'day with this day id doesn\'t exist.',
      });
    }

    // Check if course with day already exists
    const dayWithFlashCard = await flashCardService.dayWithCardOrderExists(dayId, cardOrder);
    if (dayWithFlashCard && cardOrder && cardOrder !== flashCard.cardOrder) {
      if (dayWithFlashCard) {
        ctx.addIssue({
          code: 'custom',
          path: ['dayId'],
          message: 'Day id with this flash card order already exists.',
        });
    
        ctx.addIssue({
          code: 'custom',
          path: ['cardOrder'],
          message: 'Day id with this flash card order already exists.',
        });
      }
    }
  }
});