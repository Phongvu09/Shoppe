import { createContext, useState, useContext } from "react";

const ProductContext = createContext();

export function ProductProvider({ children }) {
    const [productData, setProductData] = useState({
        // Thông tin cơ bản
        name: "",
        description: "",
        images: [],

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
