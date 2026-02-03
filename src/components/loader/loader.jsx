import React from 'react';


export default function Loader({ text = "Loading...", height = "h-[70vh]" }) {
  return (
    <div className={`flex flex-col items-center justify-center w-full ${height}`}>
      <img 
        src="/loader1.gif" 
        alt="Loading..." 
        className="w-32 h-32 object-contain" 
      />
      {/* <p className="text-slate-400 text-sm font-medium mt-4 animate-pulse">
        {text}
      </p> */}
    </div>
  );
}