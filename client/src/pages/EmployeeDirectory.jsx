import { useState, useEffect } from 'react';
import API from '../api/axios';

const EmployeeDirectory = () => {
    const [employees, setEmployees] = useState([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchEmployees();
    }, [search]);

    const fetchEmployees = async () => {
        try {
            const { data } = await API.get(`/users?search=${search}`);
            setEmployees(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching employees:', error);
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto p-8 max-w-7xl">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h2 className="text-3xl font-bold text-slate-900">Employee Directory</h2>
                    <p className="text-slate-500">Manage talent and allocate resources.</p>
                </div>
                <div className="relative w-72">
                    <input
                        type="text"
                        placeholder="Search by name, skill..."
                        className="input-field pl-10"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <svg className="w-5 h-5 absolute left-3 top-3 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                </div>
            </div>

            {loading ? (
                <div className="text-center py-10">Loading directory...</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {employees.map((emp) => (
                        <div key={emp._id} className="card group hover:shadow-lg transition-all border-l-4 border-l-transparent hover:border-l-indigo-500">
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-bold text-lg">
                                        {emp.name.charAt(0)}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-slate-900">{emp.name}</h3>
                                        <p className="text-xs text-slate-500">{emp.email}</p>
                                    </div>
                                </div>
                                <span className={`px-2 py-1 text-xs rounded-full font-medium ${emp.assignedBench ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                                    {emp.assignedBench ? 'Allocated' : 'Unassigned'}
                                </span>
                            </div>

                            <div className="space-y-3">
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-500">ID</span>
                                    <span className="font-medium">{emp.employeeId}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-500">Experience</span>
                                    <span className="font-medium">{emp.experience || 'N/A'}</span>
                                </div>
                                <div>
                                    <p className="text-xs text-slate-400 mb-2">SKILLS</p>
                                    <div className="flex flex-wrap gap-2">
                                        {emp.skills && emp.skills.length > 0 ? (
                                            emp.skills.map((skill, i) => (
                                                <span key={i} className="px-2 py-1 bg-indigo-50 text-indigo-700 text-xs rounded border border-indigo-100 font-medium">
                                                    {skill}
                                                </span>
                                            ))
                                        ) : (
                                            <span className="text-xs italic text-slate-400">No skills listed</span>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Future action buttons could go here */}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default EmployeeDirectory;
