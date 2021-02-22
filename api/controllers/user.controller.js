const { findUsers, insertUser, findByEmail } = require('../repositories/user.repo')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

module.exports = {
    getAll: async (req, res) => {
        try {
            const user = await findUsers()
            res.send(user)

        } catch (error) {
            res.send(new Error(error))
        }
    },
    register: async (req, res) => {
        regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        regexName = /^\w+$/
        regexPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/g // 8 caractères, lettre et chiffre
        const newUser = req.body
        if (regexEmail.test(newUser.email) && regexName.test(newUser.name) && regexPassword.test(newUser.password))
        try {
            findByEmail(newUser.email).then((result) => {
                if (result) {
                    res.status(409).json({
                        error: "This email have already been use"
                    })
                } else {
                    const { password } = newUser
                    bcrypt.hash(password, 10, function(err, hash) {
                        if (err) {
                            res.send('erreur chiffrement')
                        }
                        newUser.password = hash
                        insertUser(newUser)
                            .then((user) => {
                                res.status(200).json({
                                    user: user
                                })
                            })
                    });

                }
            })
        } catch (error) {
            res.send(new Error(error))
        }
    },
    login: async (req, res) => {
        const { email, password } = req.body
        try {
            findByEmail(email).then((userFound) => {
                if (userFound === null) {
                    res.status(400).json({
                        error: "Register first"
                    })
                } else {
                    bcrypt.compare(password, userFound.password, function(err, result) {
                        if (result) {
                            const userData = {
                                id: userFound.id,
                                name: userFound.name,
                                email: userFound.email
                            }
                            console.log(user)
                            const accessToken = jwt.sign(userData, process.env.SECRET_TOKEN_KEY)
                            res.status(200).json({
                                message: "Connection success",
                                token: accessToken
                            })
                        } else {
                            res.status(500).json({
                                error: "While comparing password"
                            })
                        }
                    });
                }
            })
        } catch (error) {
            
        }
    }
}
