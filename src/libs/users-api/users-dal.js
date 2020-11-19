
const { User } = require("../../models")
const { v1: uuid } = require('uuid')

const SALT_ROUNDS = 10;

const bcrypt = require("bcrypt");
const { ErrorHandler } = require("../../utils/error");
const { createPointsChangeLog } = require("../pointschangelogs-dal");

module.exports = {
    findAll: async () => await User.findAll(),
    deleteUser: async pk => {
        let user = await User.findByPk(pk)
        user.destroy();
        return true;
    },
    createUser: async ({
        email, first_name, last_name, birthday, contract_id, password
    }) => {
        let user = await User.create({
            first_name, last_name, birthday, contract_id,
            email, password:  await bcrypt.hash(password , SALT_ROUNDS), points: 0, 
            isAdmin: false, isPremium: false, 
            isAdvertiser: false
        })
        await createPointsChangeLog({ UserId: user.id, message: "User just created and started with 0 points.", points: 0 })
        return user;
    },
    createUserUnrestricted: async ({
        first_name, last_name, birthday, contract_id,
        email, password, isAdmin, isPremium, isAdvertiser, points
    }) => {
        let args = {
            first_name, last_name, birthday, contract_id,
            email, isAdmin, isPremium, isAdvertiser, points
        }
        if (password) args.password = await bcrypt.hash(password , SALT_ROUNDS)
        let user = await User.create(args)
        await createPointsChangeLog({ UserId: user.id, message: `User just created and started with ${points} points.`, points })
        return user; 
    },
    updateUser: async ({pk,data}) => {
        let keys = Object.keys(data);
        let user = await User.findByPk(pk);
        let old_points = JSON.parse(JSON.stringify(user.points));
        for (let key of keys){
            user[key] = key === "password" ? await bcrypt.hash(data[key] , SALT_ROUNDS) : data[key]
        }
        await user.save();
        if (user.points !== old_points) {
            let points = user.points;
            await createPointsChangeLog({ UserId: user.id, message: `Admin changed the points from ${old_points} to ${points}.`, points })
        }
        return user;
    }
}