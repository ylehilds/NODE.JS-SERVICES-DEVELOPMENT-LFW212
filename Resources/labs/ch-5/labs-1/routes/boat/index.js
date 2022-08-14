'use strict'
const { boat } = require('../../model')

module.exports = async function (fastify, opts) {
  fastify.get('/:id', async function (request, reply) {
    const { id } = request.params
    boat.read(id, (err, data) => {
      if (err) {
        if (err.message === 'not found') return reply.notFound()
        else return reply.send(err)
      }
      else return reply.code(200).send(data)
    })
    await reply
  })
}
