import React, { useState, useEffect } from 'react';
import { mockCameras } from '../../dataMonitoring'; 
import ManagerSidebarRail from './ManagerSidebarRail';
import CameraList from './CameraList';
import CameraForm from './CameraForm';

export default function CameraManager({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('list'); 
  const [cameras, setCameras] = useState(mockCameras);
  const [formData, setFormData] = useState({ id: null, cameraName: '', location: '', ipAddress: '' });
  
  // Controls the actual rendering to allow exit animation
  const [isVisible, setIsVisible] = useState(false);

  // Sync internal visibility with isOpen prop for animation timing
  useEffect(() => {
    if (isOpen) setIsVisible(true);
    else {
      // Delay unmounting (optional) or just rely on CSS transition
      const timer = setTimeout(() => setIsVisible(false), 500);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // --- ACTIONS ---
  const goToAdd = () => {
    setFormData({ id: null, cameraName: '', location: '', ipAddress: '' });
    setActiveTab('add');
  };

  const goToEdit = (cam) => {
    setFormData(cam);
    setActiveTab('add'); 
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.id) {
      setCameras(prev => prev.map(c => c.id === formData.id ? formData : c));
    } else {
      setCameras(prev => [...prev, { ...formData, id: Date.now() }]);
    }
    setActiveTab('list');
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this camera?')) {
      setCameras(prev => prev.filter(c => c.id !== id));
    }
  };

  // We remove the early return so the HTML exists to be animated
  // if (!isOpen && !isVisible) return null; 

  return (
    <>
      {/* 1. BACKDROP (Fade In/Out) */}
      <div 
        className={`fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 transition-opacity duration-500 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`} 
        onClick={onClose} 
      />

      {/* 2. SIDEBAR PANEL (Slide In from Right) */}
      <div 
        className={`
          fixed inset-y-0 right-0 w-full max-w-2xl bg-white shadow-2xl z-50 flex overflow-hidden rounded-l-[32px] border-l border-slate-100
          transition-transform duration-500 cubic-bezier(0.32, 0.72, 0, 1) 
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
      >
        
        {/* LEFT RAIL */}
        <ManagerSidebarRail 
          activeTab={activeTab} 
          onTabChange={(tab) => {
            if (tab === 'add') goToAdd();
            else setActiveTab(tab);
          }} 
          onClose={onClose} 
        />

        {/* RIGHT PANEL CONTENT */}
        <div className="flex-1 bg-slate-50 flex flex-col h-full overflow-hidden">
          
          {/* Header */}
          <div className="px-10 py-8 bg-white border-b border-slate-100">
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
              {activeTab === 'list' ? 'Camera List' : formData.id ? 'Edit Configuration' : 'New Camera'}
            </h2>
            <p className="text-sm text-slate-500 mt-1 font-medium">
              {activeTab === 'list' ? 'Manage your surveillance points.' : 'Configure device details and connection.'}
            </p>
          </div>

          <div className="flex-1 overflow-y-auto p-10 custom-scrollbar">
            
            {activeTab === 'list' ? (
              <CameraList 
                cameras={cameras} 
                onEdit={goToEdit} 
                onDelete={handleDelete} 
              />
            ) : (
              <CameraForm 
                formData={formData} 
                setFormData={setFormData} 
                onSubmit={handleSubmit} 
                onCancel={() => setActiveTab('list')} 
              />
            )}

          </div>
        </div>
      </div>
    </>
  );
}