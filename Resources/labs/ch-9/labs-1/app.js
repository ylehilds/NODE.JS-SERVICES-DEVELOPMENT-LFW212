'use strict'
const express = require('express')
const app = express()
const router = express.Router()
const { PORT = 3000 } = process.env

router.get('/', (req, res) => {
  setTimeout(() => {
    const { un } = req.query
    if (Array.isArray(un)) {
      res.send(un.map( x => x.toUpperCase()))
      // alternatively:
      // res.status(400).send('bad request!')
    }
    else res.send((un || '').toUpperCase())
  }, 1000)
})

app.use(router)

app.listen(PORT, () => {
  console.log(`Express server listening on ${PORT}`)
})

// another way using badRequest method
// router.get('/', (req, res, next) => {
//   setTimeout(() => {
//     const { un } = req.query
//     if (Array.isArray(un)) {
//       // res.send(un.map( x => x.toUpperCase()))
//       // alternatively:
//       next(badRequest());
//     }
//     else res.send((un || '').toUpperCase())
//   }, 1000)
// })
//
// function badRequest () {
//   const err = new Error('Bad Request');
//   err.status = 400;
//   return err;
// }