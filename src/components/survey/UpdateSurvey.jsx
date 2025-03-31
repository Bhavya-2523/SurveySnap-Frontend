import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./UpdateSurvey.css";

export const UpdateSurvey = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [survey, setSurvey] = useState({
        title: "",
        description: "",
        categoryId: "",
    });
    const [categories, setCategories] = useState([]);
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [expandedQuestions, setExpandedQuestions] = useState({});

    useEffect(() => {
        const fetchSurvey = async () => {
            try {
                setLoading(true);
                const res = await axios.get(`/survey/surveys/${id}`);
                setSurvey(res.data.data);
            } catch (err) {
                console.error("Error fetching survey:", err);
                alert("Failed to load survey data.");
            } finally {
                setLoading(false);
            }
        };

        const fetchCategories = async () => {
            try {
                const res = await axios.get("/category/categories");
                setCategories(res.data.data);
            } catch (err) {
                console.error("Error fetching categories:", err);
            }
        };

        const fetchQuestions = async () => {
            try {
                const res = await axios.get(`/question/questionsBySurveyId/${id}`);
                setQuestions(res.data.data);
            } catch (err) {
                console.error("Error fetching questions:", err);
            }
        };

        fetchSurvey();
        fetchCategories();
        fetchQuestions();
    }, [id]);

    const toggleOptions = (questionId) => {
        setExpandedQuestions(prev => ({
            ...prev,
            [questionId]: !prev[questionId]
        }));
    };
    const handleChange = (e) => {
        setSurvey({ ...survey, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            await axios.put(`/survey/surveys/${id}`, survey);
            alert("Survey updated successfully!");
            navigate("/survey/my");
        } catch (err) {
            console.error("Error updating survey:", err);
            alert("Failed to update survey.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="dashboard-container">
            <div className="survey-container">
                <div className="survey-form">
                    <h1>Update Survey</h1>
                    <div className="scrollable-content">
                        {loading ? (
                            <div className="loading-spinner">Updating...</div>
                        ) : (
                            <>
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label>Title</label>
                                        <input
                                            type="text"
                                            className="inputField"
                                            name="title"
                                            value={survey.title}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label>Description</label>
                                        <textarea
                                            className="inputField textareaField"
                                            name="description"
                                            value={survey.description}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label>Category</label>
                                        <select
                                            className="inputField"
                                            name="categoryId"
                                            value={survey.categoryId}
                                            onChange={handleChange}
                                            required
                                        >
                                            <option value="">Select Category</option>
                                            {categories.map((category) => (
                                                <option key={category._id} value={category._id}>
                                                    {category.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="questions-container">
                                    <label>Survey Questions</label>

                                    {questions.length === 0 ? (
                                        <p>No questions found for this survey.</p>
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
                                              
                                              {/* Options display */}
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

                                    <div className="mt-4 btn-container">
                                        <button type="submit" className="btn btn-primary" disabled={loading}>
                                            {loading ? "Updating..." : "Update Survey"}
                                        </button>
                                    </div>
                                </form>

                                
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};