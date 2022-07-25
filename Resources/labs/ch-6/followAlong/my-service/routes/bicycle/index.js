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
const { uid } = bicycle
const read = promisify(bicycle.read)
const create = promisify(bicycle.create)
const update = promisify(bicycle.update)
const del = promisify(bicycle.del)

module.exports = async (fastify, opts) => {
  const { notFound } = fastify.httpErrors

  fastify.post('/', async (request, reply) => {
    const { data } = request.body
    const id = uid()
    await create(id, data)
    reply.code(201)
    return { id }
  })

  fastify.post('/:id/update', async (request, reply) => {
    const { id } = request.params
    const { data } = request.body
    try {
      await update(id, data)
      reply.code(204)
    } catch (err) {
      if (err.message === 'not found') throw notFound()
      throw err
    }
  })

  fastify.get('/:id', async (request, reply) => {
    const { id } = request.params
    try {
      return await read(id)
    } catch (err) {
      if (err.message === 'not found') throw notFound()
      throw err
    }
  })

  fastify.put('/:id', async (request, reply) => {
    const { id } = request.params
    const { data } = request.body
    try {
      await create(id, data)
      reply.code(201)
      return { }
    } catch (err) {
      if (err.message === 'resource exists') {
        await update(id, data)
        reply.code(204)
      } else {
        throw err
      }
    }
  })

  fastify.delete('/:id', async (request, reply) => {
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

// how to check the service:

// node -e "http.get('http://localhost:3000/bicycle/1', ({headers}) => console.log(headers))"
// node -e "http.get('http://localhost:3000/bicycle/1', ({statusCode}) =>  console.log(statusCode))"
// node -e "http.get('http://localhost:3000/bicycle/9', ({statusCode}) => console.log(statusCode))"
// node -e "http.request('http://localhost:3000/bicycle/1', { method: 'post'}, ({statusCode}) => console.log(statusCode)).end()"
// node -e "http.get('http://localhost:3000/bicycle/1', ({statusCode}) => console.log(statusCode))"

// node -e "http.request('http://localhost:3000/bicycle', { method: 'post', headers: {'content-type': 'application/json'}}, (res) => res.setEncoding('utf8').once('data', console.log.bind(null, res.statusCode))).end(JSON.stringify({data: {brand: 'Gazelle', color: 'red'}}))"
// node -e "http.get('http://localhost:3000/bicycle/3', (res) => res.setEncoding('utf8').once('data', console.log))"
// node -e "http.request('http://localhost:3000/bicycle/3/update', { method: 'post', headers: {'content-type': 'application/json'}}, (res) => console.log(res.statusCode)).end(JSON.stringify({data: {brand: 'Ampler', color: 'blue'}}))"
// node -e "http.get('http://localhost:3000/bicycle/3', (res) => res.setEncoding('utf8').once('data', console.log))"
// node -e "http.request('http://localhost:3000/bicycle/99', { method: 'put', headers: {'content-type': 'application/json'}}, (res) => console.log(res.statusCode)).end(JSON.stringify({data: {brand: 'VanMoof', color: 'black'}}))"
// node -e "http.get('http://localhost:3000/bicycle/99', (res) => res.setEncoding('utf8').once('data', console.log))"
// node -e "http.request('http://localhost:3000/bicycle/99', { method: 'put', headers: {'content-type': 'application/json'}}, (res) => console.log(res.statusCode)).end(JSON.stringify({data: {brand: 'Bianchi', color: 'pink'}}))"
// node -e "http.get('http://localhost:3000/bicycle/99', (res) => res.setEncoding('utf8').once('data', console.log))"
// node -e "http.get('http://localhost:3000/bicycle/1', (res) => res.setEncoding('utf8').once('data', console.log))"
// node -e "http.request('http://localhost:3000/bicycle/1', { method: 'delete', headers: {'content-type': 'application/json'}}, (res) => console.log(res.statusCode)).end()"
// node -e "http.get('http://localhost:3000/bicycle/1', (res) => res.setEncoding('utf8').once('data', console.log))"
// node -e "http.request('http://localhost:3000/bicycle/1', { method: 'delete', headers: {'content-type': 'application/json'}}, (res) => console.log(res.statusCode)).end()"
//












