
import React, { useState, useEffect } from 'react';
import api from '../api/axiosConfig';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

interface Item {
  id: string;
  name: string;
  price: number;
  imageUrl: string | null;
}
interface CartItem {
  id: string;
  quantity: number;
  item: Item;
}
interface Cart {
  id: string;
  items: CartItem[];
}

const CartPage: React.FC = () => {
  
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  
  const fetchCart = async () => {
    try {
      const response = await api.get('/cart');
      setCart(response.data);
    } catch (error) {
      console.error('Failed to fetch cart', error);
      toast.error('Could not load your cart.');
    } finally {
      setLoading(false);
    }
  };

  
  useEffect(() => {
    fetchCart();
  }, []);

  
  const calculateTotal = () => {
    if (!cart) return 0;
    return cart.items.reduce((total, cartItem) => {
      return total + Number(cartItem.item.price) * cartItem.quantity;
    }, 0);
  };

  
  const handleCheckout = async () => {
    try {
      await api.post('/order/checkout');

      toast.success('Order placed successfully!');
      navigate('/orders');
      
    } catch (err: any) {
      console.error('Checkout failed', err);
      toast.error(err.response?.data?.error || 'Checkout failed.');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-dark mb-4"></div>
          <p className="text-gray-800 text-lg font-semibold">Loading your cart...</p>
        </div>
      </div>
    );
  }

  // 12. Handle empty cart state
  if (!cart || cart.items.length === 0) {
    return (
      <div className="container mx-auto p-4 max-w-2xl mt-8 sm:mt-16">
        <div className="bg-white rounded-xl shadow-2xl p-8 sm:p-12 text-center border-t-4 border-orange">
          <div className="text-5xl sm:text-6xl mb-6">🛒</div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
          <p className="text-gray-600 mb-8 text-sm sm:text-base">Add some delicious items to get started!</p>
          <Link 
            to="/" 
            className="inline-block bg-gradient-to-r from-primary-light to-orange text-white px-6 sm:px-8 py-3 rounded-lg font-semibold hover:from-gray-800 hover:to-gray-900 transition-all shadow-lg"
          >
            Go Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 sm:p-6 max-w-4xl">
      <h1 className="text-2xl sm:text-3xl font-bold text-primary-dark my-4 sm:my-6">Your Cart</h1>
      
      
      <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg border-2 border-gray-200">
        {cart.items.map(cartItem => (
          <div key={cartItem.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-gray-200 py-4 last:border-b-0 gap-4">
            <div className="flex items-center w-full sm:w-auto">
              <img 
                src={cartItem.item.imageUrl || 'https://placehold.co/100x100'} 
                alt={cartItem.item.name} 
                className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg mr-4 shadow flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 truncate">{cartItem.item.name}</h3>
                <p className="text-gray-600 font-medium text-sm sm:text-base">Quantity: {cartItem.quantity}</p>
              </div>
            </div>
            <span className="text-lg sm:text-xl font-bold text-orange w-full sm:w-auto text-right">
              ${(Number(cartItem.item.price) * cartItem.quantity).toFixed(2)}
            </span>
            {/* Add remove/update buttons here if you have time */}
          </div>
        ))}
        
        
        <div className="mt-6 pt-6 border-t-2 border-gray-300 flex flex-col sm:flex-row justify-between items-center gap-4">
          <span className="text-xl sm:text-2xl font-bold text-gray-900 w-full sm:w-auto text-center sm:text-left">
            Total: <span className="text-orange">${calculateTotal().toFixed(2)}</span>
          </span>
          <button
            onClick={handleCheckout}
            className="w-full sm:w-auto bg-gradient-to-r from-primary-dark to-orange text-white px-6 sm:px-8 py-3 rounded-lg text-base sm:text-lg font-semibold hover:from-gray-800 hover:to-gray-900 transition-all shadow-lg"
          >
            💳 Pay and Proceed
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
