import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import "./CreateSurvey.css";

export const CreateSurvey = () => {
  const { register, handleSubmit, reset, control, watch } = useForm();
  const { fields, append, remove } = useFieldArray({ 
    name: "questions", 
    control 
  });
  const [categories, setCategories] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const getAllCategories = async () => {
      try {
        const res = await axios.get("/category/categories");
        setCategories(res.data.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
        alert("Failed to load categories");
      }
    };
    getAllCategories();
  }, []);

  const submitHandler = async (data, surveyStatus) => {
    setSubmitting(true);
    try {
      const creatorId = localStorage.getItem("id");
      
      // Create survey first
      const formData = new FormData();
      formData.append("creatorId", creatorId);
      formData.append("categoryId", data.categoryId);
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("surveyStatus", surveyStatus);
      
      if (data.image?.[0]) {
        formData.append("image", data.image[0]);
      }

      // Submit survey
      const surveyRes = await axios.post("/survey/surveysWithFile", formData);
      const surveyId = surveyRes.data.data._id;

      // Prepare questions data with proper structure
      const questionsData = data.questions.map((question, index) => ({
        surveyId,
        questionText: question.questionText,
        questionType: question.questionType,
        required: !!question.required, // Convert to boolean
        questionOrder: index + 1,
        options: ["Multiple Choice", "Checkbox", "Dropdown"].includes(question.questionType)
          ? (question.options || []).filter(opt => opt?.trim() !== "") // Handle undefined
          : [],
        ...(question.questionType === "Rating Scale" && {
          scaleMin: 1,
          scaleMax: 5
        })
      }));

      // Submit all questions in parallel
      await Promise.all(
        questionsData.map(question => 
          axios.post("/question/questions", question)
        )
      );

      alert(`Survey ${surveyStatus === "draft" ? "saved as draft" : "published"} successfully!`);
      reset();
    } catch (error) {
      console.error("Submission error:", error);
      alert(`Error: ${error.response?.data?.message || error.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="survey-container">
      <div className="survey-form">
        <h1>Create Survey</h1>
        <div className="scrollable-content">
          <form onSubmit={handleSubmit((data) => submitHandler(data, "published"))}>
            {/* Survey Title */}
            <div className="mb-3">
              <label>Title</label>
              <input 
                type="text" 
                className="inputField" 
                {...register("title", { required: true })} 
              />
            </div>

            {/* Survey Description */}
            <div className="mb-3">
              <label>Description</label>
              <textarea 
                className="inputField textareaField" 
                {...register("description", { required: true })}
              ></textarea>
            </div>

            {/* Category Selection */}
            <div className="mb-3">
              <label>Category</label>
              <select 
                className="inputField" 
                {...register("categoryId", { required: true })}
              >
                <option value="">Select Category</option>
                {categories?.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Image Upload */}
            <div className="mb-3">
              <label className="form-label">Insert Image</label>
              <input 
                type="file" 
                accept="image/*"
                {...register("image")} 
              />
            </div>
            
            <label>Survey Questions</label>
            {fields.map((field, index) => {
              const questionType = watch(`questions.${index}.questionType`);

              return (
                <div key={field.id} className="question-container">
                  {/* Question Text */}
                  <div className="mb-3">
                    <label>Question {index + 1}</label>
                    <input 
                      type="text" 
                      className="inputField" 
                      {...register(`questions.${index}.questionText`, { required: true })} 
                    />
                  </div>

                  {/* Question Type */}
                  <div className="mb-3">
                    <label>Question Type</label>
                    <select 
                      className="inputField" 
                      {...register(`questions.${index}.questionType`, { required: true })}
                    >
                      <option value="Short Answer">Short Answer</option>
                      <option value="Multiple Choice">Multiple Choice</option>
                      <option value="Checkbox">Checkbox</option>
                      <option value="Dropdown">Dropdown</option>
                      <option value="Rating Scale">Rating Scale</option>
                      <option value="Yes/No">Yes/No</option>
                    </select>
                  </div>

                  {/* Options */}
                  {["Multiple Choice", "Checkbox", "Dropdown"].includes(questionType) && (
                    <div className="mb-3">
                      <label>Options (minimum 2)</label>
                      {[...Array(4)].map((_, optIndex) => (
                        <input
                          key={optIndex}
                          type="text"
                          className="inputField optionField"
                          {...register(`questions.${index}.options.${optIndex}`)}
                          placeholder={`Option ${optIndex + 1}`}
                        />
                      ))}
                    </div>
                  )}

                  {/* Required */}
                  <div className="mb-3">
                    <label  style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <input 
                        type="checkbox"
                        {...register(`questions.${index}.required`)} 
                      /> Required
                    </label>
                  </div>

                  <button 
                    type="button" 
                    className="btn btn-danger"
                    onClick={() => remove(index)}
                  >
                    Remove Question
                  </button>
                </div>
              );
            })}

            <button 
              type="button" 
              className="btn btn-secondary mt-3"
              onClick={() => append({ 
                questionText: "", 
                questionType: "Short Answer", 
                options: Array(4).fill(""),
                required: false 
              })}
            >
              + Add Question
            </button>

            <div className="mt-4 btn-container">
              <button 
                type="button" 
                className="btn btn-primary"
                onClick={handleSubmit((data) => submitHandler(data, "published"))}
                disabled={submitting}
              >
                {submitting ? "Publishing..." : "Publish Survey"}
              </button>
              <button 
                type="button" 
                className="btn btn-secondary"
                onClick={handleSubmit((data) => submitHandler(data, "draft"))}
                disabled={submitting}
              >
                {submitting ? "Saving..." : "Save as Draft"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};