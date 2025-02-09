import React from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { FaPlus, FaList, FaSignOutAlt, FaSignInAlt } from "react-icons/fa";
import authService from "@/services/authService";

const Navbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  if (location.pathname === "/login") return null;

  const handleLogout = () => {
    authService.logout();
    navigate("/");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-30 w-full border-b bg-background">
      <div className="container mx-auto flex h-16 items-center justify-between">
        {/* Logo, Title, and Navigation Links */}
        <div className="flex items-center space-x-6">
          {/* Logo and Site Title */}
          <div className="flex items-center">
            <img src="/path/to/logo.png" alt="Logo" className="h-8 w-8 mr-2" />
            <div className="text-lg font-bold text-gray-800">SpecterBin</div>
          </div>

          {/* Navigation Links */}
          <nav className="flex items-center space-x-4">
            <Link
              to="/new"
              className={`flex items-center ${
                isActive("/new") ? "text-blue-500" : "text-gray-700"
              }`}
            >
              <FaPlus className="mr-2" />
              New
            </Link>

            <Link
              to="/my-pastes"
              className={`flex items-center ${
                isActive("/my-pastes") ? "text-blue-500" : "text-gray-700"
              }`}
            >
              <FaList className="mr-2" />
              My Pastes
            </Link>
          </nav>
        </div>

        {/* Logout Button */}
        <div className="flex items-center space-x-4">
          {authService.isAuthenticated() ? (
            <button
              onClick={handleLogout}
              className="flex items-center text-red-600"
            >
              <FaSignOutAlt className="mr-2" />
              Logout
            </button>
          ) : (
            <button
              onClick={handleLogin}
              className="flex items-center text-green-600"
            >
              <FaSignInAlt className="mr-2" />
              Login
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
