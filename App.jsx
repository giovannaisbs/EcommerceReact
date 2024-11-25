import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Products from './pages/Products';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import AdminDashboard from './pages/AdminDashboard';
import LoginForm from './components/LoginForm';
import Checkout from './pages/Checkout';
import OrderHistory from './pages/OrderHistory';
import Cart from './pages/Cart';
import AdminOrderDashboard from './pages/AdminOrderDashboard';
import AdminAddProduct from './pages/AdminAddProduct';
import AdminEditProduct from './pages/AdminEditProduct';
import AdminProductList from './pages/AdminProductList';
import ProductList from './pages/ProductList';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/productList" element={<ProductList />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/orders" element={<OrderHistory />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/admin/orders" element={<AdminOrderDashboard />} />
        <Route path="/admin/products/add" element={<AdminAddProduct />} />
        <Route path="/admin/products/edit/:id" element={<AdminEditProduct />} /> 
        <Route path="/admin/products" element={<AdminProductList />} /> 
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/cartPage" element={<CartPage />} />
        <Route path="/productsPage" element={<Products />} />
        <Route path="/checkoutPage" element={<CheckoutPage />} />
      </Routes>
    </Router>
  );
}

export default App;
