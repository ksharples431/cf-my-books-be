const User = require('../models/user');
const HttpError = require('../models/http-error');

////////// GET //////////
// ALL //
const getAllUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find({}, '-password');
  } catch (err) {
    const error = new HttpError(
      'Fetching users failed, please try again later.',
      500
    );
    return next(error);
  }
  res.status(200).json(users);
};
