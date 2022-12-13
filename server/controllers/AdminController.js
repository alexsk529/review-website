import db from '../db.js';

class AdminController {
    async getAuthors (req, res) {
        try {
            const authors = await db.query('SELECT * FROM author')
            res.send(authors.rows)
        } catch (e) {
            console.log(e)
        }
    }
}

export default new AdminController();