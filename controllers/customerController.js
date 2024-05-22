const Product = require("../models/product");
const Order = require("../models/order");
const Customer = require("../models/customer");
const jwt = require('jsonwebtoken');

// Generate JWT function
function generateToken(user) {
    return jwt.sign({ userId: user._id }, 'secret', { expiresIn: '1h' });
    // Replace 'secret' with your own secret key, and adjust expiresIn as needed
}

exports.register = async (req, res) => {
    try {
        const { username, password, email } = req.body;
        // Check if the email is already registered
        const existingCustomer = await Customer.findOne({ email });
        if (existingCustomer) {
            return res.status(400).json({ error: "Account already registered" });
        }
        const newCustomer = new Customer({ username, password, email });
        await newCustomer.save();
        // Generate JWT
        const token = generateToken(newCustomer);
        res.status(201).json({ token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        // Check if customer exists with provided username
        const customer = await Customer.findOne({ username });
        if (!customer) {
            return res.status(401).json({ error: "Invalid credentials" });
        }
        // Check if the password is correct
        if (password !== customer.password) {
            return res.status(401).json({ error: "Invalid credentials" });
        }
        // Generate JWT
        const token = generateToken(customer);
        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getProductsByCategory = async (req, res) => {
    try {
        const { category } = req.params;
        const products = await Product.find({ category });
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.placeOrder = async (req, res) => {
	try {
		const { customerId, productId, quantity } = req.body;

		// Check if the product exists
		const product = await Product.findById(productId);
		if (!product) {
			return res.status(404).json({ error: "Product not found" });
		}

		// Create a new order
		const newOrder = new Order({
			customer: customerId,
			product: productId,
			quantity: quantity,
			// You can add more fields like shipping address, payment method, etc.
		});
		await newOrder.save();

		res.status(201).json(newOrder);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};
