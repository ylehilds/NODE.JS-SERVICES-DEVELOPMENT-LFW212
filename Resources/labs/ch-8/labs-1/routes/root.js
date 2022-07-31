'use strict'

module.exports = async function (fastify, opts) {
  fastify.get('/', async function (request, reply) {
    const { url } = request.query
    try {
      new URL(url)
    } catch (err) {
      throw fastify.httpErrors.badRequest()
    }
    return reply.from(url)
  })
}

// how to complete this lab:
// #1 install fastify-reply-from: npm install fastify-reply-from
// #2 create a new plugin called reply-from.js in the plugins folder
// #3 modify root.js file like the above code

