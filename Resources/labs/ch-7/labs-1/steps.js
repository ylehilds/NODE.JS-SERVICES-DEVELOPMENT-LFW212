// #1 install fastify: npm init fastify -- --integrate
// #2 install dependencies: npm i
// #3 install dependencies: npm i got@11
// #4 import got into root route like this:
const got = require('got')
// #5 the lab demonstrates how we can add environment variables along with the start script in package.json like this:
// ...
"start": "PORT=3000 BOAT_SERVICE_PORT=4000 BRAND_SERVICE_PORT=5001 fastify start -l info app.js",
// ...
// But for this lab it is not necessary to do this as these ports are set when the services are brought up and are saved as environment variables that the server you're testing to is able to pull the environment variables and work with them.
// In the root route we pull the environment variables that the test is setting up:
const { BOAT_SERVICE_PORT, BRAND_SERVICE_PORT } = process.env
// #6 set the services urls to easy work with them, like this:
...
const boatSrv = `http://localhost:${BOAT_SERVICE_PORT}`
const brandSrv = `http://localhost:${BRAND_SERVICE_PORT}`
...
// #7 set the GET route like this:
module.exports = async function (fastify, opts) {
  fastify.get('/:id', async function (request, reply) {
    const { id } = request.params
    try {
      // the got options is so that we make the requests in the time the lab wants us to and the json() method is to work with payloads in json format for the response
      const boat = await got(`${boatSrv}/${id}`, { timeout:600, retry: 0 }).json()
      const brand = await got(`${brandSrv}/${boat.brand}`, { timeout:600, retry: 0 }).json()
      return {
        id: boat.id,
        color: boat.color,
        brand: brand.name
      }
    } catch(err) {
      if (!err.response) return reply.send(err) // If the err.response object is not there, then no response occurred but there was still an error.
      if (err.response.statusCode === 404) return reply.code(404).send('Not Found')
      if (err.response.statusCode === 400) return reply.code(400).send('Bad Request')
      return reply.send(err) // Any other errors are just re-thrown, so if an upstream service replies with a status code that isn't 200-299 or 404 this results in a 500 error.
    }
  })
}

// #8 clean up step delete the example folder in routes folder
