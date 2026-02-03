import React from 'react';
import { Search, Video, Edit, Trash2, Server, MapPin } from 'lucide-react';

export default function CameraList({ cameras, onEdit, onDelete }) {
  return (
    <div className="space-y-5">
      {/* Search Bar */}
      <div className="relative mb-8 group">
         <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
           <Search size={18} className="text-slate-400 group-focus-within:text-blue-500 transition-colors" />
         </div>
         <input 
          type="text" 
          placeholder="Search by name, IP, or location..." 
          className="w-full pl-12 pr-4 py-3.5 bg-white border border-slate-200 rounded-2xl text-sm font-medium focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all shadow-sm"
         />
      </div>

      {/* Camera Cards */}
      {cameras.map((cam) => (
        <div key={cam.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg hover:border-blue-200 transition-all duration-300 group flex items-start gap-5">
          
          {/* Icon */}
          <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300 shadow-sm">
            <Video size={24} />
          </div>

          {/* Details */}
          <div className="flex-1 min-w-0 pt-1">
            <div className="flex justify-between items-start">
              <h4 className="font-bold text-slate-800 text-base truncate group-hover:text-blue-700 transition-colors">{cam.cameraName}</h4>
              
              {/* Actions */}
              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0">
                <button onClick={() => onEdit(cam)} className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors">
                  <Edit size={16} />
                </button>
                <button onClick={() => onDelete(cam.id)} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
            
            <div className="flex flex-col gap-2 mt-2">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-500 bg-slate-100 w-fit px-2.5 py-1 rounded-lg border border-slate-200">
                <Server size={12} className="text-slate-400" /> <span className="font-mono">{cam.ipAddress}</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-medium text-slate-400 pl-1">
                <MapPin size={12} /> {cam.location}
              </div>
            </div>
          </div>
        </div>
      ))}
      
      {cameras.length === 0 && (
         <div className="flex flex-col items-center justify-center py-16 text-center border-2 border-dashed border-slate-200 rounded-3xl bg-slate-50/50">
           <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-slate-300 mb-3"><Video size={20}/></div>
           <p className="text-slate-500 font-medium">No cameras found.</p>
         </div>
      )}
    </div>
  );
}