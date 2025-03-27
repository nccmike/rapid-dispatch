
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full py-4 px-6 mt-auto border-t border-gray-100 text-center text-gray-500 text-sm bg-white/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="mb-2 md:mb-0">
          <span>© {new Date().getFullYear()} AdjusterConnect</span>
        </div>
        <div className="flex items-center space-x-4">
          <a href="#" className="hover:text-blue-500 transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-blue-500 transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-blue-500 transition-colors">Contact</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
