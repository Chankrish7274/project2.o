import { useState, useEffect } from 'react';
import API from '../api/axios';

const BenchAllocation = () => {
    const [benches, setBenches] = useState([]);
    const [loading, setLoading] = useState(true);
    const user = JSON.parse(localStorage.getItem('user'));
    const isManager = user.role === 'Manager' || user.role === 'CEO';

    useEffect(() => {
        fetchBenches();
    }, []);

    const fetchBenches = async () => {
        try {
            const { data } = await API.get('/benches');
            setBenches(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching benches:', error);
            setLoading(false);
        }
    };

    const handleDeallocate = async (id) => {
        if (!window.confirm('Are you sure you want to deallocate this bench?')) return;
        try {
            await API.put(`/benches/${id}/deallocate`);
            fetchBenches();
        } catch (error) {
            alert(error.response?.data?.message || 'Deallocation failed');
        }
    };

    const handleAssign = (id) => {
        const userId = prompt("Enter User ID to assign (For demo, paste a User _id):");
        if (userId) {
            API.put(`/benches/${id}/assign`, { userId })
                .then(() => fetchBenches())
                .catch(err => alert(err.response?.data?.message || 'Assignment failed'));
        }
    };

    const handleCreateBench = async (e) => {
        e.preventDefault();
        const benchId = e.target.benchId.value;
        const building = e.target.building.value;
        const floor = e.target.floor.value;

        try {
            await API.post('/benches', { benchId, building, floor });
            fetchBenches();
            e.target.reset();
        } catch (error) {
            alert(error.response?.data?.message || 'Create failed');
        }
    };

    if (loading) return (
        <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
    );

    return (
        <div className="container mx-auto p-8 max-w-7xl">
            <div className="flex justify-between items-end mb-8">
                <div>
                    <h2 className="text-3xl font-bold text-slate-900">Bench Allocation</h2>
                    <p className="text-slate-500">Manage seating arrangements.</p>
                </div>
            </div>

            {isManager && (
                <div className="card mb-8 bg-slate-50 border-indigo-100">
                    <h3 className="font-bold text-lg mb-4 text-slate-800 flex items-center gap-2">
                        <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
                        Add New Bench
                    </h3>
                    <form onSubmit={handleCreateBench} className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <input name="benchId" placeholder="Bench ID (e.g. A-101)" className="input-field" required />
                        <input name="building" placeholder="Building" className="input-field" required />
                        <input name="floor" placeholder="Floor" className="input-field" required />
                        <button className="btn-primary">Add Bench</button>
                    </form>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {benches.map((bench) => (
                    <div key={bench._id} className="card relative group hover:-translate-y-1 transition-transform duration-300">
                        <div className={`absolute top-4 right-4 w-3 h-3 rounded-full ${bench.status === 'Available' ? 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]' : 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]'}`}></div>

                        <div className="mb-4">
                            <h3 className="text-xl font-bold text-slate-800">{bench.benchId}</h3>
                            <p className="text-slate-500 text-sm">{bench.building} • {bench.floor}</p>
                        </div>

                        <div className={`p-3 rounded-lg mb-4 text-sm ${bench.status === 'Available' ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-slate-100 text-slate-600 border border-slate-200'}`}>
                            {bench.occupiedBy ? (
                                <div>
                                    <p className="font-semibold">{bench.occupiedBy.name}</p>
                                    <p className="text-xs opacity-75">{bench.occupiedBy.employeeId}</p>
                                </div>
                            ) : (
                                <span className="font-medium flex items-center gap-1">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                    Available
                                </span>
                            )}
                        </div>

                        {isManager && (
                            <div className="pt-2 border-t border-slate-100">
                                {bench.status === 'Available' ? (
                                    <button onClick={() => handleAssign(bench._id)} className="w-full btn-primary text-sm py-2">Assign User</button>
                                ) : (
                                    <button onClick={() => handleDeallocate(bench._id)} className="w-full btn-secondary text-red-600 border-red-200 hover:bg-red-50 text-sm py-2">Deallocate</button>
                                )}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {benches.length === 0 && (
                <div className="text-center py-20 text-slate-400">
                    <svg className="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
                    <p className="text-lg">No benches found.</p>
                </div>
            )}
        </div>
    );
};

export default BenchAllocation;
