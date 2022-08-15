// #1 install fastify: npm init fastify -- --integrate
// #2 install dependencies: npm i
// #3 copy example folder, name it boat under routes
// #3 import boat from model.js and promisify the callbacks methods you need like this:
const { boat } = require('../../model')
const { promisify } = require('util')
const read = promisify(boat.read)
const del = promisify(boat.del)
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
// #5 delete example folder as a clean-up step
