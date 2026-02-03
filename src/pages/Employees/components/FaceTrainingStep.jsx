import React, { useState, useRef, useCallback } from 'react';
import Webcam from 'react-webcam';
import { Camera, Upload, X, RefreshCw } from 'lucide-react';
import { useToast } from '../../../contexts/ToastContext';

const CAPTURE_ANGLES = [
  { id: 'front', label: 'Look Straight', instruction: 'Center your face in the frame' },
  { id: 'left', label: 'Turn Left', instruction: 'Turn your head slightly to the left' },
  { id: 'right', label: 'Turn Right', instruction: 'Turn your head slightly to the right' },
  { id: 'up', label: 'Look Up', instruction: 'Tilt your head slightly up' },
  { id: 'down', label: 'Look Down', instruction: 'Tilt your head slightly down' },
  { id: 'up_right', label: 'Up & Right', instruction: 'Look towards the top-right corner' },
  { id: 'up_left', label: 'Up & Left', instruction: 'Look towards the top-left corner' },
  { id: 'down_right', label: 'Down & Right', instruction: 'Look towards the bottom-right corner' },
  { id: 'down_left', label: 'Down & Left', instruction: 'Look towards the bottom-left corner' },
];

export default function FaceTrainingStep({ trainingImages, setTrainingImages }) {
  const [captureMethod, setCaptureMethod] = useState(null); // 'webcam' | 'upload' | null
  const [isWebcamActive, setIsWebcamActive] = useState(false);
  const [currentAngleIndex, setCurrentAngleIndex] = useState(0);

  const webcamRef = useRef(null);
  const fileInputRef = useRef(null);
  const { addToast } = useToast();

  // --- Handlers ---

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    if (trainingImages.length + files.length > 15) {
      return addToast(`Limit is 15 images. You have ${trainingImages.length}.`, 'error');
    }
    const newImages = files.map(file => ({
      file,
      preview: URL.createObjectURL(file),
      type: 'upload'
    }));
    setTrainingImages(prev => [...prev, ...newImages]);
  };

  const startWebcam = () => {
    setCaptureMethod('webcam');
    setIsWebcamActive(true);
    setCurrentAngleIndex(0);
    setTrainingImages([]); // Clear previous if restarting
  };

  const capturePhoto = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      fetch(imageSrc)
        .then(res => res.blob())
        .then(blob => {
          const file = new File([blob], `face_${CAPTURE_ANGLES[currentAngleIndex].id}.jpg`, { type: "image/jpeg" });
          
          setTrainingImages(prev => [...prev, {
            file,
            preview: imageSrc,
            type: 'webcam',
            angle: CAPTURE_ANGLES[currentAngleIndex].label
          }]);

          if (currentAngleIndex < CAPTURE_ANGLES.length - 1) {
            setCurrentAngleIndex(prev => prev + 1);
            addToast("Captured! Moving to next pose...", 'success');
          } else {
            addToast("All angles captured! You can review now.", 'success');
            setIsWebcamActive(false); 
          }
        });
    }
  }, [webcamRef, currentAngleIndex, addToast, setTrainingImages]);

  const removeImage = (index) => {
    setTrainingImages(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-300 h-full flex flex-col">
      
      {/* 1. SELECTION SCREEN */}
      {!captureMethod && trainingImages.length === 0 && (
        <div className="grid grid-cols-2 gap-4 h-full">
          <button onClick={startWebcam} className="flex flex-col items-center justify-center p-8 bg-blue-50 border-2 border-blue-100 rounded-2xl hover:bg-blue-100 hover:border-blue-300 transition group">
            <div className="w-16 h-16 bg-white text-blue-600 rounded-full flex items-center justify-center shadow-sm mb-4 group-hover:scale-110 transition">
              <Camera size={32} />
            </div>
            <h3 className="font-bold text-blue-900">Use Webcam</h3>
            <p className="text-xs text-blue-600/70 text-center mt-1">Guided capture of 9 angles</p>
          </button>

          <button onClick={() => { setCaptureMethod('upload'); fileInputRef.current?.click(); }} className="flex flex-col items-center justify-center p-8 bg-slate-50 border-2 border-slate-100 rounded-2xl hover:bg-slate-100 hover:border-slate-300 transition group">
              <div className="w-16 h-16 bg-white text-slate-600 rounded-full flex items-center justify-center shadow-sm mb-4 group-hover:scale-110 transition">
              <Upload size={32} />
            </div>
            <h3 className="font-bold text-slate-900">Upload Files</h3>
            <p className="text-xs text-slate-500 text-center mt-1">Select 10-15 images</p>
            <input type="file" ref={fileInputRef} hidden multiple accept="image/*" onChange={handleFileUpload} />
          </button>
        </div>
      )}

      {/* 2. WEBCAM SCREEN */}
      {captureMethod === 'webcam' && isWebcamActive && (
        <div className="flex flex-col items-center flex-1">
          <div className="relative rounded-2xl overflow-hidden shadow-lg border-4 border-blue-600 bg-black">
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              className="w-[400px] h-[300px] object-cover"
            />
            {/* Overlay */}
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
              <div className="w-48 h-64 border-2 border-white/50 rounded-[50%] border-dashed"></div>
            </div>
            {/* Instruction */}
            <div className="absolute bottom-0 inset-x-0 bg-black/60 p-4 text-center backdrop-blur-sm">
              <p className="text-yellow-400 font-bold uppercase text-xs tracking-wider mb-1">Pose {currentAngleIndex + 1} / 9</p>
              <h3 className="text-white font-bold text-lg">{CAPTURE_ANGLES[currentAngleIndex].label}</h3>
              <p className="text-slate-300 text-xs">{CAPTURE_ANGLES[currentAngleIndex].instruction}</p>
            </div>
          </div>

          <button onClick={capturePhoto} className="mt-6 w-16 h-16 bg-white border-4 border-blue-600 rounded-full flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition">
            <div className="w-12 h-12 bg-blue-600 rounded-full"></div>
          </button>
          
          <button onClick={() => { setIsWebcamActive(false); setCaptureMethod(null); }} className="mt-4 text-slate-400 text-xs hover:text-red-500">
            Cancel & Go Back
          </button>
        </div>
      )}

      {/* 3. GALLERY SCREEN */}
      {(trainingImages.length > 0) && !isWebcamActive && (
        <div className="space-y-4 flex-1">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-slate-700">Captured Images ({trainingImages.length})</h3>
            <div className="flex gap-2">
                <button onClick={startWebcam} className="text-xs flex items-center gap-1 text-blue-600 font-bold hover:underline"><Camera size={12}/> Retake</button>
                <button onClick={() => setTrainingImages([])} className="text-xs flex items-center gap-1 text-red-500 font-bold hover:underline"><RefreshCw size={12}/> Reset</button>
            </div>
          </div>
          
          <div className="grid grid-cols-5 gap-3 max-h-[300px] overflow-y-auto p-1">
            {trainingImages.map((img, idx) => (
              <div key={idx} className="relative group aspect-square">
                <img src={img.preview} className="w-full h-full object-cover rounded-lg border border-slate-200" alt="Face" />
                {img.angle && <span className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-[8px] text-center py-0.5">{img.angle}</span>}
                <button onClick={() => removeImage(idx)} className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition"><X size={10} /></button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}