import React from 'react';
import { NavLink } from 'react-router-dom'; // <--- Use NavLink
import { motion } from 'framer-motion';

export default function SidebarItem({ icon: Icon, label, to }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => `relative flex items-center gap-3 p-3 mb-2 w-full rounded-xl transition-all duration-300 group outline-none
        ${isActive ? 'text-blue-700 font-semibold' : 'text-slate-500 hover:text-slate-800 hover:bg-white/50'}
      `}
    >
      {({ isActive }) => (
        <>
          {/* Background Active Pill Animation */}
          {isActive && (
            <motion.div
              layoutId="activeTab"
              className="absolute inset-0 bg-white shadow-sm border border-slate-200/60 rounded-xl"
              initial={false}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          )}
          
          <Icon size={20} className="relative z-10 transition-transform group-hover:scale-110" />
          <span className="relative z-10 text-sm tracking-wide">{label}</span>
        </>
      )}
    </NavLink>
  );
}