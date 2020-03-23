const mongoose = require("mongoose");
const validor = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  name: {
    _id: false,
    type: String,
    required: true,
    trim: true,
  },
  age: {
    _id: false,
    type: Number,
    required: true,
    validate(value) {
      if (value < 18) {
        throw new Error("You are to young!");
      }
    },
  },
  password: {
    _id: false,
    type: String,
    trim: true,
    minlength: 8,
    validate(value) {
      const hasNumber = /\d/;
      if (!hasNumber.test(value)) {
        throw new Error("Password has to contain at least one number");
      }
    },
  },
  tokens: [
    {
      token: {
        _id: false,
        type: String,
        required: true,
      },
    },
  ],
  images: [
    {
      _id: false,
      url: {
        type: String,
        required: true,
      },
      mainPicture: {
        type: Boolean,
        required: true,
      },
    },
  ],
});

userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Given info is invalid");
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Given info is invalid");
  }
  return user;
};

userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
