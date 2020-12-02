const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
  _id: {
    type: String,
    required: "An ID is Required",
  },

  name: {
    type: String,
  },

  //array of user objects
  users: [String],

  //array of ALL tasks - each task will have a status of todo, inProgress, or completed
  tasks: [
    {
      _id: { type: String },
      author: { type: String },
      content: { type: String },
      status: { type: String },
    },
  ],

  //array of chat messages
  chat: [
    {
      author: { type: String },
      message: { type: String },
      createdAt: { type: Date },
    },
  ],
});

const Projects = mongoose.model("Projects", ProjectSchema);

module.exports = Projects;
