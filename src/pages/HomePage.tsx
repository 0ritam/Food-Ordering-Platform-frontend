
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
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 min-h-screen">
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center my-6 sm:my-8 text-primary-dark">Our Menu</h1>
      
      {/* Show login prompt if user is not authenticated */}
      {!user ? (
        <div className="max-w-2xl mx-auto mt-8 sm:mt-16 text-center px-4">
          <div className="bg-white rounded-xl shadow-2xl p-8 sm:p-12 border-t-4 border-orange">
            <div className="text-5xl sm:text-6xl mb-6">🍔🍕🍰</div>
            <h2 className="text-2xl sm:text-3xl font-bold text-primary-dark mb-4">
              Welcome to FoodOrder!
            </h2>
            <p className="text-gray-700 text-base sm:text-lg mb-8">
              Please log in or register to view our delicious menu and start ordering.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/login"
                className="bg-gradient-to-r from-primary-dark to-orange text-white px-8 py-3 rounded-lg font-semibold hover:from-gray-800 hover:to-gray-900 transition-all shadow-lg"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-white text-primary-dark border-2 border-orange px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 hover:text-white hover:border-gray-800 transition-all"
              >
                Register
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <>
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
                    ? 'bg-gradient-to-r from-primary-light to-orange text-white shadow-lg transform scale-105' 
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
        </>
      )}
    </div>
  );
};

export default HomePage;
