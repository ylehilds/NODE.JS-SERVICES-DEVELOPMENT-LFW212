// how to complete this lab:
// #0 install dependencies, like this: npm i
// #1 inside fastify configuration create an object variable to hold the schema rule, call it bodySchema
// #2 remember trap:
// t - type
// r - required
// a - additionalProperties
// p - properties
// it wil look like this:
const bodySchema = {
  type: 'object',
  required: ['data'],
  additionalProperties: false,
  properties: {
    data: {
      type: 'object',
      required: ['brand', 'color'],
      additionalProperties: false,
      properties: {
        brand: {type: 'string'},
        color: {type: 'string'}
      }
    }
  }
}
// #3 add the schema rule in the post method you want the rule in between first (path) and seconf parameter (function handler) like this:
fastify.post('/', {
  schema: {
    body: bodySchema
  }
}, async (request, reply) => {
...