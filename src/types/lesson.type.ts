import { InferAttributes, InferCreationAttributes } from 'sequelize';
import { LessonModel } from '../db/rdb/models/lesson.model';

export type Lesson = InferAttributes<LessonModel>;

export type StoreLesson = Partial<InferCreationAttributes<LessonModel>> & {
  id: string
  dayId: string
  lessonOrder: number
  title: string
  estimatedMinutes: number
  updatedBy: string
  createdAt?: string | null
  updatedAt?: string | null
};

export type StoreLessonData = Omit<StoreLesson, 'id'>;

export type UpdateLessonData = Partial<StoreLessonData>;

export type LessonWithTimestamps = Lesson & {
  createdAt: string
  updatedAt: string
};


export type LessonWithFlashCards = Omit<LessonWithTimestamps, 'id'|''|'updatedBy'|'deletedAt'|'deletedBy'>


  // declare id: string
  // declare dayId: string
  // declare lessonOrder: number
  // declare title: string
  // declare description: CreationOptional<string | null>
  // declare estimatedMinutes: number
  // declare difficulty: CreationOptional<string>
  // declare audioIntro: CreationOptional<string | null>
  // // declare xpReward: CreationOptional<number>
  // declare updatedBy: string
  // declare deletedAt: CreationOptional<string | null>
  // declare deletedBy: CreationOptional<string | null>