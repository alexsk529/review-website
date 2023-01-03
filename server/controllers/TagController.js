import { Tag, ReviewTag, db } from '../db.js';

class TagController {
    async getAllTags(req, res) {
        try {
            const tags = await Tag.findAll({ raw: true });
            res.send(tags)
        } catch (e) {
            console.log(e);
        }
    }

    async addNewTags(tags, id) {
        tags.forEach(async (tag) => {
            await Tag.findOrCreate({
                where: {
                    tag_name: tag
                }
            })

            await ReviewTag.findOrCreate({
                where: {
                    review_id: id,
                    tag_name: tag
                }
            })
        })
    }

    async getTagsForReview(req, res) {
        try {
            const reviewId = +req.params.id
            console.log(reviewId);
            const tags = await ReviewTag.findAll({
                attributes: ['tag_name'],
                where: {
                    review_id: reviewId
                },
                raw: true
            })
            res.send(tags)
        } catch (error) {
            res.status(500).send(error.message)
        }
    }

    async getTagsCloud(req, res) {
        try {
            const tags = await ReviewTag.findAll({
                attributes: [
                    ['tag_name','value'],
                    [db.fn('COUNT', db.col('tag_name')), 'count']    
                ],
                group: 'tag_name',
                raw: true
            })
            res.send(tags)
        } catch (error) {
            res.status(500).send(error.message)
        }
    }

    async getIdsByTag(tag) {
            const ids = await ReviewTag.findAll({
                attributes: ['review_id'],
                where: {tag_name: tag},
                raw: true
            })
            return ids
    }
}

export default new TagController();