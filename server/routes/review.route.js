import {Router} from 'express';
import { cloudinary } from '../cloudinary.js'

import ReviewController from "../controllers/ReviewController.js";

const reviewRouter = Router();

reviewRouter.get('/:id');
reviewRouter.get('/searchby/:tag', ReviewController.getReviews)
reviewRouter.post('/create', ReviewController.createReview);
reviewRouter.patch('/:id');
reviewRouter.delete('/:id', ReviewController.deleteReview);
reviewRouter.post('/image', async (req,res) => {
    const {image} = req.body;
    const result = await cloudinary.uploader.upload(image, {
        folder: reviews,
    })
    res.status(201).send({
        message: 'The image has been uploaded', 
        public_id: result.public_id, 
        url: result.secure_url
    });
});
reviewRouter.get('/image', (req, res)=> {
    console.log(cloudinary.config());
    res.end();
});


export default reviewRouter