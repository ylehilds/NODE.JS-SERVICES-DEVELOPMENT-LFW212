// Using callback-based approach

// 'use strict'
//
// const { bicycle } = require('../../model')
//
// module.exports = async (fastify, opts) => {
//   fastify.get('/:id', (request, reply) => {
//     const { id } = request.params
//     bicycle.read(id, (err, result) => {
//       if (err) {
//         if (err.message === 'not found') reply.notFound()
//         else reply.send(err)
//       } else reply.send(result)
//     })
//   })
// }

// Using Callback API inside an async route handler the following approach could instead be taken:

// 'use strict'
//
// const { bicycle } = require('../../model')
//
// module.exports = async (fastify, opts) => {
//   fastify.get('/:id', async (request, reply) => {
//     const { id } = request.params
//     bicycle.read(id, (err, result) => {
//       if (err) {
//         if (err.message === 'not found') reply.notFound()
//         else reply.send(err)
//       } else reply.send(result)
//     })
//     await reply
//   })
// }

// Using callback-based APIs in an async function by promisifying the API

'use strict'
const { promisify } = require('util')
const { bicycle } = require('../../model')
const read = promisify(bicycle.read)

module.exports = async (fastify, opts) => {
  const { notFound } = fastify.httpErrors

  fastify.get('/:id', async (request, reply) => {
    const { id } = request.params
    try {
      return await read(id)
    } catch (err) {
      if (err.message === 'not found') throw notFound()
      throw err
    }
  })
}
