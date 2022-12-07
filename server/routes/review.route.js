import {Router} from 'express';
import {check} from "express-validator";

const reviewRouter = Router();

reviewRouter.get('/');
reviewRouter.get('/:id');
reviewRouter.post('/create');
reviewRouter.patch('/:id');
reviewRouter.delete('/:id');
reviewRouter.post('/image');
reviewRouter.get('/image');


export default reviewRouter