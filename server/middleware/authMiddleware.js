function mustAuthenticated(req, res, next) {
    if (!req.isAuthenticated()) {
      return res.status(401).send({message: 'You are not authenticated'});
    }
    next();
}

export default mustAuthenticated;