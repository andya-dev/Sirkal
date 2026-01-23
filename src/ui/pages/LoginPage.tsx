import LoginForm from '@/ui/components/auth/LoginForm';

export default function LoginPage() {
  const handleLoginSuccess = (token: string) => {
    // In real app → save token & redirect
    console.log('Login success! Token:', token);
    // Example: navigate('/dashboard') with react-router
  };

  return (
    <div className="min-h-screen bg-white text-black flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-md flex flex-col items-center space-y-10 sm:space-y-12">


        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-center">
          Sign in to Sirkal
        </h1>

        <LoginForm onSuccess={handleLoginSuccess} />

        <div className="text-gray-500 text-sm text-center">
          Don’t have an account?{' '}
          <a href="#" className="text-[#1d9bf0] hover:underline font-medium">
            Sign up
          </a>
        </div>
      </div>
    </div>
  );
}