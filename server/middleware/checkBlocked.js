function checkBlocked (req, res, next) {
    if (req.user.status === 'blocked') res.status(403).send({msg: 'The author has been blocked'});
    next();
}

export default checkBlocked;
