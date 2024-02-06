import mongoose from "mongoose";

const { Schema, model } = mongoose;

const commentSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: true
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: 'products',
      required: true
    },
    text: {
      type: String,
      required: true
    }
  },
  { timestamps: true, versionKey: false }
);

export default model('comments', commentSchema);
