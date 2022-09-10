// #1 install fastify: npm init fastify -- --integrate
// #2 install dependencies: npm i
// #3 import data and return data like this:
// delete #4 example route. Any other route will default to 404, you could register a fastify.setNotFoundHandler in app.js for 404 as well, but for this lab it is not necessary.
const data = require('../data')
...
return reply.code(200).send(await data()) // technically you could just "return data()" because fastify knows how to work with promises/async/await, but I like to be explicit, so I'm in control and there is a standard one way to respond from fastify.

// just a little explanation:
// there are at least 3 ways (that I know of) a server can respond to requests:
// 1. return { root: true || 'string'}
// 2. return reply.send({ root: true } || promise/async & await || 'string' || stream)
// 3. return reply.code(200).send({ root: true } || promise/async & await || 'string' || stream)
// I believe and tested all of these I just think being explicitly like:
// return reply.code(200).send(await data())
// is more of a one standard way to return all requests, because it gives you more power and control when you need to send different status codes, etc.