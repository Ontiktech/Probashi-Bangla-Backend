import express from 'express';
import { validateRequestBody } from '../../utils/validatiion.utils';
import { loginRequestSchema } from '../../schema/login.schema';
import { login } from '../../controllers/admin/auth.controller';

const adminAuthRouter = express.Router();

// Define Routes
adminAuthRouter.post('/login', validateRequestBody(loginRequestSchema), login);

export { adminAuthRouter };
