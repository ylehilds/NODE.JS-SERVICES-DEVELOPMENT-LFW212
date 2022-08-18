// steps on how to complete this lab:
// #1 npm init fastify -- --integrate
// #2 npm i
// #3 install fastify-reply-from: npm i fastify-reply-from
// #4 copy plugins/sensible.js and paste it as reply-from.js in the plugins folder
// #5 modify reply-from to register the plugin application wide like this:
...
fastify.register(require('fastify-reply-from'), {
  errorHandler: false
})
...
// #6 modify root.js file like the below code:

'use strict'

module.exports = async function (fastify, opts) {
  fastify.get('/', async function (request, reply) {
    const { url } = request.query
    try {
      new URL(url) // global URL constructor in order to validate it
    } catch (err) {
      return reply.code(400).send('Bad Request')
    }
    return reply.from(url)
  })
}