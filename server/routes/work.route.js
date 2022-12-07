import {Router} from 'express';
import {check} from "express-validator";

const workRouter = Router();

workRouter.patch('/rate');

export default workRouter