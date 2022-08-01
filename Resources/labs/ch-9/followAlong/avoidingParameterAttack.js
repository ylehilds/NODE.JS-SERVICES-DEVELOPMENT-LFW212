// node -p "querystring.parse('name=bob')"
// node -p "querystring.parse('name=bob&name=dave')"

router.get('/', (req, res, next) => {
  someAsynchronousOperation(() => {
    if (!req.query.name) {
      var err = new Error('Bad Request')
      err.status = 400
      next(err)
      return
    }
    var parts = req.query.name.split(' ');
    var last = parts.pop();
    var first = parts.shift();
    res.send({first: first, last: last});
  })
});