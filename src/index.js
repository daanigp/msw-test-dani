const express = require("express");
const { server: mockServer } = require('../mocks/server')
const todoServer = require("./todoServer");

if(process.env.NODE_ENV === 'development') {
    mockServer.listen()
}

const app = express()

app.get('/todos', todoServer.getTodos) // Respuesta mockeada a la ruta

app.get('/zephyr/PMA1-*', todoServer.getTodos)
app.get('/zephyr/testCaseExecutions/PMA1-*', todoServer.getTodos)

app.listen(8080, () => {
    console.log(process.env.NODE_ENV)
    console.log('server started')
})