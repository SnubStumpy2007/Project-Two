const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

class UserAccount extends Model {
    async checkPassword(loginPw) {
        return await bcrypt.compare(loginPw, this.password); // Changed this.Password to this.password
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
        user_name: { // Changed from UserName
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        first_name: { // Changed from FirstName
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isAlphanumeric: true,
            }
        },
        last_name: { // Changed from LastName
            type: DataTypes.STRING,
            validate: {
                isAlphanumeric: true,
            },
        },
        email: { // Changed from Email
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            validate: {
                isEmail: true,
            }
        },
        password: { // Changed from Password
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [6],
            }
        },
    }, {
        hooks: {
            beforeCreate: async (newUserData) => {
                newUserData.password = await bcrypt.hash(newUserData.password, 10); // Changed newUserData.Password to newUserData.password
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

module.exports = initializeUserAccount;
