import { UserClient } from '../../clients/postgres.client';
import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
} from 'sequelize';

const sequelize = UserClient.getInstance();

class FlashCardModel extends Model<
  InferAttributes<FlashCardModel>,
  InferCreationAttributes<FlashCardModel>
> {
  declare id: string
  declare lessonId: string
  declare frontText: string
  declare frontSubtext: string | null
  declare backText: string
  declare backSubtext: string | null
  declare example: string | null
  declare exampleTranslation: string | null
  declare usageNotes: string | null
  declare imageUrl: string | null
  declare audioUrl: string | null
  declare cardOrder: number
  declare updatedBy: string
  declare deletedAt: string | null
  declare deletedBy: string | null
}

FlashCardModel.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    lessonId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cardOrder: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    frontText: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    frontSubtext: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
    backText: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    backSubtext: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
    example: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
    exampleTranslation: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
    usageNotes: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
    imageUrl: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
    audioUrl: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
    updatedBy: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    deletedAt: {
      type: DataTypes.DATE,
      defaultValue: null,
    },
    deletedBy: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
  },
  {
    tableName: 'flash_cards',
    sequelize,
    timestamps: true,
  },
);

export { FlashCardModel };
