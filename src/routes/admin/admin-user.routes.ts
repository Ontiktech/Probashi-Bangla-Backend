import express from 'express';
import { JwtMiddleware } from '../../middleware/jwt.middleware';
import { getAllAdminUsers, getSingleAdminUser, updateAdmin } from '../../controllers/admin/admin-user.controller';
import { updateAdminUserSchema } from '../../schema/admin-user.schema';
import { validateRequestBody } from '../../utils/validatiion.utils';

const adminUserRouter = express.Router();
const jwtMiddleware = new JwtMiddleware();

adminUserRouter.get('/', jwtMiddleware.verifyToken, getAllAdminUsers);
adminUserRouter.get('/:id', jwtMiddleware.verifyToken, getSingleAdminUser);
adminUserRouter.patch(
  '/:id',
  jwtMiddleware.verifyToken,
  validateRequestBody(updateAdminUserSchema),
  updateAdmin,
);

export { adminUserRouter };
