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

//sort product by category
exports.sortProduct = async (req, res) => {
  try {
    const { category } = req.params;

    const products = await Product.find({ category: category });
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong' });
    console.log(err.message);
  }
};

//get product by id
exports.getProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong' });
    console.log(err.message);
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, description, inStock, category } = req.body;

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Check if there are changes
    const isNameChange = name && name !== product.name;
    const isPriceChange = price && price !== product.price;
    const isDescriptionChange =description && description !== product.description;
    const isInStockChange = inStock && inStock !== product.inStock;
    const isCategoryChange = category && category !== product.category;
    
    // Fix the validation if no changes made
    if (!isNameChange && !isPriceChange && !isDescriptionChange && !isInStockChange && !isCategoryChange) {
      return res.json({ message: 'No changes made' });
    }

    // Update product fields
    if (isNameChange) product.name = name;
    if (isPriceChange) product.price = price;
    if (isDescriptionChange) product.description = description;
    if (isInStockChange !== undefined) product.inStock = inStock;
    if (isCategoryChange) product.category = category;



    // Save the updated product
    const updatedProduct = await product.save();
    
    res.status(200).json({ message: 'Product updated successfully', updatedProduct });
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong' });
    console.log(err.message);
  }
};

//delete specific product
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({ message: 'Product deleted successfully', deletedProduct: product });
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong' });
    console.log(err.message);
  }
};
