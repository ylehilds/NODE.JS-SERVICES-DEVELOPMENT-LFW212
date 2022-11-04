'use strict'
const fs = require('fs')
const file = fs.readFileSync('public/index.html')
module.exports = async function (fastify, opts) {
  fastify.get('/', async function (request, reply) {
    return reply.code(200).send(file)
  })
}
