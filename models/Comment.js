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
            allowNull: false,
      
        },
        postId: {
            type: DataTypes.INTEGER,
            allowNull: false,
      
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
        underscored: true,
        modelName: 'comment',
    }
);

module.exports = Comment;