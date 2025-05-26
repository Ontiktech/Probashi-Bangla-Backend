import { z } from 'zod';
import { FILTER_LANGUAGE } from '../constants/enums';

export const viewEnrolledCoursesFilterSchema = z.object({
  language: z.
    enum(FILTER_LANGUAGE, { required_error: 'Filter by field is required.' })
    .optional()
    .nullable(),
  searchText : z
    .string({ required_error: 'Search test is required.' })
    .trim()
    .max(255, { message: 'searchText cannot exceed 255 characters.' })
    .optional()
    .nullable(),
  page : z
    .coerce
    .number({ required_error: 'Page is required.' })
    .min(1, { message: 'Page cannot be less than 1.' })
    .max(10000000, { message: 'Page cannot exceed 10000000.' })
    .optional()
    .nullable(),
  number : z
    .coerce
    .number({ required_error: 'Number is required.' })
    .min(1, { message: 'Number cannot be less than 1.' })
    .max(10000000, { message: 'Number cannot exceed 10000000.' })
    .optional()
    .nullable(),
});