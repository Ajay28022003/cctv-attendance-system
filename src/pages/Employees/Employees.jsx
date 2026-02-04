import React, { useState, useMemo, useEffect } from 'react';
import { Search, Plus, Filter, Eye, UploadCloud, X, Pencil, Users, UserCheck, UserX } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AdminPageLayout from '../../components/layouts/AdminPageLayout';
import AddEmployeesModal from './AddEmployeesModal'; 
import BulkUploadModal from "./BulkUploadModal";
import UpdateEmployeeModal from './UpdateEmployeeModal'; 
import Loader from '../../components/loader/loader'; // Ensure this path matches your file structure
import { useToast } from '../../contexts/ToastContext';
import employeeData from "../../data/employee.json";

export default function Employees() {
  // --- STATE ---
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isBulkModalOpen, setIsBulkModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  
  const [employees, setEmployees] = useState(employeeData);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({ role: [], status: [] });
  
  // Loading State
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();
  const { addToast } = useToast();

  const ROLES = ['Developer', 'Designer', 'HR Manager', 'Sales', 'Manager'];
  const STATUSES = ['Active', 'Inactive'];

  // Simulate Data Fetching
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false); 
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // --- HANDLERS ---
  const toggleFilter = (category, value) => {
    setFilters(prev => {
      const current = prev[category];
      const updated = current.includes(value)
        ? current.filter(item => item !== value)
        : [...current, value];
      return { ...prev, [category]: updated };
    });
  };

  const clearFilters = () => setFilters({ role: [], status: [] });

  const filteredEmployees = useMemo(() => {
    return employees.filter(emp => {
      const matchesSearch = 
        emp.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        emp.empid.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesRole = filters.role.length === 0 || filters.role.includes(emp.role);
      const matchesStatus = filters.status.length === 0 || filters.status.includes(emp.status);
      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [employees, searchQuery, filters]);

  const activeFilterCount = filters.role.length + filters.status.length;

  // Stats Calculation
  const stats = useMemo(() => {
    const total = employees.length;
    const active = employees.filter(e => e.status === 'Active').length;
    const inactive = total - active;
    return { total, active, inactive };
  }, [employees]);

  // Actions
  const handleAddEmployee = (newEmployee) => {
    const employeeWithDefaults = { ...newEmployee, status: 'Active', time: '--:--' };
    setEmployees(prev => [...prev, employeeWithDefaults]);
    setIsAddModalOpen(false); 
    addToast(`Successfully added ${newEmployee.name}`, 'success');
  };

  const handleBulkAdd = (newEmployeesArray) => {
    const formattedEmployees = newEmployeesArray.map(emp => ({ ...emp, status: 'Active', time: '--:--', image: emp.image || null }));
    setEmployees(prev => [...prev, ...formattedEmployees]);
    setIsBulkModalOpen(false);
    addToast(`Successfully imported ${formattedEmployees.length} employees`, 'success');
  };

  const openUpdateModal = (emp) => {
    setSelectedEmployee(emp);
    setIsUpdateModalOpen(true);
  };

  const handleUpdateEmployee = (updatedData) => {
    setEmployees(prev => prev.map(emp => emp.empid === updatedData.empid ? { ...emp, ...updatedData } : emp));
    setIsUpdateModalOpen(false);
    setSelectedEmployee(null);
    addToast(`Updated details for ${updatedData.name}`, 'info');
  };

  return (
    <>
      <AdminPageLayout
        title="Employee Directory"
        description="Manage access control and view personnel logs."
        action={
          <div className="flex gap-3">
            <button onClick={() => setIsBulkModalOpen(true)} className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-sm font-medium rounded-xl transition shadow-sm">
              <UploadCloud size={18} className="text-slate-500" /> <span className="hidden sm:inline">Bulk Upload</span>
            </button>
            <button onClick={() => setIsAddModalOpen(true)} className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-xl transition shadow-lg shadow-blue-200">
              <Plus size={18} /> <span className="hidden sm:inline">Add Employee</span>
            </button>
          </div>
        }
      >
        
        {/* --- MAIN CONTENT AREA: WRAPPED IN LOADER CHECK --- */}
        {isLoading ? (
          // Loader covers everything now (Stats + Search + Table)
          <Loader text="Loading Employee Directory..." height="h-[75vh]" />
        ) : (
          <>
            {/* 1. TOP STATS ROW */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 animate-in slide-in-from-bottom-4 fade-in duration-500">
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between group transition-all duration-300 border-r-4 border-r-blue-500 hover:border-r-blue-600 hover:shadow-lg hover:shadow-blue-50 hover:-translate-y-1">
                    <div>
                    <p className="text-sm font-medium text-slate-500 mb-1">Total Employees</p>
                    <h3 className="text-2xl font-bold text-slate-800">{stats.total}</h3>
                    </div>
                    <div className="p-3 bg-blue-50 text-blue-600 rounded-xl group-hover:scale-110 transition-transform duration-300">
                    <Users size={24}/>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between group transition-all duration-300 border-r-4 border-r-emerald-500 hover:border-r-emerald-600 hover:shadow-lg hover:shadow-emerald-50 hover:-translate-y-1">
                    <div>
                    <p className="text-sm font-medium text-slate-500 mb-1">Active Now</p>
                    <h3 className="text-2xl font-bold text-slate-800">{stats.active}</h3>
                    </div>
                    <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl group-hover:scale-110 transition-transform duration-300">
                    <UserCheck size={24}/>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between group transition-all duration-300 border-r-4 border-r-orange-500 hover:border-r-orange-600 hover:shadow-lg hover:shadow-orange-50 hover:-translate-y-1">
                    <div>
                    <p className="text-sm font-medium text-slate-500 mb-1">Inactive</p>
                    <h3 className="text-2xl font-bold text-slate-800">{stats.inactive}</h3>
                    </div>
                    <div className="p-3 bg-orange-50 text-orange-500 rounded-xl group-hover:scale-110 transition-transform duration-300">
                    <UserX size={24}/>
                    </div>
                </div>
            </div>

            {/* 2. SEARCH & FILTER */}
            <div className="relative z-20 mb-6 animate-in slide-in-from-bottom-4 fade-in duration-700">
              <div className="flex gap-3 items-center bg-white p-2 rounded-2xl border border-slate-200 shadow-sm">
                <div className="flex-1 flex items-center gap-2 px-4 bg-slate-50 rounded-xl border border-transparent focus-within:border-blue-200 focus-within:bg-blue-50/50 transition">
                  <Search size={18} className="text-slate-400" />
                  <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search by name, ID or role..." className="w-full bg-transparent py-2.5 text-sm outline-none text-slate-700 placeholder:text-slate-400" />
                  {searchQuery && <button onClick={() => setSearchQuery('')} className="text-slate-400 hover:text-slate-600"><X size={14} /></button>}
                </div>
                <button onClick={() => setIsFilterOpen(!isFilterOpen)} className={`relative p-2.5 rounded-xl transition border flex items-center gap-2 font-medium text-sm ${isFilterOpen || activeFilterCount > 0 ? 'bg-blue-50 text-blue-600 border-blue-200' : 'text-slate-500 hover:bg-slate-100 border-transparent hover:border-slate-200'}`}>
                  <Filter size={18} /> <span className="hidden sm:inline">Filters</span> {activeFilterCount > 0 && <span className="bg-blue-600 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full">{activeFilterCount}</span>}
                </button>
              </div>

              {isFilterOpen && (
                <div className="absolute top-full right-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-slate-100 p-5 z-30 animate-in fade-in slide-in-from-top-2">
                  <div className="flex justify-between items-center mb-4"><h3 className="text-sm font-bold text-slate-800">Filter By</h3><button onClick={clearFilters} disabled={activeFilterCount === 0} className="text-xs font-medium text-blue-600 hover:underline disabled:opacity-50">Reset</button></div>
                  <div className="mb-4"><p className="text-xs font-bold text-slate-400 uppercase mb-2">Status</p><div className="flex flex-wrap gap-2">{STATUSES.map(s => (<button key={s} onClick={() => toggleFilter('status', s)} className={`px-3 py-1 text-xs border rounded-lg ${filters.status.includes(s) ? 'bg-blue-50 border-blue-200 text-blue-700' : 'text-slate-600'}`}>{s}</button>))}</div></div>
                  <div><p className="text-xs font-bold text-slate-400 uppercase mb-2">Role</p><div className="flex flex-wrap gap-2">{ROLES.map(r => (<button key={r} onClick={() => toggleFilter('role', r)} className={`px-3 py-1 text-xs border rounded-lg ${filters.role.includes(r) ? 'bg-blue-50 border-blue-200 text-blue-700' : 'text-slate-600'}`}>{r}</button>))}</div></div>
                </div>
              )}
            </div>

            {/* 3. TABLE LAYOUT */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden min-h-[400px] flex flex-col animate-in slide-in-from-bottom-4 fade-in duration-1000">
               {filteredEmployees.length === 0 ? (
                 <div className="p-16 text-center">
                    <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4"><Search className="text-slate-300" size={32} /></div>
                    <h3 className="text-slate-800 font-bold">No employees found</h3>
                    <p className="text-slate-500 text-sm mt-1">Try adjusting your search or filters.</p>
                 </div>
               ) : (
                 <table className="w-full text-left text-sm text-slate-600">
                   <thead className="bg-slate-50 border-b border-slate-200">
                      <tr>
                        <th className="px-6 py-4 font-bold text-xs uppercase text-slate-500 tracking-wider">Employee</th>
                        <th className="px-6 py-4 font-bold text-xs uppercase text-slate-500 tracking-wider">Role</th>
                        <th className="px-6 py-4 font-bold text-xs uppercase text-slate-500 tracking-wider">Department</th>
                        <th className="px-6 py-4 font-bold text-xs uppercase text-slate-500 tracking-wider">Phone</th>
                        <th className="px-6 py-4 font-bold text-xs uppercase text-slate-500 tracking-wider">Email</th>
                        <th className="px-6 py-4 font-bold text-xs uppercase text-slate-500 tracking-wider">Status</th>
                        <th className="px-6 py-4 text-right font-bold text-xs uppercase text-slate-500 tracking-wider">Actions</th>
                      </tr>
                    </thead>
                   <tbody className="divide-y divide-slate-100">
                     {filteredEmployees.map((emp) => (
                       <tr key={emp.empid} className="hover:bg-blue-50/30 transition group">
                          
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-4">
                              <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 overflow-hidden shrink-0 flex items-center justify-center">
                                {emp.image ? (
                                  <img src={emp.image} alt={emp.name} className="w-full h-full object-cover" />
                                ) : (
                                  <span className="font-bold text-slate-500">{emp.name.charAt(0)}</span>
                                )}
                              </div>
                              <div>
                                <p className="font-bold text-slate-800 group-hover:text-blue-600 transition">{emp.name}</p>
                                <p className="text-xs text-slate-400 font-mono">{emp.empid}</p>
                              </div>
                            </div>
                          </td>

                          <td className="px-6 py-4">
                             <span className="text-slate-700 font-medium">{emp.role}</span>
                          </td>
                          <td className="px-6 py-4">
                             <span className="text-slate-700 font-medium">{emp.department}</span>
                          </td>
                           <td className="px-6 py-4">
                             <span className="text-slate-700 font-medium">{emp.phone}</span>
                          </td> <td className="px-6 py-4">
                             <span className="text-slate-700 font-medium">{emp.email}</span>
                          </td>
                          
                          <td className="px-6 py-4">
                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border ${
                              emp.status === 'Active' 
                                ? 'bg-emerald-50 text-emerald-700 border-emerald-100' 
                                : 'bg-slate-50 text-slate-600 border-slate-200'
                            }`}>
                              <span className={`w-1.5 h-1.5 rounded-full ${emp.status === 'Active' ? 'bg-emerald-500' : 'bg-slate-400'}`}></span>
                              {emp.status}
                            </span>
                          </td>

                          {/* <td className="px-6 py-4">
                             <div className="text-slate-500">
                                {emp.time !== '--:--' ? (
                                    <span className="font-mono text-slate-700 bg-slate-100 px-2 py-0.5 rounded text-xs">{emp.time}</span>
                                ) : (
                                    <span className="text-xs italic text-slate-400">No recent logs</span>
                                )}
                             </div>
                          </td> */}

                          <td className="px-6 py-4 text-right">
                             <div className="flex justify-end gap-2 transition-opacity">
                               <button onClick={() => openUpdateModal(emp)} className="p-2 bg-white border border-slate-200 rounded-lg text-slate-400 hover:text-blue-600 hover:border-blue-200 hover:shadow-sm transition" title="Edit">
                                 <Pencil size={14} />
                               </button>
                               <button onClick={() => navigate(`/employees/${emp.empid}`)} className="p-2 bg-white border border-slate-200 rounded-lg text-slate-400 hover:text-slate-700 hover:border-slate-300 hover:shadow-sm transition" title="View Profile">
                                 <Eye size={16} />
                               </button>
                            </div>
                          </td>
                       </tr>
                     ))}
                   </tbody>
                 </table>
               )}
            </div>
          </>
        )}

      </AdminPageLayout>

      <AddEmployeesModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} onSave={handleAddEmployee} />
      <BulkUploadModal isOpen={isBulkModalOpen} onClose={() => setIsBulkModalOpen(false)} onSave={handleBulkAdd} />
      <UpdateEmployeeModal isOpen={isUpdateModalOpen} onClose={() => setIsUpdateModalOpen(false)} onSave={handleUpdateEmployee} employee={selectedEmployee} />
    </>
  );
}