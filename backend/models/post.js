const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  // author: { type: String, required: true },
  // likes: { type: [String], default: [] },
  title: { type: String, required: true },
  content: { type: String, required: true },
  imagePath: { type: String, required: true }
});

module.exports = mongoose.model("Post", postSchema);
