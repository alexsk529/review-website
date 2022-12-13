function mustAuthenticated(req, res, next) {
    if (!req.isAuthenticated()) {
      return res.status(HTTPStatus.UNAUTHORIZED).send({});
    }
    next();
  }