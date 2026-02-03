import React, { useState, useEffect } from 'react';
import { Settings2, LayoutGrid, Grid3x3, Square } from 'lucide-react';
import AdminPageLayout from '../../components/layouts/AdminPageLayout';
import VideoGrid from './components/VideoGrid';
import CameraManager from './components/CameraManager/CameraManager';
import Loader from '../../components/loader/loader';
import { mockCameras } from './dataMonitoring';

export default function LiveMonitoring() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [cameras, setCameras] = useState([]); // 2. Start with empty data
  const [gridMode, setGridMode] = useState('grid');
  
  // 3. Add Loading State
  const [isLoading, setIsLoading] = useState(true);

  // 4. Simulate Connection Delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setCameras(mockCameras);
      setIsLoading(false);
    }, 1500); // 1.5 seconds loading time

    return () => clearTimeout(timer);
  }, []);

  return (
    <AdminPageLayout
      title="Live Monitoring"
      description="Real-time surveillance feeds."
      action={
        <div className="flex items-center gap-4">
            {/* System Status Only */}
            <div className="hidden md:flex items-center gap-2 text-xs font-bold text-slate-500 bg-white px-4 py-2 rounded-full shadow-sm border border-slate-100">
                <div className="flex items-center gap-2 text-emerald-600">
                    <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                    </span>
                    <span>SYSTEM ONLINE</span>
                </div>
            </div>

            <button
              onClick={() => setIsSidebarOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-bold rounded-full hover:bg-blue-500 transition shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              <Settings2 size={16} /> Configure
            </button>
        </div>
      }
    >
      <div className="relative min-h-[75vh] flex flex-col">
        
        {/* MAIN GRID AREA */}
        <div className="flex-1 p-2">
           {/* 5. Conditional Rendering for Loader */}
           {isLoading ? (
             <Loader text="Initializing Secure Feed..." height="h-[60vh]" />
           ) : (
             <VideoGrid cameras={cameras} gridMode={gridMode} />
           )}
        </div>

        {/* FLOATING CONTROL DOCK (Hide when loading) */}
        {!isLoading && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 animate-in slide-in-from-bottom-4 fade-in duration-500">
                <div className="flex items-center gap-1 bg-white/90 backdrop-blur-xl p-1.5 rounded-2xl shadow-2xl border border-white/20 ring-1 ring-slate-200/50">
                    <button 
                        onClick={() => setGridMode('single')}
                        className={`p-2.5 rounded-xl transition-all ${gridMode === 'single' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:bg-slate-100 hover:text-slate-600'}`}
                        title="Single View"
                    >
                        <Square size={18} />
                    </button>
                    <button 
                        onClick={() => setGridMode('grid')}
                        className={`p-2.5 rounded-xl transition-all ${gridMode === 'grid' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:bg-slate-100 hover:text-slate-600'}`}
                        title="Grid View"
                    >
                        <LayoutGrid size={18} />
                    </button>
                    <button 
                        className="p-2.5 rounded-xl text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-all"
                        title="9x9 View"
                    >
                        <Grid3x3 size={18} />
                    </button>
                </div>
            </div>
        )}

      </div>

      <CameraManager
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
    </AdminPageLayout>
  );
}