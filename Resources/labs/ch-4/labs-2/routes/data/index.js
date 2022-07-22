'use strict'

const stream = require('../../util/stream')

module.exports = async function (fastify, opts) {
  fastify.get('/', async function (request, reply) {
    return await stream()
  })
}
