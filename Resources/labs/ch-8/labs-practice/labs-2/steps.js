// how to complete this lab:
// #1 install fastify server: npm init fastify
// #2 install dependencies like this: npm i
// #3 install fastify-http-proxy library: npm install fastify-http-proxy
// #4 import fastify-http-proxy module and name it proxy, like this:
const proxy = require('fastify-http-proxy')
// #5 register proxy with fastify with an upstream option with the url you want to proxy to
...
fastify.register(proxy, {
  upstream: 'https://jsonplaceholder.typicode.com/'
})
...
// #6 complete code in app.js is like this:
'use strict'
const proxy = require('fastify-http-proxy')
module.exports = async function (fastify, opts) {
  fastify.register(proxy, {
    upstream: 'https://jsonplaceholder.typicode.com/'
  })
}
// #7 test with this terminal command: node -e "http.get('http://localhost:3000/todos/1', (res) =>res.pipe(process.stdout))"
