import { InferAttributes, InferCreationAttributes } from 'sequelize';
import { AppUserCourseModel } from '../db/rdb/models';

export type AppUserCourse = InferAttributes<AppUserCourseModel>;

export type StoreAppUserCourse = InferCreationAttributes<AppUserCourseModel> & {
  createdAt?: string | null
  updatedAt?: string | null
};

export type StoreAppUserCourseData = Omit<StoreAppUserCourse, 'id'>;

export type UpdateAppUserCourseData = Partial<StoreAppUserCourseData>;