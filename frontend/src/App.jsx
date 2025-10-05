import { Routes, Route, Outlet, useParams } from "react-router-dom";
import Login from "./pages/user/auth/Login.jsx";
import Register from "./pages/user/auth/Register.jsx";
import ProductPage from "./pages/product/product.jsx";
import ShopInformation from "./pages/seller/auth/shopInformationForm/shopInformation.jsx";
import ShippingForm from "./pages/seller/auth/ShippingForm/ShippingForm.jsx";
import TaxForm from "./pages/seller/auth/TaxForm/TaxForm.jsx";
import IdentityForm from "./pages/seller/auth/IdentityForm/IdentityForm.jsx";
import { ProductProvider } from "./pages/seller/productManagement/addingProducts/ProductContext.jsx";
import { ProductProviderForUpdate } from "./pages/seller/productManagement/updateProduct/ProductContext.jsx";
import ProductInfo from "./pages/seller/productManagement/addingProducts/ProductInfo.jsx";
import ProductDetail from "./pages/seller/productManagement/addingProducts/ProductDetail.jsx";
import ProductSales from "./pages/seller/productManagement/addingProducts/ProductSales.jsx";
import ProductReview from "./pages/seller/productManagement/addingProducts/ProductReview.jsx";
import SellerLayout from "./components/SellerLayout.jsx";
import LoginSeller from "./pages/seller/auth/login/login.auth.jsx";
import ProductList from "./pages/seller/productManagement/allProducts/ProductList.jsx";
import UpdateProductInfo from "./pages/seller/productManagement/updateProduct/UpdateProductInfo.jsx";
import UpdateProductDetail from "./pages/seller/productManagement/updateProduct/UpdateProductDetail.jsx";
import UpdateProductReview from "./pages/seller/productManagement/updateProduct/UpdateProductReview.jsx";
import UpdateProductSales from "./pages/seller/productManagement/updateProduct/UpdateProductSales.jsx";
// ------------------- Wrappers -------------------

// Wrapper cho adding product
function ProductRoutesWrapper() {
  return (
    <ProductProvider>
      <SellerLayout>
        <Outlet />
      </SellerLayout>
    </ProductProvider>
  );
}

// Wrapper cho update product
function ProductRoutesWrapperForUpdate() {
  return (
    <ProductProviderForUpdate>
      <SellerLayout>
        <Outlet />
      </SellerLayout>
    </ProductProviderForUpdate>
  );
}


// ------------------- App Component -------------------
function App() {
  return (
    <Routes>
      {/* Auth */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/seller/login" element={<LoginSeller />} />

      {/* User Product Page */}
      <Route path="/product" element={<ProductPage />} />

      {/* Seller Registration Forms */}
      <Route path="/shop-info" element={<ShopInformation />} />
      <Route path="/seller/shipping-form" element={<ShippingForm />} />
      <Route path="/seller/tax-form" element={<TaxForm />} />
      <Route path="/seller/identity-form" element={<IdentityForm />} />

      {/* Seller Product List */}
      <Route
        path="/seller/products/list"
        element={
          <SellerLayout>
            <ProductList />
          </SellerLayout>
        }
      />

      {/* ----------------- Adding Product ----------------- */}
      <Route element={<ProductRoutesWrapper />}>
        <Route path="/seller/product/info" element={<ProductInfo />} />
        <Route path="/seller/product/detail" element={<ProductDetail />} />
        <Route path="/seller/product/sales" element={<ProductSales />} />
        <Route path="/seller/product/review" element={<ProductReview />} />
      </Route>

      {/* ----------------- Updating Product ----------------- */}
      <Route element={<ProductRoutesWrapperForUpdate />}>
        <Route path="/seller/product/update/info/:id" element={<UpdateProductInfo />} />
        <Route path="/seller/product/update/detail/:id" element={<UpdateProductDetail />} />
        <Route path="/seller/product/update/sales/:id" element={<UpdateProductSales />} />
        <Route path="/seller/product/update/review/:id" element={<UpdateProductReview />} />
      </Route>
    </Routes>
  );
}

export default App;
