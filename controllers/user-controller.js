const User = require('../models/user');
const HttpError = require('../models/http-error');

////////// USERS //////////
const createUser = async (req, res, next) => {
  const { username, password, email } = req.body;
  let user;

  try {
    user = await User.create({ username, password, email });
  } catch (err) {
    const error = new HttpError(
      'Creating user failed, please try again later.',
      500
    );
    return next(error);
  }
  res.status(201).json(user);
};
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
// ID //
const getUserById = async (req, res, next) => {
  let user;
  try {
    user = await User.findOne({ _id: req.params.uid });
  } catch (err) {
    const error = new HttpError(
      'Fetching user failed, please try again later.',
      500
    );
    return next(error);
  }
  if (!user) {
    const error = new HttpError(
      'Could not find a user for the provided id.',
      404
    );
    return next(error);
  }
  res.status(200).json(user);
};
// USERNAME //
const getUserByUsername = async (req, res, next) => {
  let user;
  try {
    user = await User.findOne({ username: req.params.username });
  } catch (err) {
    const error = new HttpError(
      'Fetching user failed, please try again later.',
      500
    );
    return next(error);
  }
  if (!user) {
    const error = new HttpError(
      'Could not find a user for the provided username.',
      404
    );
    return next(error);
  }
  res.status(200).json(user);
};

////////// PATCH //////////
// ID //
const updateUserById = async (req, res, next) => {
  let updatedUser;
  try {
    console.log(req.params)
    updatedUser = await User.findOneAndUpdate(
      { _id: req.params.uid },
      {
        $set: {
          username: req.body.username,
          password: req.body.password,
          email: req.body.email,
          birthday: req.body.birthday,
        },
      },
      { new: true }
    );

    // const userInfo = {
    //   username: user.username,
    //   email: user.email,
    //   token: token,
    //   id: user._id,
    //   image: user.imagePath,
    //   birthday: user.birthday,
    //   favorites: user.favorites,
    // };

    console.log(updatedUser)
    res.status(200).json(updatedUser);

  } catch (err) {
    const error = new HttpError(
      'Updating user failed, please try again later.',
      500
    );
    return next(error);
  }
  if (!updatedUser) {
    const error = new HttpError(
      'Could not find a user for the provided id.',
      404
    );
    return next(error);
  }
};
// USERNAME //
const updateUserByUsername = async (req, res, next) => {
  try {
    const updatedUser = await User.findOneAndUpdate(
      { username: req.params.username },
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          birthday: req.body.birthday,
        },
      },
      { new: true }
    );

    if (!updatedUser) {
      const error = new HttpError(
        'Could not find a user for the provided username.',
        404
      );
      return next(error);
    }

    // const userInfo = {
    //   username: updatedUser.username,
    //   email: updatedUser.email,
    //   token: token,
    //   id: updatedUser._id,
    //   image: updatedUser.imagePath,
    //   birthday: updatedUser.birthday,
    //   favorites: updatedUser.favorites,
    // };

    res.status(200).json({updatedUser});
    
  } catch (err) {
    console.log(err)
    const error = new HttpError(
      'Updating user failed, please try again later.',
      500
    );
    return next(error);
  }
  
};

////////// DELETE //////////
// ID //
const deleteUserById = async (req, res, next) => {
  let deletedUser;
  let uid = req.params.uid
  try {
    deletedUser = await User.findOneAndRemove({ _id: uid });
  } catch (err) {
    const error = new HttpError(
      'Deleting user failed, please try again later.',
      500
    );
    return next(error);
  }
  if (!deletedUser) {
    const error = new HttpError(
      'Could not find a user for the provided id.',
      404
    );
    return next(error);
  }
  res.status(200).send(`User ${uid} was deleted.`);
};
// // USERNAME //
const deleteUserByUsername = async (req, res, next) => {
  let deletedUser;
  let username = req.params.username;
  try {
    deletedUser = await User.findOneAndRemove({
      username: req.params.username,
    });
  } catch (err) {
    const error = new HttpError(
      'Deleting user failed, please try again later.',
      500
    );
    return next(error);
  }
  if (!deletedUser) {
    const error = new HttpError(
      'Could not find a user for the provided username.',
      404
    );
    return next(error);
  }
  res.status(200).send(`User ${username} was deleted.`);
};

////////// FAVORITES //////////
////////// POST //////////
// ID //
const addBookToFavorites = async (req, res, next) => {
  let updatedUser;
  try {
    updatedUser = await User.findOneAndUpdate(
      { _id: req.params.uid },
      {
        $addToSet: { favorites: req.params.bid },
      },
      { new: true }
    );
  } catch (err) {
    const error = new HttpError(
      'Adding book to favorites failed, please try again later.',
      500
    );
    return next(error);
  }
  if (!updatedUser) {
    const error = new HttpError(
      'Could not find a user for the provided id.',
      404
    );
    return next(error);
  }
  res.status(200).json(updatedUser);
};

////////// DELETE //////////
// ID //
const deleteBookFromFavorites = async (req, res, next) => {
  let updatedUser;
  try {
    updatedUser = await User.findOneAndUpdate(
      { _id: req.params.uid },
      {
        $pull: { favorites: req.params.bid },
      },
      { new: true }
    );
  } catch (err) {
    const error = new HttpError(
      'Deleting book from favorites failed, please try again later.',
      500
    );
    return next(error);
  }
  if (!updatedUser) {
    const error = new HttpError(
      'Could not find a user for the provided id.',
      404
    );
    return next(error);
  }
  res.status(200).json(updatedUser);
};


exports.createUser = createUser;
exports.getAllUsers = getAllUsers;
exports.getUserById = getUserById;
exports.getUserByUsername = getUserByUsername;
exports.updateUserById = updateUserById;
exports.updateUserByUsername = updateUserByUsername;
exports.deleteUserById = deleteUserById;
exports.deleteUserByUsername = deleteUserByUsername;
exports.addBookToFavorites = addBookToFavorites;
exports.deleteBookFromFavorites = deleteBookFromFavorites;
