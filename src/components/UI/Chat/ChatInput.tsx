import React from 'react';
import { FaPaperPlane } from 'react-icons/fa';

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ value, onChange, onSubmit }) => {
  return (
    <form onSubmit={onSubmit} className="p-4 border-t">
      <div className="flex items-center">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Nhập tin nhắn..."
          className="flex-1 border rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-r-lg hover:bg-blue-700 transition-colors duration-300"
        >
          <FaPaperPlane />
        </button>
      </div>
    </form>
  );
};

export default ChatInput; 