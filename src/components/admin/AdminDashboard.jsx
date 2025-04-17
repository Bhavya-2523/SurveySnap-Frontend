import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line, Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import './AdminDashboard.css';

// Register chart components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalSurveys: 0,
    totalResponses: 0,
    avgResponses: 0,
    recentActivities: [],
    surveyData: [],
    responseData: [],
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
            date: s.createdAt,
          })),
          ...answers.slice(-5).map(a => ({
            type: 'Survey Response',
            name: a.questionId?.questionText || 'Question',
            date: a.createdAt,
          })),
        ].sort((a, b) => new Date(b.date) - new Date(a.date));

        const surveyData = surveys.map(s => new Date(s.createdAt).toLocaleDateString());
        const responseData = answers.map(a => new Date(a.createdAt).toLocaleDateString());

        setStats({
          totalUsers,
          totalSurveys,
          totalResponses,
          avgResponses: avg,
          recentActivities,
          surveyData,
          responseData,
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

  const surveyChartData = {
    labels: stats.surveyData,
    datasets: [
      {
        label: 'Surveys Created',
        data: stats.surveyData.reduce((acc, date) => {
          acc[date] = (acc[date] || 0) + 1;
          return acc;
        }, {}),
        borderColor: '#ff7700',
        backgroundColor: 'rgba(255, 119, 0, 0.2)',
        fill: true,
      },
    ],
  };

  const filteredResponseData = stats.responseData.reduce((acc, date) => {
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {});

  const responseChartData = {
    labels: Object.keys(filteredResponseData),
    datasets: [
      {
        label: 'Survey Responses',
        data: Object.values(filteredResponseData),
        backgroundColor: '#cc5b00',
      },
    ],
  };

  const pieChartData = {
    labels: ['Surveys', 'Responses'],
    datasets: [
      {
        data: [stats.totalSurveys, stats.totalResponses],
        backgroundColor: ['#ff7700', '#cc5b00'],
      },
    ],
  };

  const pieChartOptions = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: '#ffffff',
        },
      },
    },
  };

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

        <div className="charts">
        <div className="chart-fullwidth">
  <h3>Survey Growth Over Time</h3>
  <Line data={surveyChartData} height={250} />
</div>


          <div className="chart-row">
            <div className="chart">
              <h3>Survey Responses Distribution</h3>
              <Bar data={responseChartData} height={250} width={600} />
            </div>

            <div className="chart">
              <h3>Survey vs. Response Distribution</h3>
              <div className="chart-wrapper">
                <Pie data={pieChartData} options={pieChartOptions} />
              </div>
            </div>
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
