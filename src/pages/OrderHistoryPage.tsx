import React, { useState, useEffect } from 'react';
import api from '../api/axiosConfig';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';

interface Item {
  id: string;
  name: string;
  price: number;
  imageUrl: string | null;
}

interface OrderItem {
  id: string;
  quantity: number;
  priceAtPurchase: number;
  item: Item;
}

interface Order {
  id: string;
  totalAmount: number;
  status: string;
  createdAt: string;
  items: OrderItem[];
}

const OrderHistoryPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await api.get('/order/history');
        setOrders(response.data);
      } catch (error) {
        console.error('Failed to fetch order history', error);
        toast.error('Could not load order history.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'COMPLETED':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'CANCELLED':
        return 'bg-red-100 text-red-800 border-red-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-dark mb-4"></div>
          <p className="text-gray-800 text-lg font-semibold">Loading your orders...</p>
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="container mx-auto p-4 max-w-2xl mt-8 sm:mt-16">
        <div className="bg-white rounded-xl shadow-2xl p-8 sm:p-12 text-center border-t-4 border-orange">
          <div className="text-5xl sm:text-6xl mb-6">📦</div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">No orders yet</h2>
          <p className="text-gray-600 mb-8 text-sm sm:text-base">Start ordering delicious food today!</p>
          <Link 
            to="/" 
            className="inline-block bg-gradient-to-r from-primary-dark to-orange text-white px-6 sm:px-8 py-3 rounded-lg font-semibold hover:from-gray-800 hover:to-gray-900 transition-all shadow-lg"
          >
            Browse Menu
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 sm:p-6 max-w-5xl">
      <h1 className="text-2xl sm:text-3xl font-bold text-primary-dark my-4 sm:my-6">📦 Order History</h1>
      
      <div className="space-y-4 sm:space-y-6">
        {orders.map((order) => (
          <div 
            key={order.id} 
            className="bg-white rounded-xl shadow-lg border-2 border-gray-200 overflow-hidden"
          >
            {/* Order Header */}
            <div className="bg-gradient-to-r from-primary-light to-orange p-4 text-white">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <div>
                  <p className="text-xs sm:text-sm opacity-90">Order ID: {order.id.slice(0, 8)}</p>
                  <p className="text-base sm:text-lg font-semibold">{formatDate(order.createdAt)}</p>
                </div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 w-full sm:w-auto">
                  <span className={`inline-block px-3 sm:px-4 py-1 rounded-full text-xs sm:text-sm font-semibold border-2 ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                  <p className="text-xl sm:text-2xl font-bold">${Number(order.totalAmount).toFixed(2)}</p>
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div className="p-4 sm:p-6">
              <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-3 sm:mb-4">Items:</h3>
              <div className="space-y-3">
                {order.items.map((orderItem) => (
                  <div 
                    key={orderItem.id} 
                    className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-gray-50 p-3 sm:p-4 rounded-lg border border-gray-200 gap-3"
                  >
                    <div className="flex items-center w-full sm:w-auto">
                      <img 
                        src={orderItem.item.imageUrl || 'https://placehold.co/80x80'} 
                        alt={orderItem.item.name} 
                        className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded-lg mr-3 sm:mr-4 shadow flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-gray-900 text-sm sm:text-base truncate">{orderItem.item.name}</h4>
                        <p className="text-gray-600 text-xs sm:text-sm">
                          ${Number(orderItem.priceAtPurchase).toFixed(2)} × {orderItem.quantity}
                        </p>
                      </div>
                    </div>
                    <span className="text-base sm:text-lg font-bold text-orange w-full sm:w-auto text-right">
                      ${(Number(orderItem.priceAtPurchase) * orderItem.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 sm:mt-8 text-center">
        <Link 
          to="/" 
          className="inline-block bg-gradient-to-r from-primary-dark to-orange text-white px-6 sm:px-8 py-3 rounded-lg font-semibold hover:from-gray-800 hover:to-gray-900 transition-all shadow-lg"
        >
          ← Back to Menu
        </Link>
      </div>
    </div>
  );
};

export default OrderHistoryPage;
