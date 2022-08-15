// mixing callbacks with promise async/await

// 'use strict'
// const { boat } = require('../../model')
//
// module.exports = async function (fastify, opts) {
//   fastify.get('/:id', async function (request, reply) {
//     const { id } = request.params
//     boat.read(id, (err, data) => {
//       if (err) {
//         if (err.message === 'not found') return reply.notFound()
//         else return reply.send(err)
//       }
//       else return reply.code(200).send(data)
//     })
//     await reply
//   })
// }

// using promisify to change callbacks to be promises and working with async/await:

'use strict'
const { boat } = require('../../model')
const { promisify } = require('util')
const read = promisify(boat.read)

module.exports = async function (fastify, opts) {
  fastify.get('/:id', async function (request, reply) {
    const { id } = request.params
    try {
      return reply.code(200).send(await read(id))
    } catch(err) {
      if (err.message === 'not found') return reply.code(404).send('Not Found')
      return reply.send(err)
    }
  })
}
