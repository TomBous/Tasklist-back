// Dépendances
const { User } = require('../models')

// Import des repositories
const user_repository = require('./user.repo')


const repositories = {
    user: user_repository(User)

}

module.exports = repositories