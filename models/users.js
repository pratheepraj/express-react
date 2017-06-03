const mongoose = require('mongoose');
const validate = require('mongoose-validator');
const bcrypt = require('bcrypt');
const Promise = require('bluebird');
const { USER_ROLES } = require('../constants');
const OPTIONS = require('../constants/options');
const normalize = require('../utils/normalize-params');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, 'Name is required'],
    validate: validate({
      validator: 'matches',
      arguments: /^[a-z0-9 ]+$/i,
      message: 'Please enter a valid name',
    }),
  },
  email: {
    type: String,
    trim: true,
    // unique: 'This email has been taken',
    required: [true, 'Email is required'],
    validate: validate({
      validator: 'isEmail',
      message: 'Please enter a valid email',
    }),
  },
  password: {
    type: String,
    trim: true,
    bcrypt: true,
    required: [true, 'Password is required'],
  },
  role: {
    type: String,
    enum: [USER_ROLES.ADMIN, USER_ROLES.USER],
    default: USER_ROLES.USER,
  },
  updatedAt: {
    type: Date,
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
  },
  enabled: {
    type: Boolean,
    default: false,
  },
  active: {
    type: Boolean,
    default: true,
  },
});

userSchema.plugin(require('mongoose-beautiful-unique-validation'));

userSchema.statics.get = async function (options = {}) {
  const limit = normalize.limit(options.limit) || OPTIONS.DEFAULTS.LIMIT;
  const sortBy = options.sortBy || OPTIONS.USERS.SORT_BY;
  const sortOrder = options.sortOrder || OPTIONS.USERS.SORT_ORDER;
  const page = normalize.page(options.page);
  const skip = (page - 1) * limit;

  const query = options.query || {};
  query.active = true;

  if (options.search) {
    query.$or = [
      { name: new RegExp(options.search, 'i') },
      { email: new RegExp(options.search, 'i') },
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

userSchema.statics.getOne = function (query = {}) {
  query.active = true;
  return this.findOne(query).exec();
};

userSchema.statics.createOne = async function (data) {
  const User = mongoose.model('users');

  if (data.password) {
    try {
      data.password = await bcrypt.hash(data.password, 10);
    } catch (err) {
      return Promise.reject({ message: 'Error saving password. Please try again' });
    }
  }

  const newUser = new User(data);
  return newUser.save();
};

userSchema.statics.updateOne = async function (id, data) {
  // jQuery picks up empty string if nothing is typed
  if (data.password === '') delete data.password;

  if (data.password) {
    try {
      data.password = await bcrypt.hash(data.password, 10);
    } catch (err) {
      return Promise.reject({ message: 'Error saving password. Please try again' });
    }
  }

  data.updatedAt = new Date();

  return this.findOneAndUpdate({ _id: id }, { $set: data }, { runValidators: true });
};

userSchema.statics.deleteOne = function (id) {
  return this.findOneAndUpdate({ _id: id }, { $set: { active: false } });
};

userSchema.statics.verifyPassword = function (candidatePassword, hash) {
  return bcrypt.compare(candidatePassword, hash);
};

module.exports = mongoose.model('users', userSchema);
