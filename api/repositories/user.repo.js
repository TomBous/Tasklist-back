const { User } = require('../models')
module.exports = {
    findUsers: async () => {
        try {
            return await User.findAll()   
        } catch (error) {
            return error
        }
    },
    insertUser: async (user) => {
        try {
            return await User.create(user)
        } catch (error) {
            return error
        }
    },
    findByEmail: async (email) => {
        try {
            return await User.findOne({ where: { email: email } });  
        } catch (error) {
            return error
        }
    },
};