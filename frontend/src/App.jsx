import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/user/auth/Login.jsx";
import Register from "./pages/user/auth/Register.jsx";
import ProductPage from "./pages/product/product.jsx";
import ShopInformation from "./pages/seller/auth/shopIni/shopInformation.jsx";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/product" element={<ProductPage />} />
      <Route path="/shop-info" element={<ShopInformation />} />

    </Routes>
  );
}

export default App;
