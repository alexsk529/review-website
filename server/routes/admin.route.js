import {Router} from 'express';
import AdminController from "../controllers/AdminController.js";

const adminRouter = Router();

adminRouter.get('/', AdminController.getAuthors);
adminRouter.patch('/block/:email');
adminRouter.patch('/unblock/:email');
adminRouter.delete('/delete/:email', AdminController.deleteAuthor);


export default adminRouter