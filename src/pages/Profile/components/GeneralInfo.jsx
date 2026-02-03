import React, { useState, useEffect } from 'react';
import { User, Mail, MapPin, Smartphone, Save, Loader2 } from 'lucide-react';
import { useToast } from '../../../contexts/ToastContext';

// Internal Helper: Editable Input Row
const InputRow = ({ label, name, value, icon: Icon, onChange }) => (
  <div className="group flex items-center gap-4 p-4 rounded-xl border border-transparent hover:border-slate-100 hover:bg-slate-50 transition-all duration-200 focus-within:bg-slate-50 focus-within:border-blue-100">
    <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center shrink-0 group-focus-within:bg-blue-600 group-focus-within:text-white transition-colors duration-300">
      <Icon size={18} />
    </div>
    <div className="flex-1">
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 group-focus-within:text-blue-600 transition-colors">
        {label}
      </p>
      <input 
        type="text" 
        name={name}
        value={value} 
        onChange={onChange}
        className="w-full bg-transparent text-sm font-bold text-slate-700 outline-none border-b border-transparent focus:border-blue-500 placeholder:text-slate-300 transition-all pb-1"
      />
    </div>
  </div>
);

export default function GeneralInfo({ user, onSave }) {
  const { addToast } = useToast();
  
  // Local state for the form inputs
  const [formData, setFormData] = useState(user);
  const [isSaving, setIsSaving] = useState(false);

  // Sync state if parent prop updates
  useEffect(() => {
    setFormData(user);
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setIsSaving(true);
    
    // Simulate API delay
    setTimeout(() => {
        if (onSave) onSave(formData); // Send updated object to parent
        addToast('Profile details updated successfully', 'success');
        setIsSaving(false);
    }, 800);
  };

  return (
    <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm">
      <div className="flex items-center justify-between mb-6">
          <div>
              <h3 className="text-lg font-bold text-slate-800">General Information</h3>
              <p className="text-slate-400 text-sm">Update your personal details directly.</p>
          </div>
          <button 
            onClick={handleSave}
            disabled={isSaving}
            className="px-4 py-2 bg-blue-500 text-white text-xs font-bold rounded-xl  hover:bg-blue-600 hover:border-blue-600 hover:shadow-lg hover:shadow-blue-200 hover:-translate-y-0.5 transition-all flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
              {isSaving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
              {isSaving ? 'Saving...' : 'Save Changes'}
          </button>
      </div>
      
      <div className="space-y-1">
        <InputRow 
          label="Full Name" 
          name="name"
          value={formData.name} 
          icon={User} 
          onChange={handleChange}
        />
        <InputRow 
          label="Email Address" 
          name="email"
          value={formData.email} 
          icon={Mail} 
          onChange={handleChange}
        />
        <InputRow 
          label="Work Phone" 
          name="phone"
          value={formData.phone} 
          icon={Smartphone} 
          onChange={handleChange}
        />
        <InputRow 
          label="Office Location" 
          name="location"
          value={formData.location} 
          icon={MapPin} 
          onChange={handleChange}
        />
      </div>
    </div>
  );
}