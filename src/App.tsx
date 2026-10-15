/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './AppContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import Ranking from './pages/Ranking';
import Recommended from './pages/Recommended';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderComplete from './pages/OrderComplete';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import OrderHistory from './pages/OrderHistory';
import AdminDashboard from './pages/admin/AdminDashboard';

export default function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="ranking" element={<Ranking />} />
            <Route path="recommended" element={<Recommended />} />
            <Route path="product/:id" element={<ProductDetail />} />
            <Route path="cart" element={<Cart />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="order-complete" element={<OrderComplete />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
            <Route path="orders" element={<OrderHistory />} />
            <Route path="admin/*" element={<AdminDashboard />} />
          </Route>
        </Routes>
      </Router>
    </AppProvider>
  );
}
