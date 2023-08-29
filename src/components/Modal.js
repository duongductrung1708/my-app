import React, { useState } from "react";

import "./Modal.css";

export const Modal = ({ closeModal, onSubmit, defaultValue }) => {
  const [formState, setFormState] = useState(
    defaultValue || {
      page: "",
      description: "",
      class: "SE1732",
      email: "@gmail.com",
      phone: "",
      status: "Online",
    }
  );
  const [errors, setErrors] = useState("");

  const validateForm = () => {
    if (formState.page && formState.description && formState.class && formState.email && formState.phone && formState.status) {
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
            <label htmlFor="page">ID</label>
            <input name="page" onChange={handleChange} value={formState.page} />
          </div>
          <div className="form-group">
            <label htmlFor="description">Username</label>
            <textarea
              name="description"
              onChange={handleChange}
              value={formState.description}
            />
          </div>
          <div className="form-group">
            <label htmlFor="class">Class</label>
            <textarea
              name="class"
              onChange={handleChange}
              value={formState.class}
            />
          </div>          
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <textarea
              name="email"
              onChange={handleChange}
              value={formState.email}
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <textarea
              name="phone"
              onChange={handleChange}
              value={formState.phone}
            />
          </div>                    
          <div className="form-group">
            <label htmlFor="status">Status</label>
            <select
              name="status"
              onChange={handleChange}
              value={formState.status}
            >
              <option value="online">Online</option>
              <option value="offline">Offline</option>
              <option value="busy">Busy</option>
            </select>
          </div>
          {errors && <div className="busy">{`Please include: ${errors}`}</div>}
          <button type="submit" className="btn" onClick={handleSubmit}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};