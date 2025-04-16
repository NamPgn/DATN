import React from 'react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot' | 'system';
  timestamp?: string;
}

interface MessageListProps {
  messages: Message[];
}

const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  return (
    <div className="p-4 space-y-4">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex ${
            message.sender === 'user' ? 'justify-end' : 'justify-start'
          }`}
        >
          <div
            className={`max-w-[75%] p-3 rounded-lg ${
              message.sender === 'user'
                ? 'bg-blue-500 text-white'
                : message.sender === 'system'
                ? 'bg-gray-200 text-gray-800'
                : 'bg-gray-100 text-gray-800'
            }`}
          >
            <p className="text-sm">{message.text}</p>
            {message.timestamp && (
              <p className="text-xs mt-1 opacity-75">
                {new Date(message.timestamp).toLocaleTimeString('vi-VN', {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageList; 