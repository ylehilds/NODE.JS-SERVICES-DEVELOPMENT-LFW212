'use strict'
const { boat } = require('../../model')
const { promisify } = require('util')
const read = promisify(boat.read)
const del = promisify(boat.del)

module.exports = async function (fastify, opts) {
  const { notFound } = fastify.httpErrors
  fastify.get('/:id', async function (request, reply) {
    const { id } = request.params
    try {
      return await read(id)
    } catch(err) {
      if (err.message === 'not found') throw notFound()
      throw err
    }
  })

  fastify.delete('/:id', async function (request, reply) {
    const { id } = request.params
    try {
      await del(id)
      reply.code(204)
    } catch (err) {
      if (err.message === 'not found') throw notFound()
      throw err
    }
  })
}
