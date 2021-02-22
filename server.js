const express = require('express')

require('dotenv').config();

class Application {
    constructor(express) {
        const app = express();
        //const models = require('./api/models/models'); 
        const db = require("./api/models")
        const userRouter = require('./api/routes/user.router')()
        /* db.sequelize.sync({ force: true }).then(() => {
            console.log("En dev : Force la synchro,Drop and re-sync db.");
        }); */
        app.use(express.json())
        app.use('/api/users', userRouter)
        //app.use(userRouter)
        app.listen(process.env.APP_PORT, async () => {
            try {
                await db.sequelize.authenticate()
            } catch (error) {
                console.error(error)
            }
            console.log(`Server listening on ${process.env.APP_PORT}`)
        });
    }
}

module.exports = new Application(express);