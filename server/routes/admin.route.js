import {Router} from 'express';
import {check} from "express-validator";

const adminRouter = Router();

adminRouter.get('/');
adminRouter.patch('/block/:id');
adminRouter.patch('/unblock/:id');
adminRouter.delete('/delete/:id');


export default adminRouter