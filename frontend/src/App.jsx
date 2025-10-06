// src/App.jsx
import { Routes, Route, Outlet, Navigate } from "react-router-dom";

// User
import HomePage from "./pages/home/HomePage.jsx";
import Login from "./pages/user/auth/Login.jsx";
import Register from "./pages/user/auth/Register.jsx";
import ProductPage from "./pages/product/product.jsx";

// Seller Auth
import LoginSeller from "./pages/seller/auth/login/login.auth.jsx";
import RegisterSeller from "./pages/seller/auth/register/register.auth.jsx";
import ShopInformation from "./pages/seller/auth/shopInformationForm/shopInformation.jsx";
import ShippingForm from "./pages/seller/auth/ShippingForm/ShippingForm.jsx";
import TaxForm from "./pages/seller/auth/TaxForm/TaxForm.jsx";
import IdentityForm from "./pages/seller/auth/IdentityForm/IdentityForm.jsx";

// Seller Layout & Product
import SellerLayout from "./components/SellerLayout.jsx";
import ProductList from "./pages/seller/productManagement/allProducts/ProductList.jsx";
import { ProductProvider } from "./pages/seller/productManagement/addingProducts/ProductContext.jsx";
import ProductDetail from "./pages/seller/productManagement/addingProducts/ProductDetail.jsx";
import ProductInfo from "./pages/seller/productManagement/addingProducts/ProductInfo.jsx";
import ProductSales from "./pages/seller/productManagement/addingProducts/ProductSales.jsx";
import ProductReview from "./pages/seller/productManagement/addingProducts/ProductReview.jsx";

// Common
import Navbar from "./components/Navbar.jsx";

// ---------- Product Wrapper ----------
function ProductWrapper() {
  return (
    <ProductProvider>
      <Outlet />
    </ProductProvider>
  );
}

// ---------- App Layout ----------
function AppLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

// ---------- Main App ----------
export default function App() {
  return (
    <Routes>
      {/* Layout chính có Navbar */}
      <Route element={<AppLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/product" element={<ProductPage />} />

        {/* Seller */}
        <Route path="/seller/login" element={<LoginSeller />} />
        <Route path="/seller/register" element={<RegisterSeller />} />
        <Route path="/shop-info" element={<ShopInformation />} />
        <Route path="/seller/shipping-form" element={<ShippingForm />} />
        <Route path="/seller/tax-form" element={<TaxForm />} />
        <Route path="/seller/identity-form" element={<IdentityForm />} />

        <Route element={<ProductWrapper />}>
          <Route path="/seller/products/list" element={<ProductList />} />
          <Route
            path="/seller/product/info"
            element={
              <SellerLayout>
                <ProductInfo />
              </SellerLayout>
            }
          />
          <Route
            path="/seller/product/detail"
            element={
              <SellerLayout>
                <ProductDetail />
              </SellerLayout>
            }
          />
          <Route
            path="/seller/product/sales"
            element={
              <SellerLayout>
                <ProductSales />
              </SellerLayout>
            }
          />
          <Route
            path="/seller/product/review"
            element={
              <SellerLayout>
                <ProductReview />
              </SellerLayout>
            }
          />
        </Route>
      </Route>

      {/* Auth pages nằm ngoài Layout (không hiện Navbar) */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* 404 */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
