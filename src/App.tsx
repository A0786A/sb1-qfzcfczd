import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import Clients from './pages/Clients';
import Projects from './pages/Projects';
import Employees from './pages/Employees';
import Marketing from './pages/Marketing';
import Leads from './pages/Leads';
import Interns from './pages/Interns';
import Login from './pages/Login';
import Settings from './pages/Settings';
import AIServices from './pages/AIServices';
import Reports from './pages/Reports';
import Calendar from './pages/Calendar';
import Communications from './pages/Communications';
import Tasks from './pages/Tasks';
import PrivateRoute from './components/PrivateRoute';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          
          <Route path="/" element={
            <PrivateRoute>
              <Layout />
            </PrivateRoute>
          }>
            <Route index element={<Dashboard />} />
            <Route path="clients" element={<Clients />} />
            <Route path="projects" element={<Projects />} />
            <Route path="employees" element={<Employees />} />
            <Route path="marketing" element={<Marketing />} />
            <Route path="leads" element={<Leads />} />
            <Route path="interns" element={<Interns />} />
            <Route path="settings" element={<Settings />} />
            <Route path="tasks" element={<Tasks />} />
            <Route path="calendar" element={<Calendar />} />
            <Route path="communication" element={<Communications />} />
            <Route path="services" element={<AIServices />} />
            <Route path="reports" element={<Reports />} />
            <Route path="*" element={<Navigate replace to="/" />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

// Placeholder component for routes not yet implemented
const ComingSoon: React.FC<{ title: string }> = ({ title }) => {
  return (
    <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
      </div>
      <div className="bg-white shadow-sm rounded-lg p-8 text-center">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Coming Soon</h2>
        <p className="text-gray-500 max-w-md mx-auto">
          We're working hard to bring you this feature. Check back soon!
        </p>
      </div>
    </div>
  );
};

export default App;