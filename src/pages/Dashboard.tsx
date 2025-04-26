import React, { useState, useEffect } from 'react';
import MetricsCard from '../components/dashboard/MetricsCard';
import RecentProjects from '../components/dashboard/RecentProjects';
import RecentClients from '../components/dashboard/RecentClients';
import TasksOverview from '../components/dashboard/TasksOverview';
import CommunicationActivity from '../components/dashboard/CommunicationActivity';
import { supabase } from '../lib/supabase';

const Dashboard: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState({
    clients: [],
    projects: [],
    tasks: [],
    metrics: []
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Fetch clients
      const { data: clients } = await supabase
        .from('clients')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5);

      // Fetch projects with client info
      const { data: projects } = await supabase
        .from('projects')
        .select(`
          *,
          client:clients(name)
        `)
        .order('start_date', { ascending: false })
        .limit(5);

      // Fetch tasks
      const { data: tasks } = await supabase
        .from('tasks')
        .select('*')
        .order('due_date', { ascending: true })
        .limit(5);

      // Calculate metrics
      const { data: allClients } = await supabase.from('clients').select('status');
      const { data: allProjects } = await supabase.from('projects').select('status, budget');
      
      const activeClients = allClients?.filter(c => c.status === 'active').length || 0;
      const projectsInProgress = allProjects?.filter(p => p.status === 'in-progress').length || 0;
      const totalRevenue = allProjects?.reduce((sum, p) => sum + (p.budget || 0), 0) || 0;
      const completedProjects = allProjects?.filter(p => p.status === 'completed').length || 0;
      const totalProjects = allProjects?.length || 0;
      const avgCompletion = totalProjects ? (completedProjects / totalProjects) * 100 : 0;

      const metrics = [
        {
          id: 'metric-1',
          label: 'Active Clients',
          value: activeClients,
          change: 0,
          trend: 'neutral'
        },
        {
          id: 'metric-2',
          label: 'Projects in Progress',
          value: projectsInProgress,
          change: 0,
          trend: 'neutral'
        },
        {
          id: 'metric-3',
          label: 'Revenue This Month',
          value: totalRevenue,
          change: 0,
          trend: 'neutral'
        },
        {
          id: 'metric-4',
          label: 'Avg. Project Completion',
          value: Math.round(avgCompletion),
          change: 0,
          trend: 'neutral'
        }
      ];

      setDashboardData({
        clients: clients || [],
        projects: projects || [],
        tasks: tasks || [],
        metrics
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex justify-center items-center min-h-screen">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">
          Welcome back! Here's what's happening with your agency today.
        </p>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {dashboardData.metrics.map((metric) => (
          <MetricsCard key={metric.id} metric={metric} />
        ))}
      </div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <RecentProjects projects={dashboardData.projects} />
          <TasksOverview tasks={dashboardData.tasks} />
        </div>
        <div className="space-y-6">
          <RecentClients clients={dashboardData.clients} />
          <CommunicationActivity communications={[]} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;