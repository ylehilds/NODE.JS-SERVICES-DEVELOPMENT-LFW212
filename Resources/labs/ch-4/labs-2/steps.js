// #1 install fastify: npm init fastify
// #2 install dependencies: npm i
// #3 create a data router/rename example to data
// #3 import stream file and return it like this, noticed there is no await, that is because fastify knows how to work with streams and keeps connection opened until the stream gets the close event:

const stream = require('../../stream')
...
return reply.code(200).send(stream())
