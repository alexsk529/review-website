import { ReviewTag, Review, Comments, Work} from '../db.js';
import { cloudinary } from '../cloudinary.js';
import TagController from './TagController.js';
import WorkController from './WorkController.js';

class ReviewController {
    constructor() {
        this.createReview = this.createReview.bind(this);
        this.updateReview = this.updateReview.bind(this);
    }
    async getReviews(req, res, { bestGrade }) {
        try {
            let order = ['created_at', 'DESC'];
            if (bestGrade) order = ['grade', 'DESC'];
            let reviews = (await Review.findAll({
                include: Work,
                order: [order],
            })).map(item => item.dataValues)
            reviews = reviews.map(item => ({...item, category: item.work.dataValues.category}))            
            reviews = reviews.map(item => {
                delete item.work
                return item
            })
            res.send({ isAuthenticated: req.isAuthenticated(), data: reviews })
        } catch (e) {
            res.status(500).send('Something went wrong')
        }
    }

    async uploadImage (img) {
        const uploadRes = await cloudinary.uploader.upload(img, {
            upload_preset: 'review-website'
        })
        return uploadRes
    }

    async createReview(req, res) {
        try {
            const {
                work,
                category,
                title,
                content,
                grade,
                tags, 
                image
            } = req.body;
            const { email } = req.user;

            let imageUrl = image

            if (imageUrl) imageUrl = (await this.uploadImage(image)).public_id

            const workName = (await WorkController.findOrCreateWork(work, category)).work_name

            const review = (await Review.create({
                work_name: workName,
                email: email,
                review_title: title,
                content: content,
                grade: grade,
                image_url: imageUrl
            }, {
                raw: true
            })).dataValues
            const id = review.review_id;

            TagController.addNewTags(tags, id)

            res.status(201).send({
                message: 'The review has been created',
                review: {
                    ...review,
                    category
                } 
            })
        } catch (e) {
            console.log(e)
            res.status(500).send({msg: e.message, cause: e.cause, stack: e.stack})
        }
    }

    async updateReview (req, res) {
        try {
            const {
                id,
                work,
                category,
                title,
                content,
                grade,
                tags, 
                image
            } = req.body;
            const { email } = req.user;
    
            let imageUrl = image

            if (imageUrl && imageUrl.startsWith('data:image')) imageUrl = (await this.uploadImage(image)).public_id
            
            const workName = (await WorkController.findOrCreateWork(work, category)).work_name;
            
            work === workName && await Work.update({
                category: category
            }, {
                where: {
                    work_name: work
                }
            })
    
            const review = (await Review.update({
                work_name: workName,
                email: email,
                review_title: title,
                content: content,
                grade: grade,
                image_url: imageUrl,
            }, {
                where: {
                    review_id: id
                },
                raw: true,
                returning: true
            }))[1][0]
    
            await ReviewTag.destroy({
                where: {
                    review_id: id
                }
            })
    
            TagController.addNewTags(tags, id)
    
            res.status(200).send({
                message: 'The review has been updated',
                review: {
                    ...review,
                    category
                } 
            })
        } catch (e) {
            console.log(e)
            res.status(500).send({msg: e.message, cause: e.cause, stack: e.stack})
        }
    }

    async deleteReview(req, res) {
        try {
            const selected = req.body;
            selected.forEach(async id => {
                await ReviewTag.destroy({
                    where: {
                        review_id: id
                    }
                })
                await Review.destroy({
                    where: {
                        review_id: id
                    },
                    returning: true
                })
            })
            
            res.status(200).send({msg: 'Items/item have/has been deleted', selected})
        } catch (e) {
            res.status(500).send({msg: e.message, cause: e.cause, stack: e.stack})
        }
    }
}

export default new ReviewController();