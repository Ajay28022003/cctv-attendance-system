import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../contexts/ToastContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      const result = login(email, password);
      
      if (result.success) {
        addToast("Welcome back, Admin!", "success");
        navigate('/'); 
      } else {
        addToast(result.message, "error");
        setIsLoading(false);
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4 font-sans">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
        
        {/* --- HEADER CHANGE START --- */}
        {/* Changed bg-slate-900 to bg-white and added a subtle border-b */}
        <div className="bg-white p-8 text-center border-b border-slate-50">
          
          {/* Logo Container */}
          <div className="w-14 h-14 bg-blue-600 rounded-2xl mx-auto flex items-center justify-center shadow-xl shadow-blue-200 mb-6 transform rotate-3 hover:rotate-0 transition duration-500">
             <div className="w-5 h-5 bg-white rounded-full animate-pulse" />
          </div>
          
          {/* Title Text (Changed from White to Slate-800) */}
          <h1 className="text-2xl font-bold text-slate-800">Pro-Vision Admin</h1>
          <p className="text-slate-500 text-sm mt-2 font-medium">Secure Access Portal</p>
        </div>
        {/* --- HEADER CHANGE END --- */}

        {/* Form */}
        <div className="p-8 pt-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Email Address</label>
              <div className="flex items-center gap-3 px-4 py-3 bg-slate-50 rounded-xl border border-slate-200 focus-within:border-blue-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-blue-500/10 transition duration-200">
                <Mail size={18} className="text-slate-400" />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@securevision.com"
                  className="bg-transparent w-full outline-none text-sm font-medium text-slate-700 placeholder:text-slate-300"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Password</label>
              <div className="flex items-center gap-3 px-4 py-3 bg-slate-50 rounded-xl border border-slate-200 focus-within:border-blue-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-blue-500/10 transition duration-200">
                <Lock size={18} className="text-slate-400" />
                <input 
                  type={showPassword ? "text" : "password"} 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="bg-transparent w-full outline-none text-sm font-medium text-slate-700 placeholder:text-slate-300"
                  required
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-slate-400 hover:text-slate-600 transition">
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white font-bold rounded-xl shadow-lg shadow-blue-200 transition flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed mt-2"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>Sign In <ArrowRight size={18} /></>
              )}
            </button>

          </form>
        </div>
        
        <div className="bg-slate-50/50 p-4 text-center border-t border-slate-50">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Authorized Personnel Only</p>
        </div>

      </div>
    </div>
  );
}