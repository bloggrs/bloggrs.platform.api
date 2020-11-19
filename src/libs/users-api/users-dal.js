
const { User } = require("../../models")
const { v1: uuid } = require('uuid')

const SALT_ROUNDS = 10;

const bcrypt = require("bcrypt");
const { ErrorHandler } = require("../../utils/error");

module.exports = {
    findAll: async () => await User.findAll(),
    deleteUser: async pk => {
        let user = await User.findByPk(pk)
        user.destroy();
        return true;
    },
    createUser: async ({
        email, first_name, last_name, password
    }) => {
        let user = await User.create({
            first_name, last_name, email, 
            password: await bcrypt.hash(password , SALT_ROUNDS), points: 0, 
        })
        return user;
    },
    createUserUnrestricted: async ({
        first_name, last_name,
        email, password
    }) => {
        let args = { first_name, last_name, email }
        if (password) args.password = await bcrypt.hash(password , SALT_ROUNDS)
        let user = await User.create(args)
        return user; 
    },
    updateUser: async ({pk,data}) => {
        let keys = Object.keys(data);
        let user = await User.findByPk(pk);
        for (let key of keys){
            user[key] = key === "password" ? await bcrypt.hash(data[key] , SALT_ROUNDS) : data[key]
        }
        await user.save();
        return user;
    }
}