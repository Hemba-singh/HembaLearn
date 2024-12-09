import React, { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { useAuthStore } from '../../store/useAuthStore';
import { Loader2 } from 'lucide-react';

interface SignInFormProps {
  onSuccess: () => void;
  onRegisterClick: () => void;
  onForgotPasswordClick: () => void;
  renderSocialLogins?: () => React.ReactNode;
}

export function SignInForm({ 
  onSuccess, 
  onRegisterClick, 
  onForgotPasswordClick,
  renderSocialLogins 
}: SignInFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError(error.message);
        return;
      }

      onSuccess();
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-full">
      <div className="w-full max-w-xs">
        <form 
          onSubmit={handleSubmit} 
          className="w-full space-y-3 p-2 text-center"
        >
          {error && (
            <div className="p-2 bg-red-50 text-red-600 rounded-md text-xs text-center">
              {error}
            </div>
          )}
          
          <div className="text-center mb-3">
            <h2 className="text-xl font-bold text-gray-800 mb-1">Welcome Back</h2>
            <p className="text-xs text-gray-600">Sign in to continue to HembaLearn</p>
          </div>

          <div className="space-y-3">
            <div>
              <label htmlFor="email" className="block text-xs font-medium text-gray-700 mb-1 text-left">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-xs font-medium text-gray-700 mb-1 text-left">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-1.5 px-3 text-xs border border-transparent rounded-md shadow-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                'Sign In'
              )}
            </button>

            <div className="text-center flex justify-between items-center mt-2">
              <button
                type="button"
                onClick={onRegisterClick}
                className="text-xs text-blue-600 hover:text-blue-500"
              >
                Register
              </button>
              <button
                type="button"
                onClick={onForgotPasswordClick}
                className="text-xs text-blue-600 hover:text-blue-500"
              >
                Forgot Password?
              </button>
            </div>
          </div>

          {renderSocialLogins && (
            <div className="mt-3">
              <div className="my-2 flex items-center">
                <div className="flex-grow border-t border-gray-300"></div>
                <span className="mx-2 text-xs text-gray-500">or continue with</span>
                <div className="flex-grow border-t border-gray-300"></div>
              </div>
              <div className="flex justify-center space-x-2">
                {renderSocialLogins()}
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
