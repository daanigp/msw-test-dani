const express = require("express");
const { server: mockServer2 } = require('../mocks/server')
const mockServer = require("./mockServer");

if(process.env.NODE_ENV === 'development') {
    mockServer2.listen()
}

const app = express()

app.get('/todos', mockServer.getTodos) // Respuesta mockeada a la ruta -> curl --get http://localhost:8080/todos | jq

app.get('/zephyr/PMA1-:nombre', mockServer.getPMA1TestCaseInfo) // curl --get http://localhost:8080/zephyr/PMA1-T33 | jq
app.get('/zephyr/testCaseExecutions/PMA1-:nombre', mockServer.getPMA1TestCaseExecution) // curl --get http://localhost:8080/zephyr/testCaseExecutions/PMA1-T33 | jq

app.listen(8080, () => {
    console.log(process.env.NODE_ENV)
    console.log('server started')
}) 