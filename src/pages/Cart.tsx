import { Link } from 'react-router-dom';

interface CartItem {
  id: number;
  name: string;
  price: number;
  images: string[];
  quantity: number;
}

interface CartProps {
  cart: CartItem[];
  onRemove: (id: number) => void;
  onUpdate: (id: number, q: number) => void;
}

export default function Cart({ cart, onRemove, onUpdate }: CartProps) {
  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-40 text-center">
        <h2 className="text-5xl font-black tracking-tighter uppercase mb-6 text-black">Your bag is empty</h2>
        <Link to="/shop" className="inline-block border-2 border-black px-8 py-3 font-black text-xs tracking-widest hover:bg-black hover:text-white transition">
          RETURN TO SHOP
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-20 font-sans text-black">
      <h1 className="text-6xl font-black tracking-tighter uppercase mb-12 text-black">Your Bag</h1>

      <div className="flex flex-col lg:flex-row gap-16">
        <div className="flex-grow">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b-2 border-black">
                <th className="pb-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Product</th>
                <th className="pb-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Quantity</th>
                <th className="pb-4 text-[10px] font-black uppercase tracking-widest text-gray-400 text-right">Total</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item.id} className="border-b border-gray-100 group">
                  <td className="py-8">
                    <div className="flex items-center gap-6">
                      <img src={item.images[0]} alt={item.name} className="w-24 h-24 object-cover border border-black" />
                      <div>
                        <h3 className="font-black uppercase tracking-tight text-lg">{item.name}</h3>
                        <p className="text-gray-500 text-sm mb-2">€{item.price.toFixed(2)}</p>
                        <button 
                          onClick={() => onRemove(item.id)}
                          className="text-[10px] font-black uppercase tracking-[0.2em] text-red-600 hover:text-red-800 flex items-center gap-1 transition-colors underline"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </td>
                  <td className="py-8">
                    <div className="flex items-center border-2 border-black w-max h-10 bg-white">
                      <button onClick={() => onUpdate(item.id, item.quantity - 1)} className="px-3 font-bold hover:bg-gray-100">-</button>
                      <span className="w-8 text-center font-bold text-sm">{item.quantity}</span>
                      <button onClick={() => onUpdate(item.id, item.quantity + 1)} className="px-3 font-bold hover:bg-gray-100">+</button>
                    </div>
                  </td>
                  <td className="py-8 text-right font-bold text-lg text-black">
                    €{(item.price * item.quantity).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="lg:w-96">
          <div className="bg-gray-50 p-8 border-2 border-black sticky top-32">
            <h2 className="text-xl font-black uppercase tracking-tight mb-6 text-black">Summary</h2>
            <div className="space-y-4 border-b border-black/10 pb-6">
              <div className="flex justify-between text-sm">
                <span className="font-medium text-gray-500 uppercase tracking-widest text-[10px]">Subtotal</span>
                <span className="font-bold text-black">€{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-medium text-gray-500 uppercase tracking-widest text-[10px]">Shipping</span>
                <span className="font-bold italic text-[10px] uppercase text-black">Calculated at checkout</span>
              </div>
            </div>
            <div className="flex justify-between items-end mt-6 mb-8">
              <span className="text-xs font-black uppercase tracking-widest text-black">Total</span>
              <span className="text-3xl font-black text-black">€{subtotal.toFixed(2)}</span>
            </div>
            {/* UPDATED: Button is now a Link to Checkout Gateway */}
            <Link 
              to="/checkout-gateway" 
              className="w-full bg-black text-white py-4 font-black tracking-[0.2em] text-[10px] hover:bg-white hover:text-black border-2 border-black transition-all uppercase block text-center"
            >
              PROCEED TO CHECKOUT
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}