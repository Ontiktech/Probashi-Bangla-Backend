import { InferAttributes, InferCreationAttributes } from 'sequelize';
import { CourseModel } from '../db/rdb/models';

export type Course = InferAttributes<CourseModel>;

export type StoreCourse = Partial<InferCreationAttributes<CourseModel>> & {
  id: string
  title: string
  totalDays: number
  imagePath: string
  updatedBy: string
  createdAt?: string | null
  updatedAt?: string | null
};

export type StoreCourseData = Omit<StoreCourse, 'id'>;

export type UpdateCourseData = Partial<StoreCourseData>;

export type CourseWithTimestamps = InferAttributes<CourseModel> & {
  createdAt: string
  updatedAt: string
};