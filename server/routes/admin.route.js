import {Router} from 'express';
import {check} from "express-validator";
import AdminController from "../controllers/AdminController.js";

const adminRouter = Router();

adminRouter.get('/', AdminController.getAuthors);
adminRouter.patch('/block/:id');
adminRouter.patch('/unblock/:id');
adminRouter.delete('/delete/:id');


export default adminRouter