'use strict'

module.exports = async function (fastify, opts) {
  fastify.get('/', async function (request, reply) {
    return reply.status(200).send('It Worked!!!')
  })
}
