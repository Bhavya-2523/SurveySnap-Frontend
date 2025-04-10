import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Modal, Button, Spinner, Form } from 'react-bootstrap';
import { Card, CardContent, Typography } from '@mui/material';
import './Participate.css';
import { useNavigate } from 'react-router-dom';

export const Participate = () => {
    const [surveys, setSurveys] = useState([]);
    const [selectedSurvey, setSelectedSurvey] = useState(null);
    const [answers, setAnswers] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);
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
        fetchSurveys();
    }, []);

    const handleParticipateClick = (survey) => {
        navigate(`/survey/response/${survey._id}`);
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
                    {surveys.map(survey => (
                        <Card key={survey._id} className="survey-card" onClick={() => handleParticipateClick(survey)}>
                            <CardContent>
                                <Typography variant="h6" className="card-title">{survey.title}</Typography>
                                <Typography variant="body2" className="card-text">
                                    {survey.description || "No description available"}
                                </Typography>
                                <Button 
                                    variant="outlined"
                                    onClick={(e) => { e.stopPropagation(); handleParticipateClick(survey); }}
                                    className="btn-participate"
                                >
                                    Participate
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
};