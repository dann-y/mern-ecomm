import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";

//mongoose

//async handler handles errors

// @desc       Fetch all products
// @route       GET /api/products
// @access     Public

const getProducts = asyncHandler(async (req, res) => {
  //how many items per page
  const pageSize = 6;
  //if page is not included, show 1
  const page = Number(req.query.pageNumber) || 1;
  //query allows to retreive from query (=?)
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};

  const count = await Product.countDocuments({ ...keyword });
  const products = await Product.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({ products, page, pages: Math.ceil(count / pageSize) });
});

// @desc       Fetch single product
// @route       GET /api/products/:id
// @access     Public

const getProductById = asyncHandler(async (req, res) => {
  //for each product, see if id matches request
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// @desc       Delete a product
// @route      DELETE /api/products/:id
// @access     Private/admin

const deleteProduct = asyncHandler(async (req, res) => {
  //for each product, see if id matches request
  const product = await Product.findById(req.params.id);

  if (product) {
    await product.remove();
    res.json({ message: "Product Removed" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// @desc       Create a product
// @route      Post /api/products/
// @access     Private/admin

const createProduct = asyncHandler(async (req, res) => {
  const product = await new Product({
    name: "sample name",
    price: 0,
    user: req.user._id,
    image: "/images/sample.jpg",
    brand: "Sample brand",
    category: "sample category",
    countInStock: 0,
    numReviews: 0,
    description: "sample description",
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

// @desc       Update a product
// @route      PUT /api/products/:id
// @access     Private/admin

const updateProduct = asyncHandler(async (req, res) => {
  const {
    name,
    price,
    description,
    image,
    brand,
    category,
    countInStock,
  } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;

    const updatedProduct = await product.save();
    res.status(201).json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

export {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
};
