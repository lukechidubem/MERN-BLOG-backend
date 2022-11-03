const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: mongoose.SchemaTypes.String,
    required: true,
    unique: true,
  },

  name: String,

  password: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },

  role: {
    type: mongoose.SchemaTypes.String,
    default: "User",
  },

  gender: String,

  createdAt: {
    type: mongoose.SchemaTypes.Date,
    required: true,
    default: new Date(),
  },

  updatedAt: {
    type: mongoose.SchemaTypes.Date,
    required: true,
    default: new Date(),
  },

  // token: {
  //   type: mongoose.SchemaTypes.String,
  // },
});

const userModel = mongoose.model("users", UserSchema);
module.exports = userModel;
