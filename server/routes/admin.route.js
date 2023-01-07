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
adminRouter.delete('/delete/', async (req, res) => {
    try {
        const emails = req.body;
        const msg = await AdminController.deleteAuthor(emails)

        res.status(200).send({msg, emails})
    } catch (error) {
        res.status(500).send(error.message)
    }
});
adminRouter.patch('/block/:email');
adminRouter.patch('/unblock/:email');


export default adminRouter