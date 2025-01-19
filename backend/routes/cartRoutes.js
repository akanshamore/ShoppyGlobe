const express = require("express");
const {
  addToCart,
  updateCartItem,
  removeFromCart,
} = require("../controllers/cartController");
const requireAuth = require("../middlewares/requireAuth");

const router = express.Router();

router.use(requireAuth);

router.post("/", addToCart);
router.put("/", updateCartItem);
router.delete("/:productId", removeFromCart);

module.exports = router;
