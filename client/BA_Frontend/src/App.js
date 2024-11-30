import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './utils/IsSignedIn';
// Directory of /pages
import GymOccupancy from './pages/Front_Page';
import Calendar from './pages/Calendar_Page';
import Board from './pages/Postboard_Page';
import SignIn from './pages/Sign_in';
import SignUp from './pages/Sign_Up';
import EditProfile from './pages/EditProfile_Page';
import Profiles from './pages/Profile_Page';

/*
  If you're having trouble having this run, change directory (cd) into the folder you want to and run:

    npm install react-router-dom

  This installs a router from react that allows This allows for SPA's (single-page applications), 
  making a seamless and rapid transition between pages of the app. 
*/

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<GymOccupancy />} />
          <Route path="/calendar_page" element={<Calendar />} />
          <Route path="/postboard_page" element={<Board />} />
          <Route path="/sign_in" element={<SignIn />} />
          <Route path="/sign_up" element={<SignUp />} />
          <Route path="/edit_profile" element={<EditProfile />} />
          <Route path="/profile_page" element={<Profiles />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}