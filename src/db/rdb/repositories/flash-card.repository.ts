import { Op, Transaction } from 'sequelize';
import { datetimeYMDHis } from '../../../utils/datetime.utils';
import { FlashCardModel } from '../models/flash-card.model';
import { FlashCard, StoreFlashCard, UpdateFlashCardData } from '../../../types/flash-card.type';
export class FlashCardRepository {
  constructor() {}
  async findFlashCardById(id: string, select: string[]|null = null, withRelations: boolean = false): Promise<FlashCard> {
    const options: any = {
      where: {
        id: id,
        deletedAt:{
          [Op.eq]: null
        } 
      },
    }

    if(select)
      options.attributes = select

    // # TODO: ESTABLISH ANY RELATIONS LATER IF NEED BE
    // if(withRelations){
    //   options.include = [
    //     {
    //       as: 'flashCards',
    //       model: FlashCardModel,
    //       where: {
    //         deletedAt: {
    //           [Op.eq]: null
    //         }
    //       }
    //     },
    //   ];
    // }

    return (await FlashCardModel.findOne(options)) as unknown as FlashCard;
  }

  async findFlashCardByIds(ids: string[]): Promise<FlashCard[]> {
    return (await FlashCardModel.findAll({
      where: {
        id: {
          [Op.in]: ids,
          deletedAt:{
            [Op.eq]: null
          } 
        },
      },
    })) as unknown as FlashCard[];
  }

  async flashCardExistsById(id: string): Promise<number> {
    return await FlashCardModel.count({
      where: {
        id: id,
        deletedAt:{
          [Op.eq]: null
        }
      },
    });
  }

  async getAllFlashCards(): Promise<FlashCard[]> {
    return (await FlashCardModel.findAll({
      where: {
        deletedAt: {
          [Op.eq]: null
        }
      },
      order: [['createdAt', 'DESC']],
    })) as unknown as FlashCard[];
  }

  async storeFlashCard(data: StoreFlashCard, transaction?: Transaction): Promise<FlashCard> {
    const options: any = {};

    if(transaction) options.transaction = transaction;

    return await FlashCardModel.create(data, options) as unknown as FlashCard;
  }

  async updateFlashCard(data: UpdateFlashCardData, id: string, transaction?: Transaction): Promise<FlashCard> {
    const options: any = {
      where: {
        id: id,
      },
    };

    if(transaction) options.transaction = transaction;

    return (await FlashCardModel.update(data, options)) as unknown as FlashCard;
  }

  async deleteFlashCard(id: string, deletedBy: string, transaction?: Transaction): Promise<FlashCard> {
    const options: any = {
      where: {
        id: id,
      },
    };

    if(transaction) options.transaction = transaction;

    return await FlashCardModel.update({ deletedAt: datetimeYMDHis(), deletedBy: deletedBy }, options) as unknown as FlashCard;
  }

  async hardDeleteById(id: string): Promise<FlashCard> {
    return (await FlashCardModel.destroy({
      where: {
        id: id,
      },
    })) as unknown as FlashCard;
  }

  async getAllFlashCardsWithOptions(select: string[]|null = null): Promise<FlashCard[]> {
    const options: any = {};

    if(select && select.length > 0)
      options.attributes = select

    return (await FlashCardModel.findAll(options));
  }

  async dayWithCardOrderExists(dayId: string, cardOrder : number): Promise<number> {
    return await FlashCardModel.count({
      where: {
        dayId: dayId,
        cardOrder: cardOrder,
        deletedAt:{
          [Op.eq]: null
        }
      },
    });
  }
}
