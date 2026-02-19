import { useState } from 'react';
import { supabase } from '../lib/supabase'; // Import Supabase client

export default function Contact() {
  // State for form data
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    orderNumber: '',
    message: ''
  });

  // State for validation errors
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false); // New: Loading state for the button

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple Validation
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.message) {
      setError('Please fill in all required fields (*)');
      setSuccess(false);
      return;
    }

    if (!formData.email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }

    setLoading(true);
    setError('');

    // --- UPDATED: Send to Supabase ---
    const { error: dbError } = await supabase
      .from('contact_messages')
      .insert([
        {
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          order_number: formData.orderNumber || null,
          message: formData.message
        }
      ]);

    setLoading(false);

    if (dbError) {
      setError('Something went wrong: ' + dbError.message);
      setSuccess(false);
    } else {
      setSuccess(true);
      setFormData({ firstName: '', lastName: '', email: '', orderNumber: '', message: '' });
      // Clear inputs manually if needed or use value={formData...} in inputs
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-20">
      <div className="grid lg:grid-cols-2 gap-16">
        
        {/* Left Side: Info & Form */}
        <div className="space-y-10">
          <header>
            <h1 className="text-5xl font-black tracking-tighter mb-8 border-b-4 border-black inline-block uppercase">GET IN TOUCH</h1>
            <div className="text-lg md:text-xl leading-relaxed mb-10 text-gray-900">
              <p>
                If you have any questions about our products or you just need information about our store
                fill out the following form. 
              </p>
              <p>Don't hesitate!</p>
            </div>
          </header>

          {/* Error/Success Messages */}
          {error && <div className="bg-red-100 border-l-4 border-red-600 p-4 text-red-700 font-bold">{error}</div>}
          {success && <div className="bg-green-100 border-l-4 border-green-600 p-4 text-green-700 font-bold">Message sent successfully!</div>}

          <form className="space-y-6 pt-4" onSubmit={handleSubmit}>
            <div className="grid sm:grid-cols-2 gap-6">
              <input 
                type="text" 
                placeholder="FIRST NAME *" 
                value={formData.firstName}
                className="w-full border-2 border-black p-4 text-sm font-bold outline-none focus:bg-gray-50 transition"
                onChange={(e) => setFormData({...formData, firstName: e.target.value})}
              />
              <input 
                type="text" 
                placeholder="LAST NAME *" 
                value={formData.lastName}
                className="w-full border-2 border-black p-4 text-sm font-bold outline-none focus:bg-gray-50 transition"
                onChange={(e) => setFormData({...formData, lastName: e.target.value})}
              />
            </div>
            
            <div className="grid sm:grid-cols-2 gap-6">
              <input 
                type="email" 
                placeholder="EMAIL ADDRESS *" 
                value={formData.email}
                className="w-full border-2 border-black p-4 text-sm font-bold outline-none focus:bg-gray-50 transition"
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
              <input 
                type="text" 
                placeholder="ORDER NUMBER (Optional)" 
                value={formData.orderNumber}
                className="w-full border-2 border-black p-4 text-sm font-bold outline-none focus:bg-gray-50 transition"
                onChange={(e) => setFormData({...formData, orderNumber: e.target.value})}
              />
            </div>

            <textarea 
              placeholder="HOW CAN WE HELP? *" 
              value={formData.message}
              rows={4} 
              className="w-full border-2 border-black p-4 text-sm font-bold outline-none focus:bg-gray-50 transition resize-none"
              onChange={(e) => setFormData({...formData, message: e.target.value})}
            ></textarea>
            
            <button 
              type="submit"
              disabled={loading}
              className="bg-black text-white px-12 py-5 text-sm font-black tracking-widest hover:bg-gray-800 transition uppercase w-full disabled:bg-gray-400"
            >
              {loading ? 'SENDING...' : 'SUBMIT'}
            </button>
          </form>
        </div>

        {/* Right Side: Map */}
        <div className="h-[500px] lg:h-auto border-4 border-black shadow-xl overflow-hidden">
          <iframe 
            width="100%" height="100%" frameBorder="0" title="District Vinyl Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2994.484214532159!2d21.3323!3d41.0315!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x135711206d868f15%3A0x39403e058030ecf5!2sPorta%20Jazz!5e0!3m2!1sen!2smk!4v1700000000000"
            className="w-full h-full"
          ></iframe>
        </div>
      </div>
    </div>
  );
}