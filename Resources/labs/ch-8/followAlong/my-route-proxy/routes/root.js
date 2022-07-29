// 'use strict'
//
// module.exports = async function (fastify, opts) {
//   fastify.get('/', async function (request, reply) {
//     const { url } = request.query
//     try {
//       new URL(url)
//     } catch (err) {
//       throw fastify.httpErrors.badRequest()
//     }
//     return reply.from(url)
//   })
// }

// node -e "http.createServer((_, res) => (res.setHeader('Content-Type', 'text/plain'), res.end('hello world'))).listen(5001)"


// uppercase the response:

'use strict'
const { Readable } = require('stream')
async function * upper (res) {
  for await (const chunk of res) {
    yield chunk.toString().toUpperCase()
  }
}
module.exports = async function (fastify, opts) {
  fastify.get('/', async function (request, reply) {
    const { url } = request.query
    try {
      new URL(url)
    } catch (err) {
      throw fastify.httpErrors.badRequest()
    }
    return reply.from(url, {
      onResponse (request, reply, res) {
        reply.send(Readable.from(upper(res)))
      }
    })
  })
}