import { Author, Comments, db, Review, ReviewTag } from '../db.js';
import ReviewController from './ReviewController.js';

class AdminController {
    constructor() {
        this.blockUnblockAuthor = this.blockUnblockAuthor.bind(this)
    }

    async getAuthors() {
        let authors = await Author.findAll({
            attributes: ['email', 'author_name', 'likes', 'created_at', 'last_login', 'role', 'status'],
            include: { model: Review, attributes: [[db.fn('COUNT', db.col('review_id')), 'reviewCount']] },
            group: 'author.email',
            raw: true
        })
        authors = authors.map(author => {
            return { ...author, reviewCount: author['reviews.reviewCount'] }
        })
        authors = authors.map(author => {
            delete author['reviews.reviewCount'];
            return author
        })
        return authors
    }

    async deleteAuthor(emails) {
        const ids = await Promise.all(emails.map(email => ReviewController.getIdsByEmail(email)));
        await Promise.all(
            ids.map(reviews => {
                if (reviews.length !== 0) ReviewController.deleteReview(reviews)
            })
        )
        await Promise.all(emails.map(email => Author.destroy({ where: { email: email } })))
        return 'The author and their reviews have been deleted'
    }

    async blockUnblockAuthor(emails, status) {
        await Promise.all(
            emails.map(async email => {
                await Author.update({
                    status: status
                }, {
                    where: {
                        email: email
                    },
                })
            })
        )
        
        const authors = await this.getAuthors();
        return authors;
    }

    async changeRole(emails, role) {
        await Promise.all(
            emails.map(async email => {
                await Author.update({
                    role: role
                }, {
                    where: {
                        email: email
                    }
                })
            })
        )

        const authors = await this.getAuthors();
        return authors;
    }
}

export default new AdminController();