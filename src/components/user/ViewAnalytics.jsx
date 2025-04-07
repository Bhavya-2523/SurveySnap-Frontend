import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend,
} from "chart.js";
import "./ViewAnalytics.css";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export const ViewAnalytics = () => {
    const { id } = useParams(); // surveyId
    const navigate = useNavigate();

    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAnalytics = async () => {
            try {
                setLoading(true);

                const [questionRes, answerRes] = await Promise.all([
                    axios.get(`/question/questionsBySurveyId/${id}`),
                    axios.get(`/answer/answers/${id}`),
                ]);

                setQuestions(questionRes.data.data);
                setAnswers(answerRes.data.answers);

            } catch (err) {
                console.error(err);
                setError("Failed to load analytics. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchAnalytics();
    }, [id]);

    const groupAnswersByQuestion = () => {
        const grouped = {};
        for (let answer of answers) {
            const qId = answer.questionId?._id;
            if (!qId) continue;
            if (!grouped[qId]) grouped[qId] = [];
            grouped[qId].push(answer);
        }
        return grouped;
    };

    const renderChartForOptions = (question, questionAnswers) => {
        const counts = {};

        questionAnswers.forEach(answer => {
            if (question.questionType === "Checkbox") {
                const options = answer.selectedOption?.split(", ") || [];
                options.forEach(opt => {
                    counts[opt] = (counts[opt] || 0) + 1;
                });
            } else {
                const option = answer.selectedOption;
                counts[option] = (counts[option] || 0) + 1;
            }
        });

        const labels = Object.keys(counts);
        const data = Object.values(counts);

        const chartData = {
            labels,
            datasets: [{
                label: "Responses",
                data,
                backgroundColor: "rgba(75,192,192,0.6)"
            }]
        };

        return <Bar data={chartData} />;
    };

    const renderRatingChart = (questionAnswers) => {
        const counts = {};
        let total = 0;
        let sum = 0;

        questionAnswers.forEach(answer => {
            const value = answer.ratingValue;
            if (!value) return;

            counts[value] = (counts[value] || 0) + 1;
            total += 1;
            sum += value;
        });

        const labels = Object.keys(counts).sort((a, b) => a - b);
        const data = labels.map(label => counts[label]);

        const chartData = {
            labels,
            datasets: [{
                label: "Ratings Count",
                data,
                backgroundColor: "rgba(153,102,255,0.6)"
            }]
        };

        return (
            <div>
                <p className="average-rating">Average Rating: {(sum / total).toFixed(2)}</p>
                <Bar data={chartData} />
            </div>
        );
    };

    const renderTextResponses = (questionAnswers) => {
        return (
            <ul className="text-response-list">
                {questionAnswers.map((ans, i) => (
                    <li key={i}>"{ans.answerText || ans.selectedOption || 'No response'}"</li>
                ))}
            </ul>
        );
    };

    const groupedAnswers = groupAnswersByQuestion();

    if (loading) {
        return <div className="loading">Loading Analytics...</div>;
    }

    if (error) {
        return (
            <div className="error-message">
                <p>{error}</p>
                <button onClick={() => navigate("/dashboard")}>Back to Dashboard</button>
            </div>
        );
    }

    return (
        <div className="analytics-container">
            <h1>Survey Analytics</h1>
            {questions.map((question, index) => {
                const questionAnswers = groupedAnswers[question._id] || [];

                return (
                    <div className="question-analytics" key={question._id}>
                        <h2>Q{index + 1}: {question.questionText}</h2>
                        <p className="question-type">Type: {question.questionType}</p>

                        {questionAnswers.length === 0 ? (
                            <p>No responses yet.</p>
                        ) : question.questionType === "Text" || question.questionType === "Short Answer" ? (
                            renderTextResponses(questionAnswers)
                        ) : question.questionType === "Rating Scale" ? (
                            renderRatingChart(questionAnswers)
                        ) : (
                            renderChartForOptions(question, questionAnswers)
                        )}
                    </div>
                );
            })}
        </div>
    );
};
