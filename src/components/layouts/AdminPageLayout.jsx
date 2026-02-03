import React from 'react';

export default function AdminPageLayout({ title, description, action, children }) {
  return (
    <div className="h-full flex flex-col relative animate-in fade-in duration-500">
      {/* 1. Sticky Header with Glass Effect */}
      <header className="flex-none px-8 py-6 border-b border-slate-100 bg-white/80 backdrop-blur-md sticky top-0 z-20">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <div>
            <h1 className="text-2xl font-bold text-slate-800 tracking-tight">{title}</h1>
            {description && (
              <p className="text-slate-500 text-sm mt-1">{description}</p>
            )}
          </div>
          {/* Action Button Area */}
          {action && <div>{action}</div>}
        </div>
      </header>

      {/* 2. Scrollable Content Area */}
      <main className="flex-1 overflow-y-auto p-8 custom-scrollbar">
        <div className="max-w-7xl mx-auto space-y-8">
          {children}
        </div>
      </main>
    </div>
  );
}