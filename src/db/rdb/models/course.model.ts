import { Difficulty, Languages } from '../../../constants/enums';
import { UserClient } from '../../clients/postgres.client';
import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';

const sequelize = UserClient.getInstance();

class CourseModel extends Model<
  InferAttributes<CourseModel>,
  InferCreationAttributes<CourseModel>
> {
  declare id: string
  declare title: string
  declare description: CreationOptional<string | null>
  declare totalDays: number
  declare language: CreationOptional<string>
  declare targetLanguage: CreationOptional<string>
  declare difficulty: CreationOptional<string | null>
  declare imagePath: string
  declare estimatedHours: CreationOptional<number | null>
  declare updatedBy: string
  declare deletedAt: CreationOptional<string | null>
  declare deletedBy: CreationOptional<string | null>
}

CourseModel.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      unique: true,
    },
    description: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
    totalDays: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    language: {
      type: DataTypes.ENUM(
        Languages.ENGLISH,
        Languages.FRENCH,
        Languages.SPANISH
      ),
      allowNull: false,
      defaultValue: Languages.ENGLISH,
    },
    targetLanguage: {
      type: DataTypes.ENUM(
        Languages.ENGLISH,
        Languages.SPANISH,
        Languages.FRENCH,
        Languages.GERMAN,
        Languages.ITALIAN,
        Languages.PORTUGUESE,
        Languages.RUSSIAN,
        Languages.MANDARIN,
        Languages.JAPANESE,
        Languages.KOREAN,
        Languages.ARABIC,
      ),
      allowNull: false,
      defaultValue: Languages.ENGLISH,
    },
    difficulty: {
      type: DataTypes.ENUM(
        Difficulty.BEGINNER,
        Difficulty.ELEMENTARY,
        Difficulty.INTERMEDIATE,
        Difficulty.ADVANCED,
      ),
      allowNull: false,
      defaultValue: Difficulty.BEGINNER,
    },
    imagePath: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    estimatedHours: {
      type: DataTypes.INTEGER,
      allowNull: false,
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
    tableName: 'courses',
    sequelize,
    timestamps: true,
  },
);

export { CourseModel };
