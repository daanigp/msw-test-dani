const { setupServer } = require('msw/node')
const { handlers } = require('./handlers')
// This configures a request mocking server with the given request handlers.
const server = setupServer(...handlers)

// Export the server
module.exports = {
    server
}