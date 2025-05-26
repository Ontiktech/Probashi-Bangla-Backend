import { Response } from 'express';
import { CustomException } from '../../errors/CustomException.error';
import { AppAuthenticatedRequest } from '../../types/authenticate.type';
import { LessonService } from '../../services/admin/lesson.services';
import { NotFoundException } from '../../errors/NotFoundException.error';

const lessonService = new LessonService();

export async function viewFlashCards(req: AppAuthenticatedRequest, res: Response) {
  try {
    const { lessonId } = req.params
    const response = await lessonService.viewFlashCards(lessonId)
    if(!response)
      throw new NotFoundException('Lesson not found.')

    // # enrolled in course check

    // # 
  
    return res.json({
      data: {
        message: 'App user\'s enrolled course details.',
        // course: response,
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