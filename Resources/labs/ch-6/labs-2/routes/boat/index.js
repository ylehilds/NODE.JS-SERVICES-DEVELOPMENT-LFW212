'use strict'
const { boat } = require('../../model')
const { promisify } = require('util')
const read = promisify(boat.read)
const del = promisify(boat.del)

module.exports = async function (fastify, opts) {
  fastify.get('/:id', async function (request, reply) {
    const { id } = request.params
    try {
      return reply.code(200).send(await read(id))
    } catch (err) {
      if (err.message === 'not found') return reply.code(404).send('Not Found')
      return reply.send(err)
    }
  })

  fastify.delete('/:id', async function (request, reply) {
    const { id } = request.params
    try {
      await del(id)
      return reply.code(204).send()
    } catch (err) {
      if (err.message === 'not found') return reply.code(404).send('Not Found')
      return reply.send(err)
    }
  })
}