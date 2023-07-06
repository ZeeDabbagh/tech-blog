const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class User extends Model {
    checkPassowrd(pw) {
        return bcrypt.compareSync(pw, this.password)
    }
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        email: {
            type: DataTypes.STRING,
            unique:true,
            allowNull: false,
            validate: {
                isEmail: true,
            }
        },
        password: {
            type:DataTypes.STRING,
            allowNull:false,
            validate: {
                len:[8]
            }
        }
    },
    {
        hooks: {
            beforeCreate: async (newUserData) => {
                newUserData.password = await bcrypt.hash(
                    newUserData.password,
                    15
                    )
                return newUserData
            }
        },
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'user'
    }
    
)

module.exports = User