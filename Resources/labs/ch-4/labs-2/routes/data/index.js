'use strict'

const stream = require('../../util/stream')

module.exports = async function (fastify, opts) {
  fastify.get('/', async function (request, reply) {
    return reply.code(200).send( await stream())
  })
}
