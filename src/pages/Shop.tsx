import { useState } from 'react';

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  images: string[]; // Supabase returns an array of strings
  description?: string;
  sku?: string;
}

interface ShopProps {
  products: Product[];
  onAddToCart: (product: Product, quantity: number) => void;
}

export default function Shop({ products, onAddToCart }: ShopProps) {
  const [filter, setFilter] = useState('All');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);

  const filteredProducts = filter === 'All' 
    ? products 
    : products.filter(p => p.category?.toLowerCase() === filter.toLowerCase());

  const handleOpenModal = (product: Product) => {
    setSelectedProduct(product);
    setQuantity(1); 
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-20 font-sans text-black">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
        <div>
          <h1 className="text-5xl font-black tracking-tighter mb-8 border-b-4 border-black inline-block uppercase">Shop</h1>
        </div>
        
        <div className="flex gap-6 border-b-2 border-black pb-2">
          {['All', 'Vinyl', 'Gear'].map((cat) => (
            <button 
              key={cat}
              onClick={() => setFilter(cat)}
              className={`text-xs font-black tracking-[0.2em] uppercase transition-all ${filter === cat ? 'text-black' : 'text-gray-300 hover:text-black'}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
        {filteredProducts.map((product) => (
          <div 
            key={product.id} 
            className="group cursor-pointer"
            onClick={() => handleOpenModal(product)}
          >
            <div className="aspect-square bg-white overflow-hidden border border-gray-200 mb-6 group-hover:border-black transition-colors duration-300">
              <img 
                src={product.images?.[0] || 'https://via.placeholder.com/400'} 
                alt={product.name} 
                className="w-full h-full object-cover" 
              />
            </div>
            <div className="space-y-1">
              <h3 className="font-black text-xl tracking-tight uppercase leading-tight group-hover:underline underline-offset-4">{product.name}</h3>
              <p className="font-bold text-gray-900">€{product.price.toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>

      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-white w-full max-w-5xl max-h-[95vh] overflow-y-auto border-2 border-black relative flex flex-col md:flex-row">
            
            <button 
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-6 text-2xl font-light z-10 hover:rotate-90 transition-transform duration-300"
            >
              ✕
            </button>

            <div className="md:w-1/2 p-6 bg-gray-50 flex flex-col gap-4">
              <img 
                src={selectedProduct.images?.[0] || 'https://via.placeholder.com/400'} 
                alt={selectedProduct.name} 
                className="w-full aspect-square object-cover border border-black shadow-sm"
              />
              <div className="grid grid-cols-4 gap-2">
                {selectedProduct.images?.slice(1).map((img, i) => (
                  <img key={i} src={img} alt="" className="aspect-square object-cover border border-gray-200 hover:border-black cursor-pointer bg-white" />
                ))}
              </div>
            </div>

            <div className="md:w-1/2 p-10 pb-6 flex flex-col">
              <div className="flex-grow">
                <span className="text-[10px] font-black tracking-[0.4em] text-gray-400 uppercase">{selectedProduct.category}</span>
                <h2 className="text-4xl font-black tracking-tighter uppercase mt-2 mb-4 leading-none">{selectedProduct.name}</h2>
                <p className="text-2xl font-bold mb-8 italic">€{selectedProduct.price.toFixed(2)}</p>
                
                {selectedProduct.sku && (
                  <div className="mb-8 p-3 bg-gray-50 border-l-4 border-black inline-block">
                    <span className="text-[10px] font-black uppercase tracking-widest block text-gray-500">SKU Number</span>
                    <span className="font-mono font-bold text-sm tracking-widest">{selectedProduct.sku}</span>
                  </div>
                )}

                <div className="space-y-3">
                  <span className="text-[10px] font-black uppercase tracking-widest block border-b border-gray-100 pb-1">Description</span>
                  <p className="text-gray-700 leading-relaxed font-medium text-sm whitespace-pre-line">
                    {selectedProduct.description || "No specific details available."}
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-100">
                <div className="flex items-end gap-4">
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-black uppercase tracking-widest">QTY</label>
                    <div className="flex items-center border-2 border-black h-12 bg-white">
                      <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-4 py-2 hover:bg-black hover:text-white transition-colors">-</button>
                      <span className="w-8 text-center font-bold">{quantity}</span>
                      <button onClick={() => setQuantity(quantity + 1)} className="px-4 py-2 hover:bg-black hover:text-white transition-colors">+</button>
                    </div>
                  </div>

                  <button 
                    onClick={() => {
                      onAddToCart(selectedProduct, quantity);
                      setSelectedProduct(null);
                    }}
                    className="flex-grow h-12 bg-black text-white px-6 font-black tracking-[0.2em] text-[10px] hover:bg-white hover:text-black border-2 border-black transition-all uppercase"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}