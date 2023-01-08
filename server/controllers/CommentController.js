import { Comments, db } from '../db.js'

class CommentController {
    async getComments(id) {
        const comments = await Comments.findAll({
            where:{
                review_id: id,
            },
            order: [['created_at', 'DESC']],
            raw: true
        })
        return comments
    }

    async createComment (id, comm, userEmail) {
        const comment = (await Comments.create({
            comment: comm,
            email: userEmail,
            review_id: id
        }, {
            raw: true
        })).dataValues

        return comment;
    }
}

export default new CommentController();