import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <h1 className="text-4xl font-bold text-primary">Stress Management Portal</h1>
      </div>
{/* 
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
*/}
    </Router>
  );
}

export default App;
