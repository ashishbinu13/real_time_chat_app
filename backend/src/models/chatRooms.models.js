const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const MemberSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
});

const ChatRoomSchema = new Schema({
  roomName: {
    type: String,
    required: true,
  },
  createdBy: {
    type: String,
    required: true,
  },
  members: [MemberSchema],
});

const ChatRooms = mongoose.model("chatRooms", ChatRoomSchema);

module.exports = ChatRooms;
