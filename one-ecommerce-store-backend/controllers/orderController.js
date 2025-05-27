const Order = require('../models/Order.js');

const createOrder = async (req, res) => {
  const { newOrder } = req.body;
  const orderSaved = await Order.create(newOrder);
  res.json(orderSaved);
};

module.exports = {
  createOrder
}