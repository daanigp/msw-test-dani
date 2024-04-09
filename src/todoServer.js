const axios = require('axios').default

module.exports = {
    getTodos: async (req, res) => {
        try {
            const response = await axios.get('https://jsonplaceholder.typicode.com/todos')
            return res.json(response.data)
        } catch(err) {
            throw res.status(400).send(new Error(err))
        }
    }
}