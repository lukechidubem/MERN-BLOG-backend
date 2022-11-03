const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema({
  title: {
    type: mongoose.SchemaTypes.String,
  },

  author: String,

  body: String,

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

  image: {
    data: mongoose.SchemaTypes.String,
    contentType: String,
  },
});

const blogModel = mongoose.model("createdBlogs", BlogSchema);
module.exports = blogModel;
