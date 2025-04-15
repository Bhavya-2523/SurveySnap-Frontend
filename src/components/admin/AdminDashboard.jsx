import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminDashboard.css';

export const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalSurveys: 0,
    totalResponses: 0,
    avgResponses: 0,
    recentActivities: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [usersRes, surveysRes, answersRes] = await Promise.all([
          axios.get('/users'),
          axios.get('/survey/surveys'),
          axios.get('/answer/answers'),
        ]);

        // Extract data from API responses
        const totalUsers = usersRes.data.data;
        const surveys = surveysRes.data.surveys;
        const answers = answersRes.data.answers;

        const totalSurveys = surveysRes.data.data;
        const totalResponses = answersRes.data.total;

        const avg = totalSurveys > 0 
          ? (totalResponses / totalSurveys).toFixed(2)
          : 0;

        const recentActivities = [
          ...surveys.slice(-5).map(s => ({ 
            type: 'Survey Created', 
            name: s.title, 
            date: s.createdAt 
          })),
          ...answers.slice(-5).map(a => ({
            type: 'Survey Response',
            name: a.questionId?.questionText || 'Question', 
            date: a.createdAt
          }))
        ].sort((a, b) => new Date(b.date) - new Date(a.date));

        setStats({
          totalUsers,
          totalSurveys,
          totalResponses,
          avgResponses: avg,
          recentActivities,
        });
      } catch (err) {
        console.error('Error loading dashboard:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return <div className="admin-dashboard">Loading Dashboard...</div>;
  }

  return (

    <div className="admin-dashboard">
    <div className="dashboard-header">
        <h1 className="dashboard-title">Admin Dashboard</h1>
    </div>
    
  
    <div className="dashboard-content">

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Users</h3>
          <p>{stats.totalUsers}</p>
        </div>
        <div className="stat-card">
          <h3>Total Surveys</h3>
          <p>{stats.totalSurveys}</p>
        </div>
        <div className="stat-card">
          <h3>Total Responses</h3>
          <p>{stats.totalResponses}</p>
        </div>
        <div className="stat-card">
          <h3>Avg. Responses / Survey</h3>
          <p>{stats.avgResponses}</p>
        </div>
      </div>

      <div className="activity-log">
        <h3>Recent Activity</h3>
        {stats.recentActivities.length === 0 ? (
          <p>No recent activity found.</p>
        ) : (
          <ul>
            {stats.recentActivities.map((activity, index) => (
              <li key={index}>
                <strong>{activity.type}:</strong> {activity.name}{' '}
                <span>({new Date(activity.date).toLocaleDateString()})</span>
              </li>
            ))}
          </ul>
        )}
      </div>
      </div>
    </div>
  );
};

export default AdminDashboard;