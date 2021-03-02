// Dépendances
const services = require('../services')
// Imoort des services
const user_controller = require('./user.controller')

const controllers = {
    user: user_controller(services),
}

module.exports = controllers