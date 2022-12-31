import {Router} from 'express';

import TagController from '../controllers/TagController.js';
import WorkController from '../controllers/WorkController.js';
import mustAuthenticated from '../middleware/authMiddleware.js';

const workRouter = Router();

workRouter.get('/get-works', WorkController.getAllWorks);
workRouter.get('/get-tags', TagController.getAllTags)
workRouter.patch('/rate', mustAuthenticated);

export default workRouter