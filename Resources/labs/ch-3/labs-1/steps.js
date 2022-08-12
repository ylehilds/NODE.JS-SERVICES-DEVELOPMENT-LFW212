// #1 install fastify: npm init fastify -- --integrate
// #2 install dependencies: npm i
// #3 import data and return data like this:
// delete #4 example route. Any other route will default to 404, you could register a fastify.setNotFoundHandler in app.js for 404 as well, but for this lab it is not necessary.
const data = require('../data')
...
return data()
