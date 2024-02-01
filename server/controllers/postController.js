const PostDAL = require('../data/PostDAL');
const auth = require('../services/authentication');
const fs = require('fs');

const createPost = async (req, res) => {
    try {
        const { originalname, path } = req.file;
        const parts = originalname.split('.');
        const ext = parts[parts.length - 1];
        const newPath = path + '.' + ext;
        fs.renameSync(path, newPath);

        const { token } = req.cookies;
        const userInfo = auth.verifyToken(token);

        const { title, summary, content } = req.body;
        const postDoc = await PostDAL.createPost({
            title,
            summary,
            content,
            cover: newPath,
            author: userInfo.id,
        });

        res.json(postDoc);
    } catch (e) {
        console.log(e);
        res.status(400).json(e);
    }
};

const updatePost = async (req, res) => {
    try {
        let newPath = null;
        if (req.file) {
            const { originalname, path } = req.file;
            const parts = originalname.split('.');
            const ext = parts[parts.length - 1];
            newPath = path + '.' + ext;
            fs.renameSync(path, newPath);
        }

        const { token } = req.cookies;
        const userInfo = auth.verifyToken(token);

        const { id, title, summary, content } = req.body;
        const postDoc = await PostDAL.getPostById(id);

        if (!postDoc) {
            return res.status(404).json('Post not found');
        }

        const isAuthor = postDoc.author.equals(userInfo.id);
        if (!isAuthor) {
            return res.status(403).json('You are not authorized to update this post');
        }

        const updatedPost = await PostDAL.updatePost(id, {
            title,
            summary,
            content,
            cover: newPath ? newPath : postDoc.cover,
        });

        res.json(updatedPost);
    } catch (e) {
        console.log(e);
        res.status(400).json(e);
    }
};

const getPosts = async (req, res) => {
    try {
        const posts = await PostDAL.getAllPosts();
        res.json(posts);
    } catch (e) {
        console.log(e);
        res.status(400).json(e);
    }
};

const getPostById = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await PostDAL.getPostById(id);

        if (!post) {
            return res.status(404).json('Post not found');
        }

        res.json(post);
    } catch (e) {
        console.log(e);
        res.status(400).json(e);
    }
};

module.exports = {
    createPost,
    updatePost,
    getPosts,
    getPostById
};
