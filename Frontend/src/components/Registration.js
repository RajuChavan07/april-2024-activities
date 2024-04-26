import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Registration.css';  // Import custom CSS for styling

const Registration = () => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    emailId: '',
    password: '',
    phone: '',
    pan: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:9091/api/customers/register', formData);
      alert('Registration successful');
      navigate('/login');  // Navigate to login on success
    } catch (error) {
      console.error('Registration failed', error);
      alert('Registration failed. Please try again.');
    }
  };

  return (
    <div className="registration-wrapper">  {/* Center the form and limit width */}
      <h2>Register</h2>
      <form onSubmit={handleSubmit} className="registration-form">
        {/* Form fields with appropriate labels and placeholders */}
        <div className="mb-3">
          <label htmlFor="firstname" className="form-label">First Name</label>
          <input
            type="text"
            id="firstname"
            name="firstname"
            placeholder="Enter your first name"
            value={formData.firstname}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="lastname" className="form-label">Last Name</label>
          <input
            type="text"
            id="lastname"
            name="lastname"
            placeholder="Enter your last name"
            value={formData.lastname}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="emailId" className="form-label">Email</label>
          <input
            type="email"
            id="emailId"
            name="emailId"
            placeholder="Enter your email"
            value={formData.emailId}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="phone" className="form-label">Phone</label>
          <input
            type="text"
            id="phone"
            name="phone"
            placeholder="Enter your phone number"
            value={formData.phone}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="pan" className="form-label">PAN</label>
          <input
            type="text"
            id="pan"
            name="pan"
            placeholder="Enter your PAN"
            value={formData.pan}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">Register</button>  {/* Styled submit button */}
      </form>
    </div>
  );
};

export default Registration;
