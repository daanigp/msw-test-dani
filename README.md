# Implementation

## MSW Setup

MSW docs: https://mswjs.io/docs/

### Installing

To configure MSW we fist need to install it

```bash
npm install msw
```

Then we need to create our basic structure to mock a server.

### Creating handlers

In this example I'm going to use the https://jsonplaceholder.typicode.com/ api as reference.

To create it we just need to define some `handlers`. Handlers are the instructions of what to do when you find the request in the code. It's going to match the requests in the code and replace it by the ones we define here.

[mocks/handlers.md](mocks/handlers.js)
```javascript
const { rest } = require('msw') // import msw
const { TODO_SUCCESS, TODO_ERROR } = require('./todoResponses') // import default responses

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
```

After setup the handlers we are good to create the mocked server

### Creating the server

To create the server we just have to call the `setupServer` function from the `msw/node` package

[mocks/server.js](mocks/server.js)
```javascript
const { setupServer } = require('msw/node') // import the setupServer from the msw/node package
const { handlers } = require('./handlers') // import the handlers we created

// This configures a request mocking server with the given request handlers.
const server = setupServer(...handlers)

// Export the server
module.exports = {
    server
}
```

After doing it we have all prepared to use our mocked server in our applcation

## Using the mock server

In this application I'm using it in two diferent ways:
- In the jest setup
- For development

### Using it in the Jest setup

#### Installing jest

To install jest you just have to run
```bash
npm install jest
```

#### Create Jest setup for tests

In this configuration, we are going to setup Jest to:
- Initialize the server we created before the tests
- To reset the handlers after each test to prevent side effects in other tests
- And at the end we are going to close the server.

[jest.setup.js](jest.setup.js)
```javascript
const { server } = require('./mocks/server.js')
// Establish API mocking before all tests.
beforeAll(() => server.listen())
// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => server.resetHandlers())
// Clean up after the tests are finished.
afterAll(() => server.close())
```

After define the configuration we just have to call it in the Jest config.

#### Defining the Jest Config

To define the configuration to use the setup file we just need to add the path the the `setupFilesAfterEnv` property.

[jest.config.js](jest.config.js)
```javascript
module.exports = {
    setupFilesAfterEnv: ['./jest.setup.js']
}
```

And then, when we execute the tests, it's going to use our mock server instead of the original calls.

You can run `npm run test` to see the tests running and confirm the response is the same as the mock.

## Using it for development

To mock the external requests we can use the same function we used in the jest configuration to start the mock server.

So, it is simple as adding a `server.listen()` in the `index.js` file.

```javascript
const express = require("express");
const { server: mockServer } = require('../mocks/server') // importing the server and renaming it to mockServer to avoid misunderstandings
const todoServer = require("./todoServer");

mockServer.listen() // This is going to do all the work to mock the resquests

const app = express()

app.get('/todos', todoServer.getTodos)

app.listen(8080, () => {
    console.log(process.env.NODE_ENV)
    console.log('server started')
})
```

But we want to add for development, and not for production or other environments we might have.
So in this case we used an environment variable to identify in with environment we are.

I'm setting this in the `package.json` file, but it can be in a `.env` file or setting up manually in the terminal.

```json
{
  ...
  "scripts": {
    "test": "jest",
    "start": "SET NODE_ENV=production&& node index.js",
    "dev": "SET NODE_ENV=development&& node index.js"
  },
  ...
}
```

PS: I'm using windows, that's why the command is `SET NODE_ENV=environment`, for linux and mac you can simply use `NODE_ENV=environment`

For the script `npm start` I'm setting the `NODE_ENV` variable to `production`

For the script `npm run dev` I'm setting the `NODE_ENV` variable to `development`

This variable is going to be accessible through the `process.env.NODE_ENV` attribute.

So now we are able to define if we are going to use the mock depending on the environment by just wrapping the `mockServer.listen()` in an `if` expression

```javascript
const express = require("express");
const { server: mockServer } = require('../mocks/server') // importing the server and renaming it to mockServer to avoid misunderstandings
const todoServer = require("./todoServer");

// Just use the mocks if the NODE_ENV is set to 'development'
if(process.env.NODE_ENV === 'development') { 
    mockServer.listen()
}

const app = express()

app.get('/todos', todoServer.getTodos)

app.listen(8080, () => {
    console.log(process.env.NODE_ENV)
    console.log('server started')
})
```

And that's it.

By running with `npm start` you are going to call the service and get the real response

By running with `npm run dev` you are going to replace the real call to the mocked one.