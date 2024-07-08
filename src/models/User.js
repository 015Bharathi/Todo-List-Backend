const { tryWithPath } = require("@hapi/joi/lib/common");
const { type } = require("@hapi/joi/lib/extend");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false,
    min: 6,
    max: 256,
  },

  email: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  password: {
    type: String,
    required: true,
    min: 6,
    max: 1024,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("User", userSchema);

const todoSchema = new mongoose.Schema({
  userId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
    required: true,
  },
  task: {
    type: String,
    required: true,
    max: 1024,
    min: 1,
  },
  description: {
    type: String,
    min: 1,
    max: 1024,
  },
  checked: {
    type: Boolean,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Todo = mongoose.model("Todo", todoSchema);

module.exports = { User, Todo };
