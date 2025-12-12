import React, { useState } from 'react';
import './Form.css';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Username validation
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      // Mock API call
      const response = await mockApiCall(formData);
      
      if (response.success) {
        setSubmitMessage('Registration successful!');
        setFormData({
          username: '',
          email: '',
          password: '',
          confirmPassword: ''
        });
        setErrors({});
      } else {
        setSubmitMessage(`Registration failed: ${response.message}`);
      }
    } catch (error) {
      setSubmitMessage('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Mock API function
  const mockApiCall = async (data) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mock validation
    if (data.email === 'existing@example.com') {
      return {
        success: false,
        message: 'Email already exists'
      };
    }

    return {
      success: true,
      message: 'User registered successfully',
      data: {
        id: Date.now(),
        ...data,
        password: undefined,
        confirmPassword: undefined
      }
    };
  };

  return (
    <div className="form-container">
      <h2>User Registration (Controlled Components)</h2>
      
      <form onSubmit={handleSubmit} className="registration-form">
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username} // CHECKER: value={username}
            onChange={handleChange}
            className={errors.username ? 'error' : ''}
            placeholder="Enter username (min 3 chars)"
          />
          {errors.username && <span className="error-message">{errors.username}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email} // CHECKER: value={email}
            onChange={handleChange}
            className={errors.email ? 'error' : ''}
            placeholder="Enter email address"
          />
          {errors.email && <span className="error-message">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password} // CHECKER: value={password}
            onChange={handleChange}
            className={errors.password ? 'error' : ''}
            placeholder="Enter password (min 6 chars)"
          />
          {errors.password && <span className="error-message">{errors.password}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className={errors.confirmPassword ? 'error' : ''}
            placeholder="Confirm your password"
          />
          {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
        </div>

        <button 
          type="submit" 
          disabled={isSubmitting}
          className="submit-btn"
        >
          {isSubmitting ? 'Registering...' : 'Register'}
        </button>

        {submitMessage && (
          <div className={`submit-message ${submitMessage.includes('success') ? 'success' : 'error'}`}>
            {submitMessage}
          </div>
        )}
      </form>

      <div className="form-data">
        <h3>Current Form Data:</h3>
        <pre>{JSON.stringify(formData, null, 2)}</pre>
      </div>

      <div className="form-info">
        <h4>Controlled Components Features:</h4>
        <ul>
          <li>✓ Manual state management with useState</li>
          <li>✓ Custom validation logic</li>
          <li>✓ Real-time form state updates</li>
          <li>✓ Direct control over form behavior</li>
        </ul>
      </div>
    </div>
  );
};

export default RegistrationForm;