import React from 'react';
import RegistrationForm from './components/RegistrationForm';
import FormikForm from './components/FormikForm';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>React Form Handling Comparison</h1>
        <p>Comparing Controlled Components vs Formik with Yup Validation</p>
      </header>
      
      <main className="main-content">
        <div className="forms-container">
          <div className="form-section">
            <RegistrationForm />
          </div>
          
          <div className="divider">
            <span>VS</span>
          </div>
          
          <div className="form-section">
            <FormikForm />
          </div>
        </div>
      </main>
      
      <footer className="App-footer">
        <p>Form Handling Task - React & Formik Implementation</p>
      </footer>
    </div>
  );
}

export default App;