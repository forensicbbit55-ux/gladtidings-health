const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  image: {
    type: String,
    default: '',
  },
  category: {
    type: String,
    enum: ['Natural Remedies', 'E-books', 'Health Guidelines'],
    required: true,
  },
  inStock: {
    type: Boolean,
    default: true,
  },
  stockQuantity: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true,
})

module.exports = mongoose.model('Product', productSchema)
