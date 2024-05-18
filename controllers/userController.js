const User = require('../models/user');
const bcrypt = require('bcrypt');

//get all user
exports.getAllUsers = async (req,res) =>{
  try{
    const users = await User.find();
    res.json(users);
  }catch(err){
    res.status(500).json({message: err.message})
  }
};

//create new user
exports.createUser = async (req,res) =>{
  try{
    const {name,email,password} = req.body;

    //check if user is already existed
    const existingUser = await User.findOne({email:email});
    if(existingUser){
      return res.status(400).json({message:'Email account is already exists'})
    }

    //hashed user password
    const hashedPassword = await bcrypt.hash(password,10)
    const user = new User({
      name:name,
      email: email,
      password: hashedPassword
    });
    
    //save new user
    const newUser = await user.save();
    res.status(201).json(newUser);
  }catch(err){
    res.status(500).json({message: err.message})
  }
};


// Update a user
exports.updateUser = async (req, res) => {
  try {
      const { name, email, password } = req.body;

      const user = await User.findById(req.params.id);
      if (!user) return res.status(404).json({ message: 'User not found' });

      // Validate if the user did not make any changes

      const updatedUser = await user.save();
      res.json({ message: 'User updated successfully', updatedUser });
  } catch (err) {
      res.status(400).json({ message: err.message });
  }
};
