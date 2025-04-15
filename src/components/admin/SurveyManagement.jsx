import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './SurveyManagement.css';

export const SurveyManagement = () => {
  const [surveys, setSurveys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingSurvey, setEditingSurvey] = useState(null);
  const [formData, setFormData] = useState({ title: '', description: '' });

  useEffect(() => {
    fetchSurveys();
  }, []);

  const fetchSurveys = async () => {
    try {
      const res = await axios.get('/survey/surveys');
      setSurveys(res.data.surveys || []);
    } catch (err) {
      console.error('Error loading surveys:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteSurvey = async (surveyId) => {
    if (window.confirm('Are you sure you want to delete this survey?')) {
      try {
        await axios.delete(`/survey/surveys/${surveyId}`);
        setSurveys(surveys.filter(survey => survey._id !== surveyId));
      } catch (err) {
        console.error('Error deleting survey:', err);
      }
    }
  };

  const handleEditSurvey = (survey) => {
    setEditingSurvey(survey._id);
    setFormData({
      title: survey.title || '',
      description: survey.description || '',
    });
  };

  const handleInputChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUpdateSurvey = async () => {
    try {
      await axios.put(`/survey/surveys/${editingSurvey}`, formData);
      alert('Survey updated successfully');
      setEditingSurvey(null);
      fetchSurveys();
    } catch (err) {
      console.error('Error updating survey:', err);
    }
  };

  if (loading) {
    return <div className="survey-management">Loading Surveys...</div>;
  }

  return (
    <div className="survey-management">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Survey Management</h1>
      </div>

      <div className="survey-list">
        {surveys.length === 0 ? (
          <p>No surveys available.</p>
        ) : (
          <table className="survey-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Created At</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {surveys.map(survey => (
                <tr key={survey._id}>
                  <td>{survey.title}</td>
                  <td>{survey.description}</td>
                  <td>{new Date(survey.createdAt).toLocaleDateString()}</td>
                  <td>
                    <div className="action-buttons">
                      <button onClick={() => handleEditSurvey(survey)}>Edit</button>
                      <button onClick={() => handleDeleteSurvey(survey._id)}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {editingSurvey && (
        <div className="modal">
          <div className="modal-content">
            <h2>Edit Survey</h2>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Title"
            />
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Description"
            />
            <div className="modal-buttons">
              <button onClick={handleUpdateSurvey}>Save</button>
              <button onClick={() => setEditingSurvey(null)} className="cancel-btn">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SurveyManagement;
