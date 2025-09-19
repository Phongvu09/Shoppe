import { Routes, Route } from "react-router-dom";
import Login from "./pages/user/auth/Login.jsx";
import Register from "./pages/user/auth/Register.jsx";
import ProductPage from "./pages/product/product.jsx";
import ShopInformation from "./pages/seller/auth/shopInformationForm/shopInformation.jsx";
import ShippingForm from "./pages/seller/auth/ShippingForm/ShippingForm.jsx";
import TaxForm from "./pages/seller/auth/TaxForm/TaxForm.jsx";
import IdentityForm from "./pages/seller/auth/IdentityForm/IdentityForm.jsx";
import { ProductProvider } from "./pages/seller/productManagement/addingProducts/ProductContext.jsx";
import ProductDetail from "./pages/seller/productManagement/addingProducts/ProductDetail.jsx";
import ProductInfo from "./pages/seller/productManagement/addingProducts/ProductInfo.jsx";
import ProductSales from "./pages/seller/productManagement/addingProducts/ProductSales.jsx";
import ProductReview from "./pages/seller/productManagement/addingProducts/ProductReview.jsx";
import { Outlet } from "react-router-dom";

// wrapper để bọc context
function ProductWrapper() {
  return (
    <ProductProvider>
      <Outlet />
    </ProductProvider>
  );
}

function App() {
  return (
    <Routes>
      {/* Auth */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* User Product Page */}
      <Route path="/product" element={<ProductPage />} />

      {/* Seller Auth */}
      <Route path="/shop-info" element={<ShopInformation />} />
      <Route path="/shipping-form" element={<ShippingForm />} />
      <Route path="/tax-form" element={<TaxForm />} />
      <Route path="/identity-form" element={<IdentityForm />} />

      {/* Seller Product Management */}
      <Route element={<ProductWrapper />}>
        <Route path="/product/info" element={<ProductInfo />} />
        <Route path="/product/detail" element={<ProductDetail />} />
        <Route path="/product/sales" element={<ProductSales />} />
        <Route path="/product/review" element={<ProductReview />} />
      </Route>
    </Routes>
  );
}

export default App;
