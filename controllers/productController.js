const Product = require('../models/product');

exports.getAllProducts = async (req,res)=>{
  //get all the products
  try{
    const product = await Product.find();
    res.json(product);
  }catch(err){
    res.status(500).json({message:'Something went wrong',})
    console.log(err.message);
  }
};

exports.createProduct = async (req, res) => {
  try {
    const { name, price, description, inStock, category } = req.body;

    const product = new Product({
      name,
      price,
      description,
      inStock,
      category
    });
    
    const newProduct = await product.save();
    res.status(201).json({ message: 'Product has been saved', newProduct });
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong' });
    console.log(err.message);
  }
};
