
import React from 'react';
import { NavLink } from 'react-router-dom';
import AnimatedLogo from './AnimatedLogo';

const Header: React.FC = () => {
  return (
    <header className="w-full py-4 px-6 flex items-center justify-between bg-white/90 backdrop-blur-md border-b border-gray-100 sticky top-0 z-10">
      <AnimatedLogo />
      
      <nav className="flex items-center space-x-6">
        <NavLink 
          to="/" 
          className={({ isActive }) => 
            `transition-all duration-300 py-2 ${
              isActive 
                ? 'text-blue-600 font-medium border-b-2 border-blue-500' 
                : 'text-gray-600 hover:text-blue-500'
            }`
          }
        >
          New Incident
        </NavLink>
        
        <NavLink 
          to="/dashboard" 
          className={({ isActive }) => 
            `transition-all duration-300 py-2 ${
              isActive 
                ? 'text-blue-600 font-medium border-b-2 border-blue-500' 
                : 'text-gray-600 hover:text-blue-500'
            }`
          }
        >
          Dashboard
        </NavLink>
        
        <NavLink 
          to="/history" 
          className={({ isActive }) => 
            `transition-all duration-300 py-2 ${
              isActive 
                ? 'text-blue-600 font-medium border-b-2 border-blue-500' 
                : 'text-gray-600 hover:text-blue-500'
            }`
          }
        >
          History
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;
