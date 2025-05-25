import express from 'express';
import { validateRequestBody } from '../../utils/validatiion.utils';
import { otpVerifySchema, phoneNoSchema } from '../../schema/app-auth.schema';
import { login, verifyOTP } from '../../controllers/app/auth.controller';
import { JwtMiddleware } from '../../middleware/jwt.middleware';

const appAuthRouter = express.Router();
const jwtMiddleware = new JwtMiddleware();

// Define Routes
appAuthRouter.post('/login', validateRequestBody(phoneNoSchema), login);
appAuthRouter.post('/verifyOTP', jwtMiddleware.verifyAppUserTokenWithoutOTPVerification, validateRequestBody(otpVerifySchema), verifyOTP);

export { appAuthRouter };
