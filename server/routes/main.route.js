import {Router} from 'express';
import ReviewController from "../controllers/ReviewController.js";
import TagController from '../controllers/TagController.js';

const mainRouter = Router();

mainRouter.get('/', async (req,res) => {
    try {
        const reviews = await ReviewController.getReviews(false);
        res.send({ isAuthenticated: req.isAuthenticated(), data: reviews })
    } catch (error) {
        res.status(500).send('Something went wrong')
    }
});
mainRouter.get('/best-grade', async (req, res) => {
    try {
        const reviews = await ReviewController.getReviews(true);
        res.send({ isAuthenticated: req.isAuthenticated(), data: reviews })
    } catch (error) {
        res.status(500).send('Something went wrong')
    }
});
mainRouter.get('/tags-cloud', async (req, res) =>{
    try {
        const tags = await TagController.getTagsCloud()
        
        res.send(tags)
    } catch (error) {
        res.status(500).send(error.message)
    }
})
mainRouter.get('/findbytag/:tag', async (req, res) => {
    try {
        const tag = req.params.tag
        const reviews = await ReviewController.getReviewsByTag(tag)
        res.send(reviews);
    } catch (error) {
        res.status(500).send(error.message)
    }
    
})

export default mainRouter;