const mongoose = require('mongoose');
const Promise = require('bluebird');
const OPTIONS = require('../constants/options');
const normalize = require('../utils/normalize-params');
const mongoDB = require('mongodb');
const moment = require('moment');

const commentSchema = new mongoose.Schema({
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'posts',
  },
  body: {
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
  enabled: {
    type: Boolean,
    default: false,
  },
  active: {
    type: Boolean,
    default: true,
  },
}, {
  toObject: {
    virtuals: true,
  },
  toJSON: {
    virtuals: true,
  }
});

commentSchema.virtual('createdAt').get(function () {
  const objectId = mongoDB.ObjectID;
  const ts = objectId(this._id.toString()).getTimestamp();
  const date = moment(ts).format('DD/MM/YYYY, h:mm a');
  return date;
});

commentSchema.statics.get = async function (options = {}) {
  const limit = normalize.limit(options.limit) || OPTIONS.DEFAULTS.LIMIT;
  const sortBy = options.sortBy || OPTIONS.USERS.SORT_BY;
  const sortOrder = options.sortOrder || OPTIONS.USERS.SORT_ORDER;
  const page = normalize.page(options.page);
  const skip = (page - 1) * limit;

  const query = options.query || {};
  query.active = true;

  if (options.search) {
    query.$or = [
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

commentSchema.statics.createOne = async function (data) {
  data.createdAt = new Date();
  const Comment = mongoose.model('comments');
  const newComment = new Comment(data);
  return newComment.save();
};

commentSchema.statics.deleteOne = function (id) {
  return this.findOneAndUpdate({ _id: id }, { $set: { active: false } });
};

module.exports = mongoose.model('comments', commentSchema);
