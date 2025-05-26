import express from 'express';
import { JwtMiddleware } from '../../middleware/jwt.middleware';
import { viewFlashCards } from '../../controllers/app/lesson.controller';

const AppLessonRouter = express.Router();
const jwtMiddleware = new JwtMiddleware();

// Define Routes
AppLessonRouter.get('/view-flash-cards/:lessonId', jwtMiddleware.verifyAppUserToken, viewFlashCards);


export { AppLessonRouter };
