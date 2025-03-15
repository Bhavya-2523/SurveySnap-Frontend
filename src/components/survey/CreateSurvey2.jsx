import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import "./CreateSurvey.css";

export const CreateSurvey2 = () => {
  const { register, handleSubmit, reset } = useForm();
  const [categories, setCategories] = useState([]);

  const getAllCategories = async () => {
    try {
      const res = await axios.get("/category/categories");
      setCategories(res.data.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  const submitHandler = async (data, surveyStatus) => {
    try {
      const creatorId = localStorage.getItem("id"); 
      const surveyData = { ...data, surveyStatus: surveyStatus, creatorId,image: data.image};
      console.log(surveyData)
    //   console.log(surveyData.image[0])
        
    const formData = new FormData();
    formData.append("creatorId", creatorId);
    formData.append("categoryId", data.categoryId);
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("surveyStatus", surveyStatus);
    if (data.image && data.image[0]) {
        formData.append("image", data.image[0]); // File upload
    }
    console.log("Form Data:", formData);
    
    const res = await axios.post("/survey/surveysWithFile", formData);
          // localStorage.setItem("Surveyid",res.data.data._id)

    //   console.log(res.data);
      alert(`Survey ${surveyStatus === "draft" ? "saved as draft" : "published"} successfully!`);
      reset(); 
    } catch (error) {
      console.error("Error creating survey:", error);
    }
  };

  return (
    <div className="survey-container">
      <div className="survey-form">
        <h1>Create Survey</h1>
        <form onSubmit={handleSubmit((data) => submitHandler(data, "published"))}>
          <div className="mb-3">
            <label>Title</label>
            <input type="text" className="inputField" {...register("title")} />
          </div>

          <div className="mb-3">
            <label>Description</label>
            <textarea className="inputField textareaField" {...register("description")}></textarea>
          </div>

          <div className="mb-3">
            <label>Category</label>
            <select className="inputField" {...register("categoryId")}>
              <option value="">Select Category</option>
              {categories?.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
                <label className="form-label">INSERT IMAGE </label>
                <input type="file" {...register("image")}></input>
              </div>

          <div className="mt-4 btn-container">
            <button type="button" className="btn btn-primary" onClick={handleSubmit((data) => submitHandler(data, "published"))}>
              Publish Survey
            </button>
            <button type="button" className="btn btn-secondary" onClick={handleSubmit((data) => submitHandler(data, "draft"))}>
              Save as Draft
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
