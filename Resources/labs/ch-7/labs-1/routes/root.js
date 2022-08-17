'use strict'
const got = require('got')

const { BOAT_SERVICE_PORT, BRAND_SERVICE_PORT } = process.env

const boatSrv = `http://localhost:${BOAT_SERVICE_PORT}`
const brandSrv = `http://localhost:${BRAND_SERVICE_PORT}`

module.exports = async function (fastify, opts) {
  fastify.get('/:id', async function (request, reply) {
    const { id } = request.params
    try {
      // the got options is so that we make the requests in the time the lab wants us to and the json() method is to work with payloads in json format for the response
      const boat = await got(`${boatSrv}/${id}`, { timeout:600, retry: 0 }).json()
      const brand = await got(`${brandSrv}/${boat.brand}`, { timeout:600, retry: 0 }).json()
      return reply.code(200).send({
        id: boat.id,
        color: boat.color,
        brand: brand.name
      })
    } catch(err) {
      if (!err.response) return reply.send(err) // If the err.response object is not there, then no response occurred but there was still an error.
      if (err.response.statusCode === 404) return reply.code(404).send('Not Found')
      if (err.response.statusCode === 400) return reply.code(400).send('Bad Request')
      return reply.send(err) // Any other errors are just re-thrown, so if an upstream service replies with a status code that isn't 200-299 or 404 this results in a 500 error.
    }
  })
}