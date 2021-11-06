const { Router, request, response } = require("express")

const routes = new Router()

routes.get('/', (request, response) => {
    return response.json({message: "Hello"})
})

module.exports = routes