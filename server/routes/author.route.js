import {Router} from 'express';
import AuthorController from '../controllers/AuthorController.js';

const authorRouter = Router();

authorRouter.get('/get-author', async (req, res) => {
    try {
        const email = req.user.email
        const user = await AuthorController.getAuthor(email);
        res.send(user)
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message)
    }
})
authorRouter.patch('/rename-author', async (req, res) => {
    try {
        const { name } = req.body;
        const email = req.user.email
        const edit = await AuthorController.renameAuthor(name, email);
        
        res.json({message: 'Successfully update', subject: edit.dataValues})
    } catch (error) {
        res.send(error.message)
    }
})

export default authorRouter