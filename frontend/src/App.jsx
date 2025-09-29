// frontend/src/App.jsx
import { Routes, Route, Outlet, Navigate } from "react-router-dom";

import HomePage from "./pages/home/HomePage.jsx";
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

import Navbar from "./components/Navbar.jsx";

// Bọc context cho nhóm route quản lý sản phẩm
function ProductWrapper() {
  return (
    <ProductProvider>
      <Outlet />
    </ProductProvider>
  );
}

// Layout chung: Navbar + Outlet
function AppLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default function App() {
  return (
    <Routes>
      {/* Layout có Navbar */}
      <Route element={<AppLayout />}>
        {/* Public pages */}
        <Route path="/" element={<HomePage />} />
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
      </Route>

      {/* Auth pages ngoài layout để khi login/register không hiện Navbar (tuỳ ý) */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* 404 */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
