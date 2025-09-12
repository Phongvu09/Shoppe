import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
    cartItemId: {
        type: String,
        unique: true,
    },
    cartId: {
        type: String,
    },
    productId: {
        type: String,
    },
    stock: {
        type: Number
    }
})



const CartItem = mongoose.model("CartItem", cartItemSchema)

export default CartItem