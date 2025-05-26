import { InferAttributes, InferCreationAttributes } from 'sequelize';
import { AppUserCourseModel } from '../db/rdb/models';
import { CourseWithTimestamps } from './course.type';
import { DayWithTimestamps } from './day.type';
import { LessonWithTimestamps } from './lesson.type';

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

export type AppUserCourseWithCourseAndTimestamps = AppUserCourse & {
  createdAt: string;
  updatedAt: string;
  course: CourseWithTimestamps & {
    days: { 
      id: string; 
      lessons: { 
        id: string 
      }[]
    }[];
  };
};

export type UpdateAppUserCourseData = Partial<StoreAppUserCourseData>;

export type AppUserEnrolledCourseDetails = Omit<AppUserCourse, 'updatedBy'|'deletedAt'|'deletedBy'|'createdAt'|'updatedAt'> & {
  course: Omit<CourseWithTimestamps, 'language'|'targetLanguage'|'updatedBy'|'deletedAt'|'deletedBy'|'createdAt'|'updatedAt'> & {
    days: Omit<DayWithTimestamps, 'updatedBy'|'deletedAt'|'deletedBy'|'createdAt'|'updatedAt'> & {
      lesson: Omit<LessonWithTimestamps, 'audioIntro'|'updatedBy'|'deletedAt'|'deletedBy'|'createdAt'|'updatedAt'>
    }
  }
};