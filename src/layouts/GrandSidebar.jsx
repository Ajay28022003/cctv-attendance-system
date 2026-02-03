import React from "react"; // Removed useState (not needed here anymore)
import SidebarItem from "../components/SidebarItem";
import { 
  LayoutDashboard, Video, Users, FileText, Settings, LogOut, 
  ChevronRight, X 
} from 'lucide-react';
import { Link } from "react-router-dom";
 
// ADD onLogout to props
export default function GrandSidebar({ isOpen, onClose, onLogout }) {
  
  return (
    <>
      {/* Mobile Overlay */}
      <div 
        className={`fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm transition-opacity duration-300 xl:hidden ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Sidebar Container */}
      <aside
        className={`
          fixed top-0 left-0 h-full z-50 w-80
          transition-transform duration-300 ease-in-out
          xl:translate-x-0 xl:static xl:inset-auto
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="h-full lg:rounded-[32px] bg-white/80 backdrop-blur-3xl xl:border border-white/60 shadow-2xl p-6 flex flex-col relative overflow-hidden">

          {/* Close Button */}
          <button
            onClick={onClose}
            className="xl:hidden absolute top-4 right-4 p-2 rounded-xl bg-white shadow-sm hover:bg-slate-50 transition-colors z-50 text-slate-500"
          >
            <X size={20} />
          </button>

          {/* Blobs & Logo ... (No changes) */}
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-500/20 rounded-full blur-[80px] animate-float pointer-events-none mix-blend-multiply"></div>
          <div className="absolute top-40 -left-20 w-48 h-48 bg-purple-500/20 rounded-full blur-[80px] animate-float-delayed pointer-events-none mix-blend-multiply"></div>

          <div className="flex items-center gap-3 px-2 mb-10 relative z-10 mt-2">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 shadow-xl shadow-blue-500/30 flex items-center justify-center shrink-0 border border-white/20">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7L12 12L22 7L12 2Z"/><path d="M2 17L12 22L22 17"/><path d="M2 12L12 17L22 12"/></svg>
            </div>
            <div>
              <h1 className="font-extrabold text-xl text-slate-800 tracking-tight leading-none">Pro<span className="text-blue-600">-Track</span></h1>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em] mt-1.5 ml-0.5">Control Hub</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-8 overflow-y-auto custom-scrollbar relative z-10 pr-2 pb-4">
            <div>
              <p className="px-4 text-[11px] font-extrabold text-slate-400 uppercase tracking-widest mb-3 opacity-80">Overview</p>
              <div className="space-y-1">
                <SidebarItem icon={LayoutDashboard} label="Dashboard" to="/" />
                <SidebarItem icon={Video} label="Live Monitoring" to="/live" />
              </div>
            </div>
            <div>
              <p className="px-4 text-[11px] font-extrabold text-slate-400 uppercase tracking-widest mb-3 opacity-80">Workforce</p>
              <div className="space-y-1">
                <SidebarItem icon={Users} label="Employees" to="/employees" />
                <SidebarItem icon={FileText} label="Analytics & Reports" to="/reports" />
              </div>
            </div>
            <div>
              <p className="px-4 text-[11px] font-extrabold text-slate-400 uppercase tracking-widest mb-3 opacity-80">Configuration</p>
              <div className="space-y-1">
                <SidebarItem icon={Settings} label="System Settings" to="/settings" />
              </div>
            </div>
          </nav>

          {/* Footer */}
          <div className="pt-4 border-t border-white/40 flex items-center gap-3 relative z-10">
            <Link to="/profile" className="flex items-center gap-3 flex-1 min-w-0 group cursor-pointer hover:bg-white/60 p-2.5 rounded-2xl transition-all duration-300 border border-transparent hover:border-white hover:shadow-md -ml-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-200 to-slate-300 p-0.5 shadow-md">
                 <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Admin" alt="Admin" className="w-full h-full rounded-full bg-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-slate-800 truncate group-hover:text-blue-700 transition-colors">Admin User</p>
                <div className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  <p className="text-[10px] text-slate-500 truncate font-medium">Online</p>
                </div>
              </div>
              <ChevronRight size={16} className="text-slate-300 group-hover:text-blue-600 transition-colors opacity-0 group-hover:opacity-100" />
            </Link>

            {/* LOGOUT BUTTON - Uses the onLogout prop now */}
            <button 
              onClick={onLogout} 
              className="group relative flex items-center justify-center w-10 h-10 text-slate-400 hover:text-red-600 transition-all duration-300 hover:bg-red-50 rounded-2xl border border-transparent hover:border-red-100 hover:shadow-md"
              title="Logout"
            >
              <LogOut size={18} />
            </button>
          </div>

        </div>
      </aside>
    </>
  );
}