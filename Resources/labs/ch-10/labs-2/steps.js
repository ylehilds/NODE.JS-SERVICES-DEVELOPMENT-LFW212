// how to complete this lab:
// #1 install dependencies, like this: npm i
// #2 under plugins folder copy sensible.js paste as deny.js and do the following changes:
// remove the fastify.register code block and add fastify.addHook and code as described below:
...
module.exports = fp(async function (fastify, opts) {
  fastify.addHook('onRequest', async function (request) {
    if (request.ip === '211.133.33.113') {
      throw fastify.httpErrors.forbidden()
    }
  })
})