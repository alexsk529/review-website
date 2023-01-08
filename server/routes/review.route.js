import {Router} from 'express';

import ReviewController from "../controllers/ReviewController.js";
import TagController from '../controllers/TagController.js';
import mustAuthenticated from '../middleware/authMiddleware.js';

const reviewRouter = Router();

reviewRouter.post('/create', mustAuthenticated, async (req, res) => {
    try {
        const data = req.body
        const { email } = req.user;
        const review = await ReviewController.createReview(data, email)
        res.status(201).send({
            message: 'The review has been created',
            review: {
                ...review,
                category: data.category
            } 
        })
    } catch (error) {
        res.status(500).send({msg: e.message, cause: e.cause, stack: e.stack})
    }
});

reviewRouter.patch('/update', mustAuthenticated, async (req, res) => {
    try {
        const data = req.body
        const { email } = req.body;
        const review = await ReviewController.updateReview(data, email)
        res.status(201).send({
            message: 'The review has been created',
            review: {
                ...review,
                category: data.category
            } 
        })
    } catch (error) {
        res.status(500).send({msg: e.message, cause: e.cause, stack: e.stack})
    }
});

reviewRouter.delete('/delete', mustAuthenticated, async (req, res) => {
    try {
        const selected = req.body
        const msg = await ReviewController.deleteReview(selected)
        
        res.status(200).send({msg: msg, selected})
    } catch (e) {
        res.status(500).send({msg: e.message, cause: e.cause, stack: e.stack})
    }
});
reviewRouter.get('/tags/:id', async (req, res) => {
    try {
        const reviewId = +req.params.id;
        const tags = await TagController.getTagsForReview(reviewId)
        res.send(tags)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

reviewRouter.patch('/like', mustAuthenticated, async (req,res) => {
    try {
        const {email, review_id, recipient} = req.body;
        const response = await ReviewController.hitLike(email, review_id, recipient);
        res.send(response);
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message)
    }
})


export default reviewRouter
