const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  tags: [String],
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Blog", blogSchema);
