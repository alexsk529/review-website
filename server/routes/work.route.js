import {Router} from 'express';
import { Work, Tag } from '../db.js';
import mustAuthenticated from '../middleware/authMiddleware.js';

const workRouter = Router();

workRouter.get('/get-works', async (req, res) => {
    try {
        const works = await Work.findAll({raw: true});
        res.send(works)
    } catch (e) {
        console.log(e);
    }
});
workRouter.get('/get-tags', async (req, res) => {
    try {
        const tags = await Tag.findAll({raw: true});
        res.send(tags)
    } catch (e) {
        console.log(e);
    }
})
workRouter.patch('/rate', mustAuthenticated);

export default workRouter