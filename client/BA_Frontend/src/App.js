import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import GymOccupancy from './pages/Front_Page';
import CalendarPage from './pages/Calendar_Page';


export default function App() {
  return (
    <Router>
      <Routes>
        {/* Define the route for the main Gym Occupancy page */}
        <Route path="/" element={<GymOccupancy />} />
        
        {/* Define the route for the Calendar page */}
        <Route path="/calendar" element={<CalendarPage />} />
      </Routes>
    </Router>
  );
}
