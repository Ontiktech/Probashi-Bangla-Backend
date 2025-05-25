import { Op, Transaction } from 'sequelize';
import { AppUserCourseModel, AppUserModel, CourseModel } from '../models';
import { AppUserCourse, UpdateAppUserCourseData, StoreAppUserCourse } from '../../../types/app-user-course.type';
import { datetimeYMDHis } from '../../../utils/datetime.utils';
export class AppUserCourseRepository {
  constructor() {}
  async findAppUserCourseById(id: string, select: string[]|null = null, withRelations: boolean = false): Promise<AppUserCourse> {
    const options: any = {
      where: {
        id: id,
        deletedAt:{
          [Op.eq]: null
        }
      },
    }

    if(select)
      options.attributes = select

    if(withRelations){
      options.include = [
        {
          as: 'course',
          model: CourseModel,
          required: false,
        },
        {
          as: 'app_user',
          model: AppUserModel,
          required: false,
        },
      ];
    }

    return (await AppUserCourseModel.findOne(options)) as unknown as AppUserCourse;
  }

  async findAppUserCourseByIds(ids: string[]): Promise<AppUserCourse[]> {
    return (await AppUserCourseModel.findAll({
      where: {
        id: {
          [Op.in]: ids,
          deletedAt:{
            [Op.eq]: null
          } 
        },
      },
    })) as unknown as AppUserCourse[];
  }

  async appUserCourseExistsById(id: string): Promise<number> {
    return await AppUserCourseModel.count({
      where: {
        id: id,
        deletedAt:{
          [Op.eq]: null
        }
      },
    });
  }

  async getAllAppUserCourses(): Promise<AppUserCourse[]> {
    return (await AppUserCourseModel.findAll({
      where: {
        deletedAt: {
          [Op.eq]: null
        }
      },
      order: [['createdAt', 'DESC']],
    })) as unknown as AppUserCourse[];
  }
  
  async getAllAppUserCoursesWithOptions(select: string[]|null = null): Promise<AppUserCourse[]> {
    const options: any = {};

    if(select && select.length > 0)
      options.attributes = select

    return (await AppUserCourseModel.findAll(options));
  }

  async bulkStoreAppUserCourse(data: StoreAppUserCourse[], fields?: ("id" | "appUserId" | "courseId" | "updatedBy" | "deletedAt" | "deletedBy")[], transaction?: Transaction): Promise<AppUserCourse> {
    const options: any = { fields: fields };

    if(transaction) options.transaction = transaction;

    return await AppUserCourseModel.bulkCreate(data, options) as unknown as AppUserCourse;
  }

  async storeAppUserCourse(data: StoreAppUserCourse, transaction?: Transaction): Promise<AppUserCourse> {
    const options: any = {};

    if(transaction) options.transaction = transaction;

    return await AppUserCourseModel.create(data, options) as unknown as AppUserCourse;
  }

  async updateAppUserCourse(data: UpdateAppUserCourseData, id: string, transaction?: Transaction): Promise<AppUserCourse> {
    const options: any = {
      where: {
        id: id,
      },
    };

    if(transaction) options.transaction = transaction;

    return (await AppUserCourseModel.update(data, options)) as unknown as AppUserCourse;
  }

  async deleteAppUserCourse(id: string, deletedBy: string, transaction?: Transaction): Promise<AppUserCourse> {
    const options: any = {
      where: {
        id: id,
      },
    };

    if(transaction) options.transaction = transaction;

    return await AppUserCourseModel.update({ deletedAt: datetimeYMDHis(), deletedBy: deletedBy }, options) as unknown as AppUserCourse;
  }

  async hardDeleteById(id: string): Promise<AppUserCourse> {
    return (await AppUserCourseModel.destroy({
      where: {
        id: id,
      },
    })) as unknown as AppUserCourse;
  }

  async findAppUserCourseByAppUserIdAndCourseId(appUserId: string, courseId: string, select: string[]|null = null, withRelations: boolean = false): Promise<AppUserCourse> {
    const options: any = {
      where: {
        appUserId: appUserId,
        courseId: courseId,
        deletedAt:{
          [Op.eq]: null
        }
      },
    }

    if(select)
      options.attributes = select

    if(withRelations){
      options.include = [
        {
          as: 'course',
          model: CourseModel,
          required: false,
        },
        {
          as: 'app_user',
          model: AppUserModel,
          required: false,
        },
      ];
    }

    return (await AppUserCourseModel.findOne(options)) as unknown as AppUserCourse;
  }

  async appUserCourseExistsByAppUserIdAndCourseId(appUserId: string, courseId: string): Promise<number> {
    return await AppUserCourseModel.count({
        where: {
          appUserId: appUserId,
          courseId: courseId,
          deletedAt:{
            [Op.eq]: null
          }
        },
      });
  }
}
