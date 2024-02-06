import mongoose from "mongoose";

const { Schema, model } = mongoose;

const chatSchema = new Schema(
  {
    participants: [
      {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
      }
    ],
    messages: [
      {
        type: Schema.Types.ObjectId,
        ref: 'messages'
      }
    ]
  },
  { timestamps: true, versionKey: false }
);

export default model('chats', chatSchema);
