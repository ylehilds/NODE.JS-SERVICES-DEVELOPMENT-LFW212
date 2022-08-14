'use strict'
const data = require('../data')
module.exports = async function (fastify, opts) {
  fastify.get('/', async function (request, reply) {
    return reply.code(200).send(await data())
  })
}
