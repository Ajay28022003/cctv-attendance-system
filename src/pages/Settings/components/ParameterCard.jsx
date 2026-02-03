import React from 'react';

export default function ParameterCard({ 
  title, 
  description, 
  value, 
  unit, 
  icon: Icon, 
  onChange, 
  min, 
  max,
  step = "0.1",
  theme = "blue" // 'blue' or 'orange' (for temperature)
}) {
  
  const themeStyles = {
    blue: {
      iconBg: "bg-blue-50 text-blue-600",
      borderFocus: "focus-within:border-blue-500 focus-within:ring-blue-500/10",
      range: "accent-blue-600"
    },
    orange: {
      iconBg: "bg-orange-50 text-orange-600",
      borderFocus: "focus-within:border-orange-500 focus-within:ring-orange-500/10",
      range: "accent-orange-500"
    }
  };

  const styles = themeStyles[theme] || themeStyles.blue;

  return (
    <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 group">
      
      {/* Header Section */}
      <div className="flex items-start gap-4 mb-6">
        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm ${styles.iconBg} transition-transform group-hover:scale-110`}>
          <Icon size={28} />
        </div>
        <div>
          <h3 className="text-lg font-bold text-slate-800">{title}</h3>
          <p className="text-sm text-slate-400 font-medium leading-relaxed max-w-xs">{description}</p>
        </div>
      </div>

      {/* Input Section */}
      <div className={`flex items-center gap-4 bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 transition-all duration-300 ${styles.borderFocus} focus-within:ring-4 focus-within:bg-white`}>
        
        {/* Number Input */}
        <input 
          type="number" 
          value={value}
          min={min}
          max={max}
          step={step}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 bg-transparent text-3xl font-bold text-slate-700 outline-none placeholder:text-slate-300 w-full"
        />
        
        {/* Unit Badge */}
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider bg-white px-2 py-1 rounded-md shadow-sm border border-slate-100">
          {unit}
        </span>
      </div>

      {/* Range Slider for Visual Feedback */}
      <div className="mt-6">
        <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
           <span>Min: {min}</span>
           <span>Current: {value}</span>
           <span>Max: {max}</span>
        </div>
        <input 
          type="range" 
          min={min} 
          max={max} 
          step={step}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer ${styles.range}`} 
        />
      </div>

    </div>
  );
}