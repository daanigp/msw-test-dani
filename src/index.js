const express = require("express");
const { server: mockServer2 } = require('../mocks/server')
const mockServer = require("./mockServer");

if(process.env.NODE_ENV === 'development') {
    mockServer2.listen()
}

const app = express()

app.get('/todos', mockServer.getTodos) // Respuesta mockeada a la ruta

app.get('/zephyr/PMA1-:nombre', mockServer.getPMA1TestCaseInfo)
app.get('/zephyr/testCaseExecutions/PMA1-*', mockServer.getPMA1TestCaseExecution)

app.listen(8080, () => {
    console.log(process.env.NODE_ENV)
    console.log('server started')
}) 