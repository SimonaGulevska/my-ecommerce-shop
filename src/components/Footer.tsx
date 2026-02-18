export default function Footer() {
  return (
    <footer className="bg-black text-white border-t border-white/10 py-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-8">
        {/* Left Side: Logo */}
        <div className="text-xl font-black tracking-tighter uppercase">DISTRICT VINYL SHOP</div>
        
        {/* Middle: New Contact Info & Discogs */}
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-[10px] font-black uppercase tracking-widest text-white/70">
          <span className="hover:text-white transition">Bitola, Republic of North Macedonia</span>
          <a href="mailto:info@districtvinyl.com" className="hover:text-white transition">Email: ​districtvinylshop@gmail.com</a>
          <a href="tel:+389000000" className="hover:text-white transition">Phone: +389 77 227 777</a>
          <a href="https://www.discogs.com" target="_blank" rel="noreferrer" className="hover:text-white transition">Discogs</a>
        </div>

        {/* Right Side: Copyright */}
        <div className="text-[10px] text-white/40 uppercase tracking-[0.2em]">
          © {new Date().getFullYear()} District Vinyl Shop
        </div>
      </div>
    </footer>
  );
}