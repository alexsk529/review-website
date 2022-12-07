import {Router} from 'express';
import {check} from "express-validator";

const commentRouter = Router();

commentRouter.post('/create');
commentRouter.get('/:review_id');

export default commentRouter