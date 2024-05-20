const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  inStock: { type: Boolean, default: true },
  category: {
    type: String,
    required: true,
    enum: ['Chair', 'Bed', 'Closet', 'Table', 'Desk']
  }
});

module.exports = mongoose.model('Product', productSchema);
