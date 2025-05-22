import { z } from 'zod';
import { AppUserCourseService } from '../services/admin/app-user-course.services';
import { AppUserService } from '../services/admin/app-user.services';
import { CourseService } from '../services/admin/course.services';

const appUserService = new AppUserService()
const courseService = new CourseService()
const appUserCourseService = new AppUserCourseService()

export const enrollAppUserToCourseSchema = z.object({
  appUserId: z
    .string({ required_error: 'App user is required' })
    .trim()
    .max(255, { message: 'App user id cannot exceed 255 characters.' }),
  courseId: z
    .string({ required_error: 'Course is required' })
    .trim()
    .max(255, { message: 'Course id cannot exceed 255 characters.' }),
}).superRefine(async (data, ctx) => {
  const { appUserId, courseId } = data;

  const appUserExists = await appUserService.userExistsById(appUserId)
  if (!appUserExists) {
    ctx.addIssue({
      code: 'custom',
      path: ['appUserId'],
      message: 'User not found.',
    });
  }

  const courseExists = await courseService.courseExistsById(courseId)
  if (!courseExists) {
    ctx.addIssue({
      code: 'custom',
      path: ['courseId'],
      message: 'Course not found.',
    });
  }

  const appUserCourseExists = await appUserCourseService.appUserCourseExistsByAppUserIdAndCourseId(appUserId, courseId)
  if (appUserCourseExists) {
    ctx.addIssue({
      code: 'custom',
      path: ['appUserId'],
      message: 'User is already enrolled to this course.',
    });

    ctx.addIssue({
      code: 'custom',
      path: ['courseId'],
      message: 'User is already enrolled to this course',
    });
  }
});