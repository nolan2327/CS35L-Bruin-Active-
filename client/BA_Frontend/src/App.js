import React from 'react';
<<<<<<< HEAD
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Directory of /pages
import GymOccupancy from './pages/Front_Page';
import Calendar from './pages/Calendar_Page';
import Board from './pages/Postboard_Page';
import Profiles from './pages/Profile_Page';

/*
  If you're having trouble having this run, change directory (cd) into the folder you want to and run:

    npm install react-router-dom

  This installs a router from react that allows This allows for SPA's (single-page applications), 
  making a seamless and rapid transition between pages of the app. 
*/
=======
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import GymOccupancy from './pages/Front_Page';
import CalendarPage from './pages/Calendar_Page';

>>>>>>> shubhan-branch

export default function App() {
  return (
    <Router>
      <Routes>
<<<<<<< HEAD
        <Route path="/" element={<GymOccupancy />} />
        <Route path="/calendar_page" element={<Calendar />} />
        <Route path="/postboard_page" element={<Board />} />
        <Route path="/profile_page" element={<Profiles />} />
=======
        {/* Define the route for the main Gym Occupancy page */}
        <Route path="/" element={<GymOccupancy />} />
        
        {/* Define the route for the Calendar page */}
        <Route path="/calendar" element={<CalendarPage />} />
>>>>>>> shubhan-branch
      </Routes>
    </Router>
  );
}
// <<<<<<< HEAD
// <<<<<<< Updated upstream
// };
// =======
// }
// >>>>>>> Stashed changes
// =======
// <<<<<<< HEAD
// }
// =======
// }
// >>>>>>> origin/main
// >>>>>>> b742c50375eceddbd0c06e279235aa3048137c84
