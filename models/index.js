const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

User.hasMany(Post, {
    foreignKey: 'userId'
});

Post.belongsTo(User, {
    foreignKey: 'userId',
    onDelete: 'cascade'
});

Comment.belongsTo(User, {
    foreignKey: 'userId',
    onDelete: 'cascade'
});

Comment.belongsTo(Post, {
    foreignKey: 'postId',
    onDelete: 'cascade'
});

User.hasMany(Comment, {
    foreignKey: 'userId',
    onDelete: 'cascade'
});

Post.hasMany(Comment, {
    foreignKey: 'postId',
    onDelete: 'cascade'
});

module.exports = { User, Post, Comment };
