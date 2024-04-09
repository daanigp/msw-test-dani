const express = require("express");
const { server: mockServer } = require('../mocks/server')
const todoServer = require("./mockServer");

if(process.env.NODE_ENV === 'development') {
    mockServer.listen()
}

const app = express()

app.get('/todos', todoServer.getTodos) // Respuesta mockeada a la ruta

app.get('/zephyr/PMA1-*', todoServer.getPMA1TestCaseInfo)
app.get('/zephyr/testCaseExecutions/PMA1-*', todoServer.getPMA1TestCaseExecution)

app.listen(8080, () => {
    console.log(process.env.NODE_ENV)
    console.log('server started')
})