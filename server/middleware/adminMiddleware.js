function mustBeAdmin (req, res, next) {
    if (req.user.role !== 'admin') res.status(403).send({message: 'You do not have the permission'});
    next();
}

export default mustBeAdmin;