import React from 'react';

export default function DailySummaryTable({ data }) {
  if (data.length === 0) return <div className="p-8 text-center text-slate-500 text-sm">No records found matching filters.</div>;

  return (
    <table className="w-full text-left text-sm text-slate-600">
      <thead className="bg-slate-50/50 border-b border-slate-100">
        <tr>
          <th className="px-6 py-4 font-semibold text-slate-700">Date</th>
          <th className="px-6 py-4 font-semibold text-slate-700">Employee</th>
          <th className="px-6 py-4 font-semibold text-slate-700">First In</th>
          <th className="px-6 py-4 font-semibold text-slate-700">Last Out</th>
          <th className="px-6 py-4 font-semibold text-slate-700">Duration</th>
          <th className="px-6 py-4 font-semibold text-slate-700">Status</th>
          <th className="px-6 py-4 font-semibold text-slate-700">Total Work Hour</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-100">
        {data.map((row) => (
          <tr key={row.id} className="hover:bg-slate-50 transition">
            <td className="px-6 py-4 font-medium text-slate-900">{row.date}</td>
            <td className="px-6 py-4">
              <div>
                <p className="font-medium text-slate-900">{row.emp}</p>
                <p className="text-xs text-slate-400">{row.empid}</p>
              </div>
            </td>
            <td className="px-6 py-4 font-mono text-green-600 bg-green-50/30 rounded-lg w-fit">{row.firstIn}</td>
            <td className="px-6 py-4 font-mono text-slate-500">{row.lastOut}</td>
            <td className="px-6 py-4 font-mono font-medium">{row.duration}</td>
            <td className="px-6 py-4">
              <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${
                row.status === 'Present' ? 'bg-green-100 text-green-700 border-green-200' :
                row.status === 'Late' ? 'bg-orange-100 text-orange-700 border-orange-200' :
                'bg-red-100 text-red-700 border-red-200'
              }`}>
                {row.status}
              </span>
            </td>
            <td className='px-6 py-4'>
                {row.totalWorkHour}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}