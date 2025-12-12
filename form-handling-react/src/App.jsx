import React from 'react';
import ControlledForm from './components/ControlledForm';
import FormikForm from './components/FormikForm';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>React Form Handling Comparison</h1>
        <p>Comparing Controlled Components vs Formik</p>
      </header>
      
      <main className="main-content">
        <div className="forms-container">
          <div className="form-section">
            <ControlledForm />
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