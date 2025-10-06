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
<<<<<<< HEAD
=======
import SellerLayout from "./components/SellerLayout.jsx";
import LoginSeller from "./pages/seller/auth/login/login.auth.jsx";
import ProductList from "./pages/seller/productManagement/allProducts/ProductList.jsx";
import registerSeller from "./pages/seller/auth/register/register.auth.jsx";
>>>>>>> a380cd80723a24bd5d7207b7c85ca5cd9f7677c3

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
<<<<<<< HEAD
    <>
      <Navbar />
      <Outlet />
    </>
=======
    <Routes>
      {/* Auth */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/seller/login" element={<LoginSeller />} />
      <Route path="/seller/register" element={<registerSeller />} />

      {/* User Product Page */}
      <Route path="/product" element={<ProductPage />} />

      {/* Seller */}
      <Route
        path="/shop-info"
        element={
          <ShopInformation />
        }
      />
      <Route
        path="/seller/shipping-form"
        element={
          <ShippingForm />
        }
      />
      <Route
        path="/seller/tax-form"
        element={
          <TaxForm />
        }
      />
      <Route
        path="/seller/identity-form"
        element={
          <IdentityForm />
        }
      />
      <Route
        path="/seller/products/list"
        element={
          <ProductList />
        }
      />

      {/* Seller Product Management (multi-step form) */}
      <Route element={<ProductWrapper />}>
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
    </Routes>
>>>>>>> a380cd80723a24bd5d7207b7c85ca5cd9f7677c3
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
