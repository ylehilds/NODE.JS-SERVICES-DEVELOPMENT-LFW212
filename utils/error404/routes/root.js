'use strict'

module.exports = async function (fastify, opts) {
  fastify.get('/', async function (request, reply) {
    throw fastify.httpErrors.notFound()
    // The command above is the same as: return reply.code(404).send('Not Found')
  })
}
