// const { findUsers, insertUser, findByEmail } = require('../repositories/user.repo')
const repositories = require('../repositories')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

/* REGEX */
regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
regexName = /^\w+$/
regexPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/g // 8 caractères, lettre et chiffre

module.exports = (services) => {
    const user_controller = {
        findAll: async (req, res) => {
            try {
                const users = await services.user.findAll()
                res.send(users)
    
            } catch (error) {
                res.send(new Error(error))
            }
        },
        register: async (req, res) => {
            /* INPUT VALIDATION */
            const newUser = req.body
            if (newUser.email && newUser.name && newUser.password &&
                regexEmail.test(newUser.email) &&
                regexName.test(newUser.name) &&
                regexPassword.test(newUser.password)) {
                try {
                    const userFound = await services.user.findByEmail(newUser.email)
                    if (userFound) {
                        res.status(409).json({
                            error: "This email have already been use"
                        })
                    } else {
                        newUser.password = await services.bcrypt.hashPassword(newUser.password)
                        const result = await services.user.register(newUser)
                        console.log('result : ', result)
                        res.status(201).json({
                            message: "Registration success ! You can sign in now."
                        })
                    }
                } catch (error) {
                    res.send(new Error(error))
                }
            } else {
                res.status(400).json({
                    error: "The request is incorrect"
                })
            }
        },
        login: async (req, res) => {
            const userLogin = {
              email: req.body.email || null,
              password: req.body.password || null,
            };
            try {
              if (!userLogin.email || !userLogin.password)
              res.status(400).json("please complete all fields");
              else {
                const userFound = await services.user.findByEmail(userLogin.email);
                if (!userFound) {
                  res.status(404).json("You have to register first");
                } else {
                  const passwordMatch = await services.bcrypt.comparePassword(
                    userLogin.password,
                    userFound.password
                  );
                  if (!passwordMatch) {
                    res.status(400).json("Password is not correct");
                  } else {
                    const tokenData = {
                      id: userFound.id,
                      firstname: userFound.firstname,
                      lastname: userFound.lastname,
                      email: userFound.email
                    }
                    const token = await services.jwt.createToken(tokenData)
                    res.cookie('token', token, {
                      expires: new Date(Date.now() + 300000), // milisecondes = 5 min
                      secure: false, // set to true if your using https
                      httpOnly: true,
                    }).send(`Identification par cookie réussie, date : ${Date.now()}, expire : ${Date(Date.now() + 100000)}`);
                  }
                }
              }
            } catch (err) {
              console.error(err);
            }
        },
    }
    return user_controller
}
