import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CheckoutFinal() {
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem('district_current_user') || 'null');

  const [shippingData, setShippingData] = useState({
    fullName: currentUser?.fullName || '',
    phone: currentUser?.phone || '',
    address: '',
    city: 'Bitola',
    country: 'North Macedonia'
  });

  const handleConfirmOrder = (e: React.FormEvent) => {
    e.preventDefault();
    
    const cartItems = JSON.parse(localStorage.getItem('district_cart') || '[]');
    
    const orderData = {
      id: Math.floor(100000 + Math.random() * 900000), // Random 6-digit ID
      ...shippingData,
      items: cartItems,
      total: cartItems.reduce((acc: number, item: any) => acc + (item.price * item.quantity), 0),
      date: new Date().toISOString(),
      user: currentUser ? currentUser.email : 'Guest'
    };

    if (currentUser) {
      const allUsers = JSON.parse(localStorage.getItem('district_users') || '[]');
      const updatedUsers = allUsers.map((u: any) => {
        if (u.email === currentUser.email) {
          return { ...u, history: [...(u.history || []), orderData] };
        }
        return u;
      });
      localStorage.setItem('district_users', JSON.stringify(updatedUsers));
      localStorage.setItem('district_current_user', JSON.stringify({
        ...currentUser,
        history: [...(currentUser.history || []), orderData]
      }));
    }

    localStorage.removeItem('district_cart');
    
    // NEW: Success logic with choice to visit Dashboard
    const viewHistory = window.confirm('ORDER PLACED SUCCESSFULLY! Would you like to view your purchase history?');
    
    if (viewHistory && currentUser) {
      navigate('/dashboard');
    } else {
      navigate('/');
    }
    window.location.reload(); 
  };

  const inputStyles = "w-full border-2 border-black p-4 font-bold outline-none focus:bg-gray-50 uppercase text-xs tracking-widest transition-colors";

  return (
    <div className="max-w-4xl mx-auto px-4 py-20 font-sans text-black">
      <div className="flex justify-between items-end mb-12">
        <h1 className="text-5xl font-black tracking-tighter uppercase">Finalize Order</h1>
        {currentUser && (
          <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">
            Authenticated: {currentUser.email}
          </span>
        )}
      </div>
      
      <form onSubmit={handleConfirmOrder} className="grid grid-cols-1 md:grid-cols-2 gap-16">
        <div className="space-y-6">
          <h2 className="text-xs font-black uppercase tracking-[0.3em] border-b-2 border-black pb-2 mb-8">Shipping Address</h2>
          <div className="space-y-4">
            <div className="space-y-1">
              <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest ml-1">Full Name (Auto-filled)</label>
              <input required type="text" value={shippingData.fullName} className={inputStyles} onChange={(e) => setShippingData({...shippingData, fullName: e.target.value})} />
            </div>
            <div className="space-y-1">
              <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest ml-1">Contact Number (Auto-filled)</label>
              <input required type="tel" value={shippingData.phone} className={inputStyles} onChange={(e) => setShippingData({...shippingData, phone: e.target.value})} />
            </div>
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
            <button type="submit" className="w-full bg-black text-white py-5 font-black tracking-[0.3em] text-xs hover:bg-white hover:text-black border-2 border-black transition-all uppercase shadow-[10px_10px_0px_0px_rgba(0,0,0,0.1)]">
              Confirm Order
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}