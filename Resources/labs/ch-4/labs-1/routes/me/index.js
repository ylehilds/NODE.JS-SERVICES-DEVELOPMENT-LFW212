'use strict'

module.exports = async (fastify, opts) => {
  fastify.get('/', async (request, reply) => {
    return reply.code(200).view(`me.hbs`)
  })
}