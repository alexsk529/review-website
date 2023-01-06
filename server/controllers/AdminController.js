import { Author, Comments, db, Review, ReviewTag } from '../db.js';

class AdminController {
    async getAuthors() {
        let authors = await Author.findAll({
            attributes: ['email', 'author_name', 'likes', 'created_at', 'last_login', 'role', 'status'],
            include: {model: Review, attributes: [[db.fn('COUNT', db.col('review_id')), 'reviewCount']] },
            group: 'author.email',
            raw: true
        })
        authors = authors.map(author => {
            return {...author, reviewCount: author['reviews.reviewCount']}
        })
        authors = authors.map(author => {
            delete author['reviews.reviewCount'];
            return author
        })
        return authors
    }

    async deleteAuthor(req, res) {
        const email = req.params.id.slice(1);
        const reviewId = Review.findOne({ where: { email: email } });
        await ReviewTag.destroy({ where: { review_id: reviewId } });
        await Comments.destroy({ where: { review_id: reviewId } });
        await Review.destroy({ where: { review_id: reviewId } });
        await Author.destroy({ where: { review_id: reviewId } });
        res.send('Author has been deleted')
    }
}

export default new AdminController();