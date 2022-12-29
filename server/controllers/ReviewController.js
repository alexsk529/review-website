import { db, Author, ReviewTag, Review, Comments, Work, Tag } from '../db.js';
import { cloudinary } from '../cloudinary.js';

class ReviewController {
    constructor() {
        this.createReview = this.createReview.bind(this)
    }
    async getReviews(req, res, { bestGrade }) {
        try {
            let order = ['created_at', 'DESC'];
            if (bestGrade) order = ['grade', 'DESC'];
            const reviews = await Review.findAll({
                include: Work,
                order: [order],
                raw: true
            })
            const data = JSON.parse(JSON.stringify(reviews));
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

            const imageUrl = (await this.uploadImage(image)).public_id

            const workName = (await this.findOrCreateWork(work, category)).work_name

            const review = await Review.create({
                work_name: workName,
                email: email,
                review_title: title,
                content: content,
                grade: grade,
                image_url: imageUrl
            }, {
                raw: true
            })
            const id = review.dataValues.review_id;
            tags.forEach(async (tag) => {
                await Tag.findOrCreate({
                    where: {
                        tag_name: tag
                    },
                    defaults: {
                        tag_name: tag
                    }
                })

                await ReviewTag.create({
                    review_id: id,
                    tag_name: tag
                })
            })
            res.status(201).send({
                message: 'The review has been created',
                review: {
                    id,
                    reviewTitle: review.dataValues.review_id,
                    workName,
                    email: review.dataValues.email,
                    content: review.dataValues.content,
                    grade: review.dataValues.grade,
                    createdAt: review.dataValues.created_at,
                    imageUrl: review.dataValues.image_url
                } 
            })
        } catch (e) {
            console.log(e)
            res.status(500).send(e.message)
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

    async getImage(req, res) {
        console.log(cloudinary);
        res.send();
    }

}

export default new ReviewController();