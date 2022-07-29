// 'use strict'
//
// const path = require('path')
// const AutoLoad = require('fastify-autoload')
//
// module.exports = async function (fastify, opts) {
//   // Place here your custom code!
//
//   // Do not touch the following lines
//
//   // This loads all plugins defined in plugins
//   // those should be support plugins that are reused
//   // through your application
//   fastify.register(AutoLoad, {
//     dir: path.join(__dirname, 'plugins'),
//     options: Object.assign({}, opts)
//   })
//
//   // This loads all plugins defined in routes
//   // define your routes in one of these
//   fastify.register(AutoLoad, {
//     dir: path.join(__dirname, 'routes'),
//     options: Object.assign({}, opts)
//   })
// }

// With upstream  base option
// 'use strict'
// const proxy = require('fastify-http-proxy')
// module.exports = async function (fastify, opts) {
//   fastify.register(proxy, {
//     upstream: 'https://news.ycombinator.com/'
//   })
// }

// With a preHandler option supported by fastify-http-proxy to implement custom authentication logic.
'use strict'

const proxy = require('fastify-http-proxy')
const sensible = require('fastify-sensible')
module.exports = async function (fastify, opts) {
  fastify.register(sensible)
  fastify.register(proxy, {
    upstream: 'https://news.ycombinator.com/',
    async preHandler(request, reply) {
      if (request.query.token !== 'abc') {
        throw fastify.httpErrors.unauthorized()
      }
    }
  })
}
