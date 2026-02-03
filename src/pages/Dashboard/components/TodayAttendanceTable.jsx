import React from 'react';
import { Eye, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // 1. Import Hook

export default function TodayAttendanceTable({ data }) {
  const navigate = useNavigate(); // 2. Initialize Hook

  return (
    <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden flex flex-col">
      
      {/* Header */}
      <div className="px-8 py-6 border-b border-slate-50 flex justify-between items-center">
        <div>
          <h3 className="text-lg font-bold text-slate-800">Today's Live Attendance</h3>
          <p className="text-sm text-slate-400 mt-1">Real-time check-in logs</p>
        </div>
        
        {/* 3. Add onClick Handler */}
        <button 
          onClick={() => navigate('/reports')} 
          className="flex items-center gap-1 text-sm font-bold text-blue-600 hover:text-blue-700 transition"
        >
          View Full Report <ArrowRight size={16} />
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-slate-50/50 text-slate-500 font-semibold">
            <tr>
              <th className="px-8 py-4">Employee</th>
              <th className="px-8 py-4">Role</th>
              <th className="px-8 py-4">Check-In Time</th>
              <th className="px-8 py-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {data.map((row, index) => (
              <tr key={index} className="hover:bg-slate-50/80 transition">
                <td className="px-8 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-xs font-bold border border-blue-100">
                      {row.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-slate-800">{row.name}</p>
                      <p className="text-xs text-slate-400">{row.empid}</p>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-4 font-medium">{row.role}</td>
                <td className="px-8 py-4 font-mono text-slate-500">{row.time}</td>
                <td className="px-8 py-4">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${
                    row.status === 'On Time' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                    row.status === 'Late' ? 'bg-orange-50 text-orange-600 border-orange-100' :
                    'bg-slate-50 text-slate-500 border-slate-100'
                  }`}>
                    {row.status}
                  </span>
                </td>
                
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}