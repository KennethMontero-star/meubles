const User = require('../models/user');
const bcrypt = require('bcrypt');

// Get all users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getUser = async (req,res)=>{
    try {
        const {id} = req.params;
        const user = await User.findById(id);
        if(!user) return res.status(404).json({message:'User not found'})

        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

// Create a new user
exports.createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email account already exists' });
        }

        // Hash the user password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user instance
        const user = new User({
            name: name,
            email: email,
            password: hashedPassword
        });

        // Save the new user
        const newUser = await user.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Update a user
exports.updateUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        // Check if there are changes
        const isNameChanged = name && name !== user.name;
        const isEmailChanged = email && email !== user.email;
        const isPasswordChanged = password && !(await bcrypt.compare(password, user.password));

        if (!isNameChanged && !isEmailChanged && !isPasswordChanged) {
            return res.json({ message: 'No changes made' });
        }

        // Update fields if changed
        if (isNameChanged) user.name = name;
        if (isEmailChanged) user.email = email;
        if (isPasswordChanged) user.password = await bcrypt.hash(password, 10);

        const updatedUser = await user.save();
        res.json({ message: 'User updated successfully', updatedUser });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Delete a user
exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        await User.deleteOne({ _id: req.params.id });
        res.json({ message: 'User deleted successfully',deletedUser:user });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
