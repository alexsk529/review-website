import { Work, Rate, db } from '../db.js';

class WorkController {
    async getAllWorks() {
        let works = await Work.findAll({
            include: { model: Rate, attributes: [[db.fn('AVG', db.col('rate')), 'rate']] },
            group: 'work.work_name',
            raw: true
        });
        works = works.map(work => ({ ...work, rate: work['rates.rate'] }))
        works = works.map(work => {
            delete work['rates.rate'];
            if (work.rate === null) work.rate = 0;
            return work
        })
        return works
    }

    async findOrCreateWork(work, category) {
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

    async rateWork(work_name, email, rate) {
        const work = await Rate.findOne({
            where: {
                email: email,
                work_name: work_name
            }
        })
        if (work) await (work.update({
            work_name: work_name,
            email: email,
            rate: rate
        }, {
            where: {
                email: email,
                work_name: work_name
            },
            returning: true
        }));
        else (await Rate.create({
            work_name: work_name,
            email: email,
            rate: rate 
        }));

        const result =  await Work.findOne({
            include: { model: Rate, attributes: [[db.fn('AVG', db.col('rate')), 'rate']] },
            group: 'work.work_name',
            where: {
                work_name: work_name
            },
            raw: true
        })
        result.rate = result['rates.rate'];
        delete result['rates.rate'];
        return result
    }
}

export default new WorkController();