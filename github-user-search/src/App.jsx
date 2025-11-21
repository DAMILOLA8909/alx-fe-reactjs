import React from 'react';
import Search from './components/Search'; // This should work with default export

function App() {
  return (
    <div className="App">
      <header className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-4xl font-bold text-center mb-3">GitHub User Search</h1>
          <p className="text-blue-100 text-lg text-center">Find GitHub users with advanced filters and search criteria</p>
        </div>
      </header>
      <Search />
    </div>
  );
}

export default App;