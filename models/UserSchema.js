const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  _id: {
    type: Number,
    unique: true,
  },

  name: {
    type: String,
  },

  notifications: [
    {
      _id: String,
      notification: String,
      projectId: String,
      requesterId: String,
    },
  ],
});

const Users = mongoose.model("Users", UserSchema);

module.exports = Users;
