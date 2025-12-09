import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (e) {
                console.error("Failed to parse user", e);
                localStorage.removeItem('user');
                navigate('/login');
            }
        } else {
            navigate('/login');
        }
    }, [navigate]);

    if (!user) return <div className="p-10 text-center font-sans text-slate-500">Loading Dashboard...</div>;

    const StatCard = ({ title, value, subtext, icon, color }) => (
        <div className="card flex items-center justify-between p-6 bg-white rounded-xl shadow-sm border border-slate-100">
            <div>
                <p className="text-slate-500 text-sm font-medium mb-1">{title}</p>
                <h3 className="text-3xl font-bold text-slate-800">{value}</h3>
                {subtext && <p className="text-xs text-slate-400 mt-1">{subtext}</p>}
            </div>
            <div className={`p-4 rounded-xl ${color} bg-opacity-10`}>
                {icon}
            </div>
        </div>
    );

    return (
        <div className="container mx-auto p-8 max-w-7xl font-sans">
            <div className="mb-10 flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold text-slate-900">Dashboard</h2>
                    <p className="text-slate-500 mt-1">
                        Welcome back, <span className="text-indigo-600 font-semibold">{user.name}</span>
                    </p>
                </div>
                <div className="text-sm text-slate-500 bg-white px-4 py-2 rounded-lg border border-slate-200 shadow-sm">
                    {user.role} Portal
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {/* Profile Card */}
                <div className="card bg-gradient-to-br from-indigo-600 to-indigo-700 text-white border-none p-6 rounded-2xl shadow-lg">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center text-2xl font-bold border border-white/30 backdrop-blur-sm">
                            {user.name ? user.name.charAt(0) : 'U'}
                        </div>
                        <div>
                            <h3 className="text-lg font-bold">{user.name}</h3>
                            <p className="text-indigo-100 text-sm opacity-90">{user.email}</p>
                        </div>
                    </div>

                    <div className="space-y-3 pt-4 border-t border-white/20">
                        <div className="flex justify-between text-sm">
                            <span className="text-indigo-100">Role</span>
                            <span className="font-semibold bg-white/20 px-3 py-0.5 rounded-full text-xs">{user.role}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-indigo-100">ID</span>
                            <span className="font-semibold font-mono text-xs bg-black/20 px-2 py-0.5 rounded">{user.employeeId || 'N/A'}</span>
                        </div>
                    </div>
                </div>

                {/* KPI Cards (Static for Stability) */}
                {(user.role === 'Manager' || user.role === 'CEO') && (
                    <>
                        <StatCard
                            title="Total Benches"
                            value="120"
                            subtext="85 Available"
                            color="bg-blue-500 text-blue-600"
                            icon={<span className="text-2xl">🪑</span>}
                        />
                        <StatCard
                            title="Active Employees"
                            value="200+"
                            subtext="Fully Allocated"
                            color="bg-violet-500 text-violet-600"
                            icon={<span className="text-2xl">👥</span>}
                        />
                    </>
                )}

                {user.role === 'Employee' && (
                    <StatCard
                        title="My Assigned Bench"
                        value={user.assignedBench ? 'B-104' : 'Pending'}
                        subtext={user.assignedBench ? 'Zone A' : 'Request Sent'}
                        color="bg-green-500 text-green-600"
                        icon={<span className="text-2xl">📍</span>}
                    />
                )}
            </div>

            {/* Banner */}
            <div className="rounded-2xl overflow-hidden shadow-sm border border-slate-200 bg-white relative">
                <div className="absolute top-0 left-0 w-2 h-full bg-indigo-500"></div>
                <div className="p-8">
                    <h3 className="text-xl font-bold text-slate-900 mb-2">System Status: Online</h3>
                    <p className="text-slate-600">
                        The bench allocation system is running.
                        {user.role === 'Manager' ? ' You can manage employees and approve requests from the navbar.' : ' Check your bench status above.'}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
