import React from 'react';
import { Video } from 'lucide-react';

export default function CameraStatus({ cameras }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-4 px-2">
          <h3 className="text-lg font-bold text-slate-800">Camera Status</h3>
          <button className="text-xs font-medium text-blue-600 hover:underline">View All Cameras</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cameras.map((cam) => (
          <div key={cam.id} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center justify-between group hover:border-blue-100 hover:shadow-md transition-all">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-slate-50 rounded-2xl text-slate-600 group-hover:bg-blue-50 group-hover:text-blue-600 transition">
                <Video size={24} />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-800">{cam.name}</p>
                <p className="text-xs text-slate-400 mt-1">{cam.loc}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className={`relative flex h-2.5 w-2.5`}>
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${cam.bg}`}></span>
                <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${cam.bg}`}></span>
              </span>
              <span className={`text-xs font-bold ${cam.color}`}>{cam.status}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}