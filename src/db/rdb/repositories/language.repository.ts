import { Op, Transaction } from 'sequelize';
import { LanguageModel, DayModel } from '../models';
import { datetimeYMDHis } from '../../../utils/datetime.utils';
import { Language, StoreLanguage, UpdateLanguageData } from '../../../types/language.type';
export class LanguageRepository {
  constructor() {}
  async findLanguageById(id: string, select: string[]|null = null, withRelations: boolean = false): Promise<Language> {
    const options: any = {
      where: {
        id: id,
        deletedAt:{
          [Op.eq]: null
        }
      },
    }

    if(select && select.length > 0)
      options.attributes = select

    if(withRelations){
      options.include = [
        {
          as: 'days',
          model: DayModel,
          required: false,
          where: {
            deletedAt: {
              [Op.eq]: null
            }
          }
        },
      ];
    }

    return (await LanguageModel.findOne(options)) as unknown as Language;
  }

  async findLanguageByIds(ids: string[]): Promise<Language[]> {
    return (await LanguageModel.findAll({
      where: {
        id: {
          [Op.in]: ids,
          deletedAt:{
            [Op.eq]: null
          } 
        },
      },
    })) as unknown as Language[];
  }

  async languageExistsById(id: string): Promise<number> {
    return await LanguageModel.count({
      where: {
        id: id,
        deletedAt:{
          [Op.eq]: null
        }
      },
    });
  }

  async getAllLanguages(): Promise<Language[]> {
    return (await LanguageModel.findAll({
      where: {
        deletedAt: {
          [Op.eq]: null
        }
      },
      order: [['createdAt', 'DESC']],
    })) as unknown as Language[];
  }
  
  async getAllLanguagesWithOptions(select: string[]|null = null): Promise<Language[]> {
    const options: any = {};

    if(select && select.length > 0)
      options.attributes = select

    return (await LanguageModel.findAll(options));
  }

  async storeLanguage(data: StoreLanguage, transaction?: Transaction): Promise<Language> {
    const options: any = {};

    if(transaction) options.transaction = transaction;

    return await LanguageModel.create(data, options) as unknown as Language;
  }

  async updateLanguage(data: UpdateLanguageData, id: string, transaction?: Transaction): Promise<Language> {
    const options: any = {
      where: {
        id: id,
      },
    };

    if(transaction) options.transaction = transaction;

    return (await LanguageModel.update(data, options)) as unknown as Language;
  }

  async deleteLanguage(id: string, deletedBy: string, transaction?: Transaction): Promise<Language> {
    const options: any = {
      where: {
        id: id,
      },
    };

    if(transaction) options.transaction = transaction;

    return await LanguageModel.update({ deletedAt: datetimeYMDHis(), deletedBy: deletedBy }, options) as unknown as Language;
  }

  async hardDeleteById(id: string, transaction?: Transaction): Promise<Language> {
    const options: any = {
      where: {
        id: id,
      },
    };

    if(transaction) options.transaction = transaction;

    return (await LanguageModel.destroy(options)) as unknown as Language;
  }
}
