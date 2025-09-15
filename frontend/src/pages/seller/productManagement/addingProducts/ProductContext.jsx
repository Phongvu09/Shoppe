import { createContext, useState, useContext } from "react";

const ProductContext = createContext();

export function ProductProvider({ children }) {
    const [productData, setProductData] = useState({
        name: "",
        description: "",
        category: "",
        price: 0,
        sizes: [],
        colors: [],
        origin: "",
        images: [], // mảng chứa các URL ảnh
        stock: 0,
        isFeatured: false
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