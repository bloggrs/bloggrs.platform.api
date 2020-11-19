
const { User } = require("../../models")

module.exports = {
    findUserByPk: async pk => await User.findByPk(pk),
    addPointsToUser: async ({ user_instance, points }) => {
        await user_instance.update({ points: user_instance.points + points });
        return user_instance
    }
}