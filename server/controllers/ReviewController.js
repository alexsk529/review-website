import db from '../db.js';

class ReviewController {
    getReviews (req, res) {
        if (req.isAuthenticated()) res.send({message: 'Here are all reviews for authenticated users', user: req.user});
        else res.send('Here are all reviews')
    }
}

export default new ReviewController();