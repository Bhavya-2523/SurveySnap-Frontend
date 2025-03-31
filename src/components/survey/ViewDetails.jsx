// ViewDetails.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./ViewDetails.css";

export const ViewDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [survey, setSurvey] = useState({ 
        title: "", 
        description: "", 
        categoryId: "" 
    });
    const [categories, setCategories] = useState([]);
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [expandedQuestions, setExpandedQuestions] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [surveyRes, categoriesRes, questionsRes] = await Promise.all([
                    axios.get(`/survey/surveys/${id}`),
                    axios.get("/category/categories"),
                    axios.get(`/question/questionsBySurveyId/${id}`)
                ]);

                setSurvey(surveyRes.data.data);
                setCategories(categoriesRes.data.data);
                setQuestions(questionsRes.data.data);
            } catch (error) {
                console.error("Error fetching survey details:", error);
                alert("Failed to load survey details");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    const getCategoryName = () => {
        const category = categories.find(c => c._id === survey.categoryId);
        return category?.name || "No category specified";
    };

    const toggleOptions = (questionId) => {
        setExpandedQuestions(prev => ({
            ...prev,
            [questionId]: !prev[questionId]
        }));
    };

    if (loading) {
        return (
            <div className="view-survey-container">
                <div className="view-survey-form">
                    <div className="loading-spinner">Loading Survey Details...</div>
                </div>
            </div>
        );
    }

    return (
        <div className="view-survey-container">
            <div className="view-survey-form">
                <h1>{survey.title} Details</h1>
                
                <div className="view-content">
                    {/* Survey Metadata */}
                    <div className="detail-field">{survey.title}</div>
                    <label>Title</label>

                    <div className="detail-field detail-textarea">
                        {survey.description || "No description provided"}
                    </div>
                    <label>Description</label>

                    <div className="detail-field">
                        {getCategoryName()}
                    </div>
                    <label>Category</label>

                    {/* Questions List */}
                    <div className="questions-container">
                        <label>Survey Questions</label>
                        
                        {questions.length === 0 ? (
                            <div className="detail-field">No questions available</div>
                        ) : (
                            questions.map((question, index) => (
                                <div key={question._id} className="question-item">
                                    <div className="question-header">
                                        <div>
                                            <strong>Q{index + 1}:</strong> {question.questionText}
                                            <p><i>Type: {question.questionType}</i></p>
                                        </div>
                                        {['Multiple Choice', 'Checkbox', 'Dropdown'].includes(question.questionType) && (
                                            <button
                                                type="button"
                                                className="view-options-btn"
                                                onClick={() => toggleOptions(question._id)}
                                            >
                                                {expandedQuestions[question._id] ? 'Hide Options' : 'View Options'}
                                            </button>
                                        )}
                                    </div>
                                    
                                    {expandedQuestions[question._id] && question.options?.length > 0 && (
                                        <div className="question-options">
                                            <strong>Options:</strong>
                                            <ul>
                                                {question.options.map((option, optIndex) => (
                                                    <li key={optIndex}>{option}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            ))
                        )}
                    </div>

                    {/* Navigation */}
                    <button
                        className="back-button"
                        onClick={() => navigate(-1)}
                    >
                        Return to Previous Page
                    </button>
                </div>
            </div>
        </div>
    );
};