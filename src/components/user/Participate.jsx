import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Participate.css'; // <-- added this line

export const Participate = () => {
    const [surveys, setSurveys] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [participatedSurveyIds, setParticipatedSurveyIds] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSurveys = async () => {
            try {
                const res = await axios.get('/survey/surveys');
                setSurveys(res.data.surveys);
            } catch (error) {
                console.error("Error fetching surveys:", error);
                setError('Failed to load surveys. Please try again later.');
            } finally {
                setIsLoading(false);
            }
        };

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
            {isLoading ? (
                <div className="spinner-container">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            ) : (
                <div className="container-fluid">
                    <h2 className="title">
                        AVAILABLE SURVEYS
                    </h2>

                    {error && (
                        <div className="text-center text-danger mb-3">
                            {error}
                        </div>
                    )}

                    <div className="survey-grid">
                        {surveys.length > 0 ? (
                            surveys.map((survey) => {
                                const isParticipated = participatedSurveyIds.includes(survey._id);

                                return (
                                    <div key={survey._id} className="survey-card" 
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.transform = "scale(1.05)";
                                            e.currentTarget.style.boxShadow = "0px 0px 15px rgba(255, 119, 0, 0.5)";
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.transform = "scale(1)";
                                            e.currentTarget.style.boxShadow = "0 4px 10px rgba(255, 119, 0, 0.1)";
                                        }}
                                    >
                                        <img 
                                            src={survey?.imageURL || "default-image.jpg"} 
                                            className="card-img-top" 
                                            alt="Survey" 
                                            onClick={() => setSelectedImage(survey.imageURL)}
                                            style={{
                                                height: '200px',
                                                objectFit: 'cover',
                                                backgroundColor: '#262626',
                                                borderTopLeftRadius: '12px',
                                                borderTopRightRadius: '12px',
                                            }}
                                        />
                                        <div className="card-body">
                                            <div className="d-flex justify-content-between align-items-start mb-3">
                                                <h5 className="card-title">{survey.title}</h5>
                                                <small className="card-date">
                                                    {new Date(survey.createdAt).toLocaleDateString()}
                                                </small>
                                            </div>
                                            <p className="card-text">
                                                {survey.description || "No description available"}
                                            </p>
                                            <span className="badge survey-badge">
                                                {survey.categoryId?.name || "No Category"}
                                            </span>

                                            <div className="mt-4 d-flex justify-content-center">
                                                {isParticipated ? (
                                                    <button className="btn-custom btn-analytics" onClick={() => handleViewAnalyticsClick(survey._id)}>
                                                        View Analytics
                                                    </button>
                                                ) : (
                                                    <button className="btn-custom btn-participate" onClick={() => handleParticipateClick(survey._id)}>
                                                        Participate
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <div className="col-12 text-center py-5">
                                <p className="lead" style={{ color: '#515551' }}>
                                    <i className="fas fa-ban me-2" style={{ color: '#ff7700' }}></i>
                                    No surveys found
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {selectedImage && (
                <div className="image-modal">
                    <button 
                        onClick={() => setSelectedImage(null)}
                        className="modal-close-button"
                    >
                        &times;
                    </button>

                    <img 
                        src={selectedImage} 
                        alt="Survey" 
                        className="modal-image"
                    />
                </div>
            )}
        </div>
    );
};
