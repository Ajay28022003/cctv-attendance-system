import React from 'react';
import { Edit3 } from 'lucide-react';

export default function DetailRow({ label, value, icon: Icon, editable = true, onEdit }) {
  return (
    <div className="group flex items-center justify-between p-4 rounded-xl hover:bg-slate-50 transition-colors duration-200 border border-transparent hover:border-slate-100">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
          <Icon size={18} />
        </div>
        <div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{label}</p>
          <p className="text-sm font-bold text-slate-700 mt-0.5">{value}</p>
        </div>
      </div>
      {editable && (
        <button 
          onClick={onEdit}
          className="text-slate-400 hover:text-blue-600 p-2 rounded-lg hover:bg-white transition-all opacity-0 group-hover:opacity-100"
          title="Edit Field"
        >
          <Edit3 size={16} />
        </button>
      )}
    </div>
  );
}