'use strict'
const {boat} = require('../../model')
const {promisify} = require("util");
const create = promisify(boat.create)
const read = promisify(boat.read)

module.exports = async function (fastify, opts) {
  const { notFound } = fastify.httpErrors

  fastify.get('/:id', async function (request, reply) {
    const {id} = request.params
    try {
      const data = await read(id)
      reply.send(data)
    } catch (err) {
      if (err.message === 'not found') throw notFound()
      throw err
    }
  })

  fastify.post('/', async function (request, reply) {
    const id = boat.uid()
    const {data} = request.body
    try {
      await create(id, data)
      reply.code(201)
      reply.send({id})
    } catch (err) {
      if (err.message === 'not found') throw notFound()
      throw err
    }
  })

}
