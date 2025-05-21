import { AdminUserModel } from '../db/rdb/models';
import { InferAttributes, InferCreationAttributes } from 'sequelize';

export type AdminUser = InferAttributes<AdminUserModel>;

export type StoreAdminUser = InferCreationAttributes<AdminUserModel> & {
  createdAt?: string | null
  updatedAt?: string | null
};

export type StoreAdminUserData = Omit<StoreAdminUser, 'id'>;

export type UpdateAdminUserData = Partial<StoreAdminUserData>;