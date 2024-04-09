const { rest } = require('msw') 
const { TODO_SUCCESS, TODO_ERROR } = require('./todoResponses') 

const handlers = [
  /*
     * How to read the handler:
     * When finding a GET request (because we are using rest.get)
     * to the "https://jsonplaceholder.typicode.com/todos"
     * replace the call by the callback function I'm passing
  */
  rest.get('https://jsonplaceholder.typicode.com/todos', async (req, res, ctx) => {
    return res(ctx.json(TODO_SUCCESS))
  })
]

module.exports = { handlers } // Export handlers