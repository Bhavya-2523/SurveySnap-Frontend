import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./Responding.css"; // Create corresponding CSS file

export const Responding = () => {
    const id  = useParams().id;
    console.log(id)
    const navigate = useNavigate();
    const [survey, setSurvey] = useState({});
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchSurveyData = async () => {
            try {
                setLoading(true);
                const [surveyRes, questionsRes] = await Promise.all([
                    axios.get(`/survey/surveys/${id}`),
                    axios.get(`/question/questionsBySurveyId/${id}`)
                ]);
                setSurvey(surveyRes.data.data);
                setQuestions(questionsRes.data.data);
                initializeAnswers(questionsRes.data.data);
            } catch (err) {
                console.error("Error fetching survey data:", err);
                alert("Failed to load survey");
            } finally {
                setLoading(false);
            }
        };

        fetchSurveyData();
    }, [id]);

    const initializeAnswers = (questions) => {
        const initialAnswers = {};
        questions.forEach(question => {
            initialAnswers[question._id] = question.questionType === 'Checkbox' ? [] : '';
        });
        setAnswers(initialAnswers);
    };

    const handleAnswerChange = (questionId, value) => {
        setAnswers(prev => ({
            ...prev,
            [questionId]: value
        }));
    };

    const handleCheckboxChange = (questionId, option) => {
        setAnswers(prev => {
            const currentAnswers = prev[questionId] || [];
            return {
                ...prev,
                [questionId]: currentAnswers.includes(option)
                    ? currentAnswers.filter(item => item !== option)
                    : [...currentAnswers, option]
            };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            await axios.post(`/response/responses`, {
                surveyId: id,
                answers: Object.entries(answers).map(([questionId, answer]) => ({
                    questionId,
                    answer
                }))
            });
            alert("Response submitted successfully!");
            navigate("/surveys");
        } catch (err) {
            console.error("Error submitting response:", err);
            alert("Failed to submit response");
        } finally {
            setLoading(false);
        }
    };

    const renderQuestionInput = (question) => {
        switch (question.questionType) {
            case 'Text':
                return (
                    <textarea
                        className="answer-input"
                        value={answers[question._id] || ''}
                        onChange={(e) => handleAnswerChange(question._id, e.target.value)}
                        required={question.required}
                    />
                );
            case 'Multiple Choice':
            case 'Dropdown':
                return (
                    <select
                        className="answer-select"
                        value={answers[question._id] || ''}
                        onChange={(e) => handleAnswerChange(question._id, e.target.value)}
                        required={question.required}
                    >
                        <option value="">Select an option</option>
                        {question.options?.map((option, index) => (
                            <option key={index} value={option}>{option}</option>
                        ))}
                    </select>
                );
            case 'Checkbox':
                return (
                    <div className="checkbox-group">
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
                );
            default:
                return <input
                    type="text"
                    className="answer-input"
                    value={answers[question._id] || ''}
                    onChange={(e) => handleAnswerChange(question._id, e.target.value)}
                    required={question.required}
                />;
        }
    };

    return (
        <div className="dashboard-container">
            <div className="survey-container">
                <div className="response-form">
                    <h1>{survey.title}</h1>
                    <p className="survey-description">Description:{survey.description}</p>
                    
                    {loading ? (
                        <div className="loading-spinner">Loading Survey...</div>
                    ) : (
                        <form onSubmit={handleSubmit}>
                            {questions.map((question, index) => (
                                <div key={question._id} className="question-container">
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
                                    {loading ? "Submitting..." : "Submit Responses"}
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};