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
import SellerLayout from "./components/SellerLayout.jsx";

function App() {
  return (
    <Routes>
      {/* Auth */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* User Product Page */}
      <Route path="/product" element={<ProductPage />} />

      {/* Seller */}
      <Route
        path="/shop-info"
        element={
          <SellerLayout>
            <ShopInformation />
          </SellerLayout>
        }
      />
      <Route
        path="/shipping-form"
        element={
          <SellerLayout>
            <ShippingForm />
          </SellerLayout>
        }
      />
      <Route
        path="/tax-form"
        element={
          <SellerLayout>
            <TaxForm />
          </SellerLayout>
        }
      />
      <Route
        path="/identity-form"
        element={
          <SellerLayout>
            <IdentityForm />
          </SellerLayout>
        }
      />

      {/* Seller Product Management */}
      <Route
        path="/product/info"
        element={
          <SellerLayout>
            <ProductProvider>
              <ProductInfo />
            </ProductProvider>
          </SellerLayout>
        }
      />
      <Route
        path="/product/detail"
        element={
          <SellerLayout>
            <ProductProvider>
              <ProductDetail />
            </ProductProvider>
          </SellerLayout>
        }
      />
      <Route
        path="/product/sales"
        element={
          <SellerLayout>
            <ProductProvider>
              <ProductSales />
            </ProductProvider>
          </SellerLayout>
        }
      />
      <Route
        path="/product/review"
        element={
          <SellerLayout>
            <ProductProvider>
              <ProductReview />
            </ProductProvider>
          </SellerLayout>
        }
      />
    </Routes>
  );
}

export default App;
