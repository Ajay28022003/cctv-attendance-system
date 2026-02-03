import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

export default function ProStatCard({ title, value, subValue, icon: Icon, trend, theme, withBorder = false }) {
  
  // 1. Helper: Determine Hover Colors based on Title (Only for White cards)
  const getHoverStyles = () => {
    // If it's a solid colored card (not white), just lift it slightly
    if (theme !== 'white') {
      return 'hover:-translate-y-1 hover:shadow-lg border-transparent'; 
    }

    const t = title.toLowerCase();

    // Red/Rose for "Absent" or "Offline"
    if (t.includes('absent') || t.includes('offline') || t.includes('alert')) {
      return 'border-r-red-500 hover:shadow-red-50 hover:border-red-400 hover:-translate-y-1';
    }
    
    // Green/Emerald for "Active" or "Present"
    if (t.includes('active') || t.includes('present') || t.includes('online')) {
      return 'border-r-emerald-500 hover:shadow-emerald-50 hover:border-emerald-400 hover:-translate-y-1';
    }

    // Blue for "Total" or general stats
    if (t.includes('total') || t.includes('employees') || t.includes('registered')) {
      return 'border-r-blue-500 hover:shadow-blue-50 hover:border-blue-400 hover:-translate-y-1';
    }

    // Orange for "Late" or "Warning"
    if (t.includes('late') || t.includes('warning')) {
      return 'border-r-orange-500 hover:shadow-orange-50 hover:border-orange-400 hover:-translate-y-1';
    }

    // Default Fallback
    return 'border-r-slate-200 hover:-translate-y-1 hover:shadow-lg';
  };

  // 2. Base Themes
  const themes = {
    blue: "bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-blue-200 shadow-md",
    white: "bg-white border border-slate-100 text-slate-800 shadow-sm",
    orange: "bg-gradient-to-br from-orange-400 to-orange-500 text-white shadow-orange-200 shadow-md",
  };

  const isDark = theme !== 'white';
  
  // 3. Resolve Border Logic
  // If 'withBorder' is true OR it's a white card, we apply the dynamic border width (border-r-4)
  const borderClass = (withBorder && theme === 'white') ? "border-r-4" : "";

  return (
    <div 
      className={`
        relative p-6 rounded-3xl h-full flex flex-col justify-between overflow-hidden transition-all duration-300
        ${themes[theme] || themes.white} 
        ${borderClass}
        ${getHoverStyles()} 
      `}
    >
      
      {/* Abstract Background Decoration for Colored Cards */}
      {isDark && (
        <>
          <div className="absolute top-0 right-0 -mt-8 -mr-8 w-32 h-32 bg-white opacity-10 rounded-full blur-2xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 -mb-8 -ml-8 w-24 h-24 bg-black opacity-5 rounded-full blur-xl pointer-events-none"></div>
        </>
      )}

      {/* Header Section */}
      <div className="relative z-10 flex justify-between items-start mb-4">
        <div>
          <p className={`text-sm font-medium ${isDark ? 'text-blue-100' : 'text-slate-500'}`}>{title}</p>
          <h3 className="text-3xl font-bold tracking-tight mt-1">{value}</h3>
        </div>
        <div className={`p-3 rounded-2xl ${isDark ? 'bg-white/20 backdrop-blur-sm text-white' : 'bg-slate-50 text-slate-600'}`}>
          <Icon size={22} />
        </div>
      </div>

      {/* Footer Section */}
      <div className={`relative z-10 flex items-center gap-2 text-xs font-medium ${isDark ? 'text-white/90' : 'text-slate-500'}`}>
        <span className={`flex items-center gap-1 ${
           isDark ? 'text-white' : 
           trend === 'up' ? 'text-emerald-600' : 
           trend === 'down' ? 'text-rose-600' : 'text-slate-500'
        }`}>
          {trend === 'up' && <ArrowUpRight size={14} />}
          {trend === 'down' && <ArrowDownRight size={14} />}
          {subValue}
        </span>
      </div>
    </div>
  );
}