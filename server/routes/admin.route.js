import {Router} from 'express';
import AdminController from "../controllers/AdminController.js";

const adminRouter = Router();

adminRouter.get('/', async (req, res) => {
    try {
        const authors = await AdminController.getAuthors();
        res.send(authors)     
    } catch (error) {
        res.status(500).send(error.message)
    }
});
adminRouter.patch('/block/:email');
adminRouter.patch('/unblock/:email');
adminRouter.delete('/delete/:email', AdminController.deleteAuthor);


export default adminRouter