const { Dayjs } = require('dayjs');
const { Model, DataTypes, Sequelize } = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model {
    checkDate(date) {
        return Dayjs(date).format('DD/MM/YYY');
    }
}

Comment.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        commentBody: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        userId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id',
            }
      
        },
        postId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'post',
                key: 'id',
            }
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: Sequelize.NOW
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: false,
        modelName: 'comment',
    }
);

module.exports = Comment;