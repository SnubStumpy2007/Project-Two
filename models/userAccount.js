// Import necessary Sequelize components
const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

// Import your Sequelize instance from '../config/connection'
const sequelize = require('../config/connection');

// Create a UserAccount class that extends Sequelize's Model class
class UserAccount extends Model {
    // Method to check if a provided password matches the stored hashed password
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.Password);
    }
}

// Define a function to initialize the UserAccount model
const initializeUserAccount = (sequelize) => {
    // Initialize the UserAccount model with the specified attributes and options
    UserAccount.init({
        // Define the 'id' attribute as an auto-incrementing primary key
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        // Define the 'UserName' attribute as a string with specific validation rules
        UserName: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        // Define the 'FirstName' attribute as a string with alphanumeric validation
        FirstName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isAlphanumeric: true,
            }
        },
        // Define the 'LastName' attribute as a string with alphanumeric validation
        LastName: {
            type: DataTypes.STRING,
            validate: {
                isAlphanumeric: true,
            },
        },
        // Define the 'Email' attribute as a string with email format validation
        Email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            validate: {
                isEmail: true,
            }
        },
        // Define the 'Password' attribute as a string with a specific length validation
        Password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [6],
            }
        },
    }, {
        hooks: {
            // Hash the user's password before creating a new user
            beforeCreate: async (newUserData) => {
                newUserData.Password = await bcrypt.hash(newUserData.Password, 10);
                return newUserData;
            }
        },
        sequelize, // Pass in the Sequelize instance
        timestamps: false, // Disable timestamps (created_at and updated_at)
        freezeTableName: true, // Use the model's name as the table name
        underscored: true, // Use underscores in column names (e.g., first_name)
        modelName: 'UserAccount' // Set the model name to 'UserAccount'
    });

    return UserAccount; // Return the initialized UserAccount model
};

// Export the initialization function and the UserAccount model
module.exports = {
    initializeUserAccount,
    UserAccount
};
