const bcrypt = require('bcrypt');
const validator = require('validator');

userSchema.statics.signup = async function (
  username,
  email,
  password,
  birthday
) {
  if (!email || !password) {
    throw Error('All fields must be filled.');
  }
  if (!validator.isEmail(email)) {
    throw Error('Email is not valid.');
  }
  if (!validator.isStrongPassword(password)) {
    throw Error('Password not strong enough.');
  }

  const exists = await this.findOne({ email });

  if (exists) {
    throw Error('Email already in use.');
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({
    username,
    email,
    password: hash,
    birthday,
  });

  return user;
};

userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error('All fields must be filled.');
  }

  const user = await this.findOne({ email });
  console.log(user);

  if (!user) {
    throw Error('Incorrect email.');
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw Error('Incorrect password.');
  }

  return user;
};
