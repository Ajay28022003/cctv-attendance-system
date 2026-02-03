import React, { useState,useEffect } from 'react';
import { Save, Thermometer, Ruler, Info } from 'lucide-react';
import AdminPageLayout from '../../components/layouts/AdminPageLayout';
import { useToast } from '../../contexts/ToastContext';
import ConfigHeader from './components/ConfigHeader';
import Loader from '../../components/loader/loader';

// Import Components
import ParameterCard from './components/ParameterCard';

export default function Settings() {
  const { addToast } = useToast();

  const [config, setConfig] = useState({
    maxTemperature: 45.0,
    detectionDistance: 2.5
  });

  const [isLoading, setIsLoading] = useState(true);
    // 3. Simulate Data Fetching
    useEffect(() => {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 1500); // 1.5s delay
  
      return () => clearTimeout(timer);
    }, []);

  const handleChange = (key, val) => {
    setConfig(prev => ({ ...prev, [key]: val }));
  };

  const handleSave = () => {
    // Simulate API Save
    console.log("Saved:", config);
    addToast('Hardware parameters updated successfully', 'success');
  };

 

  return (
    <AdminPageLayout
      title="Hardware Configuration"
      description="Calibrate AI detection limits and safety thresholds."
      action={
        <button 
          onClick={handleSave}
          className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold rounded-xl transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
        >
          <Save size={18} /> Save Changes
        </button>
      }
    >
       {isLoading ? (
             <Loader text="Generating Analytics..." height="h-[75vh]" />
           ) : (
      <div className="max-w-5xl mx-auto space-y-8">
        
         <ConfigHeader 
  title="Calibration Mode Active" 
  description="Changes to these parameters affect the AI's physical perception model. Ensure the detection distance matches your camera's focal length installation."
/>

        {/* 2. PARAMETER CARDS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Card 1: Temperature */}
          <ParameterCard 
            title="Max Operating Temp"
            description="Safety threshold to prevent hardware overheating during processing."
            value={config.maxTemperature}
            unit="Celsius (°C)"
            icon={Thermometer}
            theme="orange"
            min={20}
            max={85}
            step={0.5}
            onChange={(val) => handleChange('maxTemperature', val)}
          />

          {/* Card 2: Distance */}
          <ParameterCard 
            title="Detection Range"
            description="Maximum depth distance for reliable object recognition."
            value={config.detectionDistance}
            unit="Meters (m)"
            icon={Ruler}
            theme="blue"
            min={0.5}
            max={15.0}
            step={0.1}
            onChange={(val) => handleChange('detectionDistance', val)}
          />

        </div>

        {/* 3. VISUAL FOOTER / SUMMARY (Optional "Grand" touch) */}
        <div className="border-t border-slate-100 pt-8 flex flex-col md:flex-row items-center justify-between text-slate-400 text-xs font-medium uppercase tracking-widest gap-4">
           <span>System Revision v2.4.0</span>
           <span className="flex items-center gap-2">
             <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
             Parameters Synced
           </span>
        </div>

      </div>
           )}
    </AdminPageLayout>
  );
}