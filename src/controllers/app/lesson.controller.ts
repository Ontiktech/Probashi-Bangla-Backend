import { Response } from 'express';
import { CustomException } from '../../errors/CustomException.error';
import { AppAuthenticatedRequest } from '../../types/authenticate.type';
import { LessonService } from '../../services/admin/lesson.services';
import { NotFoundException } from '../../errors/NotFoundException.error';
import { BadRequestException } from '../../errors/BadRequestException.error';

const lessonService = new LessonService();

export async function viewFlashCards(req: AppAuthenticatedRequest, res: Response) {
  try {
    const { lessonId } = req.params
    const response = await lessonService.viewFlashCards(lessonId, req.user!.id)
    if(!response)
      throw new NotFoundException('Lesson not found.')
    if(response.day.course.user_courses.length === 0)
      throw new BadRequestException('You are not part of this lesson\'s course.')

    // response.day.course = response.day.course
    //   .sort((a, b) => a.dayNumber - b.dayNumber)
    //   .map((day) => ({
    //     ...day,
    //     lessons: day.lessons.sort((a, b) => a.lessonOrder - b.lessonOrder),
    //   }))

    // # Sort Flash Cards by cardOrder
    // # If closed mid-session, resume(Not sure if needed)
    // # Entry for if 1) flash-card is viewed 2) Lesson is completed 3) Day is completed
  
    return res.json({
      data: {
        message: 'App user\'s enrolled course details.',
        flashCards: response,
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