import nodemailer from 'nodemailer';
import Order from '../models/orderModel.js';
import User from '../models/userModel.js';
import mongoose from 'mongoose';
import Product from '../models/productModel.js';

const sendEmail = async (to, subject, message) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to,
    subject,
    text: message,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully to:', to);
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

const sendOrderNotificationToSeller = async (sellerEmail, subject, message) => {
  try {
    await sendEmail(sellerEmail, subject, message);
    console.log('Notification to seller sent successfully');
  } catch (error) {
    console.error('Error sending notification to seller:', error);
    throw error;
  }
};

export const createOrder = async (req, res) => {
  try {
    console.log('Request Body:', req.body);
    const { productIds, userId, totalAmount } = req.body;

    if (!userId || !Array.isArray(productIds) || productIds.length === 0 || !totalAmount) {
      return res.status(400).json({ message: 'Invalid input data. Please provide userId, productIds array, and totalAmount.' });
    }

    if (typeof totalAmount !== 'number') {
      return res.status(400).json({ message: 'Invalid totalAmount. It should be a number.' });
    }

    const isValidObjectId = mongoose.Types.ObjectId.isValid(userId);

    if (!isValidObjectId) {
      return res.status(400).json({ message: 'Invalid user ID format.' });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    const newOrder = new Order({ user: userId, products: productIds, totalAmount });
    const order = await newOrder.save();

    for (const productId of productIds) {
      const product = await Product.findById(productId);
      
      if (product && product.seller && product.seller.email) {
        await sendOrderNotificationToSeller(
          product.seller.email,
          'New Order Received',
          `You have a new order for product: ${product.title}`
        );
      } else {
        console.error(`Seller information not found for product ID: ${productId}`);
      }
    }

    res.json({ message: 'Order created successfully', order });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ message: 'Error creating order', error: error.message });
  }
};
