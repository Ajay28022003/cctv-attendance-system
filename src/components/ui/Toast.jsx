import React, { useEffect } from 'react';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';

const icons = {
  success: <CheckCircle size={20} className="text-green-500" />,
  error: <AlertCircle size={20} className="text-red-500" />,
  info: <Info size={20} className="text-blue-500" />
};

const styles = {
  success: "bg-green-50 border-green-200",
  error: "bg-red-50 border-red-200",
  info: "bg-blue-50 border-blue-200"
};

export default function Toast({ id, message, type = 'info', onClose }) {
  // Auto-dismiss after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(id);
    }, 3000);
    return () => clearTimeout(timer);
  }, [id, onClose]);

  return (
    <div className={`flex items-center gap-3 px-4 py-3 rounded-xl border shadow-lg mb-3 min-w-[300px] animate-in slide-in-from-right-full duration-300 ${styles[type]}`}>
      {icons[type]}
      <p className="flex-1 text-sm font-medium text-slate-700">{message}</p>
      <button onClick={() => onClose(id)} className="text-slate-400 hover:text-slate-600 transition">
        <X size={16} />
      </button>
    </div>
  );
}