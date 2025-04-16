import React from 'react';
import { IoChatbubbleEllipsesOutline } from 'react-icons/io5';

interface ChatButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

const ChatButton: React.FC<ChatButtonProps> = ({ isOpen, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`p-3 rounded-full shadow-lg transition-all duration-300 ${
        isOpen ? 'bg-gray-600 text-white' : 'bg-blue-500 text-white hover:bg-blue-600'
      }`}
    >
      <IoChatbubbleEllipsesOutline className="w-6 h-6" />
    </button>
  );
};

export default ChatButton; 