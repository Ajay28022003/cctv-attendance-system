import React from 'react';
import { Camera, Shield, Calendar } from 'lucide-react';

export default function ProfileCard({ user }) {
  return (
    <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden relative">
      
      {/* Banner Background */}
      <div className="h-32 bg-gradient-to-r from-blue-600 to-blue-400 relative">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
      </div>

      <div className="px-6 pb-6 text-center relative">
        {/* Avatar with Ring */}
        <div className="relative -mt-16 mb-4 inline-block">
          <div className="w-32 h-32 rounded-full bg-white p-1.5 shadow-xl">
            <div className="w-full h-full rounded-full bg-slate-100 flex items-center justify-center text-4xl font-bold text-slate-300 border border-slate-200 overflow-hidden">
              <img 
                  src={user.avatar} 
                  alt={user.name} 
                  className="w-full h-full object-cover"
              />
            </div>
          </div>
          <button className="absolute bottom-2 right-2 p-2 bg-slate-900 text-white rounded-full hover:bg-blue-600 transition shadow-lg border-4 border-white">
            <Camera size={14} />
          </button>
        </div>

        <h2 className="text-xl font-bold text-slate-800">{user.name}</h2>
        <div className="flex items-center justify-center gap-1.5 text-slate-500 text-sm mt-1">
           <Shield size={12} className="text-blue-500" />
           <span>{user.role}</span>
        </div>

        {/* Status Badge */}
        <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-full border border-emerald-100">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
          Active Account
        </div>

        {/* Mini Stats Grid */}
        <div className="grid grid-cols-2 gap-3 mt-8">
          <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
            <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Department</p>
            <p className="text-sm font-bold text-slate-700 mt-1">{user.department}</p>
          </div>
          <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
            <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Joined</p>
            <div className="flex items-center justify-center gap-1 mt-1">
               <Calendar size={12} className="text-slate-400"/>
               <p className="text-sm font-bold text-slate-700">{user.joinedDate}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}