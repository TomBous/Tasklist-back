const { getAll, register, login } = require("../controllers/user.controller");

module.exports = () => {
    const router = require("express").Router()
    
    // PUBLIC ROUTES
    router.get('/', getAll)
    router.post('/', register)
    router.post('/login', login)

    // PRIVATE ROUTES

    return router
};