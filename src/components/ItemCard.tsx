import React from 'react';
import { toast } from 'react-hot-toast';
import api from '../api/axiosConfig';

interface Item {
  id: string;
  name: string;
  description: string | null;
  price: number;
  imageUrl: string | null;
  stock: number;
  categoryId: string;
  category: {
    id: string;
    name: string;
  };
}

interface ItemCardProps {
  item: Item;
}

const ItemCard: React.FC<ItemCardProps> = ({ item }) => {
  const handleAddToCart = async () => {
    try {
      await api.post('/cart', {
        itemId: item.id,
        quantity: 1,
      });
      toast.success(`${item.name} added to cart!`);
    } catch (err: any) {
      toast.error(err.response?.data?.error || 'Please log in to add items.');
      console.error(err);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all hover:shadow-2xl hover:scale-105 border-2 border-transparent hover:border-orange">
      <img
        src={item.imageUrl || 'https://placehold.co/600x400'}
        alt={item.name}
        className="w-full h-48 object-cover"
      />
      
      <div className="p-4">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{item.name}</h3>
        <p className="text-sm text-gray-700 mb-3 min-h-[40px]">{item.description}</p>
        
        <div className="flex justify-between items-center mb-4">
          <span className="text-2xl font-bold text-orange">
            ${Number(item.price).toFixed(2)}
          </span>
          <span className={`text-sm font-semibold ${item.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
            {item.stock > 0 ? `${item.stock} in stock` : 'Out of Stock'}
          </span>
        </div>
        
        <button
          onClick={handleAddToCart}
          disabled={item.stock === 0}
          className={`w-full py-3 rounded-lg font-semibold transition-all ${
            item.stock > 0
              ? 'bg-gradient-to-r from-primary-dark to-orange text-black hover:from-gray-800 hover:to-light-500 shadow-md hover:shadow-lg'
              : 'bg-gray-400 text-gray-200 cursor-not-allowed'
          }`}
        >
          {item.stock > 0 ? '🛒 Add to Cart' : '❌ Out of Stock'}
        </button>
      </div>
    </div>
  );
};

export default ItemCard;
