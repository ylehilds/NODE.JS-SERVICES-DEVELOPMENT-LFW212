'use strict'
const got = require('got')

const {
  BOAT_SERVICE_PORT, BRAND_SERVICE_PORT
} = process.env

const boatSrv = `http://localhost:${BOAT_SERVICE_PORT}`
const brandSrv = `http://localhost:${BRAND_SERVICE_PORT}`

module.exports = async function (fastify, opts) {
  fastify.get('/:id', async function (request, reply) {
    const { id } = request.params
    try {
      const boat = await got(`${boatSrv}/${id}`, { timeout:600, retry: 0 }).json()
      const brand = await got(`${brandSrv}/${boat.brand}`, { timeout:600, retry: 0 }).json()
      return {
        id: boat.id,
        color: boat.color,
        brand: brand.name
      }
    } catch(err) {
      if (!err.response) return reply.send(err)
      if (err.response.statusCode === 404) return reply.code(404).send('Not Found')
      if (err.response.statusCode === 400) return reply.code(400).send('Bad Request')
      return reply.send(err)
    }
  })
}