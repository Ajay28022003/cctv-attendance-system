import React, { useState, useRef } from 'react';
import { X, ArrowRight, ArrowLeft, CheckCircle, User, Monitor } from 'lucide-react';
import { useToast } from '../../contexts/ToastContext';

// Import the separated components
import EmployeeDetailsStep from './components/EmployeeDetailsStep';
import FaceTrainingStep from './components/FaceTrainingStep';

const STEPS = [
  { id: 1, title: 'Employee Details', icon: User },
  { id: 2, title: 'Face Training', icon: Monitor },
];

export default function AddEmployeesModal({ isOpen, onClose, onSave }) {
  // --- STATE ---
  const [currentStep, setCurrentStep] = useState(1);
  
  // Data State (Lifted Up)
  const [formData, setFormData] = useState({ name: '', empid: '', email: '', phone: '', role: 'Developer' });
  const [profileImage, setProfileImage] = useState(null);
  const [profileImagePreview, setProfileImagePreview] = useState(null);
  const [trainingImages, setTrainingImages] = useState([]);

  const profileInputRef = useRef(null);
  const { addToast } = useToast();

  if (!isOpen) return null;

  // --- Handlers ---

  const handleNext = () => {
    // Validation for Step 1
    if (currentStep === 1) {
      if (!formData.name || !formData.empid || !formData.email || !formData.phone) {
        return addToast("Please fill in all mandatory fields.", 'error');
      }
    }
    setCurrentStep(prev => prev + 1);
  };

  const handleSubmit = () => {
    // Validation for Step 2
    if (trainingImages.length < 9) { 
      return addToast("Please capture or upload at least 9 images.", 'error');
    }

    const newEmployee = {
      ...formData,
      image: profileImagePreview || null,
      trainingData: trainingImages.map(img => img.file)
    };
    onSave(newEmployee);
    resetAndClose();
  };

  const resetAndClose = () => {
    setFormData({ name: '', empid: '', email: '', phone: '', role: 'Developer' });
    setTrainingImages([]);
    setProfileImage(null);
    setProfileImagePreview(null);
    setCurrentStep(1);
    onClose();
  };

  const handleProfileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      setProfileImagePreview(URL.createObjectURL(file));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // --- Render Helpers ---

  const renderStepIndicator = () => (
    <div className="flex justify-between mb-8 px-16 relative">
      <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-100 -z-10" />
      {STEPS.map((step) => {
        const isActive = step.id === currentStep;
        const isCompleted = step.id < currentStep;
        return (
          <div key={step.id} className="flex flex-col items-center gap-2 bg-white px-2">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all ${
              isActive ? 'border-blue-600 bg-blue-600 text-white' :
              isCompleted ? 'border-green-500 bg-green-500 text-white' :
              'border-slate-200 text-slate-400 bg-white'
            }`}>
              {isCompleted ? <CheckCircle size={18} /> : step.id}
            </div>
            <span className={`text-xs font-bold ${isActive ? 'text-blue-600' : 'text-slate-400'}`}>{step.title}</span>
          </div>
        )
      })}
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity" onClick={onClose} />
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="px-8 py-6 border-b border-slate-100 bg-white flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-slate-800">Add New Employee</h2>
            <p className="text-xs text-slate-500 mt-1">Step {currentStep} of 2</p>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:bg-slate-100 rounded-full"><X size={20}/></button>
        </div>

        {/* Content Body */}
        <div className="p-8 overflow-y-auto custom-scrollbar flex-1">
          {renderStepIndicator()}

          {currentStep === 1 ? (
            <EmployeeDetailsStep 
              formData={formData} 
              handleChange={handleChange} 
              profileImagePreview={profileImagePreview}
              handleProfileUpload={handleProfileUpload}
              profileInputRef={profileInputRef}
            />
          ) : (
            <FaceTrainingStep 
              trainingImages={trainingImages}
              setTrainingImages={setTrainingImages}
            />
          )}
        </div>

        {/* Footer Navigation */}
        <div className="px-8 py-5 border-t border-slate-100 bg-slate-50 flex justify-between">
          <button 
            onClick={() => setCurrentStep(prev => prev - 1)} 
            disabled={currentStep === 1}
            className="flex items-center gap-2 px-4 py-2 text-slate-600 font-medium hover:bg-slate-200 rounded-xl transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ArrowLeft size={16} /> Back
          </button>

          {currentStep < 2 ? (
            <button onClick={handleNext} className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white font-bold rounded-xl shadow-lg shadow-blue-200 hover:bg-blue-700 transition">
              Next Step <ArrowRight size={16} />
            </button>
          ) : (
            <button onClick={handleSubmit} className="flex items-center gap-2 px-6 py-2 bg-green-600 text-white font-bold rounded-xl shadow-lg shadow-green-200 hover:bg-green-700 transition">
              <CheckCircle size={16} /> Finish & Save
            </button>
          )}
        </div>

      </div>
    </div>
  );
}