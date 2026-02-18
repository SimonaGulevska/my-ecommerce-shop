import { useState } from 'react';

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

  const handleImageChange = (index: number, value: string) => {
    const newImages = [...images];
    newImages[index] = value;
    setImages(newImages);
  };

  const addImageField = () => setImages([...images, '']);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !price || images[0] === '') return alert("Please fill name, price, and at least one image.");

    const newProduct = {
      id: Date.now(),
      name,
      price: parseFloat(price),
      category,
      // Only include SKU if it's a Vinyl
      sku: category === 'Vinyl' ? sku : undefined,
      description,
      images: images.filter(img => img !== '')
    };

    onAddProduct(newProduct);
    setName(''); setPrice(''); setSku(''); setDescription(''); setImages(['']);
    alert(`${category} added successfully!`);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-20 font-sans text-black">
      <h1 className="text-4xl font-black tracking-tighter uppercase mb-10 border-b-8 border-black inline-block">
        Inventory Manager
      </h1>
      
      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 border-2 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
        
        {/* Category Selection First */}
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

        {/* SKU Logic: Only shows if Vinyl is selected */}
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