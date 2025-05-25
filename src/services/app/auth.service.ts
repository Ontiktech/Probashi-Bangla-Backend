import { Transaction } from 'sequelize';
import { AppUserRepository } from '../../db/rdb/repositories/app-user.repository';
import { datetimeYMDHis } from '../../utils/datetime.utils';
import { NotFoundException } from '../../errors/NotFoundException.error';

export class AppUserAuthService {
  private appUserRepo: AppUserRepository;

  constructor() {
    this.appUserRepo = new AppUserRepository();
  }

  async appUserLogin(phoneNumber: string, transaction?: Transaction) {
    const appUser = await this.appUserRepo.findUserByPhone(phoneNumber);

    if (!appUser)
      throw new NotFoundException('User with this phone number not found.')

    let isNewUser = appUser.isNewUser
    let data = {}

    if (appUser.isNewUser){
      data = { isNewUser: false }
      isNewUser = false
    }

    // STORE OTP AND SEND
    if (!isNewUser)
      data = { ...data, lastLoginAt: datetimeYMDHis() }

    const updateUser = await this.appUserRepo.updateAppUser(data, appUser.id, transaction);
    console.log('updateUser', updateUser);

    // isEmptyObject

    return appUser
  }
}

