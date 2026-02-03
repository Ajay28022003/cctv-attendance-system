import React from 'react';
import { AlertTriangle } from 'lucide-react';

export default function LogoutModal({ isOpen, onClose, onConfirm }) {
  // If not open, render nothing
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* 1. Backdrop (Click to close) */}
      <div 
        className="absolute inset-0 bg-slate-900/20 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />

      {/* 2. Modal Box */}
      <div className="relative bg-white rounded-2xl shadow-2xl p-6 w-full max-w-sm animate-in fade-in zoom-in-95 duration-200 border border-white/20">
        <div className="flex flex-col items-center text-center">
          
          {/* Icon */}
          <div className="w-12 h-12 rounded-full bg-red-50 text-red-500 flex items-center justify-center mb-4">
            <AlertTriangle size={24} />
          </div>
          
          {/* Text */}
          <h3 className="text-lg font-bold text-slate-800">Confirm Logout</h3>
          <p className="text-sm text-slate-500 mt-2 mb-6">
            Are you sure you want to end your session? You will need to sign in again to access the dashboard.
          </p>
          
          {/* Buttons */}
          <div className="flex gap-3 w-full">
            <button 
              onClick={onClose}
              className="flex-1 py-2.5 bg-slate-50 hover:bg-slate-100 text-slate-700 font-medium rounded-xl transition"
            >
              Cancel
            </button>
            <button 
              onClick={onConfirm}
              className="flex-1 py-2.5 bg-red-500 hover:bg-red-600 text-white font-medium rounded-xl shadow-lg shadow-red-200 transition"
            >
              Yes, Logout
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}