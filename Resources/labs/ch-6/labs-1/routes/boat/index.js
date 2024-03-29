'use strict'
const { boat } = require('../../model')
const { promisify } = require("util")
const create = promisify(boat.create)
const read = promisify(boat.read)

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

  fastify.post('/', async function (request, reply) {
    const { data } = request.body
    const id = boat.uid()
    try {
      await create(id, data)
      return reply.code(201).send({ id })
    } catch (err) {
      if (err.message === 'not found') return reply.code(404).send('Not Found')
      return reply.send(err)
    }
  })
}