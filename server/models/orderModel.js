import mongoose from "mongoose";

const { Schema, model } = mongoose;

// Определение схемы заказа
const orderSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: true
    },
    products: [
      {
        type: Schema.Types.ObjectId,
        ref: 'products',
        required: true
      }
    ],
    totalAmount: {
      type: Number,
      required: true
    },
    status: {
      type: String,
      enum: ['pending', 'completed', 'cancelled'],
      default: 'pending'
    },
    // Другие поля заказа, которые вам могут понадобиться
  },
  { timestamps: true, versionKey: false }
);

// Индексация в схеме заказа
orderSchema.index({ user: 1 });

// Создание модели заказа
const Order = model('orders', orderSchema);

// Импорт других модулей и функций здесь

export default Order;
