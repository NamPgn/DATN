import React, { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const guestFormSchema = z.object({
  guest_name: z.string().min(1, 'Vui lòng nhập tên'),
  guest_email: z.string().email('Email không hợp lệ'),
  guest_phone: z.string().regex(/^[0-9]{10}$/, 'Số điện thoại không hợp lệ'),
});

type GuestFormData = z.infer<typeof guestFormSchema>;

interface GuestFormProps {
  onSubmit: (data: GuestFormData) => void;
}

const GuestForm: React.FC<GuestFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    guest_name: '',
    guest_email: '',
    guest_phone: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-4">
      <div>
        <label htmlFor="guest_name" className="block text-sm font-medium text-gray-700">
          Họ và tên
        </label>
        <input
          type="text"
          id="guest_name"
          name="guest_name"
          required
          value={formData.guest_name}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
        />
      </div>

      <div>
        <label htmlFor="guest_email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          type="email"
          id="guest_email"
          name="guest_email"
          required
          value={formData.guest_email}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
        />
      </div>

      <div>
        <label htmlFor="guest_phone" className="block text-sm font-medium text-gray-700">
          Số điện thoại
        </label>
        <input
          type="tel"
          id="guest_phone"
          name="guest_phone"
          required
          value={formData.guest_phone}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Bắt đầu trò chuyện
      </button>
    </form>
  );
};

export default GuestForm; 