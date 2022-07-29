'use strict'
const got = require('got')

const {
  BOAT_SERVICE_PORT = 4000, BRAND_SERVICE_PORT = 5001
} = process.env

const boatSrv = `http://localhost:${BOAT_SERVICE_PORT}`
const brandSrv = `http://localhost:${BRAND_SERVICE_PORT}`

module.exports = async function (fastify, opts) {
  const { httpErrors } = fastify
  fastify.get('/:id', async function (request, reply) {
    const { id } = request.params
    try {
      const boat = await got(`${boatSrv}/${id}`, { timeout:600, retry: 0 }).json()
      const brand = await got(`${brandSrv}/${boat.brand}`, { timeout:600, retry: 0 }).json()
      return {
        id: boat.id,
        color: boat.color,
        brand: brand.name,
      }
    } catch(err) {
      if (!err.response) throw err
      if (err.response.statusCode === 404) {
        throw httpErrors.notFound()
      }
      if (err.response.statusCode === 400) {
        throw httpErrors.badRequest()
      }
      throw err
    }
  })
}