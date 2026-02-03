import React from 'react';
import { Search, Filter, X, Calendar } from 'lucide-react';

export default function ReportsFilterBar({ filters, setFilters, onClear }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-wrap gap-4 items-center">
      
      {/* 1. Search */}
      <div className="flex-1 min-w-[200px] flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-xl border border-transparent focus-within:border-blue-200 transition">
        <Search size={16} className="text-slate-400" />
        <input
          type="text"
          name="search"
          value={filters.search}
          onChange={handleChange}
          placeholder="Search by Employee..."
          className="w-full bg-transparent text-sm outline-none text-slate-700 placeholder:text-slate-400"
        />
      </div>

      {/* 2. Date Range Filter (Start & End) */}
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 rounded-xl border border-slate-200">
            <span className="text-xs text-slate-400 font-bold uppercase">From:</span>
            <input 
            type="date" 
            name="startDate"
            value={filters.startDate || ''}
            onChange={handleChange}
            className="bg-transparent text-xs text-slate-600 outline-none"
            />
        </div>
        <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 rounded-xl border border-slate-200">
            <span className="text-xs text-slate-400 font-bold uppercase">To:</span>
            <input 
            type="date" 
            name="endDate"
            value={filters.endDate || ''}
            onChange={handleChange}
            className="bg-transparent text-xs text-slate-600 outline-none"
            />
        </div>
      </div>

      {/* 3. Status Dropdown */}
      <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-xl border border-slate-200">
        <Filter size={16} className="text-slate-400" />
        <select 
          name="status" 
          value={filters.status} 
          onChange={handleChange}
          className="bg-transparent text-sm text-slate-600 outline-none cursor-pointer"
        >
          <option value="All">All Status</option>
          <option value="Present">Present</option>
          <option value="Late">Late</option>
          <option value="Absent">Absent</option>
        </select>
      </div>

      {/* 4. Clear Button */}
      {(filters.search || filters.status !== 'All' || filters.startDate || filters.endDate) && (
        <button onClick={onClear} className="flex items-center gap-1 text-xs font-bold text-red-500 hover:text-red-600 transition px-2">
          <X size={14} /> Clear
        </button>
      )}
    </div>
  );
}