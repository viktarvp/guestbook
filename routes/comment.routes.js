const { Router } = require('express');
const Comment = require('../models/Comment');
const router = new Router();

router.get(`/comment`, async (req, res) => {
  try {
    const comments = await Comment.find().sort({ date: -1 });
    return res.status(200).send(comments);
  } catch (e) {
    res.status(500).json({ message: 'Something went wrong' });
  }
});

router.post(`/comment`, async (req, res) => {
  try {
    const { name, description, date } = req.body;
    const comment = new Comment({ name, description, date });

    await comment.save();
    res.status(201).json({ message: 'Comment saved' });
  } catch (e) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
