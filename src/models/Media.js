/*
  table media {
    id int
    name string
    size int
    type string
    media_url string
    updatedAt datetime
    createdAt datetime
  }
*/

"use strict"

const { ErrorHandler } = require("../utils/error");

module.exports = (sequelize, DataTypes) => {
    let options = { 
        defaultScope: {
        },
        scopes: {
        }
    }

    let Media = sequelize.define('Media', {
      fieldname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      originalName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      encoding: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      mimetype: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      size: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      media_url: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    }, options);

    Media.findByPkOrError = async pk => {
        let media = await Media.findByPk(pk)
        if (!media) throw new ErrorHandler.get404("Media")
        return media;
    }

    Media.associate = models => {
    }
    
    return Media;
};