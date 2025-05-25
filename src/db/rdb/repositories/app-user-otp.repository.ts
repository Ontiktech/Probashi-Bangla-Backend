import { Op, Transaction } from 'sequelize';
import { AppUserOTPModel } from '../models';
import { datetimeYMDHis } from '../../../utils/datetime.utils';
import { AppUserOTP, StoreAppUserOTP, UpdateAppUserOTPData } from '../../../types/app-user-otp.type';
export class AppUserOTPRepository {
  constructor() {}
  async createAppUserOTP(user: StoreAppUserOTP, transaction?: Transaction): Promise<AppUserOTP> {
      const createdUser = await AppUserOTPModel.create(user, {
        transaction: transaction,
      });
      return createdUser;
  }

  async findAppUserOTPById(id: string, select: string[]|null = null): Promise<AppUserOTP> {
    const options: any = {
      where: {
        id: id,
        deletedAt:{
          [Op.eq]: null
        } 
      },
    }

    if(select){
      options.attributes = select
    }

    return (await AppUserOTPModel.findOne(options)) as unknown as AppUserOTP;
  }

  async findAppUserOTPByIds(ids: string[]): Promise<AppUserOTP[]> {
    return (await AppUserOTPModel.findAll({
      where: {
        id: {
          [Op.in]: ids,
          deletedAt:{
            [Op.eq]: null
          } 
        },
      },
    })) as unknown as AppUserOTP[];
  }

  async userExistsById(id: string): Promise<number> {
    return await AppUserOTPModel.count({
      where: {
        id: id,
      },
    });
  }

  async findAppUserOTPByEmail(email: string, exceptId: string | null = null): Promise<AppUserOTP> {
    const options: any = {
      where: {
        email: email,
        deletedAt:{
          [Op.eq]: null
        }
      },
    };

    if (exceptId) options.where.id = { [Op.ne]: exceptId };

    return (await AppUserOTPModel.findOne(options)) as unknown as AppUserOTP;
  }

  async appUserOTPExistsByEmail(email: string, exceptId: string | null = null): Promise<AppUserOTP> {
    const options: any = {
      where: {
        email: email,
      },
    };
    if (exceptId) options.where.id = { [Op.ne]: exceptId };

    return (await AppUserOTPModel.count(options)) as unknown as AppUserOTP;
  }

  async findAppUserOTPByPhone(phoneNumber: string, exceptId: string | null = null): Promise<AppUserOTP> {
    const options: any = {
      where: {
        phoneNumber: phoneNumber,
      },
    };
    if (exceptId) options.where.id = { [Op.ne]: exceptId };

    return (await AppUserOTPModel.findOne(options)) as unknown as AppUserOTP;
  }

  async appUserOTPExistsByPhone(phoneNumber: string, exceptId: string | null = null): Promise<AppUserOTP> {
    const options: any = {
      where: {
        phoneNumber: phoneNumber,
      },
    };
    if (exceptId) options.where.id = { [Op.ne]: exceptId };

    return (await AppUserOTPModel.count(options)) as unknown as AppUserOTP;
  }

  // async nullifyUserOtp(id: string): Promise<AppUserOTP> {
  //   return (await AppUserOTPModel.update(
  //     {
  //       otp: null,
  //       otp_expires_at: null,
  //     },
  //     {
  //       where: {
  //         id: id,
  //       },
  //     },
  //   )) as unknown as AppUserOTP;
  // }

  // async setOtp(id: string, otp: string): Promise<AppUserOTP> {
  //   const otp_validity = Number(getEnvVar('OTP_EXPIRY'));
  //   return (await AppUserOTPModel.update(
  //     {
  //       // otp: otp,
  //       otp_expires_at: datetimeYMDHis(null, 'mins', otp_validity),
  //     },
  //     {
  //       where: {
  //         id: id,
  //       },
  //     },
  //   )) as unknown as AppUserOTP;
  // }

  async getAllAppUserOTPs(): Promise<AppUserOTP[]> {
    return (await AppUserOTPModel.findAll({
      order: [['createdAt', 'DESC']],
    })) as unknown as AppUserOTP[];
  }

  async storeAppUserOTP(data: StoreAppUserOTP, transaction?: Transaction): Promise<AppUserOTP> {
    const options: any = {};

    if(transaction) options.transaction = transaction;

    return await AppUserOTPModel.create(data, options) as unknown as AppUserOTP;
  }

  async updateAppUserOTP(data: UpdateAppUserOTPData, id: string, transaction?: Transaction): Promise<AppUserOTP> {
    const options: any = {
      where: {
        id: id,
      },
    };

    if(transaction) options.transaction = transaction;

    return (await AppUserOTPModel.update(data, options)) as unknown as AppUserOTP;
  }

  async deleteAppUserOTP(id: string, transaction?: Transaction): Promise<AppUserOTP> {
    return this.hardDeleteById(id, transaction);
  }

  async hardDeleteById(id: string, transaction?: Transaction): Promise<AppUserOTP> {
    const options: any = {
      where: {
        id: id,
      },
    };

    if(transaction) options.transaction = transaction;

    return (await AppUserOTPModel.destroy(options)) as unknown as AppUserOTP;
  }

  async getAllAppUserOTPsWithOptions(select: string[]|null = null): Promise<AppUserOTP[]> {
    const options: any = {};

    if(select && select.length > 0)
      options.attributes = select

    return (await AppUserOTPModel.findAll(options));
  }

  async getPaginatedAppUserOTPs(limit: number, offset: number, orderBy: string): Promise<AppUserOTP[]> {
    const options: any = {
      limit: limit,
      offset: offset,
      orderBy: orderBy,
    };

    return await AppUserOTPModel.findAll(options);
  }
}
