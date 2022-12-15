import {db} from '../db.js';

class AdminController {
    async getAuthors (req, res) {
        try {
            const authors = await db.query('SELECT * FROM author')
            res.send(authors.rows)
        } catch (e) {
            console.log(e)
        }
    }

    async deleteAuthor (req, res) {
        const email = req.params.id.slice(1);
        const reviewId = db.query('SELECT review_id FROM review WHERE email=$1', [email]);
        await db.query('DELETE FROM review_tags WHERE review_id=$1', [reviewId]);
        await db.query('DELETE FROM comments WHERE review_id=$1', [reviewId]);
        await db.query('DELETE FROM review WHERE review_id=$1', [reviewId]);
        await db.query('DELETE FROM author WHERE email=$1', [email])
        res.send('Author has been deleted')
    }
}

export default new AdminController();