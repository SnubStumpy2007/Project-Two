const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

class UserAccount extends Model {
    async checkPassword(loginPw) {
        return await bcrypt.compare(loginPw, this.password);
    }
}

const initializeUserAccount = (sequelize) => {
    UserAccount.init({
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        user_name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        first_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isAlphanumeric: true,
            }
        },
        last_name: {
            type: DataTypes.STRING,
            validate: {
                isAlphanumeric: true,
            },
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            validate: {
                isEmail: true,
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [6],
            }
        },
    }, {
        hooks: {
            beforeCreate: async (newUserData) => {
                newUserData.password = await bcrypt.hash(newUserData.password, 10);
                return newUserData;
            }
        },
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'UserAccount'
    });

    return UserAccount;
};

module.exports = {
    initializeUserAccount, // Export the initialization function
    UserAccount // Export the model
};
