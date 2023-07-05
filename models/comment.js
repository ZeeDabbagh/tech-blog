const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const User = require('./User')
const Blog = require ('./Blog')

class Comment extends Model {}

Comment.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        comment_text: {
            type: DataTypes.STRING,
        },
        comment_date: {
            type: DataTypes.TEXT,
            defaultValue: Date.now(),
            allowNull: false
        },
        blog_id: {
            type: DataTypes.INTEGER,
            references: {
                model: Blog,
                key: 'id'
            }
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: User,
                key: 'id'
            }
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'comment'
      }
)

module.exports = Comment