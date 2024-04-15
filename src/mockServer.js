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
                "id": Math.floor(Math.random() * (100000000 - 1) + 1),
                "key": "PMA1-"+url,
                "name": nombreFalso,
                "project": {
                    "id": Math.floor(Math.random() * (100000 - 1) + 1),
                    "self": "https://api.zephyrscale.smartbear.com/v2/projects/129674"
                },
                "createdOn": "2022-08-10T09:20:23Z",
                "labels": [
                    "Smoke",
                    "e2e_ui",
                ],
                "status": {
                    "id": Math.floor(Math.random() * (1000000 - 1) + 1),
                    "self": "https://api.zephyrscale.smartbear.com/v2/statuses/2381907"
                },
                "folder": {
                    "id": Math.floor(Math.random() * (1000000 - 1) + 1),
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
            return res.status(400).send(new Error("err"))
        }
    }
}