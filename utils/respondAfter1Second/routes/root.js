'use strict'

module.exports = async function (fastify, opts) {
  fastify.get('/', async function (request, reply) {
    setTimeout(async () => {return reply.code(200).send('Hello after 1 second!')}, 1000)
    await reply
  })
}
