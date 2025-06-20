import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function getInitials(name, email) {
  if (name) return name[0].toUpperCase();
  if (email) return email[0].toUpperCase();
  return "?";
}

function NavBar() {
  const [showProfile, setShowProfile] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('user');
    setShowProfile(false);
    navigate('/');
  };

  return (
    <nav className="w-full bg-gradient-to-r from-blue-700 via-purple-700 to-pink-700 shadow-md">
      <div className="container mx-auto flex flex-wrap items-center justify-between px-4 py-3 text-slate-100">
        <a href="/" className="mr-4 block cursor-pointer py-1.5 text-2xl font-bold tracking-wide">
          <span className="bg-white text-blue-700 px-2 py-1 rounded-lg shadow">QuizApp</span>
        </a>
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <a href="/home" className="hover:underline font-medium">Home</a>
          <a href="/quiz" className="hover:underline font-medium">Quiz</a>
          <a href="/leaderboard" className="hover:underline font-medium">Leaderboard</a>
          {user && (
            <div className="relative">
              <button
                onClick={() => setShowProfile((prev) => !prev)}
                className="flex items-center gap-2 bg-white text-blue-700 px-3 py-1 rounded-full font-semibold shadow hover:bg-blue-100 transition"
              >
                <span className="w-8 h-8 flex items-center justify-center bg-blue-700 text-white rounded-full font-bold">
                  {getInitials(user.name, user.email)}
                </span>
                <span className="hidden sm:inline">Profile</span>
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {showProfile && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded shadow-lg z-10 p-4 animate-fade-in">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="w-10 h-10 flex items-center justify-center bg-blue-700 text-white rounded-full font-bold text-lg">
                      {getInitials(user.name, user.email)}
                    </span>
                    <div>
                      <div className="font-bold text-blue-700">{user.name}</div>
                      <div className="text-sm text-gray-600">{user.email}</div>
                    </div>
                  </div>
                  <hr className="my-2" />
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 rounded font-semibold"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
        {/* Mobile Menu Button */}
        <button
          className="md:hidden flex items-center px-3 py-2 border rounded text-white border-white hover:text-blue-200"
          onClick={() => setShowMenu(!showMenu)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        {/* Mobile Menu */}
        {showMenu && (
          <div className="md:hidden absolute top-16 left-0 w-full bg-gradient-to-r from-blue-700 via-purple-700 to-pink-700 shadow-lg z-20">
            <div className="flex flex-col items-center gap-4 py-4">
              <a href="/home" className="hover:underline font-medium">Home</a>
              <a href="/quiz" className="hover:underline font-medium">Quiz</a>
              <a href="/leaderboard" className="hover:underline font-medium">Leaderboard</a>
              {user && (
                <button
                  onClick={() => { setShowProfile(true); setShowMenu(false); }}
                  className="flex items-center gap-2 bg-white text-blue-700 px-3 py-1 rounded-full font-semibold shadow hover:bg-blue-100 transition"
                >
                  <span className="w-8 h-8 flex items-center justify-center bg-blue-700 text-white rounded-full font-bold">
                    {getInitials(user.name, user.email)}
                  </span>
                  Profile
                </button>
              )}
            </div>
          </div>
        )}
      </div>
      {/* Profile dropdown for mobile */}
      {showProfile && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-30 md:hidden" onClick={() => setShowProfile(false)}>
          <div className="bg-white rounded shadow-lg p-6 w-80" onClick={e => e.stopPropagation()}>
            <div className="flex items-center gap-3 mb-2">
              <span className="w-10 h-10 flex items-center justify-center bg-blue-700 text-white rounded-full font-bold text-lg">
                {getInitials(user.name, user.email)}
              </span>
              <div>
                <div className="font-bold text-blue-700">{user.name}</div>
                <div className="text-sm text-gray-600">{user.email}</div>
              </div>
            </div>
            <hr className="my-2" />
            <button
              onClick={handleLogout}
              className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 rounded font-semibold"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

export default NavBar;