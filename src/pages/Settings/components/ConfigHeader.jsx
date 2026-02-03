import React from 'react';
import { Info, AlertCircle } from 'lucide-react';

export default function ConfigHeader({ 
  title = "System Calibration", 
  description = "Adjusting these values will directly impact the AI's detection accuracy.",
  variant = "info" // 'info' or 'warning'
}) {
  
  const styles = {
    info: {
      bg: "bg-blue-50",
      border: "border-blue-100",
      iconBg: "bg-blue-100 text-blue-600",
      title: "text-blue-900",
      text: "text-blue-700/80"
    },
    warning: {
      bg: "bg-amber-50",
      border: "border-amber-100",
      iconBg: "bg-amber-100 text-amber-600",
      title: "text-amber-900",
      text: "text-amber-700/80"
    }
  };

  const currentStyle = styles[variant] || styles.info;

  return (
    <div className={`${currentStyle.bg} border ${currentStyle.border} rounded-2xl p-5 flex items-start gap-4 mb-8 transition-all`}>
      <div className={`p-2 rounded-lg shrink-0 shadow-sm ${currentStyle.iconBg}`}>
        {variant === 'warning' ? <AlertCircle size={20} /> : <Info size={20} />}
      </div>
      <div>
        <h4 className={`font-bold text-sm ${currentStyle.title}`}>{title}</h4>
        <p className={`text-xs mt-1 leading-relaxed max-w-3xl ${currentStyle.text}`}>
          {description}
        </p>
      </div>
    </div>
  );
}