const mongoose = require('mongoose');
const Promise = require('bluebird');
const OPTIONS = require('../constants/options');
const normalize = require('../utils/normalize-params');

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: [true, 'Title is required'],
  },
  body: {
    type: String,
    trim: true,
  },
  image: {
    type: String,
    trim: true,
  },
  // createdBy: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'users',
  // },
  updatedAt: {
    type: Date,
  },
  // updatedBy: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'users',
  // },
  active: {
    type: Boolean,
    default: true,
  },
});

postSchema.virtual('createdAt').get(() => {
  return this._id.getTimestamp();
});

postSchema.statics.get = async function (options = {}) {
  const limit = normalize.limit(options.limit) || OPTIONS.DEFAULTS.LIMIT;
  const sortBy = options.sortBy || OPTIONS.DEFAULTS.SORT_BY;
  const sortOrder = options.sortOrder || OPTIONS.DEFAULTS.SORT_ORDER;
  const page = normalize.page(options.page);
  const skip = (page - 1) * limit;

  const query = options.query || {};
  query.active = true;

  if (options.search) {
    query.$or = [
      { title: new RegExp(options.search, 'i') },
      { body: new RegExp(options.search, 'i') },
    ];
  }

  return new Promise(async (resolve, reject) => {
    try {
      const results = await Promise.all([
        this
          .find(query)
          .collation({ locale: 'en' }) // for case insensitive 'name' sorting
          .sort({ [sortBy]: sortOrder })
          .skip(skip)
          .limit(limit)
          .exec(),

        this.find(query).exec(),
      ]);

      const totalPages = limit > 0 ? Math.ceil(results[1].length / limit) : 1;

      resolve({
        currentPage: page,
        totalPages,
        searchTerm: options.search,
        data: results[0],
      });
    } catch (err) {
      reject(err);
    }
  });
};

postSchema.statics.getOne = function (query = {}) {
  query.active = true;
  return this.findOne(query).exec();
};

postSchema.statics.createOne = async function (data) {
  data.createdAt = new Date();
  const Post = mongoose.model('posts');
  const newPost = new Post(data);
  return newPost.save();
};

module.exports = mongoose.model('posts', postSchema);
