import { useEffect, useState } from 'react';
import API from '../api/axios';
import Layout from '../components/layout';

type DashboardData = {
  totalClients: number;
  totalProjects: number;
  remindersDue: number;
  projectsByStatus: Record<string, number>;
};

export default function Dashboard() {
  const [stats, setStats] = useState<DashboardData | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await API.get('/dashboard');
        setStats(res.data);
      } catch (err) {
        console.error('Error loading dashboard:', err);
      }
    }
    fetchData();
  }, []);

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

      {!stats ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card title="Clients" value={stats.totalClients} />
          <Card title="Projects" value={stats.totalProjects} />
          <Card title="Reminders Due" value={stats.remindersDue} />
          <Card title="Projects by Status" value={Object.entries(stats.projectsByStatus).map(
            ([status, count]) => `${status}: ${count}`).join(', ')} />
        </div>
      )}
    </Layout>
  );
}

function Card({ title, value }: { title: string; value: string | number }) {
  return (
    <div className="bg-white dark:bg-gray-800 shadow p-4 rounded">
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="text-2xl font-bold mt-2">{value}</p>
    </div>
  );
}



    
