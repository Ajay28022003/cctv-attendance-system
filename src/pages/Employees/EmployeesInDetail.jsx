import React, { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Mail, Phone, Clock, Hash, Calendar, ShieldCheck, 
  MapPin, Briefcase, TrendingUp, AlertCircle, CheckCircle2, Shield
} from 'lucide-react';
import AdminPageLayout from '../../components/layouts/AdminPageLayout';
import employees from "../../data/employee.json";


const DetailItem = ({ icon: Icon, label, value }) => (
  <div className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50 transition-colors group border border-transparent hover:border-slate-100">
    <div className="p-2.5 bg-blue-50 text-blue-600 rounded-full group-hover:bg-blue-600 group-hover:text-white transition-colors shadow-sm">
      <Icon size={16} />
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">{label}</p>
      <p className="text-sm font-bold text-slate-700 truncate">{value || 'N/A'}</p>
    </div>
  </div>
);

const StatCard = ({ label, value, subtext, color, icon: Icon }) => (
  <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-start justify-between group hover:shadow-md transition-all duration-300">
    <div>
      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">{label}</p>
      <h3 className="text-2xl font-bold text-slate-800">{value}</h3>
      <p className={`text-xs font-medium mt-1 ${color}`}>{subtext}</p>
    </div>
    <div className={`p-3 rounded-xl bg-opacity-10 group-hover:scale-110 transition-transform ${color.replace('text-', 'bg-')}`}>
      <Icon size={20} className={color} />
    </div>
  </div>
);

const StatusBadge = ({ status }) => {
  let styles = 'bg-slate-50 text-slate-600 border-slate-200'; 
  let dotColor = 'bg-slate-400';

  if (status === 'Active' || status === 'Present') {
    styles = 'bg-emerald-50 text-emerald-700 border-emerald-100';
    dotColor = 'bg-emerald-500';
  } else if (status === 'Late') {
    styles = 'bg-amber-50 text-amber-700 border-amber-100';
    dotColor = 'bg-amber-500';
  } else if (status === 'Absent' || status === 'Inactive') {
    styles = 'bg-rose-50 text-rose-700 border-rose-100';
    dotColor = 'bg-rose-500';
  }

  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${styles}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${dotColor} animate-pulse`} />
      {status}
    </span>
  );
};

export default function EmployeesInDetail() {
  const { id } = useParams(); 
  const navigate = useNavigate();

  const employee = employees.find(emp => emp.empid === id);

  const stats = useMemo(() => {
    if (!employee || !employee.attendance) return { rate: '0%', lates: 0, onTime: 0 };
    const total = employee.attendance.length;
    const present = employee.attendance.filter(a => a.status === 'Present').length;
    const lates = employee.attendance.filter(a => a.status === 'Late').length;
    const rate = total > 0 ? Math.round(((present + lates) / total) * 100) : 0;
    return { rate: `${rate}%`, lates, onTime: present };
  }, [employee]);

  if (!employee) {
    return (
        <AdminPageLayout title="Employee Details">
            <div className="flex flex-col items-center justify-center h-[60vh] text-center">
                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                  <ShieldCheck className="text-slate-300" size={32} />
                </div>
                <h3 className="text-xl font-bold text-slate-800">Employee Not Found</h3>
                <button onClick={() => navigate(-1)} className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition">Return to Directory</button>
            </div>
        </AdminPageLayout>
    )
  }

  return (
    <AdminPageLayout
      title="Employee Profile"
      description="Manage personnel details and view activity logs."
      action={
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 font-bold text-xs uppercase tracking-wide rounded-xl transition shadow-sm hover:text-blue-600">
          <ArrowLeft size={16} /> Back
        </button>
      }
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* --- LEFT COLUMN: PROFILE CARD --- */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden relative">
            
            {/* 1. PLAIN BLUE BANNER (Updated) */}
            <div className="h-32 bg-blue-500 relative"></div>

            {/* 2. Floating Avatar & Identity */}
            <div className="px-6 pb-6 text-center relative">
              <div className="relative -mt-16 mb-4 inline-block">
                <div className="w-32 h-32 rounded-full bg-white p-1.5 shadow-xl">
                  <div className="w-full h-full rounded-full bg-slate-100 flex items-center justify-center border border-slate-200 overflow-hidden">
                     {employee.image ? (
                        <img src={employee.image} alt={employee.name} className="w-full h-full object-cover" />
                     ) : (
                        <span className="text-4xl font-bold text-slate-300">{employee.name.charAt(0)}</span>
                     )}
                  </div>
                </div>
                {/* Status Indicator Dot */}
                <div className={`absolute bottom-2 right-2 w-6 h-6 rounded-full border-4 border-white ${employee.status === 'Active' ? 'bg-emerald-500' : 'bg-slate-400'}`}></div>
              </div>

              <h2 className="text-xl font-bold text-slate-800">{employee.name}</h2>
              <div className="flex items-center justify-center gap-1.5 text-slate-500 text-sm mt-1">
                 <Shield size={12} className="text-blue-500" />
                 <span>{employee.role}</span>
              </div>

              <div className="mt-4">
                 <StatusBadge status={employee.status} />
              </div>

              {/* 3. Mini Stats Grid */}
              <div className="grid grid-cols-2 gap-3 mt-8">
                <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                  <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Department</p>
                  <p className="text-sm font-bold text-slate-700 mt-1">Engineering</p>
                </div>
                <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                  <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Joined</p>
                  <div className="flex items-center justify-center gap-1 mt-1">
                     <Calendar size={12} className="text-slate-400"/>
                     <p className="text-sm font-bold text-slate-700">Oct 2023</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 4. Detailed Contact Info */}
            <div className="p-6 pt-0 space-y-2">
              <div className="border-t border-slate-100 mb-6"></div>
              <DetailItem icon={Hash} label="Employee ID" value={employee.empid} />
              <DetailItem icon={Mail} label="Email Address" value={employee.email} />
              <DetailItem icon={Phone} label="Phone Number" value={employee.phone} />
            </div>

          </div>
        </div>

        {/* --- RIGHT COLUMN: STATS & HISTORY (Unchanged) --- */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Stats Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
             <StatCard 
                label="Attendance Rate" 
                value={stats.rate} 
                subtext="Last 30 Days" 
                color="text-emerald-600" 
                icon={TrendingUp} 
             />
             <StatCard 
                label="On-Time Arrivals" 
                value={stats.onTime} 
                subtext="Great consistency" 
                color="text-blue-600" 
                icon={CheckCircle2} 
             />
             <StatCard 
                label="Late Arrivals" 
                value={stats.lates} 
                subtext="Requires attention" 
                color="text-amber-600" 
                icon={AlertCircle} 
             />
          </div>

          {/* Table */}
          <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden flex flex-col">
            <div className="px-8 py-6 border-b border-slate-100 flex justify-between items-center bg-white">
              <div>
                <h3 className="font-bold text-slate-800 text-lg">Attendance History</h3>
                <p className="text-slate-400 text-sm">Detailed log of recent activity</p>
              </div>
              <button className="text-sm font-bold text-blue-600 hover:text-blue-700 hover:underline">Download Report</button>
            </div>
            
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-slate-600">
                    <thead className="bg-slate-50/50 text-xs uppercase font-bold text-slate-400 tracking-wider">
                        <tr>
                            <th className="px-8 py-4">Date</th>
                            <th className="px-8 py-4">Status</th>
                            <th className="px-8 py-4">Check In</th>
                            <th className="px-8 py-4 text-right">Check Out</th>
                            <th className="px-8 py-4 text-right">Total Work Hour</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                    {employee.attendance && employee.attendance.length > 0 ? (
                        employee.attendance.map((log, index) => (
                            <tr key={index} className="hover:bg-slate-50/80 transition group">
                                <td className="px-8 py-4 font-bold text-slate-700">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-slate-100 rounded-lg text-slate-400 group-hover:bg-white group-hover:text-blue-600 group-hover:shadow-sm transition-all">
                                            <Calendar size={16} />
                                        </div>
                                        {log.date}
                                    </div>
                                </td>
                                <td className="px-8 py-4">
                                    <StatusBadge status={log.status} />
                                </td>
                                <td className="px-8 py-4">
                                    <div className="flex items-center gap-2 font-mono text-slate-600 bg-slate-50 px-2 py-1 rounded w-fit">
                                       <Clock size={12} className="text-slate-400"/> {log.checkIn}
                                    </div>
                                </td>
                                <td className="px-8 py-4 text-right">
                                    {log.checkOut !== '--:--' ? (
                                        <span className="font-mono text-slate-500">{log.checkOut}</span>
                                    ) : (
                                        <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full animate-pulse">Active Now</span>
                                    )}
                                </td>
                                <td className="px-8 py-4">
                                    {log.totalWorkHour}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr><td colSpan="4" className="px-8 py-16 text-center text-slate-400"><p>No attendance records found for this period.</p></td></tr>
                    )}
                    </tbody>
                </table>
            </div>
          </div>
        </div>
      </div>
    </AdminPageLayout>
  );
}