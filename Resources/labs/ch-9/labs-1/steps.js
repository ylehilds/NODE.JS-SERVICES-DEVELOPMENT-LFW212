// how to complete this lab:
// #0 install dependencies, like this: npm i
// #1 inside setTimeout method pull "un" queryString, like this:
const { un } = req.query
// #2 check if "un" query is an array like this:
if (Array.isArray(un))
// #3 if yes then map the uppercase method to each value like this: (reference: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)
res.send(un.map( x => x.toUpperCase()))
// #4 if no then respond like usual. below is the entire working get request:
router.get('/', (req, res) => {
  setTimeout(() => {
    const { un } = req.query
    if (Array.isArray(un)) {
      res.send(un.map( x => x.toUpperCase()))
      // alternatively:
      // res.status(400).send('bad request!')
    }
    else res.send((un || '').toUpperCase())
  }, 1000)
})