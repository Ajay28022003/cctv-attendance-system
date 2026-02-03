import React, { useState } from 'react';
import { Settings2, List, Plus, X, Cpu, HardDrive, Activity, RefreshCw } from 'lucide-react';

export default function ManagerSidebarRail({ activeTab, onTabChange, onClose }) {

  return (
    <div className="w-24 bg-white flex flex-col items-center py-8 gap-6 shrink-0 border-r border-slate-100 relative z-50">
      {/* 1. SYSTEM DIAGNOSTICS TOGGLE (Project Blue Theme) */}
      <div className="relative">
         <button onClick={onClose} className="p-4 text-slate-300 hover:text-red-500 transition hover:bg-red-50 rounded-xl mb-2">
        <X size={24} />
      </button>
      </div>
      {/* Navigation Buttons */}
      <div className="flex flex-col gap-4 w-full px-3">
        <button 
          onClick={() => onTabChange('list')}
          className={`p-3.5 rounded-2xl transition-all duration-300 flex flex-col items-center gap-1.5 group ${
            activeTab === 'list' 
            ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30 ring-1 ring-blue-500' 
            : 'text-slate-400 hover:text-blue-600 hover:bg-blue-50'
          }`}
        >
          <List size={20} />
          <span className="text-[10px] font-bold tracking-wide">List</span>
        </button>
        <button 
          onClick={() => onTabChange('add')}
          className={`p-3.5 rounded-2xl transition-all duration-300 flex flex-col items-center gap-1.5 group ${
            activeTab === 'add' 
            ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30 ring-1 ring-blue-500' 
            : 'text-slate-400 hover:text-blue-600 hover:bg-blue-50'
          }`}
        >
          <Plus size={20} />
          <span className="text-[10px] font-bold tracking-wide">Add</span>
        </button>
      </div>
      <div className="flex-1" />
    </div>
  );
}