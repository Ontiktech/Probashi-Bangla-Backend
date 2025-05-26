import { Response } from 'express';
import { CustomException } from '../../errors/CustomException.error';
import { AppAuthenticatedRequest } from '../../types/authenticate.type';
import { FilterLanguage } from '../../constants/enums';
import { AppUserCourseService } from '../../services/admin/app-user-course.services';
import { formatViewEnrolledCourses } from '../../formatter/app-user-course.formatter';

const appUserCourseService = new AppUserCourseService();

export async function viewEnrolledCourses(req: AppAuthenticatedRequest, res: Response) {
  try {
    const language = (req.query.language || req.query.language === FilterLanguage.EMPTY) ? req.query.language.toString() : FilterLanguage.ALL
    const searchText = req.query.searchText ? req.query.searchText.toString() : undefined
    const page = req.query.page ? Number(req.query.page) : 1
    const number = req.query.number ? Number(req.query.number) : 10
    const limit = number
    const offset = (page - 1) * number

    const { next, data} = await appUserCourseService.viewEnrolledCourses(req.user!.id, limit, offset, language, searchText);
  
    return res.json({
      data: {
        message: 'App user\'s enrolled course list.',
        next: next,
        courses: formatViewEnrolledCourses(data),
      },
      statusCode: 200,
    });
  } catch (error) {
    console.log('viewEnrolledCourses', error);
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