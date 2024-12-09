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
    <div className="mt-3 space-y-2">
      {socialError && (
        <div className="text-red-500 text-xs text-center mb-1">
          {socialError}
        </div>
      )}
      <div className="flex flex-col space-y-2">
        <button 
          onClick={() => handleSocialLogin('google')}
          className="flex items-center justify-center w-full py-1.5 px-3 text-xs border border-gray-300 rounded-md shadow-sm bg-white hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          <GoogleIcon className="w-4 h-4 mr-2" />
          Sign in with Google
        </button>
        <button 
          onClick={() => handleSocialLogin('github')}
          className="flex items-center justify-center w-full py-1.5 px-3 text-xs border border-gray-300 rounded-md shadow-sm bg-white hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          <GitHubIcon className="w-4 h-4 mr-2" />
          Sign in with GitHub
        </button>
      </div>
      <div className="my-2 flex items-center">
        <div className="flex-grow border-t border-gray-300"></div>
        <span className="mx-2 text-xs text-gray-500">or</span>
        <div className="flex-grow border-t border-gray-300"></div>
      </div>
    </div>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        view === 'signin' 
          ? 'Sign In' 
          : view === 'register' 
            ? 'Register' 
            : 'Reset Password'
      }
      className="h-auto max-h-[90vh] overflow-y-auto"
    >
      <div className="flex flex-col items-center justify-center p-4 space-y-3">
        {/* Compact header */}

        <div className="w-full px-1">
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