'use strict'

const stream = require('../../stream')

module.exports = async function (fastify, opts) {
  fastify.get('/', async function (request, reply) {
    return reply.code(200).send(stream())
  })
}
