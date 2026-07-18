import { useEffect, useState } from 'react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { api } from '../context/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner';
import EmptyState from '../components/EmptyState';

const COLORS = ['#1A4D8F', '#E65100', '#2E7D32', '#6F6F6F', '#8E9AAF', '#B08968'];

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await api.get('/dashboard/stats');
        setStats(data.data);
      } catch (err) {
        setError(err?.response?.data?.message || 'Could not load dashboard stats');
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (error || !stats) {
    return <EmptyState message={error || 'No stats available yet'} />;
  }

  if (stats.totalGenerated === 0) {
    return (
      <EmptyState message="No descriptions generated yet. Head to the Generator to create your first one!" />
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-10 animate-fade-rise">
      <h1 className="mb-1 text-3xl font-serif text-black">Dashboard</h1>
      <p className="mb-8 text-[#6F6F6F]">
        You've generated <span className="font-medium text-[#1A4D8F]">{stats.totalGenerated}</span>{' '}
        descriptions so far.
      </p>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Activity over last 7 days */}
        <div className="rounded-xl border border-gray-100 p-5 shadow-sm">
          <h2 className="mb-4 text-lg font-medium text-black">Activity (Last 7 Days)</h2>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={stats.last7Days}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="date" tick={{ fontSize: 12 }} stroke="#6F6F6F" />
              <YAxis allowDecimals={false} stroke="#6F6F6F" />
              <Tooltip />
              <Line type="monotone" dataKey="count" stroke="#1A4D8F" strokeWidth={2} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* By platform */}
        <div className="rounded-xl border border-gray-100 p-5 shadow-sm">
          <h2 className="mb-4 text-lg font-medium text-black">By Platform</h2>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={stats.byPlatform}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="platform" tick={{ fontSize: 12 }} stroke="#6F6F6F" />
              <YAxis allowDecimals={false} stroke="#6F6F6F" />
              <Tooltip />
              <Bar dataKey="count" fill="#E65100" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* By tone */}
        <div className="rounded-xl border border-gray-100 p-5 shadow-sm">
          <h2 className="mb-4 text-lg font-medium text-black">By Tone</h2>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie
                data={stats.byTone}
                dataKey="count"
                nameKey="tone"
                cx="50%"
                cy="50%"
                outerRadius={90}
                label
              >
                {stats.byTone.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* By category */}
        <div className="rounded-xl border border-gray-100 p-5 shadow-sm">
          <h2 className="mb-4 text-lg font-medium text-black">By Category</h2>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={stats.byCategory} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis type="number" allowDecimals={false} stroke="#6F6F6F" />
              <YAxis dataKey="category" type="category" tick={{ fontSize: 12 }} stroke="#6F6F6F" width={90} />
              <Tooltip />
              <Bar dataKey="count" fill="#2E7D32" radius={[0, 6, 6, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
