import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    cartId: {
        unique: true,
        type: String
    },
    userId: {
        type: String
    }
})

const Cart = mongoose.model("Cart", cartSchema)

export default Cart