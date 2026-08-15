const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  orderItems: [orderItemSchema],
  shippingAddress: { type: String, default: '' },
  paymentMethod: { type: String, default: 'Cash on Delivery' },
  totalPrice: { type: Number, required: true },
  isPaid: { type: Boolean, default: false },
  isDelivered: { type: Boolean, default: false },
  deliveredAt: { type: Date },
  paidAt: { type: Date },
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
