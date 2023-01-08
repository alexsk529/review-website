import {Router} from 'express';
import CommentController from '../controllers/CommentController.js';

const commentRouter = Router();

commentRouter.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const comments = await CommentController.getComments(id);
        res.send(comments)
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message)
    }
});
commentRouter.post('/create', async (req, res) => {
    try {
        const {id, comm, userEmail} = req.body;
        const comment = await CommentController.createComment(id, comm, userEmail)
        res.send(comment)
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message)
    }
});

export default commentRouter