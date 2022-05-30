const postArr = [];

const createPosts = () => {
    for (let i = 0; i < 5; i++) {
        // fill post arr with posts
        //  title:
        //  author:
        //  body:
        //  date:
        postArr.push({
            title: 'title',
            body: 'body',
            author: 1,
        });
    }
    return postArr;
};

module.exports = createPosts;