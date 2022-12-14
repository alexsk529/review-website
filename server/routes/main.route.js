import {Router} from 'express';
import ReviewController from "../controllers/ReviewController.js";

const mainRouter = Router();

mainRouter.get('/', ReviewController.getReviews);
mainRouter.get('/best-rate')

export default mainRouter;