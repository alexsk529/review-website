import { ReviewTag, Review, Comments, Work, db, Like} from '../db.js';
import { cloudinary } from '../cloudinary.js';
import TagController from './TagController.js';
import WorkController from './WorkController.js';
import { QueryTypes } from 'sequelize';

class ReviewController {
    constructor() {
        this.getReviews = this.getReviews.bind(this);
        this.getReviewsByIds = this.getReviewsByIds.bind(this);
        this.createReview = this.createReview.bind(this);
        this.updateReview = this.updateReview.bind(this);
        this.getLikes = this.getLikes.bind(this);
    }
    async reviewBrushing(items) {
        let reviews = items.map(item =>{
            return ({ ...item, category: item.work.dataValues.category })
        } )
        reviews = reviews.map(item => {
            delete item.work
            return item
        })
        return reviews;
    }

    async getLikesToAuthor (recipient) {
        const like = await Like.findAll({
            attributes: [
                [ db.fn('COUNT', db.col('email')), 'likes' ]
            ],
            where:{
                recipient: recipient
            }
        });
        return like;
    }

    async getLikes (items) {
        let likes = items.map(async item => {
            return await this.getLikesToAuthor(item.email)
        });
        likes = await Promise.all(likes);
        return likes;
    }

    async getReviews(bestGrade) {
        let order = ['created_at', 'DESC'];
        if (bestGrade) order = ['grade', 'DESC'];
        let reviews = (await Review.findAll({
            include: Work,
            order: [order],
        })).map(item => item.dataValues)
        const likes = await this.getLikes(reviews);
        for (let i = 0; i < reviews.length; i++) {
            let author_likes = Number(likes[i][0].dataValues.likes);
            reviews[i].author_likes = author_likes;
        }
        reviews = this.reviewBrushing(reviews)
        return reviews
    }

    async uploadImage(img) {
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

        let review = (await Review.create({
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

    async updateReview(data, email) {
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

        let review = (await Review.update({
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
            await Comments.destroy({
                where: {
                    review_id: id
                }
            })
            await Review.destroy({
                where: {
                    review_id: id
                },
            })
        })
        return 'Items/item have/has been deleted';
    }

    async getReviewsByIds(ids) {
        const newIds = ids.map(id => id.review_id)
        const reviews = await this.getReviews()
        const result = newIds.map(id => {
            return reviews.find(review => review.review_id == id)
        })
        return result
    }

    async getIdsByQuery(query) {
        let ids = await db.query(`
        SELECT DISTINCT review_id
        FROM review
        JOIN work as w USING (work_name)
        JOIN author as a USING (email)
        LEFT JOIN review_tags as rw USING (review_id)
        LEFT JOIN comments as c USING (review_id)
        WHERE setweight(to_tsvector('pg_catalog.russian', work_name || ' ' || review_title), 'A') || 
                setweight(to_tsvector('pg_catalog.russian', content), 'B') ||
                setweight(to_tsvector('pg_catalog.russian', category || ' ' || tag_name || ' ' || coalesce(comment,'')), 'C') ||
                setweight(to_tsvector(a.email), 'D') 
                @@ plainto_tsquery('pg_catalog.russian', $1);
        `, { bind: [query], type: QueryTypes.SELECT });

        return ids
    }

    async getIdsByEmail(email) {
        let ids = await Review.findAll({
            attributes: ['review_id'],
            where: {
                email: email
            },
            raw: true
        })
        ids = ids.map(id => id.review_id)
        return ids;
    }

    async hitLike(email, review_id, recipient) {
        let like = await Like.findOne({
            where:{
                email: email,
                review_id: review_id
            }
        })
        if (like) like.destroy();
        else like = await Like.create({
            email: email,
            review_id: review_id,
            recipient: recipient
        })
        const result = (await this.getLikesToAuthor(recipient))[0]
        return {result: Number(result.dataValues.likes), recipient};
    }
}

export default new ReviewController();