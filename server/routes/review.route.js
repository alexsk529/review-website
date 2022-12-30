import {Router} from 'express';
import { cloudinary } from '../cloudinary.js'

import ReviewController from "../controllers/ReviewController.js";

const reviewRouter = Router();

reviewRouter.get('/get/:id');
reviewRouter.get('/searchby/:tag', ReviewController.getReviews);
reviewRouter.post('/create', ReviewController.createReview);
reviewRouter.patch('/update', ReviewController.updateReview);
reviewRouter.delete('/:id', ReviewController.deleteReview);
reviewRouter.post('/image', ReviewController.uploadImage);
reviewRouter.get('/tags/:id', ReviewController.getTagsForReview)


export default reviewRouter
