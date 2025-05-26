import { AppUserCourseWithCourseAndTimestamps } from '../types/app-user-course.type';
import { EnrolledCourses } from '../types/course.type';

export function formatViewEnrolledCourses(data: AppUserCourseWithCourseAndTimestamps[]): EnrolledCourses[] {
  const formattedData =
    data.map((userCourse: AppUserCourseWithCourseAndTimestamps) => {
      let lessonCount = 0
      userCourse.course.days.map((day) => {
        lessonCount += day.lessons.length
      })
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
        lessonCount: lessonCount,
        createdAt: userCourse.course.createdAt,
        updatedAt: userCourse.course.updatedAt,
      }
    });

  return formattedData;
}
