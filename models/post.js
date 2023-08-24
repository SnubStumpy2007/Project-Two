// Import necessary Sequelize components
const { Model, DataTypes } = require('sequelize');

// Import your Sequelize instance from '../config/connection'
const sequelize = require('../config/connection');

// Create a Post class that extends Sequelize's Model class
class Post extends Model {}

// Define a function to initialize the Post model
const initializePost = (sequelize) => {
    // Initialize the Post model with the specified attributes and options
    Post.init(
      {
        // Define the 'id' attribute as an auto-incrementing primary key
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        // // Define the 'UserName' attribute as a string, not a primary key
        // UserName: {
        //   type: DataTypes.STRING,
        //   allowNull: false,
        // },
        // Define the 'Title' attribute as a string with specific validation rules
        Title: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
          validate: {
            isAlphanumeric: true,
            len: [50],
          }
        },
        // Define the 'VenueName' attribute as a string with alphanumeric validation
        VenueName: {
          type: DataTypes.STRING,
          validate: {
            isAlphanumeric: true,
          },
        },
        // Define the 'EventDate' attribute as a date with date validation
        EventDate: {
          type: DataTypes.DATE,
          allowNull: false,
          validate: {
            isDate: true,
          }
        },
        // Define the 'Genre' attribute as a string with a specific length validation
        Genre: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            len: [6],
          }
        },
        // Define the 'PostText' attribute as binary data (BLOB)
        PostText: {
            type: DataTypes.BLOB,
        }
      },
      {
        sequelize, // Pass in the Sequelize instance
        timestamps: true, // Enable timestamps (created_at and updated_at)
        freezeTableName: true, // Use the model's name as the table name
        underscored: true, // Use underscores in column names (e.g., event_date)
        modelName: 'post' // Set the model name to 'post'
      }
    );

    return Post; // Return the initialized Post model
}

// Export the initialization function and the Post model
module.exports = {
  initializePost,
  Post
};
