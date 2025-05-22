import { Transaction } from 'sequelize';
import { AppUserRepository } from '../../db/rdb/repositories/app-user.repository';
import { datetimeYMDHis } from '../../utils/datetime.utils';
import { generateId } from '../../utils/id.utils';
import { CustomException } from '../../errors/CustomException.error';

export class AppUserAuthService {
  private appUserRepo: AppUserRepository;

  constructor() {
    this.appUserRepo = new AppUserRepository();
  }

  async appUserLogin(phoneNumber: string, transaction?: Transaction) {
    const appUser = await this.appUserRepo.findUserByPhone(phoneNumber);

    // STORE OTP AND SEND
    if (appUser && !appUser.isNewUser){
      const data = {
        lastLoginAt: datetimeYMDHis()
      }
      const updateUser = await this.appUserRepo.updateAppUser(data, appUser.id, transaction);
      console.log('updateUser', updateUser);
      return appUser
    }

    

    // if(phone !== "+61000000000"){
    //   const twilioVerifyServiceSid = getEnvVar('TWILIO_VERIFY_SERVICE_SID');
    //   const twilioAccountSid = getEnvVar('TWILIO_ACCOUNT_SID');
    //   const twilioAuthToken = getEnvVar('TWILIO_AUTH_TOKEN');

    //   const client = twilio(twilioAccountSid, twilioAuthToken);
    //   const verification = await client.verify.v2
    //     .services(twilioVerifyServiceSid)
    //     .verifications.create({
    //       channel: 'sms',
    //       to: phone,
    //     });

    //   // # For testing purposes only. Remove on prod.
    //   // const verification = {status: 'pending', valid: true}

    //   if (
    //     verification.status &&
    //     verification.status !== 'pending' &&
    //     !verification.valid
    //   )
    //     throw new CustomException(
    //       'Failed to generate OPT. Please try again.',
    //       500,
    //     );
    // }

    // const userData = await this.appUserRepo.getUserProfile(id);
    // const formattedData = formatLoginAppUserData(userData); // # Will need optimization later(fetches all tier_statuses. Should fetch 1 with highest order & latest date)

    return true
  }

  // async verifyOTP(
  //   to: string,
  //   otp: string,
  //   verifyAppUserId: string | null = null,
  // ) {
  //   const twilioVerifyServiceSid = getEnvVar('TWILIO_VERIFY_SERVICE_SID');
  //   const twilioAccountSid = getEnvVar('TWILIO_ACCOUNT_SID');
  //   const twilioAuthToken = getEnvVar('TWILIO_AUTH_TOKEN');
  //   const client = twilio(twilioAccountSid, twilioAuthToken);

  //   const verificationCheck = await client.verify.v2
  //     .services(twilioVerifyServiceSid)
  //     .verificationChecks.create({
  //       to: to,
  //       code: otp,
  //     });

  //   if (verificationCheck) {
  //     if (verificationCheck.status === 'approved' && verificationCheck.valid) {
  //       if (verifyAppUserId) {
  //         const data: UserUpdate = { verified: true };
  //         const updated = await this.appUserRepo.updateUser(
  //           data,
  //           verifyAppUserId,
  //         );
  //         if (!updated)
  //           throw new CustomException(
  //             'Something went wrong. Please try again.',
  //             500,
  //           );
  //         return await this.appUserRepo.getUserProfile(verifyAppUserId);
  //       }
  //       return true;
  //     }

  //     if (verificationCheck.status === 'failed')
  //       throw new BadRequestException('OTP mismatch!');

  //     if (verificationCheck.status === 'expired')
  //       throw new UnauthorizedException(
  //         'OTP expired! Please resend OTP and try again.',
  //       );

  //     if (verificationCheck.status === 'max_attempts_reached')
  //       throw new UnauthorizedException(
  //         'Too many attempts for current OTP! Please resend OTP and try again.',
  //       );

  //     // deleted || failed || pending || canceled
  //     throw new UnauthorizedException(
  //       'OTP mismatch! Please resend OTP and try again.',
  //     );
  //   }

  //   // fallback
  //   throw new UnauthorizedException(
  //     'This OTP has been deleted! Please resend OTP and try again.',
  //   );
  // }
  
  // async resendOtp(user: AppUserPayload, channel: string|null = ResendOTPChannel.PHONE) {
  //   const twilioVerifyServiceSid = getEnvVar('TWILIO_VERIFY_SERVICE_SID');
  //   const twilioAccountSid = getEnvVar('TWILIO_ACCOUNT_SID');
  //   const twilioAuthToken = getEnvVar('TWILIO_AUTH_TOKEN');
  //   const client = twilio(twilioAccountSid, twilioAuthToken);

  //   const appUsers = await this.appUserRepo.findUserById(user.id);

  //   let verification;
  //   if (channel === ResendOTPChannel.PHONE){
  //     if (!appUsers.phone)
  //       throw new BadRequestException(
  //         'Phone no. not set. Please set Phone no. and try again.',
  //       );

  //     verification = await client.verify.v2
  //       .services(twilioVerifyServiceSid)
  //       .verifications.create({
  //         channel: 'sms',
  //         to: appUsers.phone!,
  //       });
  //   }
  //   else if (channel === ResendOTPChannel.EMAIL){
  //     if (!appUsers.email)
  //       throw new BadRequestException(
  //         'Email not set. Please set email and try again.',
  //       );

  //     verification = await client.verify.v2
  //       .services(twilioVerifyServiceSid)
  //       .verifications.create({
  //         channel: 'email',
  //         to: appUsers.email,
  //       });
  //   }
  //   else if (channel === ResendOTPChannel.WHATSAPP){
  //     if (!appUsers.whatsapp_no)
  //       throw new BadRequestException(
  //         'Whatsapp number not set. Please set whatsapp no. and try again.',
  //       );

  //     verification = await client.verify.v2
  //       .services(twilioVerifyServiceSid)
  //       .verifications.create({
  //         channel: 'whatsapp',
  //         to: appUsers.whatsapp_no,
  //       });
  //   }

  //   if (
  //     verification &&
  //     verification.status &&
  //     verification.status !== 'pending' &&
  //     !verification.valid
  //   )
  //     throw new CustomException(
  //       'Failed to generate OPT. Please try again.',
  //       500,
  //     );

  //   // const otp = generateOtp();
  //   // await this.appUserRepo.setOtp(id, otp);
  //   return true;
  // }
}

