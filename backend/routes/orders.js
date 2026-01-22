const express = require('express')
const { body, validationResult } = require('express-validator')
const Order = require('../models/Order')
const { protect, admin } = require('../middleware/auth')

const router = express.Router()

// Generate unique order number
const generateOrderNumber = () => {
  return 'GT' + Date.now().toString(36).toUpperCase() + Math.random().toString(36).substr(2, 5).toUpperCase()
}

// @route   POST /api/orders
// @desc    Create new order
// @access  Public
router.post(
  '/',
  [
    body('customer.fullName').trim().notEmpty().withMessage('Full name is required'),
    body('customer.email').isEmail().withMessage('Valid email is required'),
    body('customer.phone').trim().notEmpty().withMessage('Phone is required'),
    body('shipping.address').trim().notEmpty().withMessage('Address is required'),
    body('shipping.city').trim().notEmpty().withMessage('City is required'),
    body('shipping.state').trim().notEmpty().withMessage('State is required'),
    body('shipping.postalCode').trim().notEmpty().withMessage('Postal code is required'),
    body('shipping.country').trim().notEmpty().withMessage('Country is required'),
    body('items').isArray({ min: 1 }).withMessage('At least one item is required'),
    body('subtotal').isFloat({ min: 0 }).withMessage('Subtotal must be a positive number'),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
      }

      const orderData = {
        ...req.body,
        orderNumber: generateOrderNumber(),
      }

      const order = await Order.create(orderData)
      res.status(201).json(order)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }
)

// @route   GET /api/orders
// @desc    Get all orders (admin only)
// @access  Private/Admin
router.get('/', protect, admin, async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 })
    res.json(orders)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// @route   GET /api/orders/:id
// @desc    Get single order
// @access  Private/Admin
router.get('/:id', protect, admin, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
    if (!order) {
      return res.status(404).json({ message: 'Order not found' })
    }
    res.json(order)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// @route   PUT /api/orders/:id/status
// @desc    Update order status
// @access  Private/Admin
router.put(
  '/:id/status',
  protect,
  admin,
  [body('status').isIn(['pending', 'processing', 'shipped', 'delivered', 'cancelled'])],
  async (req, res) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
      }

      const order = await Order.findByIdAndUpdate(
        req.params.id,
        { status: req.body.status },
        { new: true }
      )
      if (!order) {
        return res.status(404).json({ message: 'Order not found' })
      }
      res.json(order)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }
)

module.exports = router
