import React, { useState } from 'react';
import { Key, Save, X, Eye, EyeOff, Loader2, Lock } from 'lucide-react';
import { useToast } from '../../../contexts/ToastContext';

export default function SecuritySettings({ lastChanged }) {
  const { addToast } = useToast();
  
  // State
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  
  const [formData, setFormData] = useState({
    current: '',
    newPass: '',
    confirm: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    // 1. Basic Validation
    if (!formData.current || !formData.newPass) {
      addToast('Please fill in all password fields', 'error');
      return;
    }
    if (formData.newPass !== formData.confirm) {
      addToast('New passwords do not match', 'error');
      return;
    }
    if (formData.newPass.length < 8) {
        addToast('Password must be at least 8 characters', 'warning');
        return;
    }

    // 2. Simulate API Call
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsEditing(false);
      setFormData({ current: '', newPass: '', confirm: '' }); // Clear form
      addToast('Password updated successfully', 'success');
    }, 1500);
  };

  return (
    <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm transition-all duration-300">
      <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-slate-800">Security Settings</h3>
          {isEditing && (
            <button 
                onClick={() => setIsEditing(false)}
                className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg transition"
            >
                <X size={18} />
            </button>
          )}
      </div>
      
      {!isEditing ? (
        // --- VIEW MODE ---
        <div className="p-5 rounded-2xl border border-slate-100 bg-slate-50/50 hover:border-blue-200 transition-colors">
          <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white rounded-lg shadow-sm text-blue-600">
                    <Key size={20} />
                </div>
                <div>
                    <p className="text-sm font-bold text-slate-700">Password</p>
                    <p className="text-xs text-slate-400 mt-0.5">Last changed {lastChanged}</p>
                </div>
              </div>
              <button 
                onClick={() => setIsEditing(true)}
                className="text-xs font-bold text-blue-600 hover:underline bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-sm hover:bg-blue-50 transition"
              >
                Update Password
              </button>
          </div>
          
          <div className="flex gap-1 mt-3 pl-1">
              {[1,2,3,4,5,6,7,8,9,10,11,12].map(i => (
                  <div key={i} className="w-1.5 h-1.5 rounded-full bg-slate-400"></div>
              ))}
          </div>
        </div>

      ) : (
        // --- EDIT MODE ---
        <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
            
            {/* Current Password */}
            <div className="relative">
                <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input 
                    type="password" 
                    name="current"
                    placeholder="Current Password"
                    value={formData.current}
                    onChange={handleChange}
                    className="w-full bg-slate-50 border border-slate-200 text-sm font-bold text-slate-700 rounded-xl pl-11 pr-4 py-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all"
                />
            </div>

            {/* New Password Group */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative">
                    <input 
                        type={showPass ? "text" : "password"} 
                        name="newPass"
                        placeholder="New Password"
                        value={formData.newPass}
                        onChange={handleChange}
                        className="w-full bg-slate-50 border border-slate-200 text-sm font-bold text-slate-700 rounded-xl px-4 py-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all"
                    />
                </div>
                <div className="relative">
                    <input 
                        type={showPass ? "text" : "password"} 
                        name="confirm"
                        placeholder="Confirm New Password"
                        value={formData.confirm}
                        onChange={handleChange}
                        className={`w-full bg-slate-50 border text-sm font-bold text-slate-700 rounded-xl px-4 py-3 outline-none focus:ring-4 transition-all ${
                            formData.confirm && formData.newPass !== formData.confirm 
                            ? 'border-red-300 focus:border-red-500 focus:ring-red-500/10' 
                            : 'border-slate-200 focus:border-blue-500 focus:ring-blue-500/10'
                        }`}
                    />
                    <button 
                        type="button"
                        onClick={() => setShowPass(!showPass)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                        {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-3 pt-2">
                <button 
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 text-slate-500 text-xs font-bold hover:bg-slate-50 rounded-lg transition"
                >
                    Cancel
                </button>
                <button 
                    onClick={handleSave}
                    disabled={isLoading}
                    className="px-6 py-2 bg-blue-500 text-white text-xs font-bold rounded-xl hover:bg-blue-600 transition shadow-lg flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                    {isLoading ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
                    {isLoading ? 'Updating...' : 'Save Password'}
                </button>
            </div>
        </div>
      )}
    </div>
  );
}