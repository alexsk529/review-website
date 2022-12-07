import {Router} from 'express';
import {check} from "express-validator";

const authRouter = Router();

authRouter.post('/signin')

export default authRouter