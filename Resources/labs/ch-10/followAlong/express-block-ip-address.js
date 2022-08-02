// add this as the first middleware to use in express

app.use(function (req, res, next) {
  if (req.socket.remoteAddress === '127.0.0.1') {
    const err = new Error('Forbidden');
    err.status = 403;
    next(err);
    return;
  }
  next();
});