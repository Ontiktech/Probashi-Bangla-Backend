import { z } from 'zod';
import { DayService } from '../services/admin/day.services';
import { LessonService } from '../services/admin/lesson.services';

const dayService = new DayService()
const lessonService = new LessonService()

export const createDaySchema = z.object({
  lessonId: z
    .string({ required_error: 'Lesson id is required.' })
    .trim(),
  dayNumber: z
    .coerce
    .number({ required_error: 'Day number is required.' })
    .min(1, { message: 'Day number has to be at least 1.' })
    .max(1000000, { message: 'Day number cannot exceed 1000000.' }),
  title: z
    .string({ required_error: 'Title is required.' })
    .trim()
    .min(3, { message: 'Title has to be at least 3 characters long.' })
    .max(255, { message: 'Title cannot exceed 255 characters.' }),
  description: z
    .string({ required_error: 'Description is required.' })
    .trim()
    .max(255, { message: 'Description cannot exceed 255 characters.' })
    .optional()
    .nullable(),
})
.superRefine(async (data, ctx) => {
  const { lessonId, dayNumber } = data;

  const lesson = await lessonService.findLessonById(lessonId, ['id'])
  if(!lesson){
    ctx.addIssue({
      code: 'custom',
      path: ['lessonId'],
      message: 'Lesson with this lesson id doesn\'t exist.',
    });
  }

  // Check if lesson with day already exists
  const lessonWithDay = await dayService.lessonWithDayNumberExists(lessonId, dayNumber);
  if (lessonWithDay) {
    ctx.addIssue({
      code: 'custom',
      path: ['lessonId'],
      message: 'Lesson id with this day number already exists.',
    });

    ctx.addIssue({
      code: 'custom',
      path: ['dayNumber'],
      message: 'Lesson id with this day number already exists.',
    });
  }
});

export const updateDaySchema = z.object({
  id: z
    .string({ required_error: 'Id is required.' })
    .trim(),
  lessonId: z
    .string({ required_error: 'Lesson id is required.' })
    .trim()
    .optional()
    .nullable(),
  dayNumber: z
    .coerce
    .number({ required_error: 'Day number is required.' })
    .min(1, { message: 'Day number has to be at least 1.' })
    .max(1000000, { message: 'Day number cannot exceed 1000000.' })
    .optional()
    .nullable(),
  title: z
    .string({ required_error: 'Title is required.' })
    .trim()
    .min(3, { message: 'Title has to be at least 3 characters long.' })
    .max(255, { message: 'Title cannot exceed 255 characters.' })
    .optional()
    .nullable(),
  description: z
    .string({ required_error: 'Description is required.' })
    .trim()
    .max(255, { message: 'Description cannot exceed 255 characters.' })
    .optional()
    .nullable(),
})
.superRefine(async (data, ctx) => {
  const { id } = data;
  let { lessonId, dayNumber } = data;
  const day = await dayService.findDayById(id, ['id', 'lessonId', 'dayNumber'])

  if(day){
    if(!lessonId)
      lessonId = day.lessonId
    if(!dayNumber)
      dayNumber = day.dayNumber
  
    const lesson = await lessonService.findLessonById(lessonId, ['id'])
    if(!lesson){
      ctx.addIssue({
        code: 'custom',
        path: ['lessonId'],
        message: 'Lesson with this lesson id doesn\'t exist.',
      });
    }
  
    // Check if lesson with day already exists
    const lessonWithDay = await dayService.lessonWithDayNumberExists(lessonId, dayNumber);
    if (day && lessonWithDay && dayNumber !== day.dayNumber) {
      ctx.addIssue({
        code: 'custom',
        path: ['lessonId'],
        message: 'Lesson id with this day number already exists.',
      });
  
      ctx.addIssue({
        code: 'custom',
        path: ['dayNumber'],
        message: 'Lesson id with this day number already exists.',
      });
    }
  }
});