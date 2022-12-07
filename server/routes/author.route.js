import {Router} from 'express';
import {check} from "express-validator";

const authorRouter = Router();

authorRouter.get('/reviews/:id');
authorRouter.patch('/rate');

export default authorRouter