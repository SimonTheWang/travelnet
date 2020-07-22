const mongoose = require("mongoose");

var commentSchema = mongoose.Schema({
  date: { type: String, required: true},
  author: { type: String, required: true},
  content: { type: String, required: true},
  likes: { type: [String], default: []},
  replies: { type: [{
    date: { type: String, required: true},
    author: { type: String, required: true},
    content: { type: String, required: true},
    likes: { type: [String], default: []},
    edited: { type: String, default: null}
  }], default: []},
  edited: { type: String, default: null}
})

const postSchema = mongoose.Schema({
  date: { type: String, required: true },
  location:{ type: String, required: true},
  author: { type: String, required: true },
  likes: { type: [String], default: [] },
  title: { type: String, required: true },
  content: { type: String, required: true },
  imagePath: { type: String, required: true },
  tags: { type: [String], required: true},
  comments: [commentSchema]
});



module.exports = mongoose.model("Post", postSchema);
