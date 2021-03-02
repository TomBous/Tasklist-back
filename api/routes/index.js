
module.exports = (express, controllers) => {
    const user_router = require('./user.router');

    const routes = [
        user_router(express, controllers),
    ]

    return routes
}