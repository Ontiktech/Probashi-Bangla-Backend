import { Response } from 'express';
import { CustomException } from '../../errors/CustomException.error';
import { AppAuthenticatedRequest } from '../../types/authenticate.type';
import { AppUserStatisticsService } from '../../services/app/statistics.services';
import { groupByDay } from '../../utils/datetime.utils';

const appUserStatisticsService = new AppUserStatisticsService();

export async function viewAppUserStatistics(req: AppAuthenticatedRequest, res: Response) {
  try {
    const { wordsLearnedCount, wordsLearned } = await appUserStatisticsService.getStatistics(req.user!.id)

    const wordsLearnedGroupedByday = groupByDay(wordsLearned, 'createdAt')

    return res.json({
      data: {
        message: 'App user\'s statistics list.',
        statistics: {
          wordsLearnedCount: wordsLearnedCount,
          wordsLearned: wordsLearnedGroupedByday
        },
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