import { InferAttributes, InferCreationAttributes } from 'sequelize';
import { FlashCardModel } from '../db/rdb/models/flash-card.model';

export type FlashCard = InferAttributes<FlashCardModel>;

export type StoreFlashCard = InferCreationAttributes<FlashCardModel> & {
  createdAt?: string | null
  updatedAt?: string | null
};

export type StoreFlashCardData = Omit<StoreFlashCard, 'id'>;

export type UpdateFlashCardData = Partial<StoreFlashCardData>;