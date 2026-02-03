import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export default function ReportsChart({ data }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
      
      {/* 1. Bar Chart Container */}
      <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-bold text-slate-800">Weekly Attendance Trends</h3>
          <select className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-slate-600 outline-none">
            <option>Last 7 Days</option>
            <option>Last 30 Days</option>
          </select>
        </div>
        
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} barGap={8}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis 
                dataKey="day" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#94a3b8', fontSize: 12 }} 
                dy={10}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#94a3b8', fontSize: 12 }} 
              />
              <Tooltip
                cursor={{ fill: '#f8fafc' }}
                contentStyle={{ 
                  borderRadius: '12px', 
                  border: 'none', 
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)' 
                }}
              />
              <Legend 
                iconType="circle" 
                wrapperStyle={{ paddingTop: '20px' }} 
                formatter={(value) => <span className="text-slate-600 text-sm font-medium ml-1">{value}</span>}
              />
              <Bar 
                dataKey="present" 
                name="On Time" 
                fill="#3b82f6" 
                radius={[4, 4, 0, 0]} 
                maxBarSize={40} 
              />
              <Bar 
                dataKey="late" 
                name="Late Arrival" 
                fill="#f59e0b" 
                radius={[4, 4, 0, 0]} 
                maxBarSize={40} 
              />
              <Bar 
                dataKey="absent" 
                name="Absent" 
                fill="#ef4444" 
                radius={[4, 4, 0, 0]} 
                maxBarSize={40} 
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 2. Summary Stats Card (Right Side) */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-center">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-6">Today's Snapshot</h4>
          
          <div className="space-y-6">
            {/* Stat 1 */}
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-slate-600">Present</span>
                <span className="text-sm font-bold text-green-600">92%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                <div className="bg-green-500 h-full rounded-full transition-all duration-1000 ease-out" style={{ width: '92%' }}></div>
              </div>
            </div>

            {/* Stat 2 */}
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-slate-600">Late Arrivals</span>
                <span className="text-sm font-bold text-orange-500">8%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                <div className="bg-orange-400 h-full rounded-full transition-all duration-1000 ease-out" style={{ width: '8%' }}></div>
              </div>
            </div>

            {/* Footer */}
            <div className="pt-6 mt-2 border-t border-slate-100">
              <p className="text-xs text-slate-400">
                Data updated automatically.<br/>Last sync: Just now
              </p>
            </div>
          </div>
      </div>

    </div>
  );
}