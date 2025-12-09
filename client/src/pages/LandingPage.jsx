import { Link } from 'react-router-dom';

const LandingPage = () => {
    return (
        <div className="min-h-screen mesh-gradient-light font-sans overflow-hidden">
            {/* Navbar */}
            <nav className="fixed w-full z-50 glass border-b border-white/50">
                <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center text-white font-bold">
                            S
                        </div>
                        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-700 to-violet-700 font-display">
                            SeatMaster
                        </span>
                    </div>
                    <Link to="/login" className="btn-primary">
                        Sign In
                    </Link>
                </div>
            </nav>

            {/* Hero Section */}
            <main className="pt-32 pb-20 px-6">
                <div className="container mx-auto text-center max-w-4xl relative">
                    {/* Floating Orbs */}
                    <div className="absolute top-0 -left-20 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob"></div>
                    <div className="absolute top-0 -right-20 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob animation-delay-2000"></div>

                    <div className="relative z-10 animate-fade-in">
                        <span className="px-4 py-1.5 rounded-full bg-indigo-50 text-indigo-700 text-sm font-semibold border border-indigo-100 mb-6 inline-block">
                            Now with AI-Powered Allocation
                        </span>
                        <h1 className="text-5xl md:text-7xl font-bold text-slate-900 mb-8 leading-tight tracking-tight">
                            Smart Workspace <br />
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600">
                                Management
                            </span>
                        </h1>
                        <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
                            Streamline your office seating with our premium allocation system.
                            Role-based access, real-time visualization, and seamless request management.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link to="/login" className="btn-primary text-lg px-8 py-4 shadow-xl shadow-indigo-200">
                                Get Started
                            </Link>
                            <a href="#features" className="btn-secondary text-lg px-8 py-4">
                                Learn More
                            </a>
                        </div>
                    </div>

                    {/* Dashboard Mockup */}
                    <div className="mt-20 relative animate-fade-in delay-200">
                        <div className="glass-card p-2 rounded-2xl border border-white/60 shadow-2xl skew-y-1 transform transition-transform hover:skew-y-0 duration-700">
                            <div className="bg-slate-50 rounded-xl overflow-hidden aspect-video relative border border-slate-200">
                                {/* Mock UI Elements */}
                                <div className="absolute top-0 left-0 w-full h-full bg-slate-50 grid grid-cols-4 gap-4 p-8">
                                    <div className="col-span-1 bg-white rounded-lg shadow-sm h-full"></div>
                                    <div className="col-span-3 grid grid-rows-3 gap-4">
                                        <div className="row-span-1 flex gap-4">
                                            <div className="flex-1 bg-white rounded-lg shadow-sm"></div>
                                            <div className="flex-1 bg-white rounded-lg shadow-sm"></div>
                                            <div className="flex-1 bg-white rounded-lg shadow-sm"></div>
                                        </div>
                                        <div className="row-span-2 bg-white rounded-lg shadow-sm"></div>
                                    </div>
                                </div>
                                <div className="absolute inset-0 flex items-center justify-center bg-black/5">
                                    <p className="text-slate-400 font-display font-bold text-xl">Interactive Dashboard Preview</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Features Grid */}
            <section id="features" className="py-20 bg-white">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-slate-900 mb-4">Powerful Features</h2>
                        <p className="text-slate-500 max-w-xl mx-auto">Everything you need to manage your hybrid workplace effectively.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { title: 'Visual Allocation', desc: 'See your office floor plan and assign seats with visualized availability.', icon: '🗺️' },
                            { title: 'Role-Based Access', desc: 'Distinct portals for CEOs, Managers, and Employees.', icon: '🔐' },
                            { title: 'Instant Requests', desc: 'Employees can request seat changes that managers approve in one click.', icon: '⚡' },
                        ].map((feature, i) => (
                            <div key={i} className="card hover:shadow-xl border-indigo-50/50 bg-slate-50/50">
                                <div className="text-4xl mb-4">{feature.icon}</div>
                                <h3 className="text-xl font-bold mb-2 text-slate-900">{feature.title}</h3>
                                <p className="text-slate-600">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default LandingPage;
