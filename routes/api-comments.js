const express = require('express');
const router = express.Router();
const Comments = require('../models/comments');

router.post('/', async (req, res, next) => {
  const response = await Comments.createOne(req.body);
  res.json(response);
});

router.delete('/:id', async (req, res, next) => {
  await Comments.deleteOne(req.params.id);
  res.json({ _id: req.params.id });
});

module.exports = router;
