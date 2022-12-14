import db from '../db.js';

class ReviewController {
    async getReviews (req, res) {
        try {
            let tag = '';
            if (Object.keys(req.params).length !== 0) tag = req.params.tag.slice(1)
            let url = '';
            if (req.url.length > 1) url = req.url.slice(1);
            const reviews = await db.query(`
            SELECT 
            r.review_title as title, r.content as content, r.rate as rate, r.created_at as date,
            w.work_name as work, w.work_rate as work_rate, w.category as category, 
            a.email as email, a.author_name as name, a.likes as likes, 
            t.tag_name as tag
            FROM review as r 
            JOIN author as a 
            ON r.email=a.email
            JOIN work as w
            ON w.work_name=r.work_name
            JOIN review_tags as t
            ON t.review_id=r.review_id
            ${url='best-rate' ? 'ORDER BY r.rate DESC' : ''}
            ${tag ? `WHERE tag=${tag}` : ''}            
            ;`)
            if (req.isAuthenticated) res.send({isAuthenticated: true, data: reviews.rows[0]});
            else res.send({data: reviews.rows[0]});
            //res.end()
        } catch (e) {
            console.log(e.message)
        }
    }

    async createReview (req, res) {
        try {
            const {
                work,
                category,
                title,
                content,
                rate,
                tags
            } = req.body;
            const {email} = req.user;
            await db.query(`
            INSERT INTO work(work_name, category)
            SELECT $1, $2
            WHERE NOT EXISTS (SELECT 1 
                              FROM work
                              WHERE work_name=$1);
            `, [work, category])
            const id = await db.query(`
                INSERT INTO review(work_name, email, review_title, content, rate)
                VALUES($1, $2, $3, $4, $5)
                RETURNING review_id
            `, [work, email, title, content, rate])
            tags.forEach(async (tag) => {
                await db.query(`
                INSERT INTO tag(tag_name)
                SELECT $1
                WHERE NOT EXISTS (SELECT 1
                                  FROM tag
                                  WHERE tag_name=$1)
                `, [tag])
                await db.query(`
                INSERT INTO review_tags(review_id, tag_name)
                SELECT $1, $2
                WHERE NOT EXISTS (SELECT 1
                                  FROM review_tags
                                  WHERE review_id=$1 AND tag_name=$2)
                `, [id, tag])
            })
            res.status(201).send({})
        } catch (e) {
            console.log(e)
        }
    }

    async deleteReview (req, res) {
        const id = req.params.id.slice(1);
        await db.query('DELETE FROM review_tags WHERE review_id=$1', [id]);
        await db.query('DELETE FROM comments WHERE review_id=$1', [id]);
        await db.query('DELETE FROM review WHERE review_id=$1', [id])
    }

 }

export default new ReviewController();