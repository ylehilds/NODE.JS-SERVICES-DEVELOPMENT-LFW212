// #1 install fastify: npm init fastify -- --integrate
// #2 install dependencies: npm i
// #3 copy example folder, name it boat under routes
// #3 import boat from model.js and promisify the callbacks methods you need like this:
const { boat } = require('../../model')
const { promisify } = require("util")
const create = promisify(boat.create)
const read = promisify(boat.read)
// #4 copy the get method from example folder and implement the boat get & post method like this:
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
// #5 delete example folder as a clean-up step