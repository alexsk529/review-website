import {Router} from 'express';
import ReviewController from "../controllers/ReviewController.js";
import TagController from '../controllers/TagController.js';

const mainRouter = Router();

mainRouter.get('/', ReviewController.getReviews);
mainRouter.get('/best-grade', (req, res) => ReviewController.getReviews(req, res, {bestGrade: true}));
mainRouter.get('/tags-cloud', TagController.getTagsCloud)
mainRouter.get('/findbytag/:tag', ReviewController.getReviewsByTag)

export default mainRouter;