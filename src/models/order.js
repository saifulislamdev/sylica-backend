import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  user: {
    // ID of the user who created this order
    type: mongoose.Types.ObjectId,
  },
  shippingAddress: {
    type: {
      address1: String,
      address2: String,
      city: String,
      state: String,
      zip: String,
    },
  },
  billingAddress: {
    type: {
      address1: String,
      address2: String,
      city: String,
      state: String,
      zip: String,
    },
  },
  totalAmount: {
    type: Number,
  },
  productsPurchased: {
    type: [
      {
        productId: mongoose.Types.ObjectId,
        quantity: Number,
      },
    ],
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    default: 'processing',
  },
});

export default mongoose.model('orders', orderSchema);
