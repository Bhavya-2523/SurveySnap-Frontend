import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Analytics.css";

export const Analytics = () => {
    const [surveys, setSurveys] = useState([]);
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState([]);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userCount, setUserCount] = useState(0);  // This will store the count of users

    const navigate = useNavigate();

    useEffect(() => {
        const fetchAllData = async () => {
            try {
                const [surveyRes, questionRes, answerRes, userRes] = await Promise.all([
                    axios.get("/survey/surveys"),
                    axios.get("/question/questions"),
                    axios.get("/answer/answers"),
                    axios.get("/users"),
                ]);

                const surveyData = Array.isArray(surveyRes.data.surveys) ? surveyRes.data.surveys : [];
                const questionData = Array.isArray(questionRes.data.data) ? questionRes.data.data : [];
                const answerData = Array.isArray(answerRes.data.answers) ? answerRes.data.answers : [];
                const userData = userRes.data;                 
                console.log("Users data: ", userData);

                setSurveys(surveyData);
                setQuestions(questionData);
                setAnswers(answerData);
                setUsers(userData.data); // Store full users data
                setUserCount(userData.count); 
            } catch (err) {
                console.error("Error fetching analytics data:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchAllData();
    }, []);

    if (loading) return <div className="loading">Loading Report...</div>;

    const getAnswerCountForSurvey = (surveyId) => {
        const questionIds = questions
            .filter((q) => q.surveyId === surveyId)
            .map((q) => q._id);
        return answers.filter((a) => questionIds.includes(a.questionId?._id)).length;
    };

    return (
        <div className="admin-analytics-container">
            <div className="analytics-scrollable-content">
                <h1>Admin Analytics</h1>

                <div className="overview-cards">
                    <div className="card">
                        <h3>Total Surveys</h3>
                        <p>{surveys.length}</p>
                    </div>
                    <div className="card">
                        <h3>Total Questions</h3>
                        <p>{questions.length}</p>
                    </div>
                    <div className="card">
                        <h3>Total Responses</h3>
                        <p>{answers.length}</p>
                    </div>
                    <div className="card">
                        <h3>Total Users</h3>
                        <p>{users.length}</p>
                    </div>
                </div>

                <h2>Survey Breakdown</h2>
                <table className="survey-report-table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Survey Title</th>
                            <th>Description</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {surveys.map((survey, idx) => (
                            <tr key={survey._id}>
                                <td>{idx + 1}</td>
                                <td>{survey.title}</td>
                                <td>{survey.description}</td>
                                <td>
                                    <button onClick={() => navigate(`/admin/analytics/${survey._id}`)}>
                                        View Analytics
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {surveys.length === 0 && (
                            <tr>
                                <td colSpan="4" className="empty-row">No surveys found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>

                {/* FORCES SCROLL TO TEST SCROLLBAR */}
                <div style={{ height: "50px" }}></div>
            </div>
        </div>
    );
};
