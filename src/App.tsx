import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { supabase } from './lib/supabase'; // 1. Added Supabase Import
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Shop from './pages/Shop';
import About from './pages/About';
import Contact from './pages/Contact';
import Admin from './pages/Admin';
import Cart from './pages/Cart';
import CheckoutGateway from './pages/CheckoutGateway';
import CheckoutFinal from './pages/CheckoutFinal';
import Dashboard from './pages/Dashboard';

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  images: string[];
  description?: string;
  sku?: string;
}

interface CartItem extends Product {
  quantity: number;
}

function App() {
  // 2. Modified: products now start empty and fetch from Cloud
  const [products, setProducts] = useState<Product[]>([]);

  const [cart, setCart] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem('district_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // 3. New: Fetch products from Supabase on Load
  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('id', { ascending: false });

      if (error) {
        console.error('Error fetching products:', error.message);
      } else if (data) {
        setProducts(data);
      }
    };

    fetchProducts();
  }, []);

  // Keep: Sync cart to localStorage (We'll move Users/Orders later)
  useEffect(() => {
    localStorage.setItem('district_cart', JSON.stringify(cart));
  }, [cart]);

  const addProduct = (newProduct: Product) => {
    // This UI update remains the same, but Admin.tsx will now handle the DB insert
    setProducts([newProduct, ...products]);
  };

  const addToCart = (product: Product, amount: number) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id 
            ? { ...item, quantity: item.quantity + amount } 
            : item
        );
      }
      return [...prevCart, { ...product, quantity: amount }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCart(prev => prev.map(item => 
      item.id === productId ? { ...item, quantity: newQuantity } : item
    ));
  };

  // Helper to clear cart after successful order
  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('district_cart');
  };

  const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Router>
      <div className="min-h-screen bg-white flex flex-col font-sans selection:bg-black selection:text-white">
        <Navbar cartCount={totalCartItems} />
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/shop" element={<Shop products={products} onAddToCart={addToCart} />} />
            <Route path="/cart" element={<Cart cart={cart} onRemove={removeFromCart} onUpdate={updateQuantity} />} />
            <Route path="/checkout-gateway" element={<CheckoutGateway />} />
            
            {/* UPDATED: Passing cart and clearCart to CheckoutFinal */}
            <Route 
              path="/checkout-final" 
              element={<CheckoutFinal cart={cart} clearCart={clearCart} />} 
            />
            
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/admin" element={<Admin onAddProduct={addProduct} />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;