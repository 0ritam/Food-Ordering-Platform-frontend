import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Navbar from './components/NavBar';
import ProtectedRoute from './components/ProtectedRoute';
import CartPage from './pages/CartPage';
import OrderHistoryPage from './pages/OrderHistoryPage';
import './App.css'

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/cart" element={<CartPage />} />
          <Route path="/orders" element={<OrderHistoryPage />} />
        </Route>
        <Route path="*" element={<h1 className="text-center mt-10 text-2xl font-bold text-gray-800">404 - Page Not Found</h1>} />
      </Routes>
    </div>
  )
}

export default App
