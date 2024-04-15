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
                "id": generarNumeroAleatorio(100000000),
                "key": "PMA1-"+url,
                "name": nombreFalso,
                "project": {
                    "id": generarNumeroAleatorio(100000000),
                    "self": "https://api.zephyrscale.smartbear.com/v2/projects/129674"
                },
                "createdOn": generarFechaAleatoria(),
                "labels": [
                    "Smoke",
                    "e2e_ui",
                ],
                "status": {
                    "id": generarNumeroAleatorio(100000000),
                    "self": "https://api.zephyrscale.smartbear.com/v2/statuses/2381907"
                },
                "folder": {
                    "id": generarNumeroAleatorio(100000000),
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
            const resultadosMax = generarNumeroAleatorio(100);
            const resultadosTotal = generarNumeroAleatorioMenorQueOtro(20, resultadosMax);

            const PMA1 = {
                "next": null,
                "startAt": 0,
                "maxResults": resultadosMax,
                "total": resultadosTotal,
                "isLast": generarBooleanoAleatorio(),
                "values": generarPMA1(url, resultadosTotal)
            }

            return res.json(PMA1)
        } catch (err) {
            console.error(err);
            return res.status(400).send("Ha ocurrido un error al generar el nombre.")
        }
    }
}

function generarNumeroAleatorio(num) {
    const numero = Math.floor(Math.random() * (num - 1) + 1);

    return numero;    
}

function generarNumeroAleatorioMenorQueOtro(num, numeroMax) {
    let numero;

    do {
        numero = Math.floor(Math.random() * (num - 1) + 1);
    } while (numero > numeroMax)
    
    return numero;    
}

function generarBooleanoAleatorio() {
    const numeroAleatorio = Math.round(Math.random());

    if (numeroAleatorio === 0) {
        return true;
    } else {
        return false;
    }
}

function generarFechaAleatoria() {
    const fechaInicio = new Date(2022, 0, 1);
    const fechaFin = new Date(2024, 3, 31);
    
    const tiempoAleatorio = fechaInicio.getTime() + Math.random() * (fechaFin.getTime() - fechaInicio.getTime());
    
    const fechaAleatoria = new Date(tiempoAleatorio);
    
    const horas = Math.floor(Math.random() * 24);
    const minutos = Math.floor(Math.random() * 60);
    const segundos = Math.floor(Math.random() * 60); 
    const milisegundos = Math.floor(Math.random() * 1000);
    
    fechaAleatoria.setHours(horas, minutos, segundos, milisegundos);
    
    return fechaAleatoria;
}

function generarPMA1(url, numVeces) {
    const objetosPMA1 = [];

    for (let i = 1; i <= numVeces; i++) {
        const pma = {
            "id": i,
            "key":"PMA1-" + url + "-E" + generarNumeroAleatorio(10000),
            "project": {
                "id":generarNumeroAleatorio(100000000),
                "self":"https://api.zephyrscale.smartbear.com/v2/projects/129674"
            },
            "testCase": {
                "self":"https://api.zephyrscale.smartbear.com/v2/testcases/PMA1-T25/versions/1",
                "id":generarNumeroAleatorio(100000000)
            },
            "environment":null,
            "jiraProjectVersion":null,
            "testExecutionStatus": {
                "id":generarNumeroAleatorio(100000000),
                "self":"https://api.zephyrscale.smartbear.com/v2/statuses/2381896"
            },
            "actualEndDate":generarFechaAleatoria(),
            "estimatedTime":null,
            "executionTime":33582,
            "executedById":"5dee5bf9dfde6b0e555b5be0",
            "assignedToId":"5dee5bf9dfde6b0e555b5be0",
            "comment":null,
            "automated":true,
            "testCycle": {
                "self":"https://api.zephyrscale.smartbear.com/v2/testcycles/17179767",
                "id":generarNumeroAleatorio(100000000)
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