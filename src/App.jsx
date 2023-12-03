import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/common/Layout';
import HomePage from './components/pages/HomePage';
import SingleVenue from './components/pages/SingleVenuePage';
import RegisterPage from './components/pages/RegisterPage';
import LoginPage from './components/pages/LoginPage';
import ProfilePage from './components/pages/ProfilePage';
import MyBookingsPage from './components/pages/MyBookingsPage';
import MyListingsPage from './components/pages/MyListingsPage';
import CreateVenuePage from './components/pages/CreateVenuePage';
import EditVenuePage from './components/pages/EditVenuePage';
import { ModalProvider } from './components/common/ModalContext';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem('authToken'));
  }, []);

  return (
    <Router>
      <ModalProvider>
        <Routes>
          <Route path="/" element={<Layout isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />}>
            <Route index element={<HomePage />} />
            <Route path="/venue/:id" element={<SingleVenue />} />
            <Route path="/login" element={<LoginPage setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/my-bookings" element={<MyBookingsPage />} />
            <Route path="/create-venue" element={<CreateVenuePage />} />
            <Route path="/my-listings" element={<MyListingsPage />} />
            <Route path="/edit-venue/:venueId" element={<EditVenuePage />} />
          </Route>
        </Routes>
      </ModalProvider>
    </Router>
  );
}

export default App;
