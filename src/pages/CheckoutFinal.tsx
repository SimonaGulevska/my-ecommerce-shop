import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

interface CheckoutFinalProps {
  cart: any[];
  clearCart: () => void;
}

export default function CheckoutFinal({ cart, clearCart }: CheckoutFinalProps) {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const [shippingData, setShippingData] = useState({
    fullName: '',
    phone: '',
    address: '',
    city: 'Bitola',
    country: 'North Macedonia'
  });

  // Fetch current authenticated user
  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUser(user);
        // Try to pre-fill from profile
        const { data: profile } = await supabase.from('profiles').select('full_name').eq('id', user.id).single();
        if (profile) setShippingData(prev => ({ ...prev, fullName: profile.full_name || '', email: user.email }));
      }
    };
    getUser();
  }, []);

  const handleConfirmOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const shippingCost = subtotal > 50 ? 0 : 5;
    const finalTotal = subtotal + shippingCost;
    
    // Create professional order number: DV-random
    const orderNumber = `DV-${Math.floor(100000 + Math.random() * 900000)}`;

    const orderPayload = {
      order_number: orderNumber,
      user_id: user?.id || null, // Null for guests
      customer_name: shippingData.fullName,
      email: user?.email || "GUEST_ORDER", 
      address: `${shippingData.address}, ${shippingData.city}, ${shippingData.country}`,
      total_amount: finalTotal,
      items: cart, // Stores as JSONB
      status: 'pending'
    };

    const { error } = await supabase
      .from('orders')
      .insert([orderPayload]);

    if (error) {
      alert("Error placing order: " + error.message);
      setLoading(false);
      return;
    }

    clearCart();
    alert(`ORDER PLACED! Order Number: ${orderNumber}`);
    
    if (user) {
      navigate('/dashboard');
    } else {
      navigate('/');
    }
  };

  const inputStyles = "w-full border-2 border-black p-4 font-bold outline-none focus:bg-gray-50 uppercase text-xs tracking-widest transition-colors";

  return (
    <div className="max-w-4xl mx-auto px-4 py-20 font-sans text-black">
      <div className="flex justify-between items-end mb-12">
        <h1 className="text-5xl font-black tracking-tighter uppercase">Finalize Order</h1>
        {user && (
          <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">
            Member: {user.email}
          </span>
        )}
      </div>
      
      <form onSubmit={handleConfirmOrder} className="grid grid-cols-1 md:grid-cols-2 gap-16">
        <div className="space-y-6">
          <h2 className="text-xs font-black uppercase tracking-[0.3em] border-b-2 border-black pb-2 mb-8">Shipping Address</h2>
          <div className="space-y-4">
            <input required type="text" placeholder="Full Name" value={shippingData.fullName} className={inputStyles} onChange={(e) => setShippingData({...shippingData, fullName: e.target.value})} />
            <input required type="tel" placeholder="Phone Number" value={shippingData.phone} className={inputStyles} onChange={(e) => setShippingData({...shippingData, phone: e.target.value})} />
            <input required type="text" placeholder="Street Address" value={shippingData.address} className={inputStyles} onChange={(e) => setShippingData({...shippingData, address: e.target.value})} />
            <div className="grid grid-cols-2 gap-4">
              <input required type="text" placeholder="City" value={shippingData.city} className={inputStyles} onChange={(e) => setShippingData({...shippingData, city: e.target.value})} />
              <input required type="text" placeholder="Country" value={shippingData.country} className={inputStyles} onChange={(e) => setShippingData({...shippingData, country: e.target.value})} />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-xs font-black uppercase tracking-[0.3em] border-b-2 border-black pb-2 mb-8 text-black">Payment Method</h2>
          <div className="space-y-4">
            <label className="flex items-center gap-4 border-2 border-black p-6 cursor-pointer hover:bg-gray-50 transition-all">
              <input type="radio" name="payment" checked readOnly className="accent-black w-4 h-4" />
              <div className="flex flex-col text-black">
                <span className="font-black text-xs tracking-widest uppercase">Cash On Delivery</span>
                <span className="text-[10px] text-gray-500 font-bold uppercase mt-1">Pay at your door</span>
              </div>
            </label>
            <div className="flex items-center gap-4 border-2 border-gray-100 p-6 opacity-30 grayscale cursor-not-allowed bg-gray-50">
              <input type="radio" name="payment" disabled className="w-4 h-4" />
              <div className="flex flex-col">
                <span className="font-black text-xs tracking-widest uppercase">Online Payment (Card)</span>
                <span className="text-[10px] text-gray-400 font-bold uppercase mt-1">Coming Soon</span>
              </div>
            </div>
          </div>
          <div className="pt-10">
            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-black text-white py-5 font-black tracking-[0.3em] text-xs hover:bg-white hover:text-black border-2 border-black transition-all uppercase shadow-[10px_10px_0px_0px_rgba(0,0,0,0.1)] disabled:bg-gray-500"
            >
              {loading ? "PROCESSING..." : "Confirm Order"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}