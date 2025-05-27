import express from 'express';
import { validateRequestBody } from '../../utils/validatiion.utils';
import { JwtMiddleware } from '../../middleware/jwt.middleware';
import { editProfileSchema, updateAvtatarUrlSchama } from '../../schema/app-auth.schema';
import { editAvatar, editProfile, getProfile } from '../../controllers/app/app-user.controller';
import { appUserFileUploaderMiddleware } from '../../fileUploaders/app-user.fileUploaders';

const AppUserProfileRouter = express.Router();
const jwtMiddleware = new JwtMiddleware();

// Define Routes
AppUserProfileRouter.get('/get-profile', jwtMiddleware.verifyAppUserToken, getProfile);
AppUserProfileRouter.patch(
  '/edit-profile',
  jwtMiddleware.verifyAppUserToken,
  validateRequestBody(editProfileSchema),
  editProfile,
);
AppUserProfileRouter.patch(
  '/edit-avatar',
  jwtMiddleware.verifyAppUserToken,
  appUserFileUploaderMiddleware,
  validateRequestBody(updateAvtatarUrlSchama),
  editAvatar,
);

export { AppUserProfileRouter };
