import React, { useState } from 'react';
import AdminPageLayout from '../../components/layouts/AdminPageLayout';

// Import Child Components
import ProfileCard from './components/ProfileCard';
import GeneralInfo from './components/GeneralInfo';
import SecuritySettings from './components/SecuritySettings';

export default function Profile() {
  // 1. DYNAMIC STATE: This holds the user's data
  const [userData, setUserData] = useState({
    name: "Alex Morgan",
    role: "System Administrator",
    department: "IT Security",
    joinedDate: "Oct 2023",
    email: "alex.morgan@securevision.com",
    phone: "+1 (555) 000-0000",
    location: "Headquarters - Floor 4",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80",
    lastPasswordChange: "3 months ago"
  });

  const handleUpdateProfile = (updatedData) => {
    setUserData(prev => ({ ...prev, ...updatedData }));
  };

  return (
    <AdminPageLayout
      title="My Profile"
      description="Manage your account settings and preferences."
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN: Profile Card (Span 4) */}
        <div className="lg:col-span-4 space-y-6">
           <ProfileCard user={userData} />
        </div>

        {/* RIGHT COLUMN: Settings (Span 8) */}
        <div className="lg:col-span-8 space-y-6">
           
           {/* Section 1: Personal Info */}
           <GeneralInfo 
        user={userData} 
        onSave={handleUpdateProfile} 
      />

           {/* Section 2: Security */}
           <SecuritySettings 
              lastChanged={userData.lastPasswordChange} 
           />

        </div>

      </div>
    </AdminPageLayout>
  );
}