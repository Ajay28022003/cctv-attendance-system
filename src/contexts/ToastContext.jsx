import React, { createContext, useContext, useState, useCallback } from 'react';
import Toast from '../components/ui/Toast';

const ToastContext = createContext();

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  // Function to add a new toast
  const addToast = useCallback((message, type = 'info') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
  }, []);

  // Function to remove a toast
  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      
      {/* Toast Container (Fixed to Top-Right) */}
      <div className="fixed top-5 right-5 z-[100] flex flex-col items-end pointer-events-none">
        <div className="pointer-events-auto">
          {toasts.map((toast) => (
            <Toast 
              key={toast.id} 
              {...toast} 
              onClose={removeToast} 
            />
          ))}
        </div>
      </div>
    </ToastContext.Provider>
  );
}

// Custom Hook to use it easily
export const useToast = () => useContext(ToastContext);