import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
  const [products, setProducts] = useState<Product[]>(() => {
    const savedProducts = localStorage.getItem('district_products');
    return savedProducts ? JSON.parse(savedProducts) : [];
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem('district_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('district_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('district_cart', JSON.stringify(cart));
  }, [cart]);

  const addProduct = (newProduct: Product) => {
    setProducts([...products, newProduct]);
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
            <Route path="/checkout-final" element={<CheckoutFinal />} />
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