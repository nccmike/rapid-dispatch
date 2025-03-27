
import React from 'react';
import { Phone, MessageSquare } from 'lucide-react';

const AnimatedLogo: React.FC = () => {
  return (
    <div className="flex items-center justify-center space-x-2">
      <div className="relative">
        <div className="absolute inset-0 rounded-full bg-blue-400/20 animate-ping"></div>
        <div className="relative bg-blue-500 text-white p-2 rounded-full animate-pulse-soft">
          <Phone size={20} />
        </div>
      </div>
      <div className="text-xl font-semibold tracking-tight bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
        AdjusterConnect
      </div>
      <div className="relative">
        <div className="absolute inset-0 rounded-full bg-blue-400/20 animate-ping"></div>
        <div className="relative bg-blue-500 text-white p-2 rounded-full animate-pulse-soft">
          <MessageSquare size={20} />
        </div>
      </div>
    </div>
  );
};

export default AnimatedLogo;
