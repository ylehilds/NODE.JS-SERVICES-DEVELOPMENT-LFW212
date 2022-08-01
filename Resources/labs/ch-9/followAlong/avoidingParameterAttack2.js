// node -p "querystring.parse('name=bob')"
// node -p "querystring.parse('name=bob&name=dave')"

function convert (name) {
  var parts = name.split(' ');
  var last = parts.pop();
  var first = parts.shift();
  return {first: first, last: last};
}
router.get('/', (req, res, next) => {
  someAsynchronousOperation(() => {
    if (!req.query.name) {
      var err = new Error('Bad Request')
      err.status = 400
      next(err)
      return
    }
    if (Array.isArray(req.query.name)) {
      res.send(req.query.name.map(convert));
    } else {
      res.send(convert(req.query.name));
    }
  });
});
