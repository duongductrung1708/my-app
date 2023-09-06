import React, { useState, useEffect } from "react";
import "./Modal.css";

export const Modal = ({ closeModal, onSubmit, defaultValue }) => {
  const [formState, setFormState] = useState(
    defaultValue || {
      id: "",
      username: "",
      class: "SE1732",
      email: "@gmail.com",
      phone: "",
      status: "Male",
    }
  );
  const [errors, setErrors] = useState("");

  const validateForm = () => {
    if (
      formState.id &&
      formState.username &&
      formState.class &&
      formState.email &&
      formState.phone &&
      formState.status
    ) {
      setErrors("");
      return true;
    } else {
      let errorFields = [];
      for (const [key, value] of Object.entries(formState)) {
        if (!value) {
          errorFields.push(key);
        }
      }
      setErrors(errorFields.join(", "));
      return false;
    }
  };

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

    const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    onSubmit(formState);

    closeModal();
  };

  return (
    <div
      className="modal-container"
      onClick={(e) => {
        if (e.target.className === "modal-container") closeModal();
      }}
    >
      <div className="modal">
        <form>
          <div className="form-group">
            <label htmlFor="id">ID</label>
            <input name="id" onChange={handleChange} value={formState.id} />
          </div>
          <div className="form-group">
            <label htmlFor="username">Student's Name</label>
            <input
              name="username"
              onChange={handleChange}
              value={formState.username}
            />
          </div>
          <div className="form-group">
            <label htmlFor="class">Class</label>
            <input
              name="class"
              onChange={handleChange}
              value={formState.class}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              name="email"
              onChange={handleChange}
              value={formState.email}
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <input
              name="phone"
              onChange={handleChange}
              value={formState.phone}
            />
          </div>
          <div className="form-group">
            <label htmlFor="status">Gender</label>
            <select
              name="status"
              onChange={handleChange}
              value={formState.status}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          {errors && (
            <div className="error">{`Please include: ${errors}`}</div>
          )}
          <button type="submit" className="btn" onClick={handleSubmit}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};
