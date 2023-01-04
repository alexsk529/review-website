import { ReviewTag, Review, Comments, Work} from '../db.js';
import { cloudinary } from '../cloudinary.js';
import TagController from './TagController.js';
import WorkController from './WorkController.js';

class ReviewController {
    constructor() {
        this.createReview = this.createReview.bind(this);
        this.updateReview = this.updateReview.bind(this);
    }
    async getReviews(bestGrade) {
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
            return reviews
    }

    async uploadImage (img) {
        const uploadRes = await cloudinary.uploader.upload(img, {
            upload_preset: 'review-website'
        })
        return uploadRes
    }

    async createReview(data, email) {
            const {
                work,
                category,
                title,
                content,
                grade,
                tags, 
                image
            } = data;

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

            return review;
    }

    async updateReview (data, email) {
            const {
                id,
                work,
                category,
                title,
                content,
                grade,
                tags, 
                image
            } = data;
    
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
            return review;
    }

    async deleteReview(selected) {
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
            return 'Items/item have/has been deleted';
    }

    async getReviewsByTag(tag) {
        let ids = await TagController.getIdsByTag(tag);
        ids = ids.map(id => id.review_id)
        let reviews = (await Review.findAll({
            include: Work,
        })).map(item => item.dataValues)
        reviews = reviews.map(item => ({...item, category: item.work.dataValues.category}))            
        reviews = reviews.map(item => {
            delete item.work
            return item
        })
        const result = ids.map(id => {
            return reviews.find(review => review.review_id == id)
        })
        return result
    }
}

export default new ReviewController();