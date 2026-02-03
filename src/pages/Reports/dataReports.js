// 1. Weekly Data (Days)
export const weeklyChartData = [
  { label: 'Mon', present: 380, late: 12, absent: 5 },
  { label: 'Tue', present: 375, late: 15, absent: 8 },
  { label: 'Wed', present: 390, late: 8, absent: 4 },
  { label: 'Thu', present: 365, late: 20, absent: 10 },
  { label: 'Fri', present: 350, late: 25, absent: 15 },
  { label: 'Sat', present: 120, late: 5, absent: 2 },
  { label: 'Sun', present: 0, late: 0, absent: 0 },
];

// 2. Monthly Data (Weeks) - NEW
export const monthlyChartData = [
  { label: 'Week 1', present: 1800, late: 40, absent: 20 },
  { label: 'Week 2', present: 1850, late: 35, absent: 15 },
  { label: 'Week 3', present: 1790, late: 50, absent: 25 },
  { label: 'Week 4', present: 1900, late: 30, absent: 10 },
];

// 3. Yearly Data (Months) - NEW
export const yearlyChartData = [
  { label: 'Jan', present: 7500, late: 120, absent: 50 },
  { label: 'Feb', present: 7400, late: 110, absent: 60 },
  { label: 'Mar', present: 7600, late: 100, absent: 40 },
  { label: 'Apr', present: 7550, late: 115, absent: 45 },
  { label: 'May', present: 7700, late: 90, absent: 30 },
  { label: 'Jun', present: 7650, late: 95, absent: 35 },
];

// ... Keep existing departmentData, reportStats, dailySummary, activityLogs ...
export const departmentData = [
    { name: 'Engineering', value: 45, color: '#3b82f6' },
    { name: 'Design', value: 20, color: '#10b981' },
    { name: 'Sales', value: 15, color: '#f59e0b' },
    { name: 'HR', value: 10, color: '#8b5cf6' },
    { name: 'Support', value: 10, color: '#64748b' }, 
];

export const reportStats = [
    { title: 'Avg Attendance', value: '91.7%', trend: 'up', color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { title: 'Late Arrivals', value: '52', trend: 'down', color: 'text-orange-600', bg: 'bg-orange-50' },
    { title: 'Absences', value: '35', trend: 'down', color: 'text-red-600', bg: 'bg-red-50' },
    { title: 'Total Records', value: '2,940', trend: 'neutral', color: 'text-blue-600', bg: 'bg-blue-50' },
];

export const dailySummary = [
    { id: 101, date: 'Oct 24, 2023', emp: 'Sarah Wilson', empid: 'EMP001', firstIn: '08:55 AM', lastOut: '05:30 PM', duration: '8h 35m', status: 'Present', totalWorkHour:"8 hrs" },
    { id: 102, date: 'Oct 24, 2023', emp: 'James Brown', empid: 'EMP002', firstIn: '09:05 AM', lastOut: '06:15 PM', duration: '9h 10m', status: 'Present', totalWorkHour:"9 hrs" },
    { id: 103, date: 'Oct 24, 2023', emp: 'Michael Chen', empid: 'EMP003', firstIn: '09:15 AM', lastOut: '06:00 PM', duration: '8h 45m', status: 'Late' , totalWorkHour:"7 hrs"},
];

export const activityLogs = [
    { id: 1, time: '08:55 AM', emp: 'Sarah Wilson', empid: 'EMP001', event: 'Check In', location: 'Main Entrance' },
    { id: 2, time: '09:05 AM', emp: 'James Brown', empid: 'EMP002', event: 'Check In', location: 'Main Entrance' },
];