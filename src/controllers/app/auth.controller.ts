// import { AppUserPayload } from '../../schema/token-payload.schema';
// import { generateToken } from '../../utils/jwt.utils';
import { Request, Response } from 'express';
import { CustomException } from '../../errors/CustomException.error';
import { AppUserAuthService } from '../../services/app/auth.service';
import { UserClient } from '../../db/clients/postgres.client';
import { generateToken } from '../../utils/jwt.utils';

const appUserAuthService = new AppUserAuthService();

const sequelize = UserClient.getInstance();

export async function login(req: Request, res: Response) {
  try {
    console.log('body', req.body);
    const { phoneNo } = req.body // NOTE: using phoneNo instead of phoneNumber
    const response = await appUserAuthService.appUserLogin(phoneNo);

    const user = {
      id: response.id,
      firstName: response.firstName,
      lastName: response.lastName,
      email: response.email,
      phoneNumber: response.phoneNumber,
    } as AppUserPayload

    const token = generateToken(user);
  
    return res.json({
      data: {
        message: 'Login successful.',
        jwt: token,
        user: response,
      },
      statusCode: 200,
    });
  } catch (error) {
    console.log('app user login', error);
    if (error instanceof CustomException) {
      return res.status(error.statusCode).json({
        error: {
          message: error.message,
        },
        code: error.statusCode,
      });
    }

    return res.status(500).json({
      error: {
        message: 'Something went wrong! Please try again.',
      },
      statusCode: 500,
    });
  }
}
