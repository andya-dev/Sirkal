// src/ui/components/Auth/RegisterForm.tsx
import { useState } from 'react';
import { registerUser } from '@/global/api/auth';
import type { RegisterRequest } from '@/global/types/auth';

interface RegisterFormProps {
  onSuccess?: (token: string) => void;
  onError?: (message: string) => void;
}

export default function RegisterForm({ onSuccess, onError }: RegisterFormProps) {
  const [form, setForm] = useState<RegisterRequest>({
    name: '',
    username: '',
    email: '',
    password: '',
    birthdate: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Very basic client-side check — you can expand with better validation
    if (!form.name.trim() || !form.username.trim() || !form.email.trim() || !form.password.trim()) {
      setError('Please fill in all required fields');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const result = await registerUser(form);
      if (result.success && result.token) {
        onSuccess?.(result.token);
      }
    } catch (err: any) {
      const message = err.message || 'Something went wrong';
      setError(message);
      onError?.(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 w-full max-w-[380px]">
      <div>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Name"
          autoComplete="name"
          className="
            w-full px-5 py-3.5 rounded-full 
            bg-white border border-gray-300 
            text-black placeholder-gray-500 
            focus:outline-none focus:border-[#1d9bf0] focus:ring-1 focus:ring-[#1d9bf0]/30
            transition-all duration-200
          "
          required
        />
      </div>

      <div>
        <input
          type="text"
          name="username"
          value={form.username}
          onChange={handleChange}
          placeholder="Username"
          autoComplete="username"
          className="
            w-full px-5 py-3.5 rounded-full 
            bg-white border border-gray-300 
            text-black placeholder-gray-500 
            focus:outline-none focus:border-[#1d9bf0] focus:ring-1 focus:ring-[#1d9bf0]/30
            transition-all duration-200
          "
          required
        />
      </div>

      <div>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          autoComplete="email"
          className="
            w-full px-5 py-3.5 rounded-full 
            bg-white border border-gray-300 
            text-black placeholder-gray-500 
            focus:outline-none focus:border-[#1d9bf0] focus:ring-1 focus:ring-[#1d9bf0]/30
            transition-all duration-200
          "
          required
        />
      </div>

      <div>
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Password"
          autoComplete="new-password"
          className="
            w-full px-5 py-3.5 rounded-full 
            bg-white border border-gray-300 
            text-black placeholder-gray-500 
            focus:outline-none focus:border-[#1d9bf0] focus:ring-1 focus:ring-[#1d9bf0]/30
            transition-all duration-200
          "
          required
        />
      </div>

      {/* Optional: Birthdate – common for age gating on social platforms */}
      <div>
        <input
          type="date"
          name="birthdate"
          value={form.birthdate}
          onChange={handleChange}
          className="
            w-full px-5 py-3.5 rounded-full 
            bg-white border border-gray-300 
            text-black 
            focus:outline-none focus:border-[#1d9bf0] focus:ring-1 focus:ring-[#1d9bf0]/30
            transition-all duration-200
          "
        />
        <p className="text-xs text-gray-500 mt-1">
          This helps us verify your age (optional)
        </p>
      </div>

      {error && (
        <div className="text-red-600 text-sm text-center px-2 py-1 font-medium">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="
          w-full py-3.5 rounded-full font-bold text-lg
          bg-black text-white hover:bg-gray-900
          disabled:opacity-60 disabled:cursor-not-allowed
          transition-all duration-200 shadow-sm
        "
      >
        {loading ? 'Creating account...' : 'Create account'}
      </button>
    </form>
  );
}