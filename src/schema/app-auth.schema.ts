import { z } from 'zod';
import { imageValidationRule } from './common.schema';
import { AppUserService } from '../services/admin/app-user.services';

const appUserService = new AppUserService()

export const phoneNoSchema = z.object({
  phoneNo: z
    .string({ required_error: 'Phone number is required' })
    .trim()
    .min(3, { message: 'Phone number has to be at least 3 characters long.' })
    .max(255, { message: 'Phone number cannot exceed 255 characters.' }),
}).superRefine(async (data, ctx) => {
  const { phoneNo } = data;
  const appUserExists = await appUserService.userExistsByPhone(phoneNo)
  if (!appUserExists) {
    ctx.addIssue({
      code: 'custom',
      path: ['phoneNo'],
      message: 'User with this phone number doesn\'t exist.',
    });
  }
});

export const otpVerifySchema = z.object({
  otp: z
    .string({ required_error: 'OTP is required' })
    .trim()
    .min(6, { message: 'OTP has to be 6 characters long.' })
    .max(6, { message: 'OTP has to be 6 characters long.' }),
});

export type PhoneNoSchema = z.infer<typeof phoneNoSchema>;

export const appVerifyOtpSchema = z.object({
  otp: z
    .string()
    .min(6, { message: 'OTP has to be exactly 6 characters long.' })
    .max(6, { message: 'OTP has to be exactly 6 characters long.' })
    .regex(new RegExp(/^[0-9]*$/), {
      message: 'OTP can only contain numbers.',
    }),
  channel: z.string().optional().nullable()
});

export type AppVerifyOtpSchema = z.infer<typeof appVerifyOtpSchema>;

export const nameSchema = z.object({
  firstName: z
    .string({ required_error: 'First name is required' })
    .trim()
    .min(3, { message: 'First name has to be at least 3 characters long.' })
    .max(255, { message: 'First name cannot exceed 255 characters.' }),
  lastName: z
    .string({ required_error: 'Last name is required' })
    .trim()
    .min(3, { message: 'Last name has to be at least 3 characters long.' })
    .max(255, { message: 'Last name cannot exceed 255 characters.' }),
});

export type nameSchema = z.infer<typeof nameSchema>;

export const emailSchema = z.object({
  email: z
    .string({ required_error: 'Email is required.' })
    .email({ message: 'Invalid email format. Please provide a valid email.' })
    .min(1, { message: 'Email is required.' })
    .max(255, { message: 'Email cannot exceed 255 characters.' }),
});

export type EmailSchema = z.infer<typeof emailSchema>;

export const avtatarUrlSchama = z.object({
  avatar_url: z.array(imageValidationRule).optional().nullable(),
});

export type avtatarUrlSchama = z.infer<typeof avtatarUrlSchama>;
