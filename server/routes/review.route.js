import {Router} from 'express';

import ReviewController from "../controllers/ReviewController.js";
import TagController from '../controllers/TagController.js';

const reviewRouter = Router();

reviewRouter.get('/get/:id');
reviewRouter.get('/searchby/:tag', ReviewController.getReviews);
reviewRouter.post('/create', ReviewController.createReview);
reviewRouter.patch('/update', ReviewController.updateReview);
reviewRouter.delete('/delete', ReviewController.deleteReview);
reviewRouter.post('/image', ReviewController.uploadImage);
reviewRouter.get('/tags/:id', TagController.getTagsForReview)


export default reviewRouter
