import express from 'express';
import { validateRequestBody } from '../../utils/validatiion.utils';
import { JwtMiddleware } from '../../middleware/jwt.middleware';
import { viewEnrolledCourses } from '../../controllers/app/course.controller';
import { viewEnrolledCoursesFilterSchema } from '../../schema/app-user-enrolled-course.schema';

const AppCourseRouter = express.Router();
const jwtMiddleware = new JwtMiddleware();

// Define Routes
AppCourseRouter.get('/viewEnrolledCourses', jwtMiddleware.verifyAppUserToken, validateRequestBody(viewEnrolledCoursesFilterSchema), viewEnrolledCourses);
// AppCourseRouter.patch(
//   '/editAvatar',
//   jwtMiddleware.verifyAppUserToken,
//   validateRequestBody(updateAvtatarUrlSchama),
//   editAvatar,
// );

export { AppCourseRouter };
