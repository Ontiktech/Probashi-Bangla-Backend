import express from 'express';
import { JwtMiddleware } from '../../middleware/jwt.middleware';
import { storeFlashCardViewed, viewFlashCards } from '../../controllers/app/lesson.controller';

const AppLessonRouter = express.Router();
const jwtMiddleware = new JwtMiddleware();

// Define Routes
AppLessonRouter.get('/show-lesson-flash-cards/:lessonId', jwtMiddleware.verifyAppUserToken, viewFlashCards);
AppLessonRouter.post('/store-flash-card-viewed', jwtMiddleware.verifyAppUserToken, storeFlashCardViewed);

export { AppLessonRouter };
