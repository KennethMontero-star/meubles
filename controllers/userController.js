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
