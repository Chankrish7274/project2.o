import { useState, useEffect } from 'react';
import API from '../api/axios';

const RequestManagement = () => {
    const [requests, setRequests] = useState([]);
    const user = JSON.parse(localStorage.getItem('user'));
    const isManager = user.role === 'Manager' || user.role === 'CEO';

    useEffect(() => {
        fetchRequests();
    }, []);

    const fetchRequests = async () => {
        try {
            const { data } = await API.get('/requests');
            setRequests(data);
        } catch (error) {
            console.error('Error fetching requests:', error);
        }
    };

    const handleCreateRequest = async (e) => {
        e.preventDefault();
        const type = e.target.type.value;
        const description = e.target.description.value;

        try {
            await API.post('/requests', { type, description });
            fetchRequests();
            e.target.reset();
        } catch (error) {
            alert(error.response?.data?.message || 'Failed to submit request');
        }
    };

    const handleStatusUpdate = async (id, status) => {
        try {
            await API.put(`/requests/${id}`, { status });
            fetchRequests();
        } catch (error) {
            alert(error.response?.data?.message || 'Update failed');
        }
    };

    return (
        <div className="container mx-auto p-8 max-w-6xl">
            <div className="mb-8">
                <h2 className="text-3xl font-bold text-slate-900">Request Management</h2>
                <p className="text-slate-500">Handle allocation changes and maintenance.</p>
            </div>

            {/* Employee: Create Request */}
            {user.role === 'Employee' && (
                <div className="card mb-8 border-indigo-100">
                    <h3 className="font-bold text-lg mb-4 text-slate-800">New Request Submission</h3>
                    <form onSubmit={handleCreateRequest} className="flex flex-col md:flex-row gap-4 items-end">
                        <div className="w-full md:w-1/4">
                            <label className="block text-sm font-medium text-slate-700 mb-1">Request Type</label>
                            <select name="type" className="input-field bg-white">
                                <option>New Allocation</option>
                                <option>Change Request</option>
                                <option>Maintenance</option>
                            </select>
                        </div>
                        <div className="w-full md:w-2/4">
                            <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                            <input name="description" placeholder="Short description of your request..." className="input-field" required />
                        </div>
                        <button className="btn-primary w-full md:w-1/4">Submit Request</button>
                    </form>
                </div>
            )}

            {/* List Requests */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-slate-200">
                        <thead className="bg-slate-50">
                            <tr>
                                <th className="py-4 px-6 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Requester</th>
                                <th className="py-4 px-6 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Type</th>
                                <th className="py-4 px-6 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Description</th>
                                <th className="py-4 px-6 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                                {isManager && <th className="py-4 px-6 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Actions</th>}
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-slate-200">
                            {requests.map((req) => (
                                <tr key={req._id} className="hover:bg-slate-50 transition-colors">
                                    <td className="py-4 px-6 whitespace-nowrap">
                                        <div className="font-medium text-slate-900">{req.requester.name}</div>
                                        <div className="text-xs text-slate-500">{req.requester.employeeId}</div>
                                    </td>
                                    <td className="py-4 px-6 whitespace-nowrap">
                                        <span className="px-2 py-1 bg-indigo-50 text-indigo-700 rounded-md text-xs font-medium border border-indigo-100">
                                            {req.type}
                                        </span>
                                    </td>
                                    <td className="py-4 px-6 text-sm text-slate-600 max-w-xs truncate">{req.description}</td>
                                    <td className="py-4 px-6 whitespace-nowrap">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${req.status === 'Approved' ? 'bg-green-50 text-green-700 border-green-200' :
                                                req.status === 'Rejected' ? 'bg-red-50 text-red-700 border-red-200' :
                                                    'bg-yellow-50 text-yellow-700 border-yellow-200'
                                            }`}>
                                            {req.status}
                                        </span>
                                    </td>
                                    {isManager && (
                                        <td className="py-4 px-6 whitespace-nowrap text-sm font-medium">
                                            {req.status === 'Pending' ? (
                                                <div className="flex gap-2">
                                                    <button onClick={() => handleStatusUpdate(req._id, 'Approved')} className="text-green-600 hover:text-green-900 bg-green-50 hover:bg-green-100 px-2 py-1 rounded transition-colors">Approve</button>
                                                    <button onClick={() => handleStatusUpdate(req._id, 'Rejected')} className="text-red-600 hover:text-red-900 bg-red-50 hover:bg-red-100 px-2 py-1 rounded transition-colors">Reject</button>
                                                </div>
                                            ) : (
                                                <span className="text-slate-400">Completed</span>
                                            )}
                                        </td>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {requests.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-slate-500">No requests found</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RequestManagement;
