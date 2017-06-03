const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const indexOf = require('lodash/indexOf');
const readChunck = require('read-chunk');
const fileType = require('file-type');
const upload = multer({ dest: 'uploads/' });
const Posts = require('../models/posts');
const Comments = require('../models/comments');
const imageHandler = require('../utils/image-handler');
let { ALLOWED_IMAGE_TYPES } = require('../constants');
const sanitize = require('../utils/sanitize');

router.get('/', async function (req, res, next) {
  const response = await Posts.get();
  res.json(response);
});

router.get('/:id/comments', async function (req, res, next) {
  const response = await Comments.get({
    where: { postId: req.params.id }
  });

  res.json(response);
});

router.get('/:id', async (req, res, next) => {
  const id = sanitize(req.params.id);

  try {
    const post = await Posts.getOne({ _id: id });

    if (post) {
      res.json(post);
    } else {
      res.status(404).json({ message: 'Post not found' });
    }
  } catch (err) {
    res.status(404).json({ message: 'Post not found' });
  }
});

router.post('/', upload.single('imageFile'), async function (req, res, next) {
  if (req.file && req.file.path) {
    var filePath = req.file.path;
    var fileSize = fs.statSync(filePath).size;

    if (fileSize / 1000000 > 100) { // 30MB
      res.status(422).send({
        error: 'Please upload an image not bigger than 30MB'
      });
      fs.unlink(filePath);
      return;
    }

    const fileInfo = fileType(readChunck.sync(filePath, 0, 262));

    if (fileInfo && indexOf(ALLOWED_IMAGE_TYPES, fileInfo.ext) >= 0) {
      const newPath = await imageHandler.moveImage(filePath);
      req.body.image = newPath;
      const response = await Posts.createOne(req.body);
      fs.unlink(filePath);
      res.json(response);
    } else {
      res.status(422).send({
        error: `File uploaded was not an image or not a image format that we support,
          please try again!`
      });
      fs.unlink(filePath);
    }
  } else {
    const response = await Posts.createOne(req.body);
    res.json(response);
  }
});

module.exports = router;
