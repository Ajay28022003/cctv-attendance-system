import React, { useState, useRef, useMemo } from 'react';
import { X, UploadCloud, FileSpreadsheet, FileArchive, CheckCircle, Download, AlertTriangle, ArrowRight, ArrowLeft, Loader2, FolderOpen } from 'lucide-react';
import * as XLSX from 'xlsx';
import JSZip from 'jszip'; 

export default function BulkUploadModal({ isOpen, onClose, onSave }) {
  // --- STATE ---
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  
  // Data
  const [excelData, setExcelData] = useState([]); 
  const [zipFolders, setZipFolders] = useState({}); // Map: FolderName -> [Images]
  const [zipFileMeta, setZipFileMeta] = useState(null); 
  
  // UI State
  const [excelFile, setExcelFile] = useState(null);
  const [excelError, setExcelError] = useState(null);
  const [zipError, setZipError] = useState(null);

  // Refs
  const excelInputRef = useRef(null);
  const zipInputRef = useRef(null);

  // --- 1. MEMOIZED VALIDATION (Moved ABOVE any return statements) ---
  const validationSummary = useMemo(() => {
    if (excelData.length === 0) return [];

    return excelData.map(emp => {
      // Normalize ID (remove spaces, uppercase) to match folder names robustly
      const empId = emp.employee_code || emp.empid || "";
      const normalizedId = empId.toString().trim();
      
      // Look for a folder in the ZIP that matches the Employee ID
      const images = zipFolders[normalizedId] || [];
      const imgCount = images.length;

      let status = 'success';
      let msg = 'Ready';

      if (!empId) {
        status = 'error';
        msg = 'Missing Employee Code';
      } else if (imgCount === 0) {
        status = 'error';
        msg = `Folder "${normalizedId}" not found in Zip`;
      } else if (imgCount < 9) {
        status = 'warning';
        msg = `Found ${imgCount} images (Expected 9)`;
      } else {
        msg = `Ready (${imgCount} images)`;
      }

      return { ...emp, empId, images, status, msg, imgCount };
    });
  }, [excelData, zipFolders]);

  // --- SAFE TO RETURN NOW ---
  if (!isOpen) return null;

  // --- HANDLERS ---

  // 1. Handle Excel Upload
  const handleExcelUpload = (e) => {
    const uploadedFile = e.target.files[0];
    if (!uploadedFile) return;

    setLoading(true);
    setExcelFile(uploadedFile);
    setExcelError(null);

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const binaryString = event.target.result;
        const workbook = XLSX.read(binaryString, { type: 'binary' });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 }); 

        if (jsonData.length < 2) throw new Error("File is empty or missing headers.");

        // Normalize Headers (handle 'employee_code', 'employee code', 'empid')
        const rawHeaders = jsonData[0];
        const headers = rawHeaders.map(h => h.toString().toLowerCase().trim().replace(/ /g, '_'));
        
        // Check for required ID column
        const idIndex = headers.findIndex(h => h === 'employee_code' || h === 'empid' || h === 'id');

        if (idIndex === -1) throw new Error("Missing 'employee_code' or 'empid' column.");
        
        // Parse Rows
        const parsed = [];
        for (let i = 1; i < jsonData.length; i++) {
          const row = jsonData[i];
          if (row.length === 0) continue;
          
          const obj = {};
          headers.forEach((h, idx) => obj[h] = row[idx]);
          parsed.push(obj);
        }

        setExcelData(parsed);
        setLoading(false);
      } catch (err) {
        setExcelError(err.message || "Failed to parse Excel.");
        setLoading(false);
        setExcelData([]);
      }
    };
    reader.readAsBinaryString(uploadedFile);
  };

  // 2. Handle Zip Upload (Folder Logic)
  const handleZipUpload = async (e) => {
    const uploadedFile = e.target.files[0];
    if (!uploadedFile) return;

    setLoading(true);
    setZipError(null);
    setZipFileMeta(uploadedFile);

    try {
      const zip = new JSZip();
      const contents = await zip.loadAsync(uploadedFile);
      
      const folderMap = {}; // Maps "EMP001" -> [Blob, Blob, ...]
      let count = 0;

      const filePromises = [];
      
      contents.forEach((relativePath, zipEntry) => {
        // Skip hidden files and directories
        if (!zipEntry.dir && !relativePath.startsWith('__MACOSX') && !relativePath.includes('.DS_Store')) {
          
          // Check if valid image
          if (relativePath.match(/\.(jpg|jpeg|png|webp)$/i)) {
             
             // LOGIC: Extract the parent folder name
             // Example: "MyZip/EMP001/img1.jpg" -> parts=["MyZip", "EMP001", "img1.jpg"] -> parent="EMP001"
             const parts = relativePath.split('/');
             
             // We assume the folder name matching the ID is the one directly containing the images
             // or the one level up if there's a root folder.
             // We look for the part of the path that looks like an ID (or just use the immediate parent)
             const fileName = parts.pop(); // Remove filename
             const parentFolder = parts.pop(); // Get immediate parent folder (e.g., EMP001)

             if (parentFolder) {
                 const promise = zipEntry.async('blob').then(blob => {
                     // Normalize folder name (trim) to match Excel
                     const cleanFolder = parentFolder.trim();
                     
                     if (!folderMap[cleanFolder]) folderMap[cleanFolder] = [];
                     folderMap[cleanFolder].push(blob);
                     count++;
                 });
                 filePromises.push(promise);
             }
          }
        }
      });

      await Promise.all(filePromises);

      if (count === 0) throw new Error("No valid images found in Zip file.");
      
      setZipFolders(folderMap);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setZipError("Failed to process Zip file. Ensure it contains folders with images.");
      setLoading(false);
    }
  };

  // 3. Save Handler
  const handleFinalSave = () => {
    // Allow partial import (filter out errors)
    const validData = validationSummary.filter(x => x.status !== 'error');
    if (validData.length === 0) {
        alert("No valid records to import.");
        return;
    }
    onSave(validData);
    onClose();
  };

  const downloadTemplate = () => {
    const ws = XLSX.utils.json_to_sheet([{ 
      employee_code: "EMP001", name: "John Doe", role: "Dev", email: "j@c.com", phone: "9999999999"
    }]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Template");
    XLSX.writeFile(wb, "Bulk_Import_Template.xlsx");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" onClick={onClose} />
      
      <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
        
        {/* HEADER */}
        <div className="flex items-center justify-between px-8 py-5 border-b border-slate-100 bg-white z-10">
          <div>
            <h2 className="text-xl font-bold text-slate-800">Bulk Employee Import</h2>
            <p className="text-xs text-slate-500 mt-1">Import metadata via Excel, then map images via Zip folders.</p>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:bg-slate-50 hover:text-slate-600 rounded-full transition"><X size={20} /></button>
        </div>

        {/* STEPPER UI */}
        <div className="bg-slate-50/50 px-8 py-4 border-b border-slate-100">
           <div className="flex items-center justify-between max-w-lg mx-auto">
              <div className={`flex flex-col items-center gap-2 ${currentStep >= 1 ? 'text-blue-600' : 'text-slate-400'}`}>
                 <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all ${currentStep >= 1 ? 'bg-blue-600 border-blue-600 text-white' : 'border-slate-300 bg-white'}`}>1</div>
                 <span className="text-xs font-semibold">Upload Excel</span>
              </div>
              <div className={`flex-1 h-0.5 mx-4 transition-all ${currentStep > 1 ? 'bg-blue-600' : 'bg-slate-200'}`} />
              
              <div className={`flex flex-col items-center gap-2 ${currentStep >= 2 ? 'text-blue-600' : 'text-slate-400'}`}>
                 <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all ${currentStep >= 2 ? 'bg-blue-600 border-blue-600 text-white' : 'border-slate-300 bg-white'}`}>2</div>
                 <span className="text-xs font-semibold">Upload Zip</span>
              </div>
              <div className={`flex-1 h-0.5 mx-4 transition-all ${currentStep > 2 ? 'bg-blue-600' : 'bg-slate-200'}`} />
              
              <div className={`flex flex-col items-center gap-2 ${currentStep >= 3 ? 'text-blue-600' : 'text-slate-400'}`}>
                 <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all ${currentStep >= 3 ? 'bg-blue-600 border-blue-600 text-white' : 'border-slate-300 bg-white'}`}>3</div>
                 <span className="text-xs font-semibold">Review</span>
              </div>
           </div>
        </div>

        {/* CONTENT AREA */}
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar bg-slate-50/30">
           
           {/* STEP 1: EXCEL */}
           {currentStep === 1 && (
             <div className="max-w-xl mx-auto space-y-6 animate-fadeIn">
                <div className="text-center space-y-2 mb-8">
                   <h3 className="text-lg font-bold text-slate-800">Step 1: Employee List</h3>
                   <p className="text-sm text-slate-500">Upload your CSV/Excel file containing <b>employee_code</b>, name, etc.</p>
                   <button onClick={downloadTemplate} className="text-xs text-blue-600 font-medium hover:underline flex items-center justify-center gap-1 mx-auto mt-2"><Download size={14}/> Download Template</button>
                </div>

                <div 
                  onClick={() => excelInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-3xl p-10 text-center cursor-pointer transition-all hover:bg-white hover:border-blue-300 hover:shadow-lg ${excelFile ? 'border-blue-500 bg-blue-50/50' : 'border-slate-300'}`}
                >
                    <input type="file" ref={excelInputRef} accept=".csv, .xlsx" hidden onChange={handleExcelUpload} />
                    {loading ? (
                       <Loader2 className="animate-spin mx-auto text-blue-600 mb-4" size={40} />
                    ) : excelFile ? (
                       <div>
                          <FileSpreadsheet className="mx-auto text-blue-600 mb-4" size={48} />
                          <p className="font-bold text-slate-800">{excelFile.name}</p>
                          <p className="text-sm text-slate-500 mt-1">{excelData.length} records found</p>
                          <p className="text-xs text-blue-600 mt-4 font-semibold hover:underline">Click to change file</p>
                       </div>
                    ) : (
                       <div>
                          <UploadCloud className="mx-auto text-slate-400 mb-4" size={48} />
                          <p className="font-bold text-slate-700">Click to upload Excel/CSV</p>
                          <p className="text-xs text-slate-400 mt-2">Max size 5MB</p>
                       </div>
                    )}
                </div>
                {excelError && (
                    <div className="flex items-center gap-3 p-4 bg-red-50 text-red-600 rounded-xl border border-red-100 text-sm">
                        <AlertTriangle size={18} /> {excelError}
                    </div>
                )}
             </div>
           )}

           {/* STEP 2: ZIP */}
           {currentStep === 2 && (
             <div className="max-w-xl mx-auto space-y-6 animate-fadeIn">
                <div className="text-center space-y-2 mb-8">
                   <h3 className="text-lg font-bold text-slate-800">Step 2: Images Zip</h3>
                   <p className="text-sm text-slate-500">
                      Upload a Zip file containing folders named after the <b>employee_code</b>.<br/>
                      <span className="text-xs bg-slate-200 px-1 rounded">Example: Zip &gt; EMP100 &gt; 9 images</span>
                   </p>
                </div>

                <div 
                  onClick={() => zipInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-3xl p-10 text-center cursor-pointer transition-all hover:bg-white hover:border-blue-300 hover:shadow-lg ${zipFileMeta ? 'border-purple-500 bg-purple-50/50' : 'border-slate-300'}`}
                >
                    <input type="file" ref={zipInputRef} accept=".zip" hidden onChange={handleZipUpload} />
                    {loading ? (
                       <div className="space-y-3">
                          <Loader2 className="animate-spin mx-auto text-purple-600" size={40} />
                          <p className="text-sm font-medium text-slate-600">Extracting Folders...</p>
                       </div>
                    ) : zipFileMeta ? (
                       <div>
                          <FileArchive className="mx-auto text-purple-600 mb-4" size={48} />
                          <p className="font-bold text-slate-800">{zipFileMeta.name}</p>
                          <p className="text-sm text-slate-500 mt-1">{Object.keys(zipFolders).length} employee folders found</p>
                          <p className="text-xs text-purple-600 mt-4 font-semibold hover:underline">Click to change file</p>
                       </div>
                    ) : (
                       <div>
                          <FileArchive className="mx-auto text-slate-400 mb-4" size={48} />
                          <p className="font-bold text-slate-700">Click to upload Zip</p>
                          <p className="text-xs text-slate-400 mt-2">Must contain folders matching IDs</p>
                       </div>
                    )}
                </div>
                {zipError && (
                    <div className="flex items-center gap-3 p-4 bg-red-50 text-red-600 rounded-xl border border-red-100 text-sm">
                        <AlertTriangle size={18} /> {zipError}
                    </div>
                )}
             </div>
           )}

           {/* STEP 3: REVIEW */}
           {currentStep === 3 && (
             <div className="space-y-4 animate-fadeIn">
                 <div className="flex justify-between items-center">
                    <h3 className="font-bold text-slate-800">Mapping Preview</h3>
                    <div className="flex gap-4 text-xs font-medium">
                        <span className="text-slate-500">Excel Rows: <b className="text-slate-800">{excelData.length}</b></span>
                        <span className="text-slate-500">Zip Folders: <b className="text-slate-800">{Object.keys(zipFolders).length}</b></span>
                    </div>
                 </div>

                 <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200">
                            <tr>
                                <th className="p-4">Emp Code</th>
                                <th className="p-4">Name</th>
                                <th className="p-4">Zip Folder</th>
                                <th className="p-4">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {validationSummary.map((item, idx) => (
                                <tr key={idx} className={item.status === 'error' ? 'bg-red-50/50' : ''}>
                                    <td className="p-4 font-mono text-slate-600">{item.empId}</td>
                                    <td className="p-4 font-medium text-slate-800">{item.name}</td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-2 text-slate-600">
                                            <FolderOpen size={14} className={item.imgCount > 0 ? "text-blue-500" : "text-slate-300"} />
                                            <span>{item.imgCount} images</span>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        {item.status === 'error' ? (
                                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-red-100 text-red-600">
                                                <AlertTriangle size={12} /> {item.msg}
                                            </span>
                                        ) : item.status === 'warning' ? (
                                             <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-orange-100 text-orange-600">
                                                <AlertTriangle size={12} /> {item.msg}
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-green-100 text-green-600">
                                                <CheckCircle size={12} /> Ready
                                            </span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                 </div>
             </div>
           )}

        </div>

        {/* FOOTER ACTIONS */}
        <div className="p-6 bg-white border-t border-slate-100 flex justify-between items-center z-10">
           {currentStep > 1 ? (
             <button 
                onClick={() => setCurrentStep(curr => curr - 1)}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-medium hover:bg-slate-50 transition"
             >
                <ArrowLeft size={16} /> Back
             </button>
           ) : (
             <div />
           )}

           {currentStep < 3 ? (
             <button 
                onClick={() => setCurrentStep(curr => curr + 1)}
                disabled={currentStep === 1 ? !excelFile : !zipFileMeta}
                className="flex items-center gap-2 px-8 py-2.5 rounded-xl bg-slate-900 text-white font-medium hover:bg-slate-800 transition disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-slate-200"
             >
                Next Step <ArrowRight size={16} />
             </button>
           ) : (
             <button 
                onClick={handleFinalSave}
                // Button is enabled if at least ONE row is NOT an error
                disabled={!validationSummary.some(x => x.status !== 'error')}
                className="flex items-center gap-2 px-8 py-2.5 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-200"
             >
                Complete Import <CheckCircle size={16} />
             </button>
           )}
        </div>

      </div>
    </div>
  );
}