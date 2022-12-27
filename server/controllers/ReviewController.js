import {db, Author, ReviewTag, Review, Comments, Work, Tag} from '../db.js';
import { cloudinary } from '../cloudinary.js';

class ReviewController {
    async getReviews (req, res, { bestRate}) {
        try {
            const order = ['created_at', 'DESC'];
            if (bestRate) order = ['rate', 'DESC'];
            const reviews = await Review.findAll({
                attributes: ['review_title', 'content', 'rate', 'created_at'],
                include: [
                    {
                        model: Author,
                        attributes: ['email', 'author_name', 'likes'],
                        required: true
                    },
                    {
                        model: Work,
                        required: true
                    },
                    {
                        model: Tag,
                    }
                ],
                order: [order],
                raw: true
            })
            const data = JSON.parse(JSON.stringify(reviews));
            res.send({isAuthenticated: req.isAuthenticated(), data: reviews[0]})
        } catch (e) {
            console.log(e);
        }
    }
    
    async createReview (req, res) {
        try {
            const {
                work,
                category,
                title,
                content,
                rate,
                tags
            } = req.body;
            const {email} = req.user;
            await Work.findOrCreate({
                where: {
                    work_name: work
                },
                defaults: {
                    work_name: work,
                category: category
                }
            })
            const review = Review.create({
                work_name: work,
                email: email,
                review_title: title,
                content: content,
                rate: rate
            },{
                raw: true
            })
            const id = review.review_id;
            tags.forEach(async (tag) => {
                await Tag.findOrCreate({
                    where: {
                        tag_name: tag
                    },
                    defaults: {
                        tag_name: tag
                    }
                })
            })
            res.status(201).send({message: 'The review has been created'})
        } catch (e) {
            console.log(e)
        }
    }

    async deleteReview (req, res) {
        const id = req.params.id.slice(1);
        await ReviewTag.destroy({
            where: {
                review_id: id
            }
        });
        await Comments.destroy({
            where: {
                review_id: id
            }
        });
        await Review.destroy({
            where: {
                review_id: id
            }
        });
        res.status(204).send({message: 'The review has been deleted'})
    }

    async uploadImage (req, res) {
        try {
            const fileStr = req.body.data;
            const uploadRes = await cloudinary.uploader.upload(fileStr, {
                upload_preset: 'review-website'
            })
            console.log(uploadRes);
            res.json({msg: 'image uploaded'})
        } catch (error) {
            console.error(error);
            res.status(500).json({err: 'Something went wrong'})
        }
    }

    async getImage (req, res) {
        console.log(cloudinary);
        res.send();
    }

 }

export default new ReviewController();