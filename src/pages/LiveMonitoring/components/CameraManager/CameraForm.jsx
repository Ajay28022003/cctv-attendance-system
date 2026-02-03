import React from 'react';
import { Save, CheckCircle2, Server, MapPin } from 'lucide-react';

export default function CameraForm({ formData, setFormData, onSubmit, onCancel }) {
  return (
    <form onSubmit={onSubmit} className="space-y-8 max-w-lg mx-auto">
      
      {/* Edit Badge */}
      {formData.id && (
        <div className="p-3 bg-blue-50 text-blue-700 border border-blue-100 rounded-xl text-xs font-bold font-mono mb-6 flex items-center gap-2 shadow-sm">
          <CheckCircle2 size={14} className="text-blue-600" /> Editing Camera ID: #{formData.id}
        </div>
      )}

      {/* Name Field */}
      <div className="space-y-3 group">
        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1 group-focus-within:text-blue-600 transition-colors">Camera Name</label>
        <input 
          required 
          type="text" 
          value={formData.cameraName} 
          onChange={(e) => setFormData({...formData, cameraName: e.target.value})} 
          className="w-full p-4 bg-white border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all shadow-sm text-sm font-medium text-slate-700 placeholder:text-slate-300" 
          placeholder="e.g. Main Lobby Camera" 
        />
      </div>

      {/* IP Field */}
      <div className="space-y-3 group">
        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1 group-focus-within:text-blue-600 transition-colors">IP Address</label>
        <div className="relative">
           <Server size={18} className="absolute left-4 top-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
           <input 
            required 
            type="text" 
            value={formData.ipAddress} 
            onChange={(e) => setFormData({...formData, ipAddress: e.target.value})} 
            className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all shadow-sm font-mono text-sm font-medium text-slate-700 placeholder:text-slate-300" 
            placeholder="e.g. 192.168.1.100" 
          />
        </div>
      </div>

      {/* Location Field */}
      <div className="space-y-3 group">
        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1 group-focus-within:text-blue-600 transition-colors">Physical Location</label>
        <div className="relative">
           <MapPin size={18} className="absolute left-4 top-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
           <input 
            required 
            type="text" 
            value={formData.location} 
            onChange={(e) => setFormData({...formData, location: e.target.value})} 
            className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all shadow-sm text-sm font-medium text-slate-700 placeholder:text-slate-300" 
            placeholder="e.g. Building A - Entrance" 
          />
        </div>
      </div>

      {/* Actions */}
      <div className="pt-8 space-y-3">
        <button 
          type="submit" 
          className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl shadow-xl shadow-blue-500/30 hover:shadow-blue-600/40 transition-all flex items-center justify-center gap-2 transform active:scale-[0.98]"
        >
          <Save size={20} /> {formData.id ? 'Save Changes' : 'Add Camera'}
        </button>
        
        {formData.id && (
          <button 
            type="button" 
            onClick={onCancel} 
            className="w-full py-3.5 text-slate-500 font-bold hover:text-slate-800 hover:bg-slate-100 rounded-2xl transition-colors"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}