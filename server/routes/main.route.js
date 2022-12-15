import {Router} from 'express';
import ReviewController from "../controllers/ReviewController.js";

const mainRouter = Router();

mainRouter.get('/', (req, res) => {
    res.send(req.user)
})
// mainRouter.get('/', (ReviewController.getReviews));
mainRouter.get('/best-rate', ReviewController.getReviews);

export default mainRouter;