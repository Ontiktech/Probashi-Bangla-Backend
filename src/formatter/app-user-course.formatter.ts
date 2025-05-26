import { AppUserCourseWithCourseAndTimestamps } from '../types/app-user-course.type';
import { CourseWithTimestamps } from '../types/course.type';

export function formatViewEnrolledCourses(data: AppUserCourseWithCourseAndTimestamps[]): CourseWithTimestamps[] {

  const formattedData =
    data.map((userCourse: AppUserCourseWithCourseAndTimestamps) => {
      return {
        id: userCourse.course.id,
        title: userCourse.course.title,
        description: userCourse.course.description,
        totalDays: userCourse.course.totalDays,
        language: userCourse.course.language,
        targetLanguage: userCourse.course.targetLanguage,
        difficulty: userCourse.course.difficulty,
        imagePath: userCourse.course.imagePath,
        estimatedHours: userCourse.course.estimatedHours,
        updatedBy: userCourse.course.updatedBy,
        deletedAt: userCourse.course.deletedAt,
        deletedBy: userCourse.course.deletedBy,
        createdAt: userCourse.course.createdAt,
        updatedAt: userCourse.course.updatedAt,
      }
    });

  return formattedData;
}
