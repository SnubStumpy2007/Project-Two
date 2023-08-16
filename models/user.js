const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

module.exports = (sequelize) => {
    class User extends Model {
        checkPassword(loginPw) {
            return bcrypt.compareSync(loginPw, this.pwd_hash);
        }
    }

    User.init(
        {
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
            pwd_hash: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    len: [6],
                }
            },
        },
        {
            hooks: {
                beforeCreate: async (newUserData) => {
                    newUserData.pwd_hash = await bcrypt.hash(newUserData.pwd_hash, 10);
                    return newUserData;
                },
                beforeUpdate: async (updatedUserData) => {
                    if (updatedUserData.pwd_hash) {
                        updatedUserData.pwd_hash = await bcrypt.hash(updatedUserData.pwd_hash, 10);
                    }
                    return updatedUserData;
                },
            },
            sequelize,
            tableName: 'user_account',
            timestamps: false,
            freezeTableName: true,
            underscored: true,
            modelName: 'User'
        }
    );

    return User;
};
