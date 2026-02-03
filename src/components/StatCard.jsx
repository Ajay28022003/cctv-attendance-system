import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

export default function StatCard({ title, value, subValue, subLabel, icon: Icon, color, trend = 'up' }) {
  // Determine trend color
  const isPositive = trend === 'up';
  const trendColor = isPositive ? 'text-green-600' : 'text-red-500';
  const TrendIcon = isPositive ? ArrowUpRight : ArrowDownRight;

  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-lg transition-all duration-300 relative overflow-hidden group"
    >
      {/* Background Glow Effect on Hover */}
      <div className={`absolute -right-6 -top-6 w-24 h-24 rounded-full ${color.replace('text-', 'bg-')} opacity-0 group-hover:opacity-10 transition duration-500 blur-2xl pointer-events-none`} />

      <div className="flex justify-between items-start mb-4">
        {/* Icon with colored background */}
        <div className={`p-3 rounded-xl ${color.replace('text-', 'bg-')} bg-opacity-10 ${color}`}>
          <Icon size={24} />
        </div>
        
        {/* Trend Indicator */}
        {subValue && (
          <div className={`flex items-center gap-1 text-xs font-bold ${trendColor} bg-slate-50 px-2 py-1 rounded-full border border-slate-100`}>
             <TrendIcon size={12} />
             <span>{subValue}</span>
          </div>
        )}
      </div>

      <div>
        <h3 className="text-3xl font-bold text-slate-800 tracking-tight">{value}</h3>
        <p className="text-sm font-medium text-slate-400 mt-1">{title}</p>
      </div>

      {/* Optional Sub Label (e.g., "vs last month") */}
      {subLabel && (
        <p className="text-xs text-slate-400 mt-3 border-t border-slate-50 pt-3">
          {subLabel}
        </p>
      )}
    </motion.div>
  );
}