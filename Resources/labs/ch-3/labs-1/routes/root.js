'use strict'
const data = require('../data')
module.exports = async function (fastify, opts) {
  fastify.get('/', async function (request, reply) {
    return reply.code(200).send(await data())
    // if you needed for exam purpose to wait 1 second before responding you could do it like this:
    // setTimeout(async () => {return reply.code(200).send(await data())}, 1000)
    // await reply
  })
}
