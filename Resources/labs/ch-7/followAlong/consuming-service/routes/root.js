// One call at a time then respond

// 'use strict'
// const got = require('got')
//
// const {
//   BICYCLE_SERVICE_PORT = 4000, BRAND_SERVICE_PORT = 5001
// } = process.env
//
// const bicycleSrv = `http://localhost:${BICYCLE_SERVICE_PORT}`
// const brandSrv = `http://localhost:${BRAND_SERVICE_PORT}`
//
// module.exports = async function (fastify, opts) {
//   fastify.get('/:id', async function (request, reply) {
//     const { id } = request.params
//     const bicycle = await got(`${bicycleSrv}/${id}`).json()
//     const brand = await got(`${brandSrv}/${id}`).json()
//     return {
//       id: bicycle.id,
//       color: bicycle.color,
//       brand: brand.name,
//     }
//   })
// }


// Concurrent calls example:
// 'use strict'
// const got = require('got')
//
// const {
//   BICYCLE_SERVICE_PORT = 4000, BRAND_SERVICE_PORT = 5001
// } = process.env
//
// const bicycleSrv = `http://localhost:${BICYCLE_SERVICE_PORT}`
// const brandSrv = `http://localhost:${BRAND_SERVICE_PORT}`
//
// module.exports = async function (fastify, opts) {
//   fastify.get('/:id', async function (request, reply) {
//     const { id } = request.params
//     const [ bicycle, brand ] = await Promise.all([
//       got(`${bicycleSrv}/${id}`).json(),
//       got(`${brandSrv}/${id}`).json()
//     ])
//     return {
//       id: bicycle.id,
//       color: bicycle.color,
//       brand: brand.name,
//     }
//   })
// }

// node -e "http.get('http://localhost:3000/1', (res) => console.log(res.statusCode))"
// node -e "http.get('http://localhost:3000/2', (res) => console.log(res.statusCode))"


// Concurrent calls example with error handler:
// 'use strict'
// const got = require('got')
//
// const {
//   BICYCLE_SERVICE_PORT = 4000, BRAND_SERVICE_PORT = 5001
// } = process.env
//
// const bicycleSrv = `http://localhost:${BICYCLE_SERVICE_PORT}`
// const brandSrv = `http://localhost:${BRAND_SERVICE_PORT}`
//
// module.exports = async function (fastify, opts) {
//   const { httpErrors } = fastify
//   fastify.get('/:id', async function (request, reply) {
//     const { id } = request.params
//     try {
//       const [ bicycle, brand ] = await Promise.all([
//         got(`${bicycleSrv}/${id}`).json(),
//         got(`${brandSrv}/${id}`).json()
//       ])
//       return {
//         id: bicycle.id,
//         color: bicycle.color,
//         brand: brand.name,
//       }
//     } catch (err) {
//       if (!err.response) throw err
//       if (err.response.statusCode === 404) {
//         throw httpErrors.notFound()
//       }
//       throw err
//     }
//   })
// }

// node -e "http.get('http://localhost:3000/2', (res) => console.log(res.statusCode))"
// node -e "http.get('http://localhost:3000/foo', (res) => console.log(res.statusCode))"

// Concurrent calls example with error handler, including if id is not an integer (bad request):
'use strict'

const got = require('got')

const {
  BICYCLE_SERVICE_PORT = 4000, BRAND_SERVICE_PORT = 5001
} = process.env

const bicycleSrv = `http://localhost:${BICYCLE_SERVICE_PORT}`
const brandSrv = `http://localhost:${BRAND_SERVICE_PORT}`

module.exports = async function (fastify, opts) {
  const { httpErrors } = fastify
  fastify.get('/:id', async function (request, reply) {
    const { id } = request.params
    try {
      const [ bicycle, brand ] = await Promise.all([
        got(`${bicycleSrv}/${id}`).json(),
        got(`${brandSrv}/${id}`).json()
      ])
      return {
        id: bicycle.id,
        color: bicycle.color,
        brand: brand.name,
      }
    } catch (err) {
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

// killing one server and then trying this command: node -e "http.get('http://localhost:3000/1', (res) => console.log(res.statusCode))"