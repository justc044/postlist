const express = require('express');
const router = express.Router();
const post_controller = require('../controllers/post.controller');

router.get('/read', post_controller.post_read);
router.post('/create', post_controller.post_create);
router.put('/update/:id', post_controller.post_update);
router.delete('/delete/:id', post_controller.post_delete);

module.exports = router;