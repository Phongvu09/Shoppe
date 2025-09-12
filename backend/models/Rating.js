import mongoose from "mongoose";

const ratingSchema = new mongoose.Schema({
    reviewId: {
        type: String,
        unique: true,
        required: true
    },
    productId: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
        min: 0,
        max: 5,
    },
    comment: {
        type: String,
        required: false,
        maxlength: 500
    },
})

// 1) Mỗi user chỉ được review 1 lần cho MỘT product TRONG MỘT orderItem (nếu có orderItemId)
ratingSchema.index(
    { productId: 1, userId: 1, orderItemId: 1 },
    { unique: true, partialFilterExpression: { orderItemId: { $exists: true } } }
);

// 2) Nếu không có orderItemId, chặn 1 user review 1 product nhiều lần
ratingSchema.index(
    { productId: 1, userId: 1 },
    { unique: true, partialFilterExpression: { orderItemId: { $exists: false } } }
);

const Rating = mongoose.model("Rating", ratingSchema)

export default Rating