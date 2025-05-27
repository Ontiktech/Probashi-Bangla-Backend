import express from 'express';
import { JwtMiddleware } from '../../middleware/jwt.middleware';
import { viewAppUserStatistics } from '../../controllers/app/statistics.controller';

const AppuserStatisticsRouter = express.Router();
const jwtMiddleware = new JwtMiddleware();

// Define Routes
AppuserStatisticsRouter.get('/', jwtMiddleware.verifyAppUserToken, viewAppUserStatistics);

export { AppuserStatisticsRouter };
