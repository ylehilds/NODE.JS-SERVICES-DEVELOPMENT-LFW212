var express = require('express');
var router = express.Router();
var model = require('../model');

router.get('/:id', function(req, res, next) {
  model.bicycle.read(req.params.id, (err, result) => {
    if (err) {
      if (err.message === 'not found') next();
      else next(err);
    } else {
      res.send(result);
    }
  });

});

module.exports = router;

// how to check the service:
//
// node -e "http.get('http://localhost:3000/bicycle/1', ({headers}) => console.log(headers))"
// node -e "http.get('http://localhost:3000/bicycle/1', ({statusCode}) => console.log(statusCode))"
// node -e "http.get('http://localhost:3000/bicycle/9', ({statusCode}) => console.log(statusCode))"
// node -e "http.request('http://localhost:3000/bicycle/1', { method: 'post'}, ({statusCode}) => console.log(statusCode)).end()"
// node -e "http.get('http://localhost:3000/bicycle/1', ({statusCode}) => console.log(statusCode))"
//




