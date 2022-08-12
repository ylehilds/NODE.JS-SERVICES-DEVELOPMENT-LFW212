// #1 install fastify: npm init fastify -- --integrate
// #2 install dependencies: npm i
// #3 in app.js register the setNotFoundHandler like this:

fastify.setNotFoundHandler((request, reply) => {
  if (request.method === 'POST') return reply.code(405).send('Not Allowed')
})
