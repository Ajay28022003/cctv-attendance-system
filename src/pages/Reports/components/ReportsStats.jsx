import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

export default function ReportsStats({ stats }) {

  // Helper function to determine colors based on the Title
  const getCardStyles = (title) => {
    const t = title.toLowerCase();

    // 1. Avg Attendance -> Green
    if (t.includes('avg') || t.includes('attendance')) {
      return 'border-r-emerald-500 hover:shadow-emerald-100 hover:border-emerald-200';
    }
    // 2. Late Arrivals -> Orange
    if (t.includes('late')) {
      return 'border-r-orange-500 hover:shadow-orange-100 hover:border-orange-200';
    }
    // 3. Absences -> Red
    if (t.includes('absences') || t.includes('absent')) {
      return 'border-r-red-500 hover:shadow-red-100 hover:border-red-200';
    }
    // 4. Total Records -> Blue
    if (t.includes('total') || t.includes('records')) {
      return 'border-r-blue-500 hover:shadow-blue-100 hover:border-blue-200';
    }
    // Default
    return 'border-r-slate-200';
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {stats.map((stat, index) => (
        <div 
          key={index} 
          // Added: border-r-4, transition, hover effects, and dynamic style function
          className={`bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between border-r-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${getCardStyles(stat.title)}`}
        >
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{stat.title}</p>
            <h3 className="text-2xl font-bold text-slate-800 mt-1">{stat.value}</h3>
          </div>
          
          <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
            {stat.trend === 'up' && <TrendingUp size={20} />}
            {stat.trend === 'down' && <TrendingDown size={20} />}
            {stat.trend === 'neutral' && <Minus size={20} />}
          </div>
        </div>
      ))}
    </div>
  );
}