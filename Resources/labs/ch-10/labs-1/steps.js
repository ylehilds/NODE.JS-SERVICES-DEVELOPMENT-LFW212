// how to complete this lab:
// #1 install dependencies, like this: npm i
// #2 After express is declared and after some views setting create a middleware to detect the IP address of attacker to block, like this:
app.use(function (req, res, next) {
  if (req.socket.remoteAddress === '111.34.55.211') { // detect attacker IP address
    const err = new Error('Forbidden'); // build new Error
    err.status = 403; // set status to 403
    next(err); // call next, passing it the error
    return; // to exit the function early and triggering the error handler middleware at the end of all registered middleware
  }
  next(); // happy path, this is not the attacker so keep going to next middleware
});