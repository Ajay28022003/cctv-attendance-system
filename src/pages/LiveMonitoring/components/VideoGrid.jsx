import React from 'react';
import { WifiOff, MoreVertical, Maximize2, MapPin } from 'lucide-react';

export default function VideoGrid({ cameras, gridMode }) {
  if (!cameras || cameras.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center">
        <div className="w-24 h-24 bg-slate-50 rounded-[2rem] flex items-center justify-center mb-6 shadow-sm">
             <WifiOff size={32} className="text-slate-300" />
        </div>
        <h3 className="text-slate-700 font-bold text-lg">No Feeds Active</h3>
        <p className="text-slate-400 text-sm mt-1">Add a camera to start monitoring.</p>
      </div>
    );
  }

  const gridClasses = gridMode === 'single' 
    ? "grid-cols-1 max-w-5xl mx-auto" 
    : "grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6";

  return (
    <div className={`grid ${gridClasses} gap-8 transition-all duration-500 pb-24`}>
      {cameras.map((cam, index) => (
        <div 
          key={cam.id} 
          className="group relative aspect-video bg-slate-900 rounded-[2rem] overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 cursor-pointer"
        >
          
          {/* 1. STATIC IMAGE BACKGROUND (Simulated Feed) */}
          <div className="absolute inset-0 group-hover:scale-105 transition-transform duration-700">
              <img 
                // Using a high-quality office/CCTV placeholder image
                src={`https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80`} 
                alt="Camera Feed" 
                className="w-full h-full object-cover opacity-90"
              />
              {/* Dark Gradient Overlay for text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30"></div>
          </div>

          {/* 2. Content Overlay */}
          <div className="absolute inset-0 p-5 flex flex-col justify-between">
            
            {/* Top Row: Status Badge */}
            <div className="flex justify-between items-start">
                <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full shadow-sm border border-white/10">
                    <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                    <span className="text-[10px] font-bold text-white tracking-wider">LIVE</span>
                </div>
                
                <button className="p-2 bg-black/40 backdrop-blur-md rounded-full text-white/80 hover:bg-white hover:text-blue-600 transition shadow-sm border border-white/10 opacity-0 group-hover:opacity-100 transform translate-y-[-10px] group-hover:translate-y-0 duration-300">
                    <MoreVertical size={16} />
                </button>
            </div>

            {/* Bottom Info Bar */}
            <div className="translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                 <div className="bg-white/90 backdrop-blur-xl p-4 rounded-2xl shadow-lg border border-white/50 flex items-center justify-between">
                    <div>
                        <h3 className="font-bold text-slate-800 text-sm">{cam.cameraName}</h3>
                        <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-0.5">
                            <MapPin size={10} />
                            <span>{cam.location}</span>
                        </div>
                    </div>
                    <button className="p-2 bg-slate-100 text-slate-600 rounded-xl hover:bg-blue-600 hover:text-white transition-colors">
                        <Maximize2 size={16} />
                    </button>
                 </div>
            </div>

          </div>
        </div>
      ))}
    </div>
  );
}