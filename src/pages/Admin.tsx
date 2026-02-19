import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

interface AdminProps {
  onAddProduct: (product: any) => void;
}

export default function Admin({ onAddProduct }: AdminProps) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('Vinyl');
  const [sku, setSku] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState(['']);
  
  // Auth States
  const [isAdmin, setIsAdmin] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // 1. Check if user is already logged in as Admin on page load
  useEffect(() => {
    checkUser();
  }, []);

  async function checkUser() {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();
      
      if (profile?.role === 'admin') {
        setIsAdmin(true);
      }
    }
    setIsChecking(false);
  }

  // 2. Handle Admin Login
  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email: adminEmail,
      password: adminPassword,
    });

    if (error) {
      setLoginError(error.message.toUpperCase());
      return;
    }

    // After login, check if the profile is actually an admin
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', data.user.id)
      .single();

    if (profile?.role === 'admin') {
      setIsAdmin(true);
    } else {
      setLoginError("ACCESS DENIED: NOT AN ADMIN ACCOUNT");
      await supabase.auth.signOut();
    }
  };

  const handleImageChange = (index: number, value: string) => {
    const newImages = [...images];
    newImages[index] = value;
    setImages(newImages);
  };

  const addImageField = () => setImages([...images, '']);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAdmin) return alert("ACCESS DENIED");
    if (!name || !price || images[0] === '') return alert("Please fill name, price, and at least one image.");

    const productData = {
      name,
      price: parseFloat(price),
      category,
      sku: category === 'Vinyl' ? sku : undefined,
      description,
      images: images.filter(img => img !== '')
    };

    const { data, error } = await supabase
      .from('products')
      .insert([productData])
      .select();

    if (error) {
      console.error("Supabase Error:", error);
      return alert("Error saving to cloud: " + error.message);
    }

    if (data && data.length > 0) {
      onAddProduct(data[0]);
    }

    setName(''); setPrice(''); setSku(''); setDescription(''); setImages(['']);
    alert(`${category} added successfully to the cloud!`);
  };

  // 3. SHOW LOGIN FORM IF NOT AUTHENTICATED
  if (isChecking) {
    return <div className="py-20 text-center font-black uppercase tracking-widest">Verifying Identity...</div>;
  }

  if (!isAdmin) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 font-sans">
        <div className="border-4 border-black p-8 bg-white shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]">
          <h1 className="text-3xl font-black uppercase mb-6 tracking-tighter">Admin Login</h1>
          {loginError && <p className="bg-red-600 text-white p-2 text-[10px] font-bold mb-4 uppercase">{loginError}</p>}
          <form onSubmit={handleAdminLogin} className="space-y-4">
            <input 
              type="email" 
              placeholder="ADMIN EMAIL" 
              className="w-full border-2 border-black p-3 font-bold outline-none"
              value={adminEmail}
              onChange={(e) => setAdminEmail(e.target.value)}
            />
            <input 
              type="password" 
              placeholder="PASSWORD" 
              className="w-full border-2 border-black p-3 font-bold outline-none"
              value={adminPassword}
              onChange={(e) => setAdminPassword(e.target.value)}
            />
            <button type="submit" className="w-full bg-black text-white py-4 font-black uppercase hover:bg-gray-800 transition">
              Unlock Inventory
            </button>
          </form>
        </div>
      </div>
    );
  }

  // 4. SHOW INVENTORY MANAGER IF AUTHENTICATED
  return (
    <div className="max-w-3xl mx-auto px-4 py-20 font-sans text-black">
      <div className="flex justify-between items-end mb-10 border-b-8 border-black pb-2">
        <h1 className="text-4xl font-black tracking-tighter uppercase">
          Inventory Manager
        </h1>
        <button 
          onClick={() => { supabase.auth.signOut(); setIsAdmin(false); }}
          className="text-[10px] font-bold uppercase underline hover:text-red-600 mb-2"
        >
          Logout
        </button>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 border-2 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
        
        <div className="space-y-1">
          <label className="text-[10px] font-black uppercase tracking-widest">Select Category</label>
          <select 
            value={category} 
            onChange={(e) => setCategory(e.target.value)} 
            className="w-full border-2 border-black p-3 font-bold bg-gray-50 focus:bg-white transition"
          >
            <option value="Vinyl">Vinyl / Records</option>
            <option value="Gear">Gear / Record Players</option>
          </select>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase tracking-widest">
              {category === 'Vinyl' ? 'Album Title *' : 'Equipment Name *'}
            </label>
            <input 
              type="text" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              className="w-full border-2 border-black p-3 font-bold outline-none" 
              placeholder={category === 'Vinyl' ? "e.g. Dark Side of the Moon" : "e.g. Audio-Technica LP120"} 
            />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase tracking-widest">Price (€) *</label>
            <input 
              type="number" 
              value={price} 
              onChange={(e) => setPrice(e.target.value)} 
              className="w-full border-2 border-black p-3 font-bold" 
              placeholder="0.00" 
            />
          </div>
        </div>

        {category === 'Vinyl' && (
          <div className="space-y-1 animate-in fade-in slide-in-from-top-2 duration-300">
            <label className="text-[10px] font-black uppercase tracking-widest text-red-600">SKU Number (Vinyl Specific)</label>
            <input 
              type="text" 
              value={sku} 
              onChange={(e) => setSku(e.target.value)} 
              className="w-full border-2 border-black p-3 font-bold border-red-600 outline-none" 
              placeholder="DV-2024-001" 
            />
          </div>
        )}

        <div className="space-y-1">
          <label className="text-[10px] font-black uppercase tracking-widest">
            {category === 'Vinyl' ? 'Tracklist or History' : 'Technical Specifications'}
          </label>
          <textarea 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
            rows={4} 
            className="w-full border-2 border-black p-3 font-bold resize-none" 
            placeholder={category === 'Vinyl' ? "List the tracks or record condition..." : "Input speed, motor type, connectivity..."}
          ></textarea>
        </div>

        <div className="space-y-3">
          <label className="text-[10px] font-black uppercase tracking-widest">Product Images (URL)</label>
          {images.map((url, index) => (
            <input 
              key={index} 
              type="text" 
              value={url} 
              onChange={(e) => handleImageChange(index, e.target.value)} 
              className="w-full border-2 border-black p-3 font-bold mb-2 outline-none focus:bg-gray-50" 
              placeholder={`Image URL #${index + 1}`}
            />
          ))}
          <button 
            type="button" 
            onClick={addImageField} 
            className="text-[10px] font-black uppercase underline hover:text-gray-500 transition"
          >
            + Add Another Photo
          </button>
        </div>

        <button 
          type="submit" 
          className="w-full bg-black text-white py-5 font-black tracking-[0.3em] hover:bg-white hover:text-black border-2 border-black transition-all uppercase"
        >
          Publish to Shop
        </button>
      </form>
    </div>
  );
}