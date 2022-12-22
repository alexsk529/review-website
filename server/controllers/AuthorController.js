import { Author } from '../db.js'

class AuthorController {
    async getAuthor(req, res) {
        try {
            const user = await Author.findOne({
                where: {
                    email: req.user.email
                }
            })

            res.send(user);
        } catch (e) {
            console.log(e);
        }
    }

    async renameAuthor(req, res) {
        try {
            const { name } = req.body
            const edit = await Author.update({
                author_name: name
            }, {
                where: {
                    email: req.user.email
                },
                returning: true
            })
            res.json({message: 'Successfully updated', subject: edit[1][0]})
        } catch (e) {
            console.log(e);
        }

    }
}

export default new AuthorController();