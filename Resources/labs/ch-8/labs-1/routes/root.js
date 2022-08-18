'use strict'

module.exports = async function (fastify, opts) {
  fastify.get('/', async function (request, reply) {
    const { url } = request.query
    try {
      new URL(url)
    } catch (err) {
      return reply.code(400).send('Bad Request')
    }
    return reply.from(url)
  })
}
