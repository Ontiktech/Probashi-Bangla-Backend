import express from 'express';
import { validateRequestBody } from '../../utils/validatiion.utils';
import { phoneNoSchema } from '../../schema/app-auth.schema';
import { login } from '../../controllers/app/auth.controller';

const appAuthRouter = express.Router();

// Define Routes
appAuthRouter.post('/login', validateRequestBody(phoneNoSchema), login);

export { appAuthRouter };
