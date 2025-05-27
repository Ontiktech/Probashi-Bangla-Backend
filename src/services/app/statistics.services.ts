import { FlashCardViewedRepository } from "../../db/rdb/repositories/flash-card-viewed.repository";
import { datetimeYMDHis } from "../../utils/datetime.utils";

export class AppUserStatisticsService {
  private flashCardViewedRepositoryRepository: FlashCardViewedRepository;

  constructor() {
    this.flashCardViewedRepositoryRepository = new FlashCardViewedRepository();
  }

  async getStatistics(appUserId: string) {
    const wordsLearnedCount = await this.flashCardViewedRepositoryRepository.getAllFlashCardViewedByAppUserCount(appUserId);

    const afterDate = datetimeYMDHis(null, 'days', 4, 'before', 'startOfDay');
    const wordsLearned = await this.flashCardViewedRepositoryRepository.getFlashCardViewedByAppUser(appUserId, afterDate);

    return { wordsLearnedCount, wordsLearned }
  }
}
