import express from 'express';
import { validateRequestBody } from '../../utils/validatiion.utils';
import { adminUserLoginRequestSchema } from '../../schema/admin-login.schema';
import { login } from '../../controllers/admin/auth.controller';

const adminAuthRouter = express.Router();

// Define Routes
adminAuthRouter.post('/login', validateRequestBody(adminUserLoginRequestSchema), login);

export { adminAuthRouter };
