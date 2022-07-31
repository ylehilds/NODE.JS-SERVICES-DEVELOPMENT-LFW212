'use strict'
const proxy = require('fastify-http-proxy')
module.exports = async function (fastify, opts) {
  fastify.register(proxy, {
    upstream: 'https://jsonplaceholder.typicode.com/'
  })
}

// how to complete this lab:
// #1 install fastify-http-proxy library: npm install fastify-http-proxy
// #2 modify the app.js file like the code above
// #3 test with this terminal command: node -e "http.get('http://localhost:3000/todos/1', (res) =>res.pipe(process.stdout))"

