import React, { useState, useEffect, useRef } from 'react';
import { Download, FileBarChart, List, FileSpreadsheet, Loader2, Printer } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';

import AdminPageLayout from '../../components/layouts/AdminPageLayout';

// Components
import ReportsStats from './components/ReportsStats';
import AttendanceCharts from './components/AttendanceCharts';
import ReportsFilterBar from './components/ReportsFilterBar';
import DailySummaryTable from './components/DailySummaryTable';
import ActivityLogsTable from './components/ActivityLogsTable';
import Loader from '../../components/loader/loader';

// Data
import {
  weeklyChartData, monthlyChartData, yearlyChartData,
  departmentData, reportStats, dailySummary, activityLogs
} from './dataReports';

export default function Reports() {
  const [activeTab, setActiveTab] = useState('summary');
  const [chartTimeframe, setChartTimeframe] = useState('Weekly');
  const [filters, setFilters] = useState({
    search: '',
    status: 'All',
    startDate: '',
    endDate: ''
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isExportingPdf, setIsExportingPdf] = useState(false);

  // REF: The container we want to capture for the PDF
  const reportContentRef = useRef(null);

  // Simulate Data Fetching
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // --- LOGIC: DATA PREPARATION ---
  const currentChartData =
    chartTimeframe === 'Weekly' ? weeklyChartData :
      chartTimeframe === 'Monthly' ? monthlyChartData :
        yearlyChartData;

  const filteredSummary = dailySummary.filter(item =>
    item.emp.toLowerCase().includes(filters.search.toLowerCase())
  );

  const filteredActivity = activityLogs.filter(item =>
    item.emp.toLowerCase().includes(filters.search.toLowerCase())
  );

  // --- FUNCTION 1: EXPORT FULL REPORT (PDF) ---
  const handleExportPDF = async () => {
    if (!reportContentRef.current) return;

    setIsExportingPdf(true);

    // Wait for state to update and UI to re-render
    await new Promise(resolve => setTimeout(resolve, 100));

    try {
      const element = reportContentRef.current;

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        windowHeight: element.scrollHeight
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      const imgWidth = canvas.width;
      const imgHeight = canvas.height;

      const ratio = pdfWidth / imgWidth;
      const finalHeight = imgHeight * ratio;

      let heightLeft = finalHeight;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, finalHeight);
      heightLeft -= pdfHeight;

      while (heightLeft >= 0) {
        position = heightLeft - finalHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, finalHeight);
        heightLeft -= pdfHeight;
      }

      pdf.save(`Full_Report_${new Date().toISOString().split('T')[0]}.pdf`);

    } catch (error) {
      console.error("PDF Export failed", error);
    } finally {
      setIsExportingPdf(false);
    }
  };

  // --- FUNCTION 2: EXPORT TABLE DATA (EXCEL) ---
  const handleExportExcel = () => {
    // Determine which data to export based on active tab
    const dataToExport = activeTab === 'summary' ? filteredSummary : filteredActivity;

    // Update Filenames to match new labels
    const sheetName = activeTab === 'summary' ? 'Attendance_Report' : 'Log_Report';

    const ws = XLSX.utils.json_to_sheet(dataToExport);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, sheetName);

    XLSX.writeFile(wb, `${sheetName}_Data.xlsx`);
  };

  return (
    <AdminPageLayout
      title="Attendance Reports"
      description="View and export detailed attendance analytics."
      action={
        <div className="flex items-center gap-6">

          {/* MAIN ACTION: Export Full Visual Report */}
          <button
            onClick={handleExportPDF}
            disabled={isLoading || isExportingPdf}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold rounded-xl transition shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isExportingPdf ? <Loader2 size={16} className="animate-spin" /> : <Printer size={16} />}
            {isExportingPdf ? 'Generating PDF...' : 'Download Reports'}
          </button>

          {/* The Rectangular Image */}
          <div className="cursor-pointer hover:ring-2 hover:ring-blue-500 hover:ring-offset-2 rounded-xl transition-all shrink-0 bg-white shadow-sm border border-slate-200 p-1">
            <img
              src="/profile.jpeg" /* Make sure this matches your file name */
              alt="Logo"
              className="w-36 h-14 rounded-lg object-contain"
            />
          </div>

        </div>
      }
    >

      {isLoading ? (
        <Loader text="Generating Analytics..." height="h-[75vh]" />
      ) : (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">

          {/* --- CONTENT WRAPPER (REF) --- */}
          <div ref={reportContentRef} className={`space-y-6 bg-slate-50/50 p-2 -m-2 ${isExportingPdf ? 'h-auto overflow-visible' : ''}`}>

            {/* 1. TOP STATS */}
            <ReportsStats stats={reportStats} />

            {/* 2. CHARTS SECTION */}
            <AttendanceCharts
              barData={currentChartData}
              pieData={departmentData}
              timeframe={chartTimeframe}
              setTimeframe={setChartTimeframe}
            />

            {/* 3. TABS & FILTERS ROW */}
            <div className="flex flex-col-reverse md:flex-row gap-6 items-start md:items-center justify-between">

              {/* Tab Switcher */}
              <div className="flex bg-slate-100 p-1 rounded-xl shrink-0">
                <button
                  onClick={() => setActiveTab('summary')}
                  className={`px-4 py-2 text-xs font-bold rounded-lg transition flex items-center gap-2 ${activeTab === 'summary' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                    }`}
                >
                  <FileBarChart size={14} /> Attendance Report
                </button>
                <button
                  onClick={() => setActiveTab('activity')}
                  className={`px-4 py-2 text-xs font-bold rounded-lg transition flex items-center gap-2 ${activeTab === 'activity' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                    }`}
                >
                  <List size={14} /> Log Report
                </button>
              </div>

              {/* Filter Bar & Data Export */}
              <div className="w-full md:w-auto flex-1 flex flex-col md:flex-row gap-3 justify-end">
                <ReportsFilterBar
                  filters={filters}
                  setFilters={setFilters}
                  onClear={() => setFilters({ search: '', status: 'All', startDate: '', endDate: '' })}
                />

                {/* DATA EXPORT BUTTON (Updated Labels) */}
                <button
                  onClick={handleExportExcel}
                  className="flex items-center justify-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 text-xs font-bold rounded-xl transition shadow-sm whitespace-nowrap"
                  title={`Download ${activeTab === 'summary' ? 'Attendance' : 'Log'} Data`}
                >
                  <FileSpreadsheet size={16} />
                  Export {activeTab === 'summary' ? 'Attendance' : 'Logs'}
                </button>
              </div>
            </div>

            {/* 4. TABLES */}
            <div className={`bg-white rounded-3xl border border-slate-100 shadow-sm min-h-[400px] ${isExportingPdf ? 'overflow-visible h-auto' : 'overflow-hidden'}`}>
              {activeTab === 'summary' ? (
                <DailySummaryTable data={filteredSummary} />
              ) : (
                <ActivityLogsTable data={filteredActivity} />
              )}
            </div>

          </div> {/* End Ref Wrapper */}

        </div>
      )}

    </AdminPageLayout>
  );
}