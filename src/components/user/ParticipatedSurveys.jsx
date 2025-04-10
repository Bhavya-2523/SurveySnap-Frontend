import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./ParticipatedSurveys.css"; // Optional for styling

export const ParticipatedSurveys = () => {
    const navigate = useNavigate();
    const [surveys, setSurveys] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSurveys = async () => {
            setLoading(true);
            setError(null);

            const user = JSON.parse(localStorage.getItem("user"));
            const userId = user?._id;
            const key = `surveyId_${userId}`;
            const surveyIds = JSON.parse(localStorage.getItem(key) || "[]");

            try {
                const results = await Promise.all(
                    surveyIds.map(id =>
                        axios.get(`/survey/surveys/${id}`).then(res => res.data.data)
                    )
                );
                setSurveys(results);
            } catch (err) {
                console.error(err);
                setError("Failed to load participated surveys.");
            } finally {
                setLoading(false);
            }
        };

        fetchSurveys();
    }, []);

    const handleViewAnalytics = (id) => {
        navigate(`/survey/analytics/${id}`);
    };

    return (
        <div className="participated-container">
            <h1>Participated Surveys</h1>
            {loading ? (
                <p>Loading surveys...</p>
            ) : error ? (
                <p className="error">{error}</p>
            ) : surveys.length === 0 ? (
                <p>You haven't participated in any surveys yet.</p>
            ) : (
                <ul className="survey-list">
                    {surveys.map(survey => (
                        <li key={survey._id} className="survey-card">
                            <h2>{survey.title}</h2>
                            <p>{survey.description}</p>
                            <button onClick={() => handleViewAnalytics(survey._id)}>
                                View Analytics
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};
