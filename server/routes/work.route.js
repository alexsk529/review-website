import {Router} from 'express';

import TagController from '../controllers/TagController.js';
import WorkController from '../controllers/WorkController.js';
import mustAuthenticated from '../middleware/authMiddleware.js';

const workRouter = Router();

workRouter.get('/get-works', async (req, res) => {
    try {
        const works = await WorkController.getAllWorks()
        res.send(works)
    } catch (error) {
        res.status(500).send(error.message)
    }
});
workRouter.get('/get-tags', async (req, res) => {
    try {
        const tags = await TagController.getAllTags();
        res.send(tags)
    } catch (error) {
        res.status(500).send(error.message)
    }
})
workRouter.patch('/rate', mustAuthenticated);

export default workRouter