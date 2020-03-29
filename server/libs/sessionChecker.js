module.exports = (req, res, next) => {
  console.log(req.session.user);
  if (req.session.user) {
    next();
  } else {
    res.status(401).send({
      message: 'Signining is required.',
    });
  }
};
