import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SingleListing from './pages/SingleListing';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/listing/:id" element={<SingleListing />} />
        {/* ...other routes... */}
      </Routes>
    </Router>
  );
}

export default App;
