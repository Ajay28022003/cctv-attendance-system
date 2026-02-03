import React from 'react';
import { Clock, LogIn, LogOut } from 'lucide-react';

export default function ActivityLogsTable({ data }) {
  if (data.length === 0) return <div className="p-8 text-center text-slate-500 text-sm">No records found matching filters.</div>;

  return (
    <table className="w-full text-left text-sm text-slate-600">
      <thead className="bg-slate-50/50 border-b border-slate-100">
        <tr>
          <th className="px-6 py-4 font-semibold text-slate-700">Camera</th>
          <th className="px-6 py-4 font-semibold text-slate-700">Employee</th>
          <th className="px-6 py-4 font-semibold text-slate-700">Log Time</th>
          <th className="px-6 py-4 font-semibold text-slate-700">Log Type</th>
          
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-100">
        {data.map((log) => (
          <tr key={log.id} className="hover:bg-slate-50 transition">
            <td className="px-6 py-4 font-mono text-slate-500 flex items-center gap-2">
              -
            </td>
            <td className="px-6 py-4">
              <span className="font-medium text-slate-900">{log.emp}</span>
              <span className="text-xs text-slate-400 ml-2">({log.empid})</span>
            </td>
            <td className="px-6 py-4 font-mono text-slate-500 flex items-center gap-2">
              <Clock size={14} className="text-slate-400"/> {log.time}
            </td>
            <td className="px-6 py-4">
              <span className={`flex items-center gap-2 px-2.5 py-1 rounded-full text-xs font-bold w-fit border ${
                log.event === 'Check In' 
                  ? 'bg-blue-50 text-blue-700 border-blue-200' 
                  : 'bg-amber-50 text-amber-700 border-amber-200'
              }`}>
                {log.event === 'Check In' ? <LogIn size={12}/> : <LogOut size={12}/>}
                {log.event}
              </span>
            </td>
            
          </tr>
        ))}
      </tbody>
    </table>
  );
}