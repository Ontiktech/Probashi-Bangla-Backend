import express from 'express';
import { JwtMiddleware } from '../../middleware/jwt.middleware';
import { appUserEnrolled, createAppUser, deleteAppUser, enrollAppUserToCourse, getAllAppUsers, getSingleAppUser, updateAppUser } from '../../controllers/admin/app-user.controller';
import { validateRequestBody } from '../../utils/validatiion.utils';
import { createAppUserSchema, updateAppUserSchema } from '../../schema/app-user.schema';
import { appUserFileUploaderMiddleware } from '../../fileUploaders/app-user.fileUploaders';
import { enrollAppUserToCourseSchema } from '../../schema/enroll-app-user-to-course.schema';

const appUserRouter = express.Router();
const jwtMiddleware = new JwtMiddleware();

appUserRouter.get('/', jwtMiddleware.verifyToken, getAllAppUsers);
appUserRouter.get('/:id', jwtMiddleware.verifyToken, getSingleAppUser);
appUserRouter.post(
  '/',
  jwtMiddleware.verifyToken,
  appUserFileUploaderMiddleware,
  validateRequestBody(createAppUserSchema),
  createAppUser,
);
appUserRouter.patch(
  '/:id',
  jwtMiddleware.verifyToken,
  appUserFileUploaderMiddleware,
  validateRequestBody(updateAppUserSchema),
  updateAppUser,
);
appUserRouter.delete('/:id', jwtMiddleware.verifyToken, deleteAppUser);

appUserRouter.post(
  '/enroll',
  jwtMiddleware.verifyToken,
  validateRequestBody(enrollAppUserToCourseSchema),
  enrollAppUserToCourse,
);

appUserRouter.get(
  '/enrolled_courses/:id',
  jwtMiddleware.verifyToken,
  appUserEnrolled,
);

appUserRouter.get(
  '/enrolled_courses/:id',
  jwtMiddleware.verifyToken,
  appUserEnrolled,
);

export { appUserRouter };
