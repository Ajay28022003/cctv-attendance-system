import React, { useState, useEffect, useRef } from 'react';
import { X, User, Mail, Briefcase, BadgeCheck, Phone, Save, Lock, Camera, Building2 } from 'lucide-react';

export default function UpdateEmployeeModal({ isOpen, onClose, onSave, employee }) {
  const [formData, setFormData] = useState({
    name: '',
    empid: '',
    email: '',
    phone: '',
    role: 'Developer',
    department: 'Engineering', // 1. Add Department to initial state
    image: null 
  });

  const [previewUrl, setPreviewUrl] = useState(null);
  const fileInputRef = useRef(null);

  // Load employee data when the modal opens or employee changes
  useEffect(() => {
    if (employee) {
      setFormData({
        name: employee.name || '',
        empid: employee.empid || '',
        email: employee.email || '',
        phone: employee.phone || '',
        role: employee.role || 'Developer',
        department: employee.department || 'Engineering', // 2. Load Department
        image: employee.image || null
      });
      setPreviewUrl(employee.image || null);
    }
  }, [employee, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
      setFormData(prev => ({ ...prev, image: objectUrl }));
    }
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.email || !formData.phone) {
      return alert("Please fill in all fields.");
    }
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity" onClick={onClose} />
      
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 bg-white z-10">
          <div>
            <h2 className="text-xl font-bold text-slate-800">Update Employee</h2>
            <p className="text-xs text-slate-500 mt-1">Modify staff details. ID and Biometric data cannot be changed.</p>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 rounded-full transition"><X size={20} /></button>
        </div>

        <div className="p-6 space-y-6 overflow-y-auto custom-scrollbar">
          
          {/* PROFILE IMAGE UPLOAD */}
          <div className="flex flex-col items-center justify-center mb-2">
            <div className="relative group cursor-pointer" onClick={() => fileInputRef.current.click()}>
              <div className="w-24 h-24 rounded-full border-4 border-slate-50 bg-slate-100 overflow-hidden shadow-sm group-hover:border-blue-100 transition-all">
                {previewUrl ? (
                  <img src={previewUrl} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-300">
                    <User size={40} />
                  </div>
                )}
              </div>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 rounded-full transition-all flex items-center justify-center">
                 <div className="absolute bottom-0 right-0 p-2 bg-blue-600 text-white rounded-full shadow-lg border-2 border-white group-hover:scale-110 transition-transform">
                    <Camera size={14} />
                 </div>
              </div>
              <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                accept="image/*" 
                onChange={handleImageChange}
              />
            </div>
            <p className="text-[10px] text-slate-400 font-bold mt-2 uppercase tracking-wide">Change Photo</p>
          </div>

          <div className="grid grid-cols-2 gap-5">
            
            {/* 1. EMPLOYEE ID */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase flex items-center gap-1">
                Employee ID <Lock size={10} className="text-slate-400"/>
              </label>
              <div className="flex items-center gap-2 px-3 py-2.5 bg-slate-100 rounded-xl border border-slate-200 cursor-not-allowed">
                <BadgeCheck size={16} className="text-slate-400" />
                <input 
                  type="text" 
                  value={formData.empid} 
                  disabled 
                  className="bg-transparent text-sm w-full outline-none text-slate-500 font-mono cursor-not-allowed" 
                />
              </div>
            </div>

            {/* 2. Full Name */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase">Full Name</label>
              <div className="flex items-center gap-2 px-3 py-2.5 bg-slate-50 rounded-xl border border-transparent focus-within:border-blue-500/50 focus-within:bg-white transition">
                <User size={16} className="text-slate-400" />
                <input 
                  name="name" 
                  value={formData.name} 
                  onChange={handleChange} 
                  type="text" 
                  className="bg-transparent text-sm w-full outline-none text-slate-700" 
                />
              </div>
            </div>

            {/* 3. Email */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase">Email Address</label>
              <div className="flex items-center gap-2 px-3 py-2.5 bg-slate-50 rounded-xl border border-transparent focus-within:border-blue-500/50 focus-within:bg-white transition">
                <Mail size={16} className="text-slate-400" />
                <input 
                  name="email" 
                  value={formData.email} 
                  onChange={handleChange} 
                  type="email" 
                  className="bg-transparent text-sm w-full outline-none text-slate-700" 
                />
              </div>
            </div>

            {/* 4. Phone */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase">Phone Number</label>
              <div className="flex items-center gap-2 px-3 py-2.5 bg-slate-50 rounded-xl border border-transparent focus-within:border-blue-500/50 focus-within:bg-white transition">
                <Phone size={16} className="text-slate-400" />
                <input 
                  name="phone" 
                  value={formData.phone} 
                  onChange={handleChange} 
                  type="tel" 
                  className="bg-transparent text-sm w-full outline-none text-slate-700" 
                />
              </div>
            </div>

            {/* 5. Role (Removed col-span-2 to share row) */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase">Role</label>
              <div className="flex items-center gap-2 px-3 py-2.5 bg-slate-50 rounded-xl border border-transparent focus-within:border-blue-500/50 focus-within:bg-white transition">
                <Briefcase size={16} className="text-slate-400" />
                <select 
                  name="role" 
                  value={formData.role} 
                  onChange={handleChange} 
                  className="bg-transparent text-sm w-full outline-none text-slate-700 cursor-pointer"
                >
                  <option>Developer</option>
                  <option>Designer</option>
                  <option>HR Manager</option>
                  <option>Sales</option>
                  <option>Manager</option>
                </select>
              </div>
            </div>

            {/* 6. Department (New Field) */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase">Department</label>
              <div className="flex items-center gap-2 px-3 py-2.5 bg-slate-50 rounded-xl border border-transparent focus-within:border-blue-500/50 focus-within:bg-white transition">
                <Building2 size={16} className="text-slate-400" />
                <select 
                  name="department" 
                  value={formData.department} 
                  onChange={handleChange} 
                  className="bg-transparent text-sm w-full outline-none text-slate-700 cursor-pointer"
                >
                  <option>Engineering</option>
                  <option>Marketing</option>
                  <option>Human Resources</option>
                  <option>Operations</option>
                  <option>Sales</option>
                </select>
              </div>
            </div>

          </div>

          <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 flex gap-3 items-start">
             <Lock size={16} className="text-blue-500 mt-0.5 shrink-0" />
             <div className="space-y-1">
                <p className="text-xs font-bold text-blue-800">Security Restriction</p>
                <p className="text-[11px] text-blue-600 leading-relaxed">
                   To update Training Images (Face ID) or Biometric Data, please delete this user profile and create a new one. This ensures data integrity in the facial recognition model.
                </p>
             </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-6 pt-4 border-t border-slate-100 flex gap-3 bg-white z-10">
          <button onClick={onClose} className="flex-1 py-2.5 bg-white border border-slate-200 text-slate-600 font-medium rounded-xl hover:bg-slate-50 transition">Cancel</button>
          <button onClick={handleSubmit} className="flex-1 py-2.5 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-200 transition flex items-center justify-center gap-2">
            <Save size={18} /> Update Details
          </button>
        </div>

      </div>
    </div>
  );
}