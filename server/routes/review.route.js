import {Router} from 'express';
import { cloudinary } from '../cloudinary.js'

import ReviewController from "../controllers/ReviewController.js";

const reviewRouter = Router();

reviewRouter.get('/get/:id');
reviewRouter.get('/searchby/:tag', ReviewController.getReviews)
reviewRouter.post('/create', (req, res)=>{console.log(req.body);res.status(200).json(req.body)}, ReviewController.createReview);
reviewRouter.patch('/update');
reviewRouter.delete('/:id', ReviewController.deleteReview);
// reviewRouter.post('/image', ReviewController.uploadImage);
reviewRouter.post('/image', ReviewController.uploadImage);
reviewRouter.get('/image', ReviewController.getImage);


export default reviewRouter

// async (req,res) => {
//     const {image} = req.body;
//     const result = await cloudinary.uploader.upload(image, {
//         folder: reviews,
//     })
//     res.status(201).send({
//         message: 'The image has been uploaded', 
//         public_id: result.public_id, 
//         url: result.secure_url
//     });
// }