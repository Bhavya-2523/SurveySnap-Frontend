import axios from 'axios';
import React, { useEffect, useState } from 'react';

export const ViewMySurveys = () => {
    const [screens, setscreens] = useState([]);
    const [isLoading, setisLoading] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    const getAllMySurveys = async () => {
        setisLoading(true);
        try {
            const userId = localStorage.getItem("id");
            if (!userId) {
                console.error("User ID not found!");
                setisLoading(false);
                return;
            }

            const res = await axios.get(`/survey/surveysByUserId/${userId}`);
            setscreens(res.data.data);
        } catch (error) {
            console.error("Error fetching surveys:", error);
        } finally {
            setisLoading(false);
        }
    };

    useEffect(() => {
        getAllMySurveys();
    }, []);

    return (
        <div style={{ 
            padding: '2rem',
            height: 'calc(100vh - 55px)',
            overflowY: 'auto',
            backgroundColor: '#121212',
            scrollbarWidth: 'thin', 
            scrollbarColor: '#ff7700 #1e1e1e'
        }}>
            <style>
                {`
                    ::-webkit-scrollbar {
                        width: 8px;
                    }
                    ::-webkit-scrollbar-thumb {
                        background: #ff7700;
                        border-radius: 6px;
                    }
                    ::-webkit-scrollbar-track {
                        background: #1e1e1e;
                    }
                    .btn-custom {
                        width: 48%;
                        padding: 10px;
                        font-weight: bold;
                        border-radius: 8px;
                        transition: all 0.3s ease-in-out;
                    }
                    .btn-view {
                        background-color: #ff7700;
                        color: #fff;
                        border: none;
                    }
                    .btn-view:hover {
                        background-color: #e06400;
                        transform: scale(1.05);
                    }
                    .btn-update {
                        background-color: #007bff;
                        color: #fff;
                        border: none;
                    }
                    .btn-update:hover {
                        background-color: #0056b3;
                        transform: scale(1.05);
                    }
                `}
            </style>

            {isLoading ? (
                <div className="text-center my-4">
                    <div className="spinner-border" style={{ color: '#ff7700' }} role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            ) : (
                <div className="container-fluid">
                    <h2 className="text-center mb-4" style={{ 
                        color: 'rgb(218, 118, 56)',
                        fontFamily: '"Sixtyfour Convergence", sans-serif',
                        fontWeight: 200,
                        borderBottom: '2px solid #ff7700',
                        paddingBottom: '0.5rem'
                    }}>
                        MY SCREENS
                    </h2>
        
                    <div className="row g-4">
                        {screens.length > 0 ? (
                            screens.map((survey) => (
                                <div key={survey._id} className="col-12 col-md-6 col-lg-4">
                                    <div className="card h-100 shadow-lg" style={{ 
                                        backgroundColor: '#1e1e1e',
                                        border: '1px solid #262626',
                                        borderRadius: '12px',
                                        transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                                        cursor: 'pointer'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = "scale(1.05)";
                                        e.currentTarget.style.boxShadow = "0px 0px 15px rgba(255, 119, 0, 0.5)";
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = "scale(1)";
                                        e.currentTarget.style.boxShadow = "none";
                                    }}>
                                        
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
                                                borderTopRightRadius: '12px'
                                            }}
                                        />
                                        <div className="card-body" style={{ padding: '1.5rem' }}>
                                            <div className="d-flex justify-content-between align-items-start mb-3">
                                                <h5 className="card-title" style={{ 
                                                    color: '#fff', 
                                                    fontSize: '1.25rem',
                                                    marginBottom: '0'
                                                }}>
                                                    {survey.title}
                                                </h5>
                                                <small style={{ color: '#515551' }}>
                                                    {new Date(survey.createdAt).toLocaleDateString()}
                                                </small>
                                            </div>
                                            <p className="card-text" style={{ 
                                                color: '#a0a0a0', 
                                                fontSize: '0.9rem',
                                                lineHeight: '1.5',
                                                marginBottom: '1rem'
                                            }}>
                                                {survey.description}
                                            </p>
                                            <span className="badge" style={{ 
                                                backgroundColor: '#b36620', 
                                                color: '#fff',
                                                padding: '0.5rem 1rem',
                                                borderRadius: '8px',
                                                fontSize: '0.85rem'
                                            }}>
                                                {survey.categoryId?.name || "No Category"}
                                            </span>

                                            {/* 📌 Buttons */}
                                            <div className="mt-3 d-flex justify-content-between">
                                                <button className="btn-custom btn-view">
                                                    View Details
                                                </button>
                                                <button className="btn-custom btn-update">
                                                    Update
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
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

            {/* 📌 Image Modal Popup */}
            {selectedImage && (
                <div className="image-modal" style={{
                    position: "absolute", 
                    top: "50%", 
                    left: "50%", 
                    transform: "translate(-50%, -50%)", 
                    backgroundColor: "#1e1e1e",
                    padding: "20px",
                    borderRadius: "12px",
                    boxShadow: "0 0 20px rgba(255, 119, 0, 0.5)",
                    zIndex: 999,
                    width: "70%", 
                    maxWidth: "900px",
                    textAlign: "center"
                }}>
                    {/* Close Button */}
                    <button 
                        onClick={() => setSelectedImage(null)}
                        style={{
                            position: "absolute", 
                            top: "10px", 
                            right: "15px", 
                            background: "none", 
                            border: "none", 
                            color: "#ff7700", 
                            fontSize: "1.5rem", 
                            cursor: "pointer"
                        }}
                    >
                        &times;
                    </button>

                    <img src={selectedImage} alt="Survey" style={{ 
                        width: "100%", 
                        borderRadius: "8px"
                    }} />
                </div>
            )}
        </div>
    );
};
