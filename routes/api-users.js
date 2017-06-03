const express = require('express');
const router = express.Router();
const sanitize = require('../utils/sanitize');
const Users = require('../models/users');
const { isLoggedIn, isAdminOrSelf } = require('../utils/auth');
const { USER_ROLES } = require('../constants');

router.put('/:id', isLoggedIn, isAdminOrSelf, async (req, res) => {
  const id = sanitize(req.params.id);
  const data = sanitize(req.body);
  let dataToSave = {};

  if (req.user.role === USER_ROLES.ADMIN) {
    dataToSave = data;
  } else {
    if (data.name) {
      dataToSave.name = data.name;
    }
    if (data.password) {
      dataToSave.password = data.password;
    }
  }

  dataToSave.updatedBy = req.user._id;

  try {
    await Users.updateOne(id, dataToSave);
    res.json({ message: 'Record has been successfully saved' });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', isLoggedIn, isAdminOrSelf, async (req, res) => {
  const id = sanitize(req.params.id);

  try {
    await Users.deleteOne(id);
    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ message: 'Delete failed. Please try again.' });
  }
});

module.exports = router;
