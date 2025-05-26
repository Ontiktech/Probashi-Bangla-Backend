import { Op, Transaction } from 'sequelize';
import { AppUserCourseModel, AppUserModel, CourseModel, DayModel, LessonModel } from '../models';
import { AppUserCourse, UpdateAppUserCourseData, StoreAppUserCourse, AppUserCourseWithCourseAndTimestamps, AppUserEnrolledCourseDetails } from '../../../types/app-user-course.type';
import { datetimeYMDHis } from '../../../utils/datetime.utils';
import { AppUser } from '../../../types/app-user.type';
import { FilterLanguage } from '../../../constants/enums';
import { Course } from '../../../types/course.type';
import { FlashCardModel } from '../models/flash-card.model';
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

    if(select && select.length > 0)
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

  async hardDeleteById(id: string, transaction?: Transaction): Promise<AppUserCourse> {
    const options: any = {
      where: {
        id: id,
      },
    };

    if(transaction) options.transaction = transaction;

    return (await AppUserCourseModel.destroy(options)) as unknown as AppUserCourse;
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

    if(select && select.length > 0)
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

  async findAppUserWithCoursesById(id: string, select: string[]|null = null): Promise<AppUser> {
    const options: any = {
      where: {
        id: id,
        deletedAt:{
          [Op.eq]: null
        }
      },
      include: [
        {
          as: 'user_courses',
          model: AppUserCourseModel,
          required: false,
          include: [
            {
              as: 'course',
              model: CourseModel,
              required: false,
            },
          ]
        },
      ]
    }

    if(select && select.length > 0)
      options.attributes = select

    return (await AppUserModel.findOne(options)) as unknown as AppUser;
  }

  async viewEnrolledCourses(appUserId: string, limit: number, offset: number, language?: string, searchText?: string): Promise<{next: number, data: AppUserCourseWithCourseAndTimestamps[]}> {
    const options: any = {
      where: {
        appUserId: appUserId,
        deletedAt: {
          [Op.eq]: null,
        },
      },
      order: [
        ['createdAt', 'DESC']
      ],
      limit: limit,
      offset: offset,
      include: [
        {
          as: 'course',
          model: CourseModel,
          where: {
            deletedAt: {
              [Op.eq]: null,
            },
          },
          attributes: ['id', 'title', 'description', 'totalDays', 'language', 'targetLanguage', 'difficulty', 'imagePath', 'estimatedHours', 'createdAt', 'updatedAt'],
          include: [
            {
              as: 'days',
              model: DayModel,
              required: false,
              where: {
                deletedAt: {
                  [Op.eq]: null,
                },
              },
              order: [['dayNumber', 'ASC']],
              attributes: ['id'],
              include: [
                {
                  as: 'lessons',
                  model: LessonModel,
                  required: false,
                  where: {
                    deletedAt: {
                      [Op.eq]: null,
                    },
                  },
                  order: [['lessonOrder', 'ASC']],
                  attributes: ['id'],
                },
              ],
            },
          ],
        },
      ],
    };
    
    const courseWhereConditions: any[] = [];
    
    if (language && language !== FilterLanguage.ALL && language !== FilterLanguage.EMPTY) {
      courseWhereConditions.push({
        [Op.or]: [
          { language: language },
          { targetLanguage: language },
        ],
      });
    }
    
    if (searchText && searchText !== "") {
      courseWhereConditions.push({
        [Op.or]: [
          { title: { [Op.like]: `%${searchText}%` } },
          { description: { [Op.like]: `%${searchText}%` } },
        ],
      });
    }

    if (courseWhereConditions.length > 0) {
      options.include[0].where = {
        ...options.include[0].where,
        [Op.and]: courseWhereConditions,
      };
    }

    const data = await AppUserCourseModel.findAll(options) as unknown as AppUserCourseWithCourseAndTimestamps[]

    const count = await AppUserCourseModel.count(options) as unknown as number
    const next = (count - offset - limit) > 0 ? (count - offset - limit) : 0

    return { next, data }
  }

  async viewEnrolledCourseDetails(courseId: string, appUserId: string): Promise<AppUserEnrolledCourseDetails> {
    const options: any = {
      where: {
        appUserId: appUserId,
        courseId: courseId,
        deletedAt: {
          [Op.eq]: null,
        },
      },
      attributes: ['id', 'appUserId', 'courseId'],
      include: [
        {
          as: 'course',
          model: CourseModel,
          where: {
            deletedAt: {
              [Op.eq]: null,
            },
          },
          attributes: ['id', 'title', 'description', 'totalDays', 'difficulty', 'imagePath', 'estimatedHours'],
          include: [
            {
              as: 'days',
              model: DayModel,
              required: false,
              where: {
                deletedAt: {
                  [Op.eq]: null,
                },
              },
              order: [['dayNumber', 'ASC']],
              attributes: ['id', 'courseId', 'dayNumber', 'title', 'description'],
              include: [
                {
                  as: 'lessons',
                  model: LessonModel,
                  required: false,
                  where: {
                    deletedAt: {
                      [Op.eq]: null,
                    },
                  },
                  order: [['lessonOrder', 'ASC']],
                  attributes: ['id', 'dayId', 'lessonOrder', 'title', 'description', 'estimatedMinutes', 'difficulty'],
                },
              ],
            },
          ],
        },
      ],
    };

    return await AppUserCourseModel.findOne(options) as unknown as AppUserEnrolledCourseDetails;
  }
}
