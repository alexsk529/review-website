import {Router} from 'express';
import ReviewController from "../controllers/ReviewController.js";

const mainRouter = Router();

mainRouter.get('/', ReviewController.getReviews);
mainRouter.get('/best-grade', (req, res) => ReviewController.getReviews(req, res, {bestGrade: true}));

export default mainRouter;