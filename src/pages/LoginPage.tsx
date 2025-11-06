import React, { useState, type FormEvent } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await login(email, password);
      navigate('/');
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto max-w-md mt-16 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-2xl border-t-4 border-orange"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-primary-dark">
          🍔 Welcome Back!
        </h2>
        
        <div className="mb-5">
          <label className="block text-primary-dark font-semibold mb-2" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-orange transition-colors"
            placeholder="Enter your email"
            required
          />
        </div>
        
        <div className="mb-6">
          <label className="block text-primary-dark font-semibold mb-2" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-orange transition-colors"
            placeholder="Enter your password"
            required
          />
        </div>
        
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-primary-light to-orange text-white py-3 rounded-lg font-semibold hover:from-gray-800 hover:to-gray-900 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
        
        <p className="text-center mt-6 text-gray-600">
          Don't have an account?{' '}
          <Link to="/register" className="text-orange font-semibold hover:text-gray-800 transition-colors">
            Register here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
