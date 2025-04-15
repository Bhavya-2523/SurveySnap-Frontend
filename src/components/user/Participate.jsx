import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Modal, Button, Spinner, Form } from 'react-bootstrap';
import { Card, CardContent, Typography } from '@mui/material';
import './Participate.css';
import { useNavigate } from 'react-router-dom';

export const Participate = () => {
    const [surveys, setSurveys] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [participatedSurveyIds, setParticipatedSurveyIds] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSurveys = async () => {
            try {
                const res = await axios.get('/survey/surveys');
                setSurveys(res.data.data);
            } catch (error) {
                console.error("Error fetching surveys:", error);
                setError('Failed to load surveys. Please try again later.');
            } finally {
                setIsLoading(false);
            }
        };

        // Get participated survey IDs from localStorage
        const loadParticipatedSurveys = () => {
            const userId = localStorage.getItem("id");
            const key = `surveyId_${userId}`;
            const storedIds = JSON.parse(localStorage.getItem(key) || "[]");
            setParticipatedSurveyIds(storedIds);
        };

        fetchSurveys();
        loadParticipatedSurveys();
    }, []);

    const handleParticipateClick = (surveyId) => {
        navigate(`/survey/response/${surveyId}`);
    };

    const handleViewAnalyticsClick = (surveyId) => {
        navigate(`/survey/analytics/${surveyId}`);
    };

    return (
        <div className="participate-container">
            <h2 className="title">AVAILABLE SURVEYS</h2>

            {error && (
                <div className="text-center text-danger mb-3">
                    {error}
                </div>
            )}

            {isLoading ? (
                <div className="spinner-container">
                    <Spinner animation="border" variant="warning" />
                </div>
            ) : (
                <div className="survey-grid scrollbar">
                    {surveys.map(survey => {
                        const isParticipated = participatedSurveyIds.includes(survey._id);

                        return (
                            <Card key={survey._id} className="survey-card">
                                <CardContent>
                                    <Typography variant="h6" className="card-title">{survey.title}</Typography>
                                    <Typography variant="body2" className="card-text">
                                        {survey.description || "No description available"}
                                    </Typography>
                                    {isParticipated ? (
                                        <Button
                                        className="btn-participated"
                                        onClick={() => handleViewAnalyticsClick(survey._id)}
                                        // onClick={() => handleParticipateClick(survey._id)}
                                    >
                                        View Analytics
                                    </Button>
                                    
                                    ) : (
                                        <Button
                                            variant="outlined"
                                            onClick={() => handleParticipateClick(survey._id)}
                                            className="btn-participate"
                                        >
                                            Participate
                                        </Button>
                                    )}
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>
            )}
        </div>
    );
};
