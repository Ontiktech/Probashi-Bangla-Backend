import { Response } from 'express';
import { CustomException } from '../../errors/CustomException.error';
import { AppAuthenticatedRequest } from '../../types/authenticate.type';
import { LessonService } from '../../services/admin/lesson.services';
import { NotFoundException } from '../../errors/NotFoundException.error';
import { BadRequestException } from '../../errors/BadRequestException.error';
import { FlashCardViewedService } from '../../services/app/flash-cards-viewed.services';
import { FlashCardService } from '../../services/admin/flash-card.services';

const lessonService = new LessonService();
const flashCardService = new FlashCardService();
const flashCardViewedService = new FlashCardViewedService();

export async function viewFlashCards(req: AppAuthenticatedRequest, res: Response) {
  try {
    const { lessonId } = req.params
    const response = await lessonService.viewFlashCards(lessonId, req.user!.id)
    if(!response)
      throw new NotFoundException('Lesson not found.')
    if(response.day.course.user_courses.length === 0)
      throw new BadRequestException('You are not part of this course.')

    response.flash_cards = response.flash_cards.sort((a, b) => a.cardOrder - b.cardOrder)

    return res.json({
      data: {
        message: 'App user\'s enrolled course details.',
        flashCards: response.flash_cards,
      },
      statusCode: 200,
    });
  } catch (error) {
    console.log('viewFlashCards', error);
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

export async function storeFlashCardViewed(req: AppAuthenticatedRequest, res: Response) {
  try {
    const { flashCardId } = req.body
    const flashCard = await flashCardService.flashCardExistsById(flashCardId)
    if(!flashCard)
      throw new NotFoundException('Flash card not found.')

    const flashCardViewed = await flashCardViewedService.findFlashCardViewedByFlashCardIdAndAppUserId(flashCardId, req.user!.id)
    let storeflashCard = null
    if(!flashCardViewed){
      const storeData = {
        appUserId: req.user!.id,
        flashCardId: flashCardId
      }
      storeflashCard = await flashCardViewedService.storeFlashCardViewed(storeData)
      if(!storeflashCard)
        throw new CustomException('Failed to store flash card viewed.', 500)
    }

    return res.json({
      data: {
        message: 'Stored flash card viewed.',
      },
      statusCode: 200,
    });
  } catch (error) {
    console.log('storeFlashCardViewed', error);
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