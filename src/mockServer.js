const axios = require('axios').default

module.exports = {
    getTodos: async (req, res) => {
        try {
            const response = await axios.get('https://jsonplaceholder.typicode.com/todos')
            console.log(req.baseUrl)
            return res.json(response.data)
        } catch(err) {
            throw res.status(400).send(new Error(err))
        }
    },

    getPMA1TestCaseInfo: async (req, res) => {
        try {
            return res.send("calling getPMA1TestCaseInfo") 
        } catch (err) {
            throw res.status(400).send(new Error(err))
        }
    },

    getPMA1TestCaseExecution: async (req, res) => {
        try {
            return res.send("calling getPMA1TestCaseExecution") 
        } catch (err) {
            throw res.status(400).send(new Error(err))
        }
    }
}