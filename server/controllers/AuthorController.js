import { Author, Rate, db } from '../db.js'

class AuthorController {
    async getAuthor(email) {
            const user = (await Author.findOne({
                include: {
                    model: Rate,
                    attributes: [
                        'work_name', 'rate'
                    ]
                },
                where: {
                    email: email
                }
            })).dataValues
            console.log(user);
            return user
    }

    async renameAuthor(name, email) {
            const edit = await Author.update({
                author_name: name
            }, {
                where: {
                    email: email
                },
                returning: true
            })
            return edit[1][0]
    }
}

export default new AuthorController();