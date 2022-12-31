import { Work } from '../db.js';

class WorkController {
    async getAllWorks (req, res) {
        try {
            const works = await Work.findAll({raw: true});
            res.send(works)
        } catch (e) {
            console.log(e);
        }
    }

    async findOrCreateWork (work, category) {
        const result = await Work.findOrCreate({
            where: {
                work_name: work.toLowerCase()
            },
            defaults: {
                work_name: work.toLowerCase(),
                category: category.toLowerCase()
            },
            raw: true
        })
        return (result[0])
    }
}

export default new WorkController();