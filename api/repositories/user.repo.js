// const { User } = require('../models')
module.exports = (User) => {
    const user_repository = {
        findAll: async () => {
            try {
                console.log('User model :', User)
                return await User.findAll()   
            } catch (error) {
                return error
            }
        },
        createtUser: async (user) => {
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
        findById: async (id) => {
            try {
                return await User.findOne({ where: { id: id } });  
            } catch (error) {
                return error
            }
        },
    }
    return user_repository
};