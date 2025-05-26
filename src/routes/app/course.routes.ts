import express from 'express';
import { validateRequestBody } from '../../utils/validatiion.utils';
import { JwtMiddleware } from '../../middleware/jwt.middleware';
import { viewEnrolledCourseDetails, viewEnrolledCourses } from '../../controllers/app/course.controller';
import { viewEnrolledCoursesFilterSchema } from '../../schema/app-user-enrolled-course.schema';

const AppCourseRouter = express.Router();
const jwtMiddleware = new JwtMiddleware();

// Define Routes
AppCourseRouter.get('/viewEnrolledCourses', jwtMiddleware.verifyAppUserToken, validateRequestBody(viewEnrolledCoursesFilterSchema), viewEnrolledCourses);
AppCourseRouter.get('/viewEnrolledCourseDetails/:id', jwtMiddleware.verifyAppUserToken, viewEnrolledCourseDetails);

export { AppCourseRouter };
