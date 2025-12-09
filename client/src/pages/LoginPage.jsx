import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [activeTab, setActiveTab] = useState('CEO'); // CEO, Manager, Employee
    const navigate = useNavigate();

    // Demo credentials for easy filling
    const fillCredentials = (role) => {
        setActiveTab(role);
        setError('');
        if (role === 'CEO') {
            setEmail('ceo@company.com');
            setPassword('admin123');
        } else if (role === 'Manager') {
            setEmail('manager@company.com');
            setPassword('manager123');
        } else if (role === 'Employee') {
            setEmail('robert.garcia1@company.com');
            setPassword('password123');
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const { data } = await API.post('/auth/login', { email, password });
            localStorage.setItem('user', JSON.stringify(data));
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed. Please check credentials.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center mesh-gradient-light p-4 font-sans">
            <div className="glass-card p-8 rounded-2xl w-full max-w-md">
                <div className="text-center mb-6">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
                    <p className="text-gray-500">Bench Allocation System</p>
                </div>

                {/* Role Tabs */}
                <div className="grid grid-cols-3 gap-2 mb-6 p-1 bg-slate-100 rounded-lg">
                    {['CEO', 'Manager', 'Employee'].map((role) => (
                        <button
                            key={role}
                            onClick={() => fillCredentials(role)}
                            className={`py-2 text-sm font-medium rounded-md transition-all ${activeTab === role
                                ? 'bg-white text-indigo-600 shadow-sm'
                                : 'text-slate-500 hover:text-slate-700'
                                }`}
                        >
                            {role}
                        </button>
                    ))}
                </div>

                {error && (
                    <div className="mb-4 p-4 bg-red-50 text-red-700 rounded-lg text-sm border border-red-100 flex items-center animate-pulse">
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                        <input
                            type="email"
                            className="input-field"
                            placeholder="name@company.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input
                            type="password"
                            className="input-field"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button className="w-full btn-primary py-3 shadow-lg shadow-indigo-200">
                        Login as {activeTab}
                    </button>
                </form>

                <div className="mt-6 pt-6 border-t border-gray-100 text-center text-xs text-gray-400">
                    <p>Select a tab above to auto-fill demo credentials.</p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
