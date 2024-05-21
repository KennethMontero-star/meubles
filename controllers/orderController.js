const Order = require("../models/order");
const Product = require("../models/product");
const User = require("../models/user");

// Create a new order
exports.createOrder = async (req, res) => {
	try {
		const { product, user, quantity, shippingAddress, paymentMethod } =
			req.body;

		// Fetch product information
		const productData = await Product.findById(product);
		if (!productData) {
			return res.status(404).json({ message: "Product not found" });
		}

		// Calculate total price based on product price and quantity
		const totalPrice = productData.price * quantity;

		// Create a new order instance
		const order = new Order({
			product,
			user,
			quantity,
			totalPrice, // Assign the calculated total price
			shippingAddress,
			paymentMethod,
		});

		// Save the new order
		const newOrder = await order.save();

		// Populate the user field with the user's name
		await newOrder.populate("user", "name").execPopulate();

		res.status(201).json(newOrder);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

// Get all orders
exports.getAllOrders = async (req, res) => {
	try {
		const orders = await Order.find().populate("product").populate("user");
		res.json(orders);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

// Get a specific order by ID
exports.getOrderById = async (req, res) => {
	try {
		const { id } = req.params;
		const order = await Order.findById(id).populate("product").populate("user");
		if (!order) {
			return res.status(404).json({ message: "Order not found" });
		}
		res.json(order);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

// Update a specific order by ID
exports.updateOrder = async (req, res) => {
	try {
		const { id } = req.params;
		const {
			product,
			user,
			quantity,
			totalPrice,
			shippingAddress,
			paymentMethod,
			status,
		} = req.body;

		const order = await Order.findById(id);
		if (!order) {
			return res.status(404).json({ message: "Order not found" });
		}

		// Update order fields
		if (product) order.product = product;
		if (user) order.user = user;
		if (quantity) order.quantity = quantity;
		if (totalPrice) order.totalPrice = totalPrice;
		if (shippingAddress) order.shippingAddress = shippingAddress;
		if (paymentMethod) order.paymentMethod = paymentMethod;
		if (status) order.status = status;

		const updatedOrder = await order.save();
		res
			.status(200)
			.json({ message: "Order updated successfully", updatedOrder });
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

// Delete a specific order by ID
exports.deleteOrder = async (req, res) => {
	try {
		const { id } = req.params;
		const order = await Order.findByIdAndDelete(id);
		if (!order) {
			return res.status(404).json({ message: "Order not found" });
		}
		res.status(200).json({ message: "Order deleted successfully", order });
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};
