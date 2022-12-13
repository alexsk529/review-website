import {Router} from 'express';
import {check} from "express-validator";
import ReviewController from "../controllers/ReviewController.js";

const reviewRouter = Router();

reviewRouter.get('/', ReviewController.getReviews);
reviewRouter.get('/bestrate')
reviewRouter.get('/:id');
reviewRouter.post('/create');
reviewRouter.patch('/:id');
reviewRouter.delete('/:id');
reviewRouter.post('/image');
reviewRouter.get('/image');


export default reviewRouter