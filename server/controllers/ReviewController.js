import { db, Author, ReviewTag, Review, Comments, Work, Tag } from '../db.js';
import { cloudinary } from '../cloudinary.js';

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

    async findOrCreateWork (work, category) {
        const result = await Work.findOrCreate({
            where: {
                work_name: work.toLowerCase()
            },
            defaults: {
                work_name: work.toLowerCase(),
                category: category.toLowerCase()
            },
            raw: true
        })
        return (result[0])
    }

    async addNewTags (tags, id) {
        tags.forEach(async (tag) => {
            await Tag.findOrCreate({
                where: {
                    tag_name: tag
                }
            })

            await ReviewTag.findOrCreate({
                where: {
                    review_id: id,
                    tag_name: tag
                }
            })
        })
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

            if (!imageUrl) imageUrl = (await this.uploadImage(image)).public_id

            const workName = (await this.findOrCreateWork(work, category)).work_name

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

            this.addNewTags(tags, id)

            res.status(201).send({
                message: 'The review has been created',
                review: {
                    ...review,
                    category
                } 
            })
        } catch (e) {
            console.log(e)
            res.status(500).send(e.message)
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
            const existingURL = (await Review.findOne({
                attributes: ['image_url'],
                where: {
                    review_id: id
                },
                raw: true
            })).image_url
    
            let imageUrl = image

            if (!imageUrl) imageUrl = (await this.uploadImage(image)).public_id
            
            const workName = (await this.findOrCreateWork(work, category)).work_name;
            
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
    
            this.addNewTags(tags, id)
    
            res.status(200).send({
                message: 'The review has been updated',
                review: {
                    ...review,
                    category
                } 
            })
        } catch (e) {
            console.log(e)
            res.status(500).send(e.message)
        }
    }

    async getTagsForReview (req, res) {
        try {
            const reviewId = +req.params.id
            console.log(reviewId);
            const tags = await ReviewTag.findAll({
                attributes: ['tag_name'],
                where: {
                    review_id: reviewId
                },
                raw: true
            })
            res.send(tags)
        } catch (error) {
            res.status(500).send(error.message)
        }
    }

    async deleteReview(req, res) {
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
        res.status(204).send({ message: 'The review has been deleted' })
    }
}

export default new ReviewController();