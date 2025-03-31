import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./Responding.css";

export const Responding = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [survey, setSurvey] = useState({});
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState({});
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({
        surveyError: null,
        networkError: null,
        submitError: null
    });
    const [validationErrors, setValidationErrors] = useState({});

    useEffect(() => {
        const fetchSurveyData = async () => {
            try {
                setLoading(true);
                setErrors({ surveyError: null, networkError: null });
                
                const [surveyRes, questionsRes] = await Promise.all([
                    axios.get(`/survey/surveys/${id}`),
                    axios.get(`/question/questionsBySurveyId/${id}`)
                ]);
                
                setSurvey(surveyRes.data.data);
                setQuestions(questionsRes.data.data);
                initializeAnswers(questionsRes.data.data);
            } catch (err) {
                handleFetchError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchSurveyData();
    }, [id, navigate]);

    const initializeAnswers = (questions) => {
        const initialAnswers = questions.reduce((acc, question) => {
            acc[question._id] = question.questionType === 'Checkbox' ? [] : '';
            return acc;
        }, {});
        setAnswers(initialAnswers);
    };

    const handleAnswerChange = (questionId, value) => {
        setAnswers(prev => ({ ...prev, [questionId]: value }));
        clearValidationError(questionId);
    };

    const handleCheckboxChange = (questionId, option) => {
        setAnswers(prev => {
            const current = prev[questionId] || [];
            return {
                ...prev,
                [questionId]: current.includes(option)
                    ? current.filter(item => item !== option)
                    : [...current, option]
            };
        });
        clearValidationError(questionId);
    };

    const clearValidationError = (questionId) => {
        setValidationErrors(prev => {
            const { [questionId]: _, ...rest } = prev;
            return rest;
        });
    };

    const validateForm = () => {
        const newErrors = {};
        let isValid = true;
        
        questions.forEach(question => {
            if (!question.required) return;
            const answer = answers[question._id];
            
            if (question.questionType === 'Checkbox' && answer.length === 0) {
                newErrors[question._id] = "Please select at least one option";
                isValid = false;
            } else if (typeof answer === 'string' && answer.trim() === '') {
                newErrors[question._id] = "This field is required";
                isValid = false;
            }
        });
        
        setValidationErrors(newErrors);
        return isValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) {
            const firstErrorId = Object.keys(validationErrors)[0];
            document.querySelector(`[data-question-id="${firstErrorId}"]`)?.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'center' 
            });
            return;
        }

        try {
            setLoading(true);
            setErrors({ submitError: null });

            // Submit answers directly
            await Promise.all(
                Object.entries(answers).map(([questionId, answer]) => {
                    const question = questions.find(q => q._id === questionId);
                    const payload = {
                        questionId,
                        surveyId: id,
                        answerText: null,
                        selectedOption: null,
                        ratingValue: null
                    };

                    switch(question.questionType) {
                        case 'Checkbox':
                            payload.selectedOption = answer.join(', ');
                            break;
                        case 'Rating Scale':
                            payload.ratingValue = Number(answer);
                            break;
                        case 'Text':
                            payload.answerText = answer;
                            break;
                        default:
                            payload.selectedOption = answer;
                    }

                    return axios.post("/answer/", payload);
                })
            );

            navigate(`/survey/response/success`);
        } catch (err) {
            let errorMessage = "Submission failed. Please try again.";
            if (err.response) {
                if (err.response.status === 401) {
                    errorMessage = "Please login to submit this survey";
                    setTimeout(() => navigate("/login"), 3000);
                } else if (err.response.data?.message) {
                    errorMessage = err.response.data.message;
                }
            }
            setErrors(prev => ({ ...prev, submitError: errorMessage }));
        } finally {
            setLoading(false);
        }
    };

    const handleFetchError = (err) => {
        let errorMessage = "Failed to load survey";
        if (err.response) {
            errorMessage = err.response.status === 404 
                ? "Survey not found" 
                : "Server error";
        } else if (err.request) {
            errorMessage = "Network error";
        }
        setErrors(prev => ({ ...prev, surveyError: errorMessage }));
    };

    const renderQuestionInput = (question) => {
        switch (question.questionType) {
            case 'Text':
                return (
                    <div className="input-wrapper">
                        <textarea
                            className={`answer-input ${validationErrors[question._id] ? 'error' : ''}`}
                            value={answers[question._id] || ''}
                            onChange={(e) => handleAnswerChange(question._id, e.target.value)}
                            required={question.required}
                        />
                        {validationErrors[question._id] && (
                            <div className="error-message">{validationErrors[question._id]}</div>
                        )}
                    </div>
                );
            case 'Multiple Choice':
            case 'Dropdown':
                return (
                    <div className="input-wrapper">
                        <select
                            className={`answer-select ${validationErrors[question._id] ? 'error' : ''}`}
                            value={answers[question._id] || ''}
                            onChange={(e) => handleAnswerChange(question._id, e.target.value)}
                            required={question.required}
                        >
                            <option value="">Select an option</option>
                            {question.options?.map((option, index) => (
                                <option key={index} value={option}>{option}</option>
                            ))}
                        </select>
                        {validationErrors[question._id] && (
                            <div className="error-message">{validationErrors[question._id]}</div>
                        )}
                    </div>
                );
            case 'Checkbox':
                return (
                    <div className="input-wrapper">
                        <div className={`checkbox-group ${validationErrors[question._id] ? 'error' : ''}`}>
                            {question.options?.map((option, index) => (
                                <label key={index} className="checkbox-option">
                                    <input
                                        type="checkbox"
                                        value={option}
                                        checked={answers[question._id]?.includes(option) || false}
                                        onChange={() => handleCheckboxChange(question._id, option)}
                                    />
                                    {option}
                                </label>
                            ))}
                        </div>
                        {validationErrors[question._id] && (
                            <div className="error-message">{validationErrors[question._id]}</div>
                        )}
                    </div>
                );
            default:
                return (
                    <div className="input-wrapper">
                        <input
                            type="text"
                            className={`answer-input ${validationErrors[question._id] ? 'error' : ''}`}
                            value={answers[question._id] || ''}
                            onChange={(e) => handleAnswerChange(question._id, e.target.value)}
                            required={question.required}
                        />
                        {validationErrors[question._id] && (
                            <div className="error-message">{validationErrors[question._id]}</div>
                        )}
                    </div>
                );
        }
    };

    if (errors.surveyError) {
        return (
            <div className="error-container">
                <div className="error-card">
                    <div className="error-icon">!</div>
                    <h2>Survey Error</h2>
                    <p>{errors.surveyError}</p>
                    <button className="return-btn" onClick={() => navigate("/surveys")}>
                        Return to Surveys
                    </button>
                </div>
            </div>
        );
    }

    if (errors.networkError) {
        return (
            <div className="error-container">
                <div className="error-card">
                    <div className="error-icon">!</div>
                    <h2>Connection Error</h2>
                    <p>{errors.networkError}</p>
                    <button className="retry-btn" onClick={() => window.location.reload()}>
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="response-container">
            <div className="survey-card">
                <h1 className="survey-title">{survey.title}</h1>
                <p className="survey-description">{survey.description}</p>
                
                {loading ? (
                    <div className="loading-spinner">
                        <div className="spinner"></div>
                        <p>Loading Survey...</p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit}>
                        {errors.submitError && (
                            <div className="submit-error-banner">
                                <p>{errors.submitError}</p>
                                <button type="button" onClick={() => setErrors(prev => ({ ...prev, submitError: null }))}>
                                    ×
                                </button>
                            </div>
                        )}
                        
                        {questions.map((question, index) => (
                            <div 
                                key={question._id} 
                                className="question-container"
                                data-question-id={question._id}
                            >
                                <div className="question-header">
                                    <h3>Q{index + 1}: {question.questionText}</h3>
                                    {question.required && <span className="required-star">*</span>}
                                </div>
                                {renderQuestionInput(question)}
                            </div>
                        ))}
                        
                        <div className="submit-container">
                            <button 
                                type="submit" 
                                className="submit-btn"
                                disabled={loading}
                            >
                                {loading ? (
                                    <>
                                        <span className="spinner-small"></span>
                                        Submitting...
                                    </>
                                ) : "Submit Responses"}
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};