import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './Form.css';

const FormikForm = () => {
  // Yup validation schema
  const validationSchema = Yup.object({
    username: Yup.string()
      .min(3, 'Username must be at least 3 characters')
      .max(20, 'Username must be 20 characters or less')
      .required('Username is required'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
    terms: Yup.boolean()
      .oneOf([true], 'You must accept the terms and conditions')
  });

  // Initial form values
  const initialValues = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    terms: false
  };

  // Handle form submission
  const handleSubmit = async (values, { setSubmitting, resetForm, setStatus }) => {
    try {
      // Mock API call
      const response = await mockApiCall(values);
      
      if (response.success) {
        setStatus({ type: 'success', message: 'Registration successful!' });
        resetForm();
      } else {
        setStatus({ type: 'error', message: `Registration failed: ${response.message}` });
      }
    } catch (error) {
      setStatus({ type: 'error', message: 'An error occurred. Please try again.' });
    } finally {
      setSubmitting(false);
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
      <h2>User Registration (Formik)</h2>
      
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        validateOnMount={false}
        validateOnChange={true}
        validateOnBlur={true}
      >
        {({ isSubmitting, errors, touched, values, status, isValid, dirty }) => (
          <Form className="registration-form">
            <div className="form-group">
              <label htmlFor="username">Username:</label>
              <Field
                type="text"
                id="username"
                name="username"
                placeholder="Enter username (min 3 chars)"
                className={`form-field ${errors.username && touched.username ? 'error' : ''}`}
              />
              <ErrorMessage name="username" component="div" className="error-message" />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <Field
                type="email"
                id="email"
                name="email"
                placeholder="Enter email address"
                className={`form-field ${errors.email && touched.email ? 'error' : ''}`}
              />
              <ErrorMessage name="email" component="div" className="error-message" />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <Field
                type="password"
                id="password"
                name="password"
                placeholder="Enter password (min 6 chars)"
                className={`form-field ${errors.password && touched.password ? 'error' : ''}`}
              />
              <ErrorMessage name="password" component="div" className="error-message" />
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password:</label>
              <Field
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm your password"
                className={`form-field ${errors.confirmPassword && touched.confirmPassword ? 'error' : ''}`}
              />
              <ErrorMessage name="confirmPassword" component="div" className="error-message" />
            </div>

            <div className="form-group checkbox-group">
              <label className="checkbox-label">
                <Field
                  type="checkbox"
                  name="terms"
                  className="checkbox-input"
                />
                <span>I accept the terms and conditions</span>
              </label>
              <ErrorMessage name="terms" component="div" className="error-message" />
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting || !isValid || !dirty}
              className="submit-btn"
            >
              {isSubmitting ? 'Registering...' : 'Register'}
            </button>

            {status && (
              <div className={`submit-message ${status.type === 'success' ? 'success' : 'error'}`}>
                {status.message}
              </div>
            )}
          </Form>
        )}
      </Formik>

      <div className="form-data">
        <h3>Formik Features:</h3>
        <ul>
          <li>✓ Yup validation schema for robust validation</li>
          <li>✓ Built-in form state management</li>
          <li>✓ Touch tracking for better UX</li>
          <li>✓ Form, Field, and ErrorMessage components</li>
          <li>✓ Automatic form validation</li>
          <li>✓ Less boilerplate code</li>
        </ul>
      </div>
    </div>
  );
};

export default FormikForm;