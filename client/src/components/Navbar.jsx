import { Link, useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const user = JSON.parse(localStorage.getItem('user'));

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/');
    };

    if (!user) return null;

    const isActive = (path) => location.pathname === path
        ? "bg-indigo-50 text-indigo-700 font-semibold"
        : "text-slate-600 hover:text-indigo-600 hover:bg-slate-50";

    return (
        <nav className="glass sticky top-0 z-50 border-b border-indigo-50/50">
            <div className="container mx-auto px-6 py-3 flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-indigo-200">
                        SM
                    </div>
                    <Link to="/dashboard" className="text-lg font-bold font-display text-slate-800 tracking-tight">
                        SeatMaster
                    </Link>
                </div>

                <div className="flex items-center gap-1 bg-white/50 p-1 rounded-xl border border-slate-200/50 backdrop-blur-sm">
                    <Link to="/dashboard" className={`px-4 py-2 rounded-lg text-sm transition-all ${isActive('/dashboard')}`}>Dashboard</Link>
                    {(user.role === 'Manager' || user.role === 'CEO') && (
                        <Link to="/employees" className={`px-4 py-2 rounded-lg text-sm transition-all ${isActive('/employees')}`}>Employees</Link>
                    )}
                    <Link to="/benches" className={`px-4 py-2 rounded-lg text-sm transition-all ${isActive('/benches')}`}>Benches</Link>
                    <Link to="/requests" className={`px-4 py-2 rounded-lg text-sm transition-all ${isActive('/requests')}`}>Requests</Link>
                </div>

                <div className="flex items-center gap-4">
                    <div className="text-right hidden md:block">
                        <p className="text-sm font-semibold text-slate-800">{user?.name || 'User'}</p>
                        <p className="text-xs text-slate-500 font-medium">{user?.role || ''}</p>
                    </div>
                    <button onClick={handleLogout} className="w-9 h-9 flex items-center justify-center rounded-lg border border-slate-200 hover:bg-red-50 hover:text-red-600 hover:border-red-100 transition-colors text-slate-400">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
