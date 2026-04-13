import React, { useState, useEffect } from 'react';
import { Users, Video, UserCheck, UserX, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // 1. Import useNavigate
import AdminPageLayout from '../../components/layouts/AdminPageLayout';

// Import Common Components
import Loader from '../../components/loader/loader'; // Ensure path is correct

// Import Page Data
import { chartData, recentActivity, todayAttendance } from './dataDashboard';

// Import Page Components
import ProStatCard from './components/ProStatCard';
import AttendanceChart from './components/AttendanceChart';
import RecentActivity from './components/RecentActivity';
import TodayAttendanceTable from './components/TodayAttendanceTable';

export default function Dashboard() {
  // 1. Loading State
  const [isLoading, setIsLoading] = useState(true);

  // 2. Navigation Hook
  const navigate = useNavigate();

  // 3. Simulate Data Fetching
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const today = new Date();
  const dayName = today.toLocaleDateString('en-US', { weekday: 'long' });
  const dateStr = today.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <AdminPageLayout
      title="Dashboard"
      description="Real-time attendance overview and system status."
      action={
        <div className="flex items-center gap-6">

          {/* 1. The Date Container (Separate White Box) */}
          <div className="flex items-center gap-3 px-4 py-2 bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-md transition-all cursor-default group">
            <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
              <Calendar size={20} className="group-hover:scale-110 transition-transform" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider leading-tight">
                {dayName}
              </span>
              <span className="text-sm font-extrabold text-slate-800 leading-tight">
                {dateStr}
              </span>
            </div>
          </div>

          {/* 2. The Rectangular Image */}
          <div className="cursor-pointer hover:ring-2 hover:ring-blue-500 hover:ring-offset-2 rounded-xl transition-all shrink-0 bg-white shadow-sm border border-slate-200 p-1">
            <img
              src="/public/profile1.jpeg" // Note: Usually you drop the "/public" part for deployed assets!
              alt="Logo"
              /* CHANGED: Increased w-28 to w-36, and h-12 to h-14 */
              className="w-36 h-14 rounded-lg object-contain"
            />
          </div>

        </div>
      }
    >

      {/* Conditional Rendering */}
      {isLoading ? (
        <Loader className="w-1 h-1" text="Syncing live dashboard data..." />
      ) : (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">

          {/* 1. TOP STATS ROW */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8 items-stretch">

            {/* Card 1: Total Employees -> Navigate to Employees */}
            <div
              className="lg:col-span-1 cursor-pointer"
              onClick={() => navigate('/employees')}
            >
              <ProStatCard
                title="Total Employees"
                value="420"
                subValue="Registered"
                icon={Users}
                theme="white"
                trend="neutral"
                withBorder={true}
              />
            </div>

            {/* Card 2: Present Today -> Navigate to Reports */}
            <div
              className="lg:col-span-1 cursor-pointer"
              onClick={() => navigate('/reports')}
            >
              <ProStatCard
                title="Present Today"
                value="385"
                subValue="+5.2% vs yesterday"
                icon={UserCheck}
                theme="blue"
                trend="up"
              />
            </div>

            {/* Card 3: Absent Today -> Navigate to Reports */}
            <div
              className="lg:col-span-1 cursor-pointer"
              onClick={() => navigate('/reports')}
            >
              <ProStatCard
                title="Absent Today"
                value="35"
                subValue="-2.1% vs yesterday"
                icon={UserX}
                theme="white"
                trend="down"
                withBorder={true}
              />
            </div>

            {/* Card 4: Active Cameras -> Navigate to Live Monitoring */}
            <div
              className="lg:col-span-1 cursor-pointer"
              onClick={() => navigate('/live')}
            >
              <ProStatCard
                title="Active Cameras"
                value="12/15"
                subValue="3 Offline"
                icon={Video}
                theme="white"
                trend="neutral"
                withBorder={true}
              />
            </div>

          </div>

          {/* 2. MIDDLE ROW */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <AttendanceChart data={chartData} />
            <RecentActivity activities={recentActivity} />
          </div>

          {/* 3. BOTTOM ROW */}
          <TodayAttendanceTable data={todayAttendance} />

        </div>
      )}

    </AdminPageLayout>
  );
}