const PostModel = require('../models/PostModel');

const createPost = async (postData) => {
    return await PostModel.create(postData);
};

const updatePost = async (id, updatedData) => {
    return await PostModel.findByIdAndUpdate(id, updatedData, { new: true });
};

const getAllPosts = async () => {
    return await PostModel.find()
      .populate('author', ['username'])
      .sort({ createdAt: -1 })
      .limit(20);
};

const getPostById = async (id) => {
    return await PostModel.findById(id).populate('author', ['username']);
};

module.exports = {
    createPost,
    updatePost,
    getAllPosts,
    getPostById,
};
