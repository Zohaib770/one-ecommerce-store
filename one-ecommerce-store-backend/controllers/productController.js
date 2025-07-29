const Product = require('../models/Product.js');
const { saveImages, deleteImages } = require('../utils/imageHandler.js')

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: 'Produkt nicht gefunden' });
    }

    res.json(product);
  } catch (error) {
    console.error('Fehler beim Abrufen des Produkts:', error);
    res.status(500).json({ message: 'Serverfehler beim Abrufen des Produkts' });
  }
};


const getAllProducts = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};

const addProduct = async (req, res) => {
  console.log("===== addProduct ENTER");
  try {
    const imagePaths = saveImages(req);

    const product = new Product({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      imageUrl: imagePaths,
    });

    const savedproduct = await product.save();
    res.status(201).json(savedproduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateProduct = async (req, res) => {
  console.log("===== updateProduct ENTER");
  try {
    const { id } = req.params;
    const { name, description, price } = req.body;
    const imagePaths = saveImages(req);

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const updatedImageUrls = [...product.imageUrl, ...imagePaths];
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      {
        name,
        description,
        price,
        imageUrl: updatedImageUrls
      },
      { new: true }
    );

    res.status(200).json(updatedProduct);

  } catch (error) {
    console.error("Error in updateProduct:", error);
    res.status(500).json({ error: 'Error updating product' });
  }
};

const deleteProduct = async (req, res) => {
  console.log("===== deleteProduct ENTER");

  try {
    const productId = req.params.id;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: 'deleteProduct not found' });
    }

    deleteImages(product.imageUrl);
    await Product.findByIdAndDelete(productId);

    res.status(200).json({ message: 'deleteProduct successfully' });
  } catch (error) {
    console.error("Error in deleteProduct:", error);
    res.status(500).json({ error: 'Error deleteProduct product' });
  }
};

const deleteProductImages = async (req, res) => {
  console.log("===== deleteProductImages ENTER");

  try {
    const productId = req.params.id;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: 'deleteProductImages not found' });
    }

    deleteImages(product.imageUrl);

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      {
        name: product.name,
        description: product.description,
        price: product.price,
        imageUrl: []
      },
      { new: true, runValidators: true }
    );

    res.status(200).json({ updatedProduct, message: 'deleteProductImages successfully' });
  } catch (error) {
    console.error("Error in deleteProductImages:", error);
    res.status(500).json({ error: 'Error deleteProductImages product' });
  }
};

module.exports = {
  getProductById,
  getAllProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  deleteProductImages
}
