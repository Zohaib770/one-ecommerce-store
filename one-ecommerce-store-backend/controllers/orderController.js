const Order = require('../models/Order.js');

const createOrder = async (req, res) => {
  const { order } = req.body;
  const orderSaved = await Order.create(order);
  res.json(orderSaved);
};

const getAllOrders = async (req, res) => {
  const orders = await Order.find();
  res.json(orders);
};

module.exports = {
  createOrder,
  getAllOrders
}