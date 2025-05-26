import { InferAttributes, InferCreationAttributes } from 'sequelize';
import { FlashCardViewedModel } from '../db/rdb/models';

export type FlashCardViewed = InferAttributes<FlashCardViewedModel>;

export type StoreFlashCardViewed = Partial<InferCreationAttributes<FlashCardViewedModel>> & {
  id: string
  appUserId: string
  flashCardId: string
  createdAt?: string | null
  updatedAt?: string | null
};

export type StoreFlashCardViewedData = Omit<StoreFlashCardViewed, 'id'>;

export type UpdateFlashCardViewedData = Partial<StoreFlashCardViewedData>;

export type FlashCardViewedWithTimestamps = FlashCardViewed & {
  createdAt: string
  updatedAt: string
};