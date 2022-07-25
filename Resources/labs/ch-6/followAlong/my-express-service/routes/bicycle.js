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

router.post('/', function(req, res, next) {
  var id = model.bicycle.uid();
  model.bicycle.create(id, req.body.data, (err) => {
    if (err) next(err);
    else res.status(201).send({ id });
  });
});

router.post('/:id/update', function(req, res, next) {
  model.bicycle.update(req.params.id, req.body.data, (err) => {
    if (err) {
      if (err.message === 'not found') next();
      else next(err);
    } else {
      res.status(204).send();
    }
  });
});

router.put('/:id', function(req, res, next) {
  model.bicycle.create(req.params.id, req.body.data, (err) => {
    if (err) {
      if (err.message === 'resource exists') {
        model.bicycle.update(req.params.id, req.body.data, (err) => {
          if (err) next(err);
          else res.status(204).send();
        });
      } else {
        next(err);
      }
    } else {
      res.status(201).send({});
    }
  });
});

router.delete('/:id', function(req, res, next) {
  model.bicycle.del(req.params.id, (err) => {
    if (err) {
      if (err.message === 'not found') next();
      else next(err);
    } else {
      res.status(204).send();
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

// node -e "http.request('http://localhost:3000/bicycle', { method: 'post', headers: {'content-type': 'application/json'}}, (res) => res.setEncoding('utf8').once('data', console.log.bind(null, res.statusCode))).end(JSON.stringify({data: {brand: 'Gazelle', color: 'red'}}))"
// node -e "http.get('http://localhost:3000/bicycle/3', (res) => res.setEncoding('utf8').once('data', console.log))"
// node -e "http.request('http://localhost:3000/bicycle/3/update', { method: 'post', headers: {'content-type': 'application/json'}}, (res) => console.log(res.statusCode)).end(JSON.stringify({data: {brand: 'Ampler', color: 'blue'}}))"
// node -e "http.get('http://localhost:3000/bicycle/3', (res) => res.setEncoding('utf8').once('data', console.log))"
// node -e "http.request('http://localhost:3000/bicycle/99', { method: 'put', headers: {'content-type': 'application/json'}}, (res) => console.log(res.statusCode)).end(JSON.stringify({data: {brand: 'VanMoof', color: 'black'}}))"
// node -e "http.get('http://localhost:3000/bicycle/99', (res) => res.setEncoding('utf8').once('data', console.log))"
// node -e "http.request('http://localhost:3000/bicycle/99', { method: 'put', headers: {'content-type': 'application/json'}}, (res) => console.log(res.statusCode)).end(JSON.stringify({data: {brand: 'Bianchi', color: 'pink'}}))"
// node -e "http.get('http://localhost:3000/bicycle/99', (res) => res.setEncoding('utf8').once('data', console.log))"
// node -e "http.request('http://localhost:3000/bicycle/99', { method: 'delete', headers: {'content-type': 'application/json'}}, (res) => console.log(res.statusCode)).end()"
// node -e "http.get('http://localhost:3000/bicycle/99', (res) => res.setEncoding('utf8').once('data', console.log))"
//










