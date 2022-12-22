import {Router} from 'express';
import AuthorController from '../controllers/AuthorController.js';

const authorRouter = Router();

authorRouter.get('/get-author', AuthorController.getAuthor)
authorRouter.patch('/rename-author', AuthorController.renameAuthor)
authorRouter.get('/reviews/:id');
authorRouter.patch('/rate');

export default authorRouter