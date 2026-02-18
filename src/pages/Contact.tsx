import { useState } from 'react';

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

  const handleSubmit = (e: React.FormEvent) => {
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

    // If validation passes
    console.log('Form Submitted:', formData);
    setError('');
    setSuccess(true);
    // Here you would eventually send the data to your Laravel backend
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-20">
      <div className="grid lg:grid-cols-2 gap-16">
        
        {/* Left Side: Info & Form */}
        <div className="space-y-10">
          <header>
            <h1 className="text-5xl font-black tracking-tighter mb-8 border-b-4 border-black inline-block uppercase">GET IN TOUCH</h1>
            <p className="text-lg md:text-xl leading-relaxed mb-10 text-gray-900">
              If you have any questions about our products or you just need information about our store
              fill out the following form. 
            <p>Don't hesitate!</p>
            </p>
          </header>

          {/* Error/Success Messages */}
          {error && <div className="bg-red-100 border-l-4 border-red-600 p-4 text-red-700 font-bold">{error}</div>}
          {success && <div className="bg-green-100 border-l-4 border-green-600 p-4 text-green-700 font-bold">Message sent successfully!</div>}

          <form className="space-y-6 pt-4" onSubmit={handleSubmit}>
            <div className="grid sm:grid-cols-2 gap-6">
              <input 
                type="text" 
                placeholder="FIRST NAME *" 
                className="w-full border-2 border-black p-4 text-sm font-bold outline-none focus:bg-gray-50 transition"
                onChange={(e) => setFormData({...formData, firstName: e.target.value})}
              />
              <input 
                type="text" 
                placeholder="LAST NAME *" 
                className="w-full border-2 border-black p-4 text-sm font-bold outline-none focus:bg-gray-50 transition"
                onChange={(e) => setFormData({...formData, lastName: e.target.value})}
              />
            </div>
            
            <div className="grid sm:grid-cols-2 gap-6">
              <input 
                type="email" 
                placeholder="EMAIL ADDRESS *" 
                className="w-full border-2 border-black p-4 text-sm font-bold outline-none focus:bg-gray-50 transition"
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
              {/* NEW: Order Number Field */}
              <input 
                type="text" 
                placeholder="ORDER NUMBER (Optional)" 
                className="w-full border-2 border-black p-4 text-sm font-bold outline-none focus:bg-gray-50 transition"
                onChange={(e) => setFormData({...formData, orderNumber: e.target.value})}
              />
            </div>

            <textarea 
              placeholder="HOW CAN WE HELP? *" 
              rows={4} 
              className="w-full border-2 border-black p-4 text-sm font-bold outline-none focus:bg-gray-50 transition resize-none"
              onChange={(e) => setFormData({...formData, message: e.target.value})}
            ></textarea>
            
            <button 
              type="submit"
              className="bg-black text-white px-12 py-5 text-sm font-black tracking-widest hover:bg-gray-800 transition uppercase w-full"
            >
              SUBMIT
            </button>
          </form>
        </div>

        {/* Right Side: Map remains the same */}
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