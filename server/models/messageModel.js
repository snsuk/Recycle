import mongoose from "mongoose";

const { Schema, model } = mongoose;

const messageSchema = new Schema(
  {
    sender: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: true
    },
    chat: {
      type: Schema.Types.ObjectId,
      ref: 'chats',
      required: true
    },
    content: {
      type: String,
      required: true
    }
  },
  { timestamps: true, versionKey: false }
);

export default model('messages', messageSchema);
