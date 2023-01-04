import { Work } from '../db.js';

class WorkController {
    async getAllWorks () {
            const works = await Work.findAll({raw: true});
            return works
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