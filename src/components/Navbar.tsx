import { Link, useNavigate } from 'react-router-dom';

export default function Navbar({ cartCount }: { cartCount: number }) {
  const navigate = useNavigate();
  const navLinkStyles = "px-4 py-2 hover:bg-white hover:text-black transition-all duration-300 rounded-sm";
  
  // Check if a user is logged in
  const currentUser = JSON.parse(localStorage.getItem('district_current_user') || 'null');

  const handleLogout = () => {
    localStorage.removeItem('district_current_user');
    navigate('/');
    window.location.reload();
  };

  return (
    <nav className="sticky top-0 z-50 bg-black text-white uppercase tracking-widest text-xs font-black border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="text-xl font-black tracking-tighter">
            DISTRICT VINYL SHOP
          </Link>
          
          {/* Navigation Links */}
          <div className="hidden md:flex space-x-2 items-center">
            <Link to="/" className={navLinkStyles}>Home</Link>
            <Link to="/shop" className={navLinkStyles}>Shop</Link>
            <Link to="/about" className={navLinkStyles}>About Us</Link>
            <Link to="/contact" className={navLinkStyles}>Contact</Link>
            
            {/* USER LOGIC ADDED HERE */}
            {currentUser ? (
              <>
                <Link to="/dashboard" className={navLinkStyles}>Profile</Link>
                <button onClick={handleLogout} className="px-4 py-2 hover:bg-red-600 transition-all duration-300 rounded-sm">
                  Logout
                </button>
              </>
            ) : (
              <Link to="/checkout-gateway" className={navLinkStyles}>Login</Link>
            )}
          </div>

          <div className="flex items-center gap-4">
            <Link to="/cart" className="relative p-2 block group">
              <span className="text-xl grayscale brightness-200">🛒</span>
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-white text-black text-[10px] rounded-full w-4 h-4 flex items-center justify-center font-black shadow-sm">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}