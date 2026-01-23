import { useState } from 'react'
import { loginUser } from '@/global/api/auth'
import type { LoginRequest } from '@/global/types/auth'

interface LoginFormProps {
  onSuccess?: (token: string) => void
  onError?: (message: string) => void
}

export default function LoginForm({ onSuccess, onError }: LoginFormProps) {
  const [form, setForm] = useState<LoginRequest>({
    username: '',
    password: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm(prev => ({
      ...prev,
      [name]: value,
    }))
    if (error) setError('')
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!form.username.trim() || !form.password.trim()) {
      const msg = 'Username and password are required'
      setError(msg)
      onError?.(msg)
      return
    }

    setLoading(true)
    setError('')

    try {
      const result = await loginUser(form)

      if (result.success && result.token) {
        onSuccess?.(result.token)
      } else {
        const msg = result.message || 'Login failed'
        setError(msg)
        onError?.(msg)
      }
    } catch (err: any) {
      const message =
        err?.response?.data?.message ||
        err?.message ||
        'Something went wrong'
      setError(message)
      onError?.(message)
    } finally {
      setLoading(false)
    }
  }


  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 w-full max-w-[380px]"
    >
      {/* Username */}
      <div>
        <input
          type="text"
          name="username"
          value={form.username}
          onChange={handleChange}
          placeholder="Phone, email or username"
          autoComplete="username"
          className="
            w-full px-5 py-3.5 rounded-full 
            bg-white border border-gray-300 
            text-black placeholder-gray-500 
            focus:outline-none focus:border-[#1d9bf0]
            focus:ring-1 focus:ring-[#1d9bf0]/30
            transition-all duration-200
          "
        />
      </div>

      {/* Password */}
      <div>
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Password"
          autoComplete="current-password"
          className="
            w-full px-5 py-3.5 rounded-full 
            bg-white border border-gray-300 
            text-black placeholder-gray-500 
            focus:outline-none focus:border-[#1d9bf0]
            focus:ring-1 focus:ring-[#1d9bf0]/30
            transition-all duration-200
          "
        />
      </div>

      {/* Error */}
      {error && (
        <div className="text-red-600 text-sm text-center px-2 py-1 font-medium">
          {error}
        </div>
      )}

      {/* Submit */}
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
        {loading ? 'Signing in...' : 'Log in'}
      </button>
    </form>
  )
}
