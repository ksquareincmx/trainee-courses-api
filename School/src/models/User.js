const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { courseSchema } = require("../models/Course");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: value => {
      if (!validator.isEmail(value)) {
        throw new Error({ error: "Invalid Email address" });
      }
    }
  },
  password: {
    type: String,
    required: true,
    minLength: 8
  },
  admin: {
    type: Boolean,
    required: true,
    default: false
  },
  courses: [courseSchema],
  tokens: [
    {
      token: {
        type: String,
        required: true
      }
    }
  ]
});

userSchema.methods.addUser = async function() {
  const user = this;
  await user.save();
};

userSchema.statics.getAllUsers = async () => {
  const users = await User.find({});
  if (users.length === 0) {
    throw new Error();
  }
  return users;
};

userSchema.statics.getUser = async id => {
  const user = await User.findOne({ _id: id });
  if (!user) {
    throw new Error();
  }
  return user;
};

userSchema.methods.updateUser = async function() {
  const user = this;
  user.isNew = false;
  await user.save();
};

userSchema.statics.deleteUser = async id => {
  const result = await User.deleteOne({ _id: id });
  if (!result.deletedCount) {
    throw new Error();
  }

  return result;
};

userSchema.pre("save", async function(next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

// userSchema.methods.generateAuthToken = async function() {
//   const user = this;
//   const token = jwt.sign({ _id: user._id }, process.env.JWT_KEY);
//   user.tokens = user.tokens.concat({ token });
//   await user.save();
//   return token;
// };

// userSchema.statics.findByCredentials = async (email, password) => {
//   const user = await User.findOne({ email });
//   if (!user) {
//     throw new Error({ error: "Invalid login credentials" });
//   }
//   const isPasswordMatch = await bcrypt.compare(password, user.password);
//   if (!isPasswordMatch) {
//     throw new Error({ error: "Invalid login credentials" });
//   }
//   return user;
// };

const User = mongoose.model("User", userSchema);

module.exports = User;
