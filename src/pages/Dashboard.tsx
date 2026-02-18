import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem('district_current_user') || 'null');

  if (!currentUser) {
    navigate('/checkout-gateway');
    return null;
  }

  const history = currentUser.history || [];

  // Calculate total collection value
  const collectionValue = history.reduce((sum: number, order: any) => sum + order.total, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 py-20 font-sans text-black">
      <div className="border-b-4 border-black pb-8 mb-16 flex flex-col md:flex-row justify-between items-end gap-6">
        <div>
          <h1 className="text-6xl font-black tracking-tighter uppercase">Member Profile</h1>
          <p className="mt-4 font-bold text-gray-500 uppercase tracking-widest text-xs">
            Welcome back, {currentUser.fullName} — {currentUser.email}
          </p>
        </div>
        
        {/* Collection Stats */}
        <div className="bg-black text-white p-6 text-right min-w-[200px]">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] mb-1">Total Collection Value</p>
          <p className="text-4xl font-black italic">€{collectionValue.toFixed(2)}</p>
        </div>
      </div>

      <section>
        <h2 className="text-2xl font-black uppercase tracking-tighter mb-8">Order History</h2>
        
        {history.length === 0 ? (
          <div className="bg-gray-50 p-12 text-center border-2 border-dashed border-gray-300">
            <p className="uppercase font-black text-xs tracking-widest text-gray-400">No purchases found in your collection.</p>
            <button onClick={() => navigate('/shop')} className="mt-6 bg-black text-white px-8 py-3 text-[10px] font-black uppercase tracking-widest hover:bg-gray-800 transition-colors">
              Browse Shop
            </button>
          </div>
        ) : (
          <div className="space-y-8">
            {history.map((order: any) => (
              <div key={order.id} className="border-2 border-black p-8 hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,0.05)] transition-all">
                <div className="flex flex-col md:flex-row justify-between mb-8 pb-4 border-b border-gray-100">
                  <div className="flex gap-12">
                    <div className="space-y-1">
                      <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Order ID</p>
                      <p className="font-bold text-sm">#{order.id}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Date</p>
                      <p className="font-bold text-sm">{new Date(order.date).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="space-y-1 text-right mt-4 md:mt-0">
                    <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Total</p>
                    <p className="font-black text-2xl text-black uppercase">€{order.total.toFixed(2)}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {order.items.map((item: any, idx: number) => (
                    <div key={idx} className="flex items-center gap-4 bg-gray-50 p-4 border border-transparent hover:border-black transition-colors">
                      <img src={item.images[0]} alt={item.name} className="w-16 h-16 object-cover border-2 border-black bg-white" />
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-tight leading-none mb-2">{item.name}</p>
                        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">
                          QTY: {item.quantity} — €{item.price}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}