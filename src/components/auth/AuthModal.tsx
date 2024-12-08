import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { SignInForm } from './SignInForm';
import { RegisterForm } from './RegisterForm';
import { ForgotPasswordForm } from './ForgotPasswordForm';
import { GoogleIcon, GitHubIcon } from '../ui/Icons';
import { supabase } from '../../lib/supabase';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultView?: 'signin' | 'register' | 'forgotpassword';
}

export function AuthModal({ isOpen, onClose, defaultView = 'signin' }: AuthModalProps) {
  const [view, setView] = useState<'signin' | 'register' | 'forgotpassword'>(defaultView);
  const [socialError, setSocialError] = useState<string | null>(null);

  const handleSuccess = () => {
    onClose();
  };

  const handleSocialLogin = async (provider: 'google' | 'github') => {
    setSocialError(null);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/auth/callback`
        }
      });

      if (error) {
        setSocialError(`Social login failed: ${error.message}`);
      }
    } catch (err) {
      setSocialError('An unexpected error occurred during social login');
    }
  };

  const renderSocialLogins = () => (
    <div className="mt-4 space-y-2">
      {socialError && (
        <div className="text-red-500 text-sm text-center mb-2">
          {socialError}
        </div>
      )}
      <div className="flex justify-center space-x-4">
        <button 
          onClick={() => handleSocialLogin('google')}
          className="flex items-center justify-center w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <GoogleIcon className="w-5 h-5 mr-2" />
          Continue with Google
        </button>
        <button 
          onClick={() => handleSocialLogin('github')}
          className="flex items-center justify-center w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <GitHubIcon className="w-5 h-5 mr-2" />
          Continue with GitHub
        </button>
      </div>
      <div className="my-4 flex items-center">
        <div className="flex-grow border-t border-gray-300"></div>
        <span className="mx-4 text-gray-500 text-sm">or</span>
        <div className="flex-grow border-t border-gray-300"></div>
      </div>
    </div>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      description={
        view === 'signin' 
          ? 'Access personalized learning paths and track your progress' 
          : view === 'register' 
            ? 'Create your account and start your learning journey' 
            : 'Recover access to your account'
      }
      className="max-w-md"
    >
      <div className="flex flex-col items-center justify-center p-6 space-y-6">
        <div className="w-full">
          {view === 'signin' ? (
            <SignInForm
              onSuccess={handleSuccess}
              onRegisterClick={() => setView('register')}
              onForgotPasswordClick={() => setView('forgotpassword')}
              renderSocialLogins={renderSocialLogins}
            />
          ) : view === 'register' ? (
            <RegisterForm
              onSuccess={handleSuccess}
              onSignInClick={() => setView('signin')}
              renderSocialLogins={renderSocialLogins}
            />
          ) : (
            <ForgotPasswordForm
              onSuccess={handleSuccess}
              onSignInClick={() => setView('signin')}
            />
          )}
        </div>
      </div>
    </Modal>
  );
}