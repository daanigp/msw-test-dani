const faker = require('faker')
const idProject = faker.datatype.number({min: 0, max: 10000})

module.exports = {
    getPMA1TestCaseInfo: async (req, res) => {
        //Crear un json con fker, y devolverlo.
        try {
            const url = req.params.nombre;
            const nombreFalso = faker.name.findName();

            const PMA1 = {
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
            const resultadosMax = 30;
            const resultadosTotal = 20;

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
            const resultadosMax = 30;
            const resultadosTotal = 20;

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

function generarFechaAleatoria() {
    const fechaInicio = new Date();
    fechaInicio.setMonth(fechaInicio.getMonth() - 3);

    const fechaFin = new Date();

    const fechaAleatoria = faker.date.between(fechaInicio, fechaFin);
    
    return fechaAleatoria;
}

function generarFechaAleatoria2(numDia) {
    let fechaActual = new Date();
    let fechas = [];
    const cantidad = 1;

    while (fechas.length < cantidad) {
        if (fechaActual.getDay() == numDia) {
            fechas.push(new Date(fechaActual));
        }
        fechaActual.setDate(fechaActual.getDate() + 1);
    }

    return fechas
}

function generarPMA1(url, numVeces) {
    const objetosPMA1 = [];
    const idTestCase = faker.datatype.number({ min: 0, max: 100000 });
    const fecha = [];
    let idNums = [];
    let idStatus;

    for (let x = 1; x <= 5; x++){
        for (let y = 1; y <= 4; y++){
            fecha.push(generarFechaAleatoria2(x));
        }
    }

    for (let i = 1; i <= numVeces; i++) {
        const idTestCycle = faker.datatype.number({ min: 0, max: 100000 });
        do {
            idStatus = faker.datatype.number({ min: 1, max: 20 });
        } while (idNums.includes(idStatus))

        idNums.push(idStatus)

        const pma = {
            "id": i,
            "key": "PMA1-" + url + "-E" + faker.datatype.number({ min: 0, max: 1000 }),
            "tag": generateTag(),
            "project": {
                "id": idProject,
                "self":"https://api.zephyrscale.smartbear.com/v2/projects/" + idProject
            },
            "testCase": {
                "self":"https://api.zephyrscale.smartbear.com/v2/testcases/PMA1-" + url +"/versions/1",
                "id": idTestCase
            },
            "environment":generateEnvironment(),
            "jiraProjectVersion":null,
            "testExecutionStatus": {
                "id": idStatus, 
                "self":"https://api.zephyrscale.smartbear.com/v2/statuses/" + idStatus
            },
            "actualEndDate":fecha[i],
            "estimatedTime":null,
            "executionTime":33582,
            "executedById":"5dee5bf9dfde6b0e555b5be0",
            "assignedToId":"5dee5bf9dfde6b0e555b5be0",
            "comment":null,
            "automated":true,
            "testCycle": {
                "self":"https://api.zephyrscale.smartbear.com/v2/testcycles/" + idTestCycle,
                "id": idTestCycle
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

    for (let i = 1; i <= numVeces; i++) {

        const nombreStatus = generarNombreObjetoStatus();

        const statuses = {
            "id": i,
            "project": {
                "id": idProject,
                "self": "https://api.zephyrscale.smartbear.com/v2/projects/" + idProject
            },
            "name": nombreStatus,
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

function generateTag() {
    const num = faker.datatype.number({min: 1, max: 4})

    switch (num) {
        case 1:
            return "smoke"
        case 2:
            return "regression"
        case 3:
            return "feat_a"
        case 4:
            return "feat_b"
    }
}

function generateEnvironment() {
    const num = faker.datatype.number({min: 1, max: 3})

    switch (num) {
        case 1:
            return "prod"
        case 2:
            return "dev"
        case 3:
            return "stg"
    }
}

function generarNombreObjetoStatus() {
    const num = faker.datatype.number({min: 1, max: 4})

    switch (num) {
        case 1:
            return "Not Executed"
        case 2:
            return "Pass"
        case 3:
            return "Fail"
        case 4:
            return "Blocked"
    }
}

function generarColorStatus(nombre) {
    switch (nombre) {
        case "Not Executed":
            return "#cfcfc4"
        case "Pass":
            return "#3abb4b"
        case "Fail":
            return "#df2f36"
        case "Blocked":
            return "#4b88e7"
    }
}

function paramArchived(nombre) {
    switch (nombre) {
        case "Not Executed":
            return false
        case "Pass":
            return false
        case "Fail":
            return false
        case "Blocked":
            return false
    }
}

function paramDefault(nombre) {
    switch (nombre) {
        case "Not Executed":
            return true
        case "Pass":
            return false
        case "Fail":
            return false
        case "Blocked":
            return false
    }
}
