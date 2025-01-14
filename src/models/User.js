"use strict"

const { ErrorHandler } = require("../utils/error");

module.exports = (sequelize, DataTypes) => {
    let options = { 
        defaultScope: {
            attributes: { exclude: [ "password" ] },
        },
        scopes: {
            withPassword: {
                attributes: {},
            },
        }
    }
    let User = sequelize.define('User', {
        username: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        first_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        display_name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, options);
    User.findByPkOrError = async pk => {
        let user = await User.findByPk(pk)
        if (!user) throw new ErrorHandler.get404("User")
        return user;
    }
    User.associate = models => {
        User.belongsTo(models.Media, { foreignKey: "thumbnail_media_id" });
        User.belongsTo(models.Teams);
    }
    
    return User;
};