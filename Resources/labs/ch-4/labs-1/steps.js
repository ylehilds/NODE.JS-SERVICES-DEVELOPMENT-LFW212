// #1 install fastify: npm init fastify
// #2 install dependencies: npm i
// #3 install point of view version 5 library: npm i point-of-view@5
// #3 install handlebars: npm i handlebars
// #4 import point of view and handlebars and register them with fastify on app.js, copy AutoLoad and modify to look like below:

  const pointOfView = require('point-of-view')
  const handlebars = require('handlebars')
  ...
  fastify.register(pointOfView, {
    engine: { handlebars },
    root: path.join(__dirname, 'views'),
    layout: 'layout.hbs'
  })

// #5 create views folder with 3 files: index.hbs, layout.hbs, me.hbs
//   the content of index.hjs and me.hbs becomes the body of layout.hbs and the content of layout.hbs is already provided in this lab exercise, but I'll put here for reference:
//
//   <html>
//   <head>
//   <style>
//   body { background: #333; margin: 1.25rem }
//   h1 { color: #EEE; font-family: sans-serif }
//   a { color: yellow; font-size: 2rem; font-family: sans-serif }
//   </style>
//   </head>
//   <body>
//   {{{ body }}}
//   </body>
//   </html>
//

// #6 create a route folder call it me and the index.js will be the content of example index.js and modify it as follows:
//   ...
  return reply.view('me.hbs')
//   ...
