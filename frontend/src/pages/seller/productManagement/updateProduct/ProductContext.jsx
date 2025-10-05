// ProductContext.jsx
import { createContext, useState, useContext } from "react";

const ProductContext = createContext();

export function ProductProviderForUpdate({ children }) {
    const [productData, setProductData] = useState({
        // Thông tin cơ bản
        name: "",
        description: "",
        oldImages: [], // ảnh cũ từ server
        newImages: [], // ảnh người dùng chọn thêm

        // Thông tin chi tiết
        colors: [],
        sizes: [],
        origin: "",
        weight: 0,

        // Thông tin bán hàng
        category: "",
        price: 0,
        stock: 0,

        // Khác
        isFeatured: false,
    });

    return (
        <ProductContext.Provider value={{ productData, setProductData }}>
            {children}
        </ProductContext.Provider>
    );
}

export function useProduct() {
    return useContext(ProductContext);
}
