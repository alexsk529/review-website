import {Author, Comments, db, Review, ReviewTag} from '../db.js';

class AdminController {
    async getAuthors (req, res) {
        try {
            const authors = await Author.findAll({raw: true})
            res.send(authors)
        } catch (e) {
            console.log(e)
        }
    }

    async deleteAuthor (req, res) {
        const email = req.params.id.slice(1);
        const reviewId = Review.findOne({where: {email: email}});
        await ReviewTag.destroy({where: {review_id: reviewId}});
        await Comments.destroy({where: {review_id: reviewId}});
        await Review.destroy({where: {review_id: reviewId}});
        await Author.destroy({where: {review_id: reviewId}});
        res.send('Author has been deleted')
    }
}

export default new AdminController();