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
                "id": generarNumeroAleatorio(),
                "key": "PMA1-"+url,
                "name": nombreFalso,
                "project": {
                    "id": generarNumeroAleatorio(),
                    "self": "https://api.zephyrscale.smartbear.com/v2/projects/129674"
                },
                "createdOn": generarFechaAleatoria(),
                "labels": [
                    "Smoke",
                    "e2e_ui",
                ],
                "status": {
                    "id": generarNumeroAleatorio(),
                    "self": "https://api.zephyrscale.smartbear.com/v2/statuses/2381907"
                },
                "folder": {
                    "id": generarNumeroAleatorio(),
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
        try {
            return res.send("calling getPMA1TestCaseExecution") 
        } catch (err) {
            console.error(err);
            return res.status(400).send("Ha ocurrido un error al generar el nombre.")
        }
    }
}

function generarNumeroAleatorio() {
    const numero = Math.floor(Math.random() * (100000000 - 1) + 1);

    return numero;    
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