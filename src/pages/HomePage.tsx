
import React, { useState, useEffect } from 'react';
import api from '../api/axiosConfig';
import ItemCard from '../components/ItemCard';
import { toast } from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';


interface Item {
  id: string;
  name: string;
  description: string | null;
  price: number;
  imageUrl: string | null;
  stock: number;
  categoryId: string;
  category: { id: string; name: string; };
}

// 1. Define a Category type
interface Category {
  id: string;
  name: string;
}

const HomePage: React.FC = () => {
  // Get user from auth context
  const { user } = useAuth();
  
  // 2. Create state for items, categories, loading, and filter
  const [items, setItems] = useState<Item[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [loading, setLoading] = useState(true);

  // 3. Create a useEffect to fetch data on mount (only if user is logged in)
  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }
    
    const fetchData = async () => {
      setLoading(true);
      try {
        // 4. Fetch categories and items in parallel
        const [categoriesRes, itemsRes] = await Promise.all([
          api.get('/categories'),
          api.get('/items') // Fetches all items initially
        ]);
        
        setCategories(categoriesRes.data);
        setItems(itemsRes.data);
        
      } catch (error) {
        console.error('Failed to fetch data', error);
        toast.error('Could not load data.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [user]);

  // 5. Create a function to handle category clicks
  const handleCategoryChange = (categoryName: string) => {
    setSelectedCategory(categoryName);
  };

  // 6. Create the logic to filter items
  const filteredItems = selectedCategory === 'All'
    ? items
    : items.filter(item => item.category.name === selectedCategory);

  // 7. Create the JSX
  return (
    <>
      {/* Show split landing page if user is not authenticated */}
      {!user ? (
        <div className="min-h-screen flex flex-col lg:flex-row">
          {/* Left Half - App Information */}
          <div className="lg:w-1/2 bg-gradient-to-br from-primary-dark via-orange to-orange-light flex items-center justify-center p-8 sm:p-12 lg:p-16">
            <div className="max-w-xl text-white">
              <div className="text-6xl sm:text-7xl lg:text-8xl mb-8 animate-bounce">🍔</div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 drop-shadow-lg">
                Welcome to OrderFood
              </h1>
              <p className="text-lg sm:text-xl lg:text-2xl mb-8 text-white/90 leading-relaxed">
                Delicious food delivered right to your doorstep! 
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <span className="text-3xl">✨</span>
                  <p className="text-lg">Fresh ingredients & quality food</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-3xl">🚀</span>
                  <p className="text-lg">Fast & reliable delivery</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-3xl">💯</span>
                  <p className="text-lg">100% satisfaction guaranteed</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Half - Login/Register Box */}
          <div className="lg:w-1/2 bg-gradient-to-br from-orange-50 via-white to-orange-50 flex items-center justify-center p-8 sm:p-12 lg:p-16">
            <div className="w-full max-w-md">
              <div className="bg-white rounded-2xl shadow-2xl p-8 sm:p-10 border-t-4 border-orange">
                <div className="text-center mb-8">
                  <div className="text-5xl sm:text-6xl mb-4">🍰🥗</div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-primary-dark mb-2">
                    Get Started
                  </h2>
                  <p className="text-gray-600 text-sm sm:text-base">
                    Login or create an account to start ordering
                  </p>
                </div>
                
                <div className="space-y-4">
                  <Link
                    to="/login"
                    className="w-full block text-center bg-gradient-to-r from-primary-light to-orange text-white px-8 py-4 rounded-lg font-semibold hover:from-gray-800 hover:to-gray-900 transition-all shadow-lg text-lg"
                  >
                    Login to Your Account
                  </Link>
                  
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-4 bg-white text-gray-500">or</span>
                    </div>
                  </div>
                  
                  <Link
                    to="/register"
                    className="w-full block text-center bg-white text-primary-dark border-2 border-orange px-8 py-4 rounded-lg font-semibold hover:bg-orange hover:text-white hover:border-orange transition-all shadow text-lg"
                  >
                    Create New Account
                  </Link>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-200 text-center">
                  <p className="text-gray-600 text-sm">
                    🎉 Special offers for new members!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="container mx-auto p-4 sm:p-6 lg:p-8 min-h-screen">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center my-6 sm:my-8 text-primary-dark">Our Menu</h1>
          
          {/* 8. Category Filter Buttons */}
          <div className="flex justify-center flex-wrap gap-2 sm:gap-3 mb-6 sm:mb-8 px-2">
            <button
              onClick={() => handleCategoryChange('All')}
              className={`px-4 sm:px-6 py-2 rounded-full font-semibold transition-all text-sm sm:text-base ${
                selectedCategory === 'All' 
                  ? 'bg-gradient-to-r from-primary-dark to-orange text-black shadow-lg transform scale-105' 
                  : 'bg-white text-primary-dark border-2 border-orange hover:bg-gray-800 hover:text-white hover:border-gray-800'
              }`}
            >
              All
            </button>
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => handleCategoryChange(category.name)}
                className={`px-4 sm:px-6 py-2 rounded-full font-semibold transition-all text-sm sm:text-base ${
                  selectedCategory === category.name 
                    ? 'bg-gradient-to-r from-primary-dark to-orange text-black shadow-lg transform scale-105' 
                    : 'bg-white text-primary-dark border-2 border-orange hover:bg-gray-800 hover:text-white hover:border-gray-800'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
          
          {/* 9. Item Grid */}
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-dark"></div>
              <p className="text-primary-dark mt-4 text-base sm:text-lg font-semibold">Loading delicious items...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {filteredItems.map(item => (
                <ItemCard key={item.id} item={item} />
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default HomePage;
