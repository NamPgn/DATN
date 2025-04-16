import React from 'react';
import { IoClose } from 'react-icons/io5';

interface ChatHeaderProps {
  onClose: () => void;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ onClose }) => {
  return (
    <div className="flex items-center justify-between p-4 bg-blue-500 text-white rounded-t-lg">
      <h3 className="font-semibold">Hỗ trợ trực tuyến</h3>
      <button
        onClick={onClose}
        className="text-white hover:text-gray-200 transition-colors"
      >
        <IoClose className="w-6 h-6" />
      </button>
    </div>
  );
};

export default ChatHeader; 