const express = require('express');
const postController = require('../controllers/postController');
const uploadMiddleware = require('../services/uploadMiddleware');
const router = express.Router();

router.post('/', uploadMiddleware.single('file'), postController.createPost);
router.put('/:id', uploadMiddleware.single('file'), postController.updatePost);
router.get('/', postController.getPosts);
router.get('/:id', postController.getPostById);

module.exports = router;
