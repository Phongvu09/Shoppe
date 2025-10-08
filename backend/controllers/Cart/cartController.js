import Cart from "../../models/Cart.js";

// 🧡 Lấy giỏ hàng của user
export const getCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const cart = await Cart.findOne({ userId });
    res.json(cart || { userId, items: [] });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 💚 Thêm sản phẩm vào giỏ hàng
export const addToCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const { productId, name, price, img, quantity = 1 } = req.body;

    let cart = await Cart.findOne({ userId });
    if (!cart) cart = new Cart({ userId, items: [] });

    // ✅ Dùng == để khớp cả string & number
    const existing = cart.items.find(i => i.productId == productId);
    if (existing) {
      existing.quantity += quantity;
    } else {
      cart.items.push({ productId, name, price, img, quantity });
    }

    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 💜 Xóa sản phẩm khỏi giỏ
export const removeFromCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const { productId } = req.params;
    const cart = await Cart.findOneAndUpdate(
      { userId },
      { $pull: { items: { productId: Number(productId) } } },
      { new: true }
    );
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 💙 Cập nhật số lượng
export const updateQuantity = async (req, res) => {
  try {
    const userId = req.user._id;
    const { productId, quantity } = req.body;
    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    // ✅ Cập nhật quantity an toàn
    const item = cart.items.find(i => i.productId == productId);
    if (item) item.quantity = quantity;

    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
