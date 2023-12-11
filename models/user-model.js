const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: { type: String, required: false },
    password: { type: String, required: true, minlength: 3 },
    email: { type: String, required: true, unique: true },
    imagePath: String,
    birthday: Date,
    favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }],
  },
  { timestamps: true }
);


module.exports = mongoose.model('User', userSchema);
