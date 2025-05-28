import { Transaction } from 'sequelize';
import { generateId } from '../../utils/id.utils';
import { LanguageRepository } from '../../db/rdb/repositories/language.repository';
import { StoreLanguageData, UpdateLanguageData } from '../../types/language.type';

export class LanguageService {
  private languageRepo: LanguageRepository;

  constructor() {
    this.languageRepo = new LanguageRepository();
  }

  async findLanguageById(id: string, select: string[]|null = null, withRelations: boolean = false) {
    return await this.languageRepo.findLanguageById(id, select, withRelations);
  }

  async languageExistsById(id: string) {
    return await this.languageRepo.languageExistsById(id);
  }

  async getAllLanguages() {
    return await this.languageRepo.getAllLanguages();
  }

  async getAllLanguagesWithOptions(select: string[]|null = null) {
    return await this.languageRepo.getAllLanguagesWithOptions(select);
  }

  async storeLanguage(data: StoreLanguageData, transaction?: Transaction) {
    return await this.languageRepo.storeLanguage({ id: generateId(), ...data }, transaction);
  }

  async updateLanguage(data: UpdateLanguageData, id: string, transaction?: Transaction) {
    return await this.languageRepo.updateLanguage(data, id, transaction);
  }

  async deleteLanguage(id: string, deletedBy: string, transaction?: Transaction) {
    return await this.languageRepo.deleteLanguage(id, deletedBy, transaction);
  }
}
