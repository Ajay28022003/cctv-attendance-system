import React from 'react';
import { User, Mail, Briefcase, BadgeCheck, Phone, Camera } from 'lucide-react';

export default function EmployeeDetailsStep({ 
  formData, 
  handleChange, 
  profileImagePreview, 
  handleProfileUpload, 
  profileInputRef 
}) {
  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="flex gap-8 items-start">
        
        {/* Left: Profile Photo */}
        <div className="flex flex-col items-center gap-3">
          <div 
            onClick={() => profileInputRef.current?.click()}
            className="relative w-28 h-28 rounded-full bg-slate-50 border-2 border-dashed border-slate-300 flex items-center justify-center cursor-pointer hover:border-blue-400 transition group overflow-hidden shrink-0"
          >
            {profileImagePreview ? (
              <img src={profileImagePreview} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <Camera size={32} className="text-slate-300 group-hover:text-blue-500 transition" />
            )}
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
              <p className="text-[10px] text-white font-bold uppercase">Change</p>
            </div>
          </div>
          <p className="text-xs font-bold text-slate-500">Profile Photo</p>
          <input type="file" ref={profileInputRef} hidden accept="image/*" onChange={handleProfileUpload} />
        </div>

        {/* Right: Form Fields */}
        <div className="flex-1 grid grid-cols-2 gap-5">
          <InputField 
            icon={BadgeCheck} label="Employee ID" name="empid" 
            value={formData.empid} onChange={handleChange} placeholder="EMP-001" 
          />
          <InputField 
            icon={User} label="Full Name" name="name" 
            value={formData.name} onChange={handleChange} placeholder="John Doe" 
          />
          <InputField 
            icon={Mail} label="Email" name="email" 
            value={formData.email} onChange={handleChange} placeholder="john@co.com" 
          />
          <InputField 
            icon={Phone} label="Phone" name="phone" 
            value={formData.phone} onChange={handleChange} placeholder="+1 234 567 890" 
          />
          
          <div className="col-span-2 space-y-1.5">
            <label className="text-xs font-bold text-slate-500 uppercase">Role *</label>
            <div className="flex items-center gap-2 px-3 py-2.5 bg-slate-50 rounded-xl border focus-within:border-blue-500 transition">
              <Briefcase size={16} className="text-slate-400" />
              <select name="role" value={formData.role} onChange={handleChange} className="bg-transparent text-sm w-full outline-none cursor-pointer">
                <option>Developer</option>
                <option>Designer</option>
                <option>HR Manager</option>
                <option>Sales</option>
              </select>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

// Small helper component for cleaner code
const InputField = ({ icon: Icon, label, name, value, onChange, placeholder }) => (
  <div className="space-y-1.5">
    <label className="text-xs font-bold text-slate-500 uppercase">{label} *</label>
    <div className="flex items-center gap-2 px-3 py-2.5 bg-slate-50 rounded-xl border focus-within:border-blue-500 transition">
      <Icon size={16} className="text-slate-400" />
      <input 
        name={name} 
        value={value} 
        onChange={onChange} 
        className="bg-transparent text-sm w-full outline-none" 
        placeholder={placeholder} 
      />
    </div>
  </div>
);