// src/ui/components/Auth/RegisterPage.tsx
import RegisterForm from '@/ui/components/auth/RegisterForm';

export default function RegisterPage() {
  const handleRegisterSuccess = (token: string) => {
    // In real app → save token (localStorage/context) & redirect
    console.log('Registration success! Token:', token);
    // Example: navigate('/onboarding') or '/home'
  };

  return (
    <div className="min-h-screen bg-white text-black flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-md flex flex-col items-center space-y-10 sm:space-y-12">
        {/* Sirkal Logo */}



        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-center">
          Join Sirkal
        </h1>

        <RegisterForm onSuccess={handleRegisterSuccess} />

        <div className="text-gray-500 text-sm text-center">
          Already have an account?{' '}
          <a href="/login" className="text-[#1d9bf0] hover:underline font-medium">
            Log in
          </a>
        </div>
      </div>
    </div>
  );
}