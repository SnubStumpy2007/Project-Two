const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class post extends Model {}

post.init(
  {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    UserName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      primaryKey: true,
    },
    Title: {
      type: DataTypes.STRING ,
      allowNull: false,
      validate: {
        isAlphanumeric: true,
        len: [10],
      }
    },
    VenueName: {
      type: DataTypes.STRING,
      validate: {
        isAlphanumeric: true,
      },
    },
    EventDate: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: true,
      }
    },
    Genre: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [6],
      }
    },
    PostText: {
        type: DataTypes.STRING,
    }
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'post'
  }
);

module.exports = post;