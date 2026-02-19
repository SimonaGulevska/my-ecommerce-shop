import { useState } from 'react';
import { supabase } from '../lib/supabase'; // Import Supabase client

export default function About() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({
    type: null,
    message: ''
  });
  const [loading, setLoading] = useState(false);

  const handleJoinDistrict = async () => {
    if (!email || !email.includes('@')) {
      setStatus({ type: 'error', message: 'Please enter a valid email address.' });
      return;
    }

    setLoading(true);
    setStatus({ type: null, message: '' });

    const { error } = await supabase
      .from('newsletter')
      .insert([{ email }]);

    setLoading(false);

    if (error) {
      // Check if error is due to unique constraint (email already exists)
      if (error.code === '23505') {
        setStatus({ type: 'success', message: 'You are already part of the district!' });
      } else {
        setStatus({ type: 'error', message: 'Something went wrong. Please try again.' });
      }
    } else {
      setStatus({ type: 'success', message: 'Welcome to the district!' });
      setEmail('');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-16 space-y-20 text-black font-sans">
      
      {/* 1. Biography & Image */}
      <section className="text-left">
        <h1 className="text-5xl font-black tracking-tighter mb-8 border-b-4 border-black inline-block uppercase">ABOUT US</h1>
        <div className="text-lg md:text-xl leading-relaxed mb-10 text-gray-900">
          <p>
            District Vinyl Shop is a specialized store for vinyl music releases. In addition to the online store, our physical store is located in the centre of the city of Bitola. 
          </p>
          <p>
            Driven by the idea of supporting the music industry, while following its coordinates and trends, our mission is to return analog sound to the focus of all music lovers.
          </p>
        </div>
        <div className="shadow-lg">
          <img 
            src="https://images.unsplash.com/photo-1709649246219-220dfca6f75a?w=1200&auto=format&fit=crop&q=90"
            alt="District Vinyl Shop" 
            className="w-full h-[500px] object-cover"
          />
        </div>
      </section>

      {/* 2. Store Hours & Payment Info */}
      <section className="grid md:grid-cols-2 gap-12 border-y-2 py-12 border-black uppercase tracking-wider">
        <div>
          <h2 className="font-bold text-lg mb-6 text-black">Store Hours</h2>
          <ul className="space-y-3 text-base font-semibold">
            <li className="flex justify-between border-b border-gray-200 pb-2"><span>Monday - Friday</span> <span>10:00 - 18:00</span></li>
            <li className="flex justify-between border-b border-gray-200 pb-2"><span>Saturday</span> <span>11:00 - 16:00</span></li>
            <li className="flex justify-between text-red-600"><span>Sunday</span> <span>CLOSED</span></li>
          </ul>
        </div>
        <div>
          <h2 className="font-bold text-lg mb-6 text-black">Payment Methods</h2>
          <p className="text-base leading-relaxed text-gray-900 mb-4 font-medium">We accept all major credit cards, PayPal, and cash on delivery for local orders in Bitola.</p>
          <p className="text-base font-black bg-yellow-50 p-4 border-l-4 border-black">FREE DELIVERY FOR ORDERS OVER €50.</p>
        </div>
      </section>

      {/* 3. Product Returns */}
      <section className="bg-gray-100 p-8 rounded-sm">
        <h2 className="font-black text-2xl mb-4 tracking-tight uppercase">RETURNS & REFUNDS</h2>
        <p className="text-lg leading-relaxed text-black">
          District Vinyl Shop accept product returns only in the case where an item you have received is faulty. You need to email us with a description of the fault and then send us the item - we shall replace the item for you free of charge.
        </p>
      </section>

      {/* 4. YouTube Video Embed */}
      <section className="flex justify-center">
        <div className="w-full max-w-3xl aspect-video bg-black shadow-2xl">
            <iframe 
              className="w-full h-full"
              src="https://www.youtube.com/embed/JYpyvwCdRLw" 
              title="Cruiser Premier" 
              frameBorder="0" 
              allowFullScreen>
            </iframe>
        </div>
      </section>

      {/* 5. Mailing List */}
      <section className="bg-black text-white p-12 text-center">
        <h2 className="text-3xl font-black mb-4 uppercase">Join the District</h2>
        <p className="text-lg mb-8 opacity-90">Be the first to hear about new products, sales, giveaways, special discounts and polls on new product ideas!</p>
        
        <div className="max-w-md mx-auto space-y-4">
          <div className="flex gap-2">
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ENTER YOUR EMAIL" 
              className="flex-grow bg-white text-black px-4 py-4 outline-none font-bold" 
            />
            <button 
              onClick={handleJoinDistrict}
              disabled={loading}
              className="bg-white text-black px-8 py-4 font-black border-l border-black hover:bg-gray-200 transition uppercase disabled:bg-gray-400"
            >
              {loading ? '...' : 'JOIN'}
            </button>
          </div>
          
          {/* Status Messages */}
          {status.type === 'success' && (
            <p className="text-green-400 font-bold text-sm animate-pulse">{status.message}</p>
          )}
          {status.type === 'error' && (
            <p className="text-red-400 font-bold text-sm">{status.message}</p>
          )}
        </div>
      </section>
    </div>
  );
}