const express = require('express')
const cors = require('cors');
const cookieParser = require('cookie-parser');

require('dotenv').config();

class Application {
    constructor(express) {
        const app = express();
        const db = require("./api/models")
        const routes = require('./api/routes')
        const controllers = require('./api/controllers')
        /* db.sequelize.sync({ force: true }).then(() => {
            console.log("En dev : Force la synchro,Drop and re-sync db.");
        }); */
        app.use(cors())
        app.use(cookieParser())
        app.use(express.urlencoded({ extended: false }))
        app.use(express.json())
        app.use(routes(express, controllers));
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