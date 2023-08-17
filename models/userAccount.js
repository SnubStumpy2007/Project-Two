const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

class UserAccount extends Model {
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.Password);
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
        UserName: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            // Removed the primaryKey attribute here as it was set on both id and UserName
        },
        FirstName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isAlphanumeric: true,
            }
        },
        LastName: {
            type: DataTypes.STRING,
            validate: {
                isAlphanumeric: true,
            },
        },
        Email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            validate: {
                isEmail: true,
            }
        },
        Password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [6],
            }
        },
    }, {
        hooks: {
            beforeCreate: async (newUserData) => {
                newUserData.Password = await bcrypt.hash(newUserData.Password, 10);
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

    module.exports = userAccount;
    module.exports = initializeUserAccount;

