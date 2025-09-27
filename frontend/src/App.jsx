import { Routes, Route, Outlet } from "react-router-dom";
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
import SellerLayout from "./components/SellerLayout.jsx";
import LoginSeller from "./pages/seller/auth/login/login.auth.jsx";
import registerSeller from "./pages/seller/auth/register/register.auth.jsx";

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
  );
}

export default App;
