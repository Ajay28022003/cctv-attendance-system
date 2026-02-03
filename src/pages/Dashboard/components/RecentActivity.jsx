import React from 'react';

export default function RecentActivity({ activities }) {
  return (
    <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex flex-col h-[420px]">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-xl font-bold text-slate-800">Recent Activity</h3>
          <p className="text-sm text-slate-400 mt-1">Live entry logs</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-4">
        {activities.map((item) => (
          <div key={item.id} className="flex items-center justify-between p-4 rounded-2xl hover:bg-slate-50 transition border border-transparent hover:border-slate-100 group cursor-default">
            <div className="flex items-center gap-4">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
                item.type === 'success' ? 'bg-emerald-100 text-emerald-600' :
                item.type === 'warning' ? 'bg-orange-100 text-orange-600' :
                'bg-slate-100 text-slate-600'
              }`}>
                {item.name.charAt(0)}
              </div>
              <div>
                <p className="text-sm font-bold text-slate-800 group-hover:text-blue-600 transition">{item.name}</p>
                <p className="text-xs text-slate-400 mt-0.5">{item.loc}</p>
              </div>
            </div>
            <div className="text-right">
              <p className={`text-xs font-bold ${
                item.type === 'success' ? 'text-emerald-600' :
                item.type === 'warning' ? 'text-orange-500' :
                'text-blue-500'
              }`}>{item.status}</p>
              <p className="text-xs text-slate-400 mt-0.5">{item.time}</p>
            </div>
          </div>
        ))}
      </div>
      <button className="w-full mt-4 py-3 text-sm font-bold text-slate-600 bg-slate-50 rounded-xl hover:bg-slate-100 hover:text-slate-800 transition">
        View All Activity
      </button>
    </div>
  );
}