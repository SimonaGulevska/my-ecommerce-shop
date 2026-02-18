interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

export default function ProductCard({ product, onAdd }: { product: Product, onAdd: (p: Product) => void }) {
  return (
    <div className="group bg-white rounded-2xl border border-gray-100 p-4 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <div className="aspect-square w-full bg-gray-100 rounded-xl mb-4 overflow-hidden relative">
         <div className="absolute inset-0 flex items-center justify-center text-gray-400 font-medium">
           {product.image}
         </div>
      </div>
      <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
      <div className="mt-4 flex items-center justify-between">
        <span className="text-xl font-bold text-indigo-600">${product.price}</span>
        <button 
          onClick={() => onAdd(product)}
          className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-600 transition-colors"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}