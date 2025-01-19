const express = require("express");

const {
  getProducts,
  createProduct,
  getProductById,
} = require("../controllers/productsController");

const router = express.Router();

router.get("/", getProducts);
router.post("/", createProduct);
router.get("/:id", getProductById);

module.exports = router;
