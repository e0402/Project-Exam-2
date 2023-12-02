import React from 'react';
import { NavLink } from 'react-router-dom';

const SecondaryNavbar = () => {
  const isVenueManager = localStorage.getItem('isVenueManager') === 'true';

  return (
    <nav className="bg-black text-white">
      <ul className="flex flex-col sm:flex-row justify-center list-none m-0 p-0">
        <li className={`py-4 px-8 ${window.location.pathname === '/profile' ? 'bg-gray-700' : ''}`}>
          <NavLink to="/profile" className="hover:text-gray-200">
            Profile
          </NavLink>
        </li>
        <li className={`py-4 px-8 ${window.location.pathname === '/my-bookings' ? 'bg-gray-700' : ''}`}>
          <NavLink to="/my-bookings" className="hover:text-gray-200">
            My Bookings
          </NavLink>
        </li>
        {isVenueManager && (
          <>
            <li className={`py-4 px-8 ${window.location.pathname === '/create-venue' ? 'bg-gray-700' : ''}`}>
              <NavLink to="/create-venue" className="hover:text-gray-200">
                Create New Listing
              </NavLink>
            </li>
            <li className={`py-4 px-8 ${window.location.pathname === '/my-listings' ? 'bg-gray-700' : ''}`}>
              <NavLink to="/my-listings" className="hover:text-gray-200">
                My Listings
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default SecondaryNavbar;
