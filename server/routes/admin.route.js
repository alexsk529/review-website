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
adminRouter.patch('/change-status/', async (req, res) => {
    try {
        const { emails, status } = req.body;
        const authors = await AdminController.blockUnblockAuthor(emails, status)

        res.send({msg: 'The status has been changed', authors})
    } catch (error) {
        res.status(500).send(error.message)
    }
});
adminRouter.patch('/change-role/', async (req,res) => {
    try {
        const { emails, role } = req.body;
        const authors = await AdminController.changeRole(emails, role)
        res.send({msg: 'The role has been changed', authors})
    } catch (error) {
        res.status(500).send(error.message)
    }
})


export default adminRouter