import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Menu } from 'lucide-react'; 
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';
import LogoutModal from '../components/modals/LogoutModal';
import GrandSidebar from './GrandSidebar';

export default function MainLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false); // State controls the modal
  
  const { logout } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    addToast('Logged out successfully', 'info');
    navigate('/login');
  };

  return (
    <div className="flex h-screen w-full p-2 md:p-4 gap-4 bg-[#F0F4F8] font-sans overflow-hidden">
      
      {/* 2. SIDEBAR: Pass the onLogout trigger */}
      <GrandSidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)}
        onLogout={() => setShowLogoutModal(true)} // <--- ADD THIS
      />

      {/* 3. MAIN CONTENT AREA */}
      <main className="flex-1 h-full flex flex-col min-w-0 rounded-[24px] md:rounded-[32px] bg-white/50 backdrop-blur-xl border border-white/60 shadow-2xl shadow-slate-200/50 overflow-hidden relative z-10 transition-all duration-300">
        
        {/* Mobile Header */}
        <div className="xl:hidden flex items-center justify-between px-5 py-3 bg-white/60 backdrop-blur-md border-b border-white/50 z-20 shrink-0">
           <div className="flex items-center gap-3">
             <button 
               onClick={() => setIsSidebarOpen(true)}
               className="p-2 -ml-2 text-slate-600 hover:bg-white hover:shadow-sm rounded-xl transition active:scale-95"
             >
               <Menu size={24} />
             </button>
             <span className="font-extrabold text-slate-800 tracking-tight">Pro-Track</span>
           </div>
           <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 p-0.5">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Admin" alt="User" className="w-full h-full rounded-full bg-white" />
           </div>
        </div>

        <div className="relative z-10 flex-1 overflow-auto custom-scrollbar p-1">
          <Outlet />
        </div>
        <div className="absolute inset-0 bg-white/40 pointer-events-none" />
      </main>

      {/* MODAL (Lives here) */}
      <LogoutModal 
        isOpen={showLogoutModal} 
        onClose={() => setShowLogoutModal(false)}
        onConfirm={handleLogout}
      />

    </div>
  );
}