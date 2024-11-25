import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Directory of /pages
import GymOccupancy from './pages/Front_Page';
import Calendar from './pages/Calendar_Page';
import Board from './pages/Postboard_Page';
// import Profiles from './pages/Profile_Page';
import SignIn from './pages/Sign_in';

/*
  If you're having trouble having this run, change directory (cd) into the folder you want to and run:

    npm install react-router-dom

  This installs a router from react that allows This allows for SPA's (single-page applications), 
  making a seamless and rapid transition between pages of the app. 
*/

export default function App() {
  return (
    <Router>
      <Routes>
<<<<<<< HEAD
        {/* Define the route for the main Gym Occupancy page */}
        <Route path="/" element={<GymOccupancy />} />

        {/* Define the route for the Calendar page */}
        <Route path="/calendar" element={<CalendarPage />} />
      </Routes>
    </Router>
  );
};
=======
        <Route path="/" element={<GymOccupancy />} /> 
        <Route path="/calendar_page" element={<Calendar />} />
        <Route path="/postboard_page" element={<Board />} /> 
        <Route path="/sign_in" element={<SignIn />} />          
      </Routes>
    </Router>
  );
}
>>>>>>> 671dfb4537f2c8c6da5639f2cabce5bee121e434
