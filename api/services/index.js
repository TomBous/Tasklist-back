// Dépendances
const repositories = require('../repositories')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// Imoort des services
const user_service = require('./user.service')
const bcrypt_service = require('./bcrypt.service')
const jwt_service = require('./jwt.service')

const services = {
    user: user_service(repositories),
    bcrypt: bcrypt_service(bcrypt),
    jwt: jwt_service(jwt)
}

module.exports = services