import { InferAttributes, InferCreationAttributes } from 'sequelize';
import { AppUserCourseModel } from '../db/rdb/models';

export type AppUserCourse = InferAttributes<AppUserCourseModel>;

export type StoreAppUserCourse = InferCreationAttributes<AppUserCourseModel> & {
  id: string
  appUserId: string
  courseId: string
  updatedBy: string
  createdAt?: string | null
  updatedAt?: string | null
};

export type StoreAppUserCourseData = Omit<StoreAppUserCourse, 'id'>;

export type BulkStoreAppUserCourseData = Omit<StoreAppUserCourse, "id"> & {
  id?: string
};

export type UpdateAppUserCourseData = Partial<StoreAppUserCourseData>;