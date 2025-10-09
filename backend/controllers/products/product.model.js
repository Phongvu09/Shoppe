import mongoose from "mongoose";

const CATEGORY_ENUM = [
    "electronics",
    "fashion",
    "beauty",
    "home_living",
    "health_personal_care",
    "baby_products",
    "groceries",
    "mobile_accessories",
    "computer_peripherals",
    "gaming",
    "pet_supplies",
    "sports_outdoors",
    "automotive_parts",
    "kitchen_appliances",
    "furniture",
    "lighting",
    "books",
    "stationery_office",
    "toys_hobbies",
    "jewelry",
    "watches",
    "bags_luggage",
    "shoes",
    "eyewear",
    "audio",
    "video_equipment",
    "camera_accessories",
    "travel_accessories",
    "home_decor",
    "bed_bath",
    "lawn_garden",
    "tools_hardware",
    "groceries_beverages",
    "snacks",
    "beauty_tools",
    "personal_care_appliances",
    "digital_goods",
    "gift_cards"
];

const productSchema = new mongoose.Schema(
    {
        productId: { type: String, unique: true }, // mã sản phẩm tự sinh
        shopId: { type: String, required: true },
        name: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            default: "",
        },
        price: { type: Number, required: true },
        discount: { type: Number, default: 0 },
        description: { type: String, default: "" },

        category: {
            type: String,
            required: true,
            enum: CATEGORY_ENUM
        },
        sizes: {
            type: [String],
            default: []
        },
        colors: {
            type: [String],
            default: [], // Ví dụ: ["red", "blue", "black"]
        },
        origin: {
            type: String,
            default: ""
        },
        material: {
            type: String,
            default: ""
        },
        weight: {
            type: Number,
            required: true
        }
        ,
        images: [
            {
                _id: false,
                url: { type: String, required: true },       // URL ảnh từ Cloudinary
                public_id: { type: String, required: true }, // ID dùng để quản lý ảnh trên Cloudinary
            }
        ],
        stock: {
            type: Number,
            default: 0,
        },
        soldQuantity: {
            type: Number,
            default: 0
        },
        isFeatured: {
            type: Boolean,
            default: false,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true, // tự động tạo createdAt và updatedAt
    }
);

productSchema.pre("validate", async function (next) {
    if (!this.productId) {
        const count = await this.constructor.countDocuments();
        this.productId = "P" + (count + 1).toString().padStart(3, "0");
    }
    next();
});


const Products = mongoose.model("Product", productSchema);

export default Products;