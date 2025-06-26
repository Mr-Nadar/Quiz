import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Footer from './Footer';
import NavBar from './NavBar';
import HeroS from './HeroS';
import Login from "./Login";
import Quiz from "./Quiz";
import LeaderBoard from "./LeaderBoard";

function isAuthenticated() {
  return !!localStorage.getItem('user');
}

function PrivateRoute({ children }) {
  return isAuthenticated() ? children : <Navigate to="/" />;
}

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={
          <PrivateRoute>
            <HeroS />
          </PrivateRoute>
        } />
        <Route path="/quiz" element={
          <PrivateRoute>
            <Quiz />
          </PrivateRoute>
        } />
        <Route path="/leaderboard" element={<LeaderBoard />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
