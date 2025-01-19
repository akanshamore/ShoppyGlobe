const Product = require("../models/Product");

// Get products
const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createProduct = async (req, res) => {
  try {
    const { name, price, description, stockQuantity } = req.body;
    if (!name || !price || !description || !stockQuantity) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }

    // Check if a product with the same name exists
    const existingProduct = await Product.findOne({ name });

    if (existingProduct) {
      return res
        .status(400)
        .json({ message: "Product with this name already exists." });
    }

    // If the product doesn't exist, create and save the new user
    const product = new Product({
      name,
      price,
      description,
      stockQuantity,
    });

    await product.save();
    res
      .status(201)
      .json({ message: "Product created successfully", product: product });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "An error occurred" });
  }
};

module.exports = { getProducts, createProduct, getProductById };
