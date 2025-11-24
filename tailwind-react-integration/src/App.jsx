// src/App.jsx
function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden md:max-w-2xl p-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Tailwind CSS + React
          </h1>
          <p className="text-gray-600 mb-6">
            Successfully integrated Tailwind CSS with React and Vite!
          </p>
          <div className="flex justify-center space-x-4">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300">
              Primary Button
            </button>
            <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded transition duration-300">
              Secondary Button
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App