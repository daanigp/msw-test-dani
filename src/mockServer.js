const axios = require('axios').default
const faker = require('faker')

module.exports = {
    getTodos: async (req, res) => {
        try {
            const response = await axios.get('https://jsonplaceholder.typicode.com/todos')
            console.log(req.baseUrl)
            return res.json(response.data)
        } catch (err) {
            console.error(err);
            return res.status(400).send(new Error(err))
        }
    },

    getPMA1TestCaseInfo: async (req, res) => {
        //Crear un json con fker, y devolverlo.
        try {
            const url = req.params.nombre;
            const nombreFalso = faker.name.findName();

            const PMA1 = {
                //"id": generarNumeroAleatorio(100000000),
                "id": faker.datatype.number({min: 0, max: 1000000}),
                "key": "PMA1-" + url,
                "name": nombreFalso,
                "project": {
                    "id": faker.datatype.number({min: 0, max: 1000000}),
                    "self": "https://api.zephyrscale.smartbear.com/v2/projects/129674"
                },
                "createdOn": generarFechaAleatoria(),
                "labels": [
                    "Smoke",
                    "e2e_ui",
                ],
                "status": {
                    "id": faker.datatype.number({min: 0, max: 1000000}),
                    "self": "https://api.zephyrscale.smartbear.com/v2/statuses/2381907"
                },
                "folder": {
                    "id": faker.datatype.number({min: 0, max: 1000000}),
                    "self": "https://api.zephyrscale.smartbear.com/v2/folders/3251612"
                },
                "owner": null,
            }

            return res.json(PMA1)
        } catch (err) {
            console.error(err);
            return res.status(400).send("Ha ocurrido un error al generar el nombre.")
        }
    },

    getPMA1TestCaseExecution: async (req, res) => {
        //Crear un json con fker, y devolverlo.
        try {
            const url = req.params.nombre;
            const resultadosMax = faker.datatype.number({min: 0, max: 100});
            const resultadosTotal = faker.datatype.number({ max: resultadosMax });

            const PMA1 = {
                "next": null,
                "startAt": 0,
                "maxResults": resultadosMax,
                "total": resultadosTotal,
                "isLast": faker.datatype.boolean(),
                "values": generarPMA1(url, resultadosTotal)
            }

            return res.json(PMA1)
        } catch (err) {
            console.error(err);
            return res.status(400).send("Ha ocurrido un error al generar el nombre.")
        }
    },

    getPMA1TestStatus: async (req, res) => {
        //Crear un json con fker, y devolverlo.
        try {
            const url = req.params.nombre;
            const resultadosMax = faker.datatype.number({min: 0, max: 100});
            const resultadosTotal = faker.datatype.number({ max: resultadosMax });

            const statusPMA1 = {
                "next": null,
                "startAt": 0,
                "maxResults": resultadosMax,
                "total": resultadosTotal,
                "isLast": faker.datatype.boolean(),
                "values": generarPMA1status(url, resultadosTotal)
            }

            return res.json(statusPMA1)
        } catch (err) {
            console.error(err)
            return res.status(400).send("Ha ocurrido un error al generar el nombre.")
        }
    }
}

function generarNumeroAleatorio(num) {
    const numero = Math.floor(Math.random() * (num - 1) + 1);

    return numero;    
}

function generarFechaAleatoria() {
    /*const fechaInicio = new Date(2022, 0, 1);
    const fechaFin = new Date(2024, 3, 31);
    
    const tiempoAleatorio = fechaInicio.getTime() + Math.random() * (fechaFin.getTime() - fechaInicio.getTime());
    
    const fechaAleatoria = new Date(tiempoAleatorio);
    
    const horas = Math.floor(Math.random() * 24);
    const minutos = Math.floor(Math.random() * 60);
    const segundos = Math.floor(Math.random() * 60); 
    const milisegundos = Math.floor(Math.random() * 1000);
    
    fechaAleatoria.setHours(horas, minutos, segundos, milisegundos);*/

    const fechaInicio = new Date();
    fechaInicio.setMonth(fechaInicio.getMonth() - 3);

    const fechaFin = new Date();

    const fechaAleatoria = faker.date.between(fechaInicio, fechaFin);
    
    return fechaAleatoria;
}

function generarPMA1(url, numVeces) {
    const objetosPMA1 = [];
    const fecha = generarFechaAleatoria();

    for (let i = 1; i <= numVeces; i++) {
        const pma = {
            "id": i,
            "key":"PMA1-" + url + "-E" + faker.datatype.number({min: 0, max: 1000}),
            "project": {
                "id":faker.datatype.number({min: 0, max: 100000}),
                "self":"https://api.zephyrscale.smartbear.com/v2/projects/129674"
            },
            "testCase": {
                "self":"https://api.zephyrscale.smartbear.com/v2/testcases/PMA1-T25/versions/1",
                "id":faker.datatype.number({min: 0, max: 100000})
            },
            "environment":null,
            "jiraProjectVersion":null,
            "testExecutionStatus": {
                "id":faker.datatype.number({min: 0, max: 100000}),
                "self":"https://api.zephyrscale.smartbear.com/v2/statuses/2381896"
            },
            "actualEndDate":fecha,
            "estimatedTime":null,
            "executionTime":33582,
            "executedById":"5dee5bf9dfde6b0e555b5be0",
            "assignedToId":"5dee5bf9dfde6b0e555b5be0",
            "comment":null,
            "automated":true,
            "testCycle": {
                "self":"https://api.zephyrscale.smartbear.com/v2/testcycles/17179767",
                "id":faker.datatype.number({min: 0, max: 100000})
            },
            "customFields": {
                "Source of the problem":null,
                "Action item":null
            },
            "links": {
                "self":"https://api.zephyrscale.smartbear.com/v2/testexecutions/698777302/links",
                "issues":[]
            }
        }

        objetosPMA1.push(pma)
    }

    return objetosPMA1;
}

function generarPMA1status(url, numVeces) {
    const objetosPMA1status = []
    const idProject = faker.datatype.number({min: 0, max: 10000})

    for (let i = 1; i <= numVeces; i++) {

        const nombreStatus = generarNombreObjetoStatus();

        const statuses = {
            "id": i,
            "project": {
                "id": idProject,
                "self": "https://api.zephyrscale.smartbear.com/v2/projects/129674"
            },
            "name": "PMA1-" + url + "S-" + nombreStatus,
            "description": null,
            "index": i-1,
            "color": generarColorStatus(nombreStatus),
            "archived": paramArchived(nombreStatus),
            "default": paramDefault(nombreStatus)

        }

        objetosPMA1status.push(statuses)
    }

    return objetosPMA1status;
}

function generarNombreObjetoStatus() {
    const num = generarNumeroAleatorio(10)

    switch (num) {
        case 1:
            return "Not Executed"
        case 2:
            return "In Progress"
        case 3:
            return "Pass"
        case 4:
            return "Fail"
        case 5:
            return "Blocked"
        case 6:
            return "Done"
        case 7: 
            return "Draft"
        case 8:
            return "Deprecated"
        case 9:
            return "Approved"
    }
}

function generarColorStatus(nombre) {
    switch (nombre) {
        case "Not Executed":
            return "#cfcfc4"
        case "In Progress":
            return "#f0ad4e"
        case "Pass":
            return "#3abb4b"
        case "Fail":
            return "#df2f36"
        case "Blocked":
            return "#4b88e7"
        case "Done":
            return "#3abb4b"
        case "Draft":
            return "#f0ad4e"
        case "Deprecated":
            return "#4b88e7"
        case "Approved":
            return "#3abb4b"
    }
}

function paramArchived(nombre) {
    switch (nombre) {
        case "Not Executed":
            return false
        case "In Progress":
            return false
        case "Pass":
            return false
        case "Fail":
            return false
        case "Blocked":
            return false
        case "Done":
            return false
        case "Draft":
            return false
        case "Deprecated":
            return false
        case "Approved":
            return false
    }
}

function paramDefault(nombre) {
    switch (nombre) {
        case "Not Executed":
            return true
        case "In Progress":
            return false
        case "Pass":
            return false
        case "Fail":
            return false
        case "Blocked":
            return false
        case "Done":
            return false
        case "Draft":
            return true
        case "Deprecated":
            return false
        case "Approved":
            return false
    }
}