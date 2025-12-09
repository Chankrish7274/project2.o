import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import BenchAllocation from './pages/BenchAllocation';
import RequestManagement from './pages/RequestManagement';
import EmployeeDirectory from './pages/EmployeeDirectory';

import LandingPage from './pages/LandingPage';

const PrivateRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  return user ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<PrivateRoute><><Navbar /><Dashboard /></></PrivateRoute>} />
        <Route path="/employees" element={<PrivateRoute><><Navbar /><EmployeeDirectory /></></PrivateRoute>} />
        <Route path="/benches" element={<PrivateRoute><><Navbar /><BenchAllocation /></></PrivateRoute>} />
        <Route path="/requests" element={<PrivateRoute><><Navbar /><RequestManagement /></></PrivateRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
