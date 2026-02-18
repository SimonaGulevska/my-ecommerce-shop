import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const promoSlides = [
    {
      title: "WINTER SALE",
      subtitle: "20% OFF ALL RECORDS",
      image: "https://www.hemswell-antiques.com/images/uploads/blog_images/ed0977c68c5c92e379f75418ce6b40f306def645_x14R.jpeg",
      color: "bg-black"
    },
    {
      title: "GEAR UP",
      subtitle: "NEW CROSLEY PLAYERS IN STOCK",
      image: "https://blog.sweelee.com/uploads/2020/12/Crosley-Turntable-2-scaled.jpg",
      color: "bg-zinc-900"
    }
  ];

  const communityImages = [
    "https://images.unsplash.com/photo-1502773860571-211a597d6e4b?w=500",
    "https://images.unsplash.com/photo-1542208998-f6dbbb27a72f?w=500",
    "https://images.unsplash.com/photo-1502773860571-211a597d6e4b?w=500",
    "https://images.unsplash.com/photo-1542208998-f6dbbb27a72f?w=500",
    "https://images.unsplash.com/photo-1502773860571-211a597d6e4b?w=500",
    "https://images.unsplash.com/photo-1542208998-f6dbbb27a72f?w=500",
    "https://images.unsplash.com/photo-1502773860571-211a597d6e4b?w=500",
    "https://images.unsplash.com/photo-1542208998-f6dbbb27a72f?w=500"
  ];

  return (
    <div className="flex flex-col font-sans">
      {/* 1. HERO SECTION */}
      <section className="relative h-[80vh] bg-black flex items-center justify-center text-white overflow-hidden">
        <div className="text-center z-10 px-4">
          <h1 className="text-7xl md:text-9xl font-black tracking-tighter mb-4 leading-none">DISTRICT VINYL</h1>
          <p className="text-lg md:text-xl font-medium tracking-[0.4em] uppercase mb-8 opacity-80 underline decoration-white/30 underline-offset-8"> We are Analog</p>
          <Link to="/shop" className="inline-block border-2 border-white px-10 py-4 text-sm font-black tracking-[0.3em] hover:bg-white hover:text-black transition-all duration-500 uppercase shadow-2xl">
            SHOP THE COLLECTION
          </Link>
        </div>
        <div className="absolute inset-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1603048588665-791ca8aea617?q=80&w=2000')] bg-cover bg-center"></div>
      </section>

      {/* 2. NEW ARRIVALS TEASER */}
      <section className="py-20 bg-white text-center border-b border-black/5">
        <h2 className="text-xs font-black tracking-[0.5em] uppercase mb-6 text-gray-400">Latest Drops</h2>
        <p className="max-w-4xl mx-auto text-3xl md:text-5xl font-black tracking-tighter leading-tight px-4">
          WE BRING THE BEST VINYL DEALS TO YOUR FRONT DOOR.
        </p>
      </section>

      {/* 3. PRODUCT PROMO SLIDER */}
      <section className="relative bg-black text-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="relative h-[500px] md:h-[400px] flex items-center overflow-hidden">
            {promoSlides.map((slide, index) => (
              <div 
                key={index} 
                className={`absolute inset-0 transition-all duration-1000 flex flex-col md:flex-row items-center gap-10 ${index === currentSlide ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10 pointer-events-none'}`}
              >
                <div className="flex-1 space-y-4 text-center md:text-left">
                  <span className="text-red-600 font-black tracking-[0.3em] text-xs uppercase">Limited Offer</span>
                  <h3 className="text-5xl font-black tracking-tighter">{slide.title}</h3>
                  <p className="text-xl font-light text-gray-400 uppercase tracking-widest">{slide.subtitle}</p>
                  
                  {/* Updated Link for GET IT NOW */}
                  <Link 
                    to="/shop" 
                    className="mt-6 inline-block bg-white text-black px-10 py-4 font-black text-xs tracking-[0.2em] hover:bg-red-600 hover:text-white transition-colors uppercase"
                  >
                    GET IT NOW
                  </Link>
                </div>
                
                <div className="flex-1 w-full h-64 md:h-full">
                  <img 
                    src={slide.image} 
                    alt={slide.title} 
                    className="w-full h-full object-cover shadow-2xl grayscale hover:grayscale-0 transition-all duration-700" 
                  />
                </div>
              </div>
            ))}
          </div>
          
          {/* Slider Dots */}
          <div className="flex justify-center gap-4 mt-12">
            {promoSlides.map((_, i) => (
              <button 
                key={i} 
                onClick={() => setCurrentSlide(i)}
                className={`w-16 h-1 transition-all duration-500 ${i === currentSlide ? 'bg-white' : 'bg-white/20'}`}
              />
            ))}
          </div>
        </div>
      </section>
      {/* 4. SOCIAL CONNECT SECTION */}
      <section className="bg-white pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col items-center justify-center space-y-8">
            <h3 className="text-xs font-black tracking-[0.6em] uppercase text-gray-400">Follow the movement</h3>
            
            <div className="flex items-center gap-12">
              {/* Instagram */}
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="group flex flex-col items-center gap-3">
                <div className="w-14 h-14 rounded-full border-2 border-black flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                </div>
                <span className="text-[10px] font-black tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity">Instagram</span>
              </a>

              {/* Facebook */}
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="group flex flex-col items-center gap-3">
                <div className="w-14 h-14 rounded-full border-2 border-black flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                </div>
                <span className="text-[10px] font-black tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity">Facebook</span>
              </a>

              {/* YouTube */}
              <a href="https://youtube.com" target="_blank" rel="noreferrer" className="group flex flex-col items-center gap-3">
                <div className="w-14 h-14 rounded-full border-2 border-black flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
                </div>
                <span className="text-[10px] font-black tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity">YouTube</span>
              </a>

              {/* Gmail */}
              <a href="mailto:districtvinylshop@gmail.com" className="group flex flex-col items-center gap-3">
                <div className="w-14 h-14 rounded-full border-2 border-black flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                </div>
                <span className="text-[10px] font-black tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity">Gmail</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 5. COMMUNITY GRID */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black tracking-tighter uppercase mb-4">District Vinyl Shop Community</h2>
            <div className="w-20 h-1.5 bg-black mx-auto mb-6"></div>
            <p className="text-gray-500 font-bold uppercase tracking-[0.3em] text-[10px]">Share your musical moments with us!</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {communityImages.map((src, i) => (
              <div key={i} className="group relative overflow-hidden bg-gray-200 aspect-square">
                <img 
                  src={src} 
                  alt="Community Life" 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000" 
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-4">
                   <span className="text-white font-black text-[10px] tracking-[0.3em] border-b border-white pb-1">@DISTRICTVINYL</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}