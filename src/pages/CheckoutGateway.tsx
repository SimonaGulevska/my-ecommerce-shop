import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase'; // Import Supabase

export default function CheckoutGateway() {
  const navigate = useNavigate();
  const [isRegistering, setIsRegistering] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Form States
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');

  const validateEmail = (email: string) => {
    return String(email)
      .toLowerCase()
      .match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  };

  const handleAuth = async () => {
    setError('');
    
    if (!email || !password) return setError('EMAIL AND PASSWORD ARE REQUIRED');
    if (!validateEmail(email)) return setError('PLEASE ENTER A VALID EMAIL ADDRESS');
    if (password.length < 6) return setError('PASSWORD MUST BE AT LEAST 6 CHARACTERS');

    setLoading(true);

    if (isRegistering) {
      if (!fullName) {
        setLoading(false);
        return setError('FULL NAME IS REQUIRED FOR REGISTRATION');
      }

      // 1. Sign up user in Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (authError) {
        setError(authError.message.toUpperCase());
        setLoading(false);
        return;
      }

      // 2. Create Profile row (the foreign key handles the ID link)
      if (authData.user) {
        const { error: profileError } = await supabase
          .from('profiles')
          .insert([{ 
            id: authData.user.id, 
            email: email, 
            full_name: fullName, 
            role: 'customer' 
          }]);

        if (profileError) {
          setError(profileError.message.toUpperCase());
          setLoading(false);
          return;
        }
      }

      navigate('/checkout-final');
    } else {
      // Login Logic
      const { error: loginError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (loginError) {
        setError(loginError.message.toUpperCase());
        setLoading(false);
      } else {
        navigate('/checkout-final');
      }
    }
    setLoading(false);
  };

  const inputStyles = "w-full border-2 border-black p-4 font-bold outline-none focus:bg-gray-50 uppercase text-xs tracking-widest transition-colors";

  return (
    <div className="max-w-7xl mx-auto px-4 py-20 font-sans text-black">
      <h1 className="text-6xl font-black tracking-tighter uppercase mb-16 text-center text-black">Checkout</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-black border-2 border-black shadow-[20px_20px_0px_0px_rgba(0,0,0,0.05)]">
        
        <div className="bg-white p-12 flex flex-col justify-between">
          <div>
            <h2 className="text-3xl font-black uppercase tracking-tighter mb-4 text-black">
              {isRegistering ? 'Join the District' : 'Members'}
            </h2>
            <p className="text-gray-500 font-medium mb-8 text-[10px] tracking-[0.2em] uppercase">
              {isRegistering 
                ? 'Create an account for faster shopping.' 
                : 'Sign in to access your collection.'}
            </p>
            
            <div className="space-y-4">
              {error && (
                <div className="bg-red-50 border-l-4 border-red-600 p-3 mb-4">
                  <p className="text-red-600 text-[10px] font-black tracking-widest">{error}</p>
                </div>
              )}

              {isRegistering && (
                <input 
                  type="text" 
                  placeholder="Full Name" 
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className={inputStyles}
                />
              )}

              <input 
                type="email" 
                placeholder="Email Address" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={inputStyles}
              />
              <input 
                type="password" 
                placeholder="Password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={inputStyles}
              />
            </div>
          </div>
          
          <div className="mt-12 space-y-4">
            <button 
              onClick={handleAuth}
              disabled={loading}
              className="w-full bg-black text-white py-4 font-black tracking-[0.2em] text-[10px] hover:bg-white hover:text-black border-2 border-black transition-all uppercase disabled:bg-gray-400"
            >
              {loading ? 'PROCESSING...' : (isRegistering ? 'Register & Continue' : 'Login & Continue')}
            </button>
            
            <button 
              onClick={() => { setIsRegistering(!isRegistering); setError(''); }}
              className="w-full text-center text-[10px] font-black uppercase tracking-widest underline decoration-2 underline-offset-8 hover:text-gray-500 transition-colors"
            >
              {isRegistering ? 'Already have an account? Login' : 'Create an account'}
            </button>
          </div>
        </div>

        <div className="bg-gray-50 p-12 flex flex-col justify-center items-center text-center">
          <div className="mb-8">
            <span className="text-4xl">📦</span>
          </div>
          <h2 className="text-3xl font-black uppercase tracking-tighter mb-4 text-black">New Customer</h2>
          <p className="text-gray-500 font-medium mb-10 max-w-xs uppercase text-[10px] tracking-[0.2em] leading-loose">
            Proceed as a guest. You don't need an account to buy, but you won't save your purchase history.
          </p>
          
          <button 
            onClick={() => navigate('/checkout-final')}
            className="w-full max-w-xs bg-white text-black py-4 font-black tracking-[0.2em] text-[10px] hover:bg-black hover:text-white border-2 border-black transition-all uppercase"
          >
            Continue as Guest
          </button>
        </div>

      </div>
    </div>
  );
}