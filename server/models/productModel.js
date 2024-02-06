import mongoose from "mongoose";

const { Schema, model } = mongoose;

const productSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
  },
  seller: {
    type: Schema.Types.ObjectId,
    ref: 'users', 
    required: true,
  },
  image: {
    type: String,
  },
  description: {
    type: String,
    trim: true,
    default: "No description provided",
  },
  inStock: {
    type: Boolean,
    default: true,
  },
  comments: [
    {
      user: { type: Schema.Types.ObjectId, ref: 'users', required: true },
      text: String,
      createdAt: { type: Date, default: Date.now },
    },
  ],
}, { timestamps: true, versionKey: false });

export default model('products', productSchema);
