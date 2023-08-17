const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class Post extends Model {}

    Post.init(
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
          primaryKey: true,
        },
        Title: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
          validate: {
            isAlphanumeric: true,
            len: [50],
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
            type: DataTypes.BLOB,
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

    return Post;
};
