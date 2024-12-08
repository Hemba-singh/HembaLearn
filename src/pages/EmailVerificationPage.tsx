import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuthStore } from '../store/useAuthStore';
import { Mail, CheckCircle2, AlertTriangle } from 'lucide-react';

export function EmailVerificationPage() {
  const [verificationStatus, setVerificationStatus] = useState<'pending' | 'success' | 'error'>('pending');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { setUser } = useAuthStore();

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        // Extract verification token from URL
        const searchParams = new URLSearchParams(location.search);
        const token = searchParams.get('token');

        if (!token) {
          setVerificationStatus('error');
          setErrorMessage('No verification token found');
          return;
        }

        // Verify email using Supabase
        const { data, error } = await supabase.auth.verifyOtp({
          type: 'email',
          token
        });

        if (error) {
          throw error;
        }

        // Update user status in auth store
        setUser(data.user);

        // Mark email as verified in database
        await supabase
          .from('users')
          .update({ 
            email_verified: true,
            verified_at: new Date().toISOString() 
          })
          .eq('email', data.user?.email);

        setVerificationStatus('success');

        // Redirect to onboarding after 2 seconds
        setTimeout(() => {
          navigate('/onboarding');
        }, 2000);

      } catch (error) {
        console.error('Email verification error:', error);
        setVerificationStatus('error');
        setErrorMessage(error instanceof Error ? error.message : 'Verification failed');
      }
    };

    verifyEmail();
  }, [location, navigate, setUser]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 text-center">
          {verificationStatus === 'pending' && (
            <div className="animate-pulse">
              <Mail className="mx-auto h-16 w-16 text-blue-500 mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Verifying Your Email
              </h2>
              <p className="text-gray-600">
                Please wait while we verify your email address...
              </p>
            </div>
          )}

          {verificationStatus === 'success' && (
            <div>
              <CheckCircle2 className="mx-auto h-16 w-16 text-green-500 mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Email Verified Successfully!
              </h2>
              <p className="text-gray-600 mb-4">
                Redirecting to onboarding...
              </p>
            </div>
          )}

          {verificationStatus === 'error' && (
            <div>
              <AlertTriangle className="mx-auto h-16 w-16 text-red-500 mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Verification Failed
              </h2>
              <p className="text-red-600 mb-4">
                {errorMessage || 'Unable to verify email'}
              </p>
              <div className="flex justify-center space-x-4">
                <button
                  onClick={() => navigate('/register')}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Try Registering Again
                </button>
                <button
                  onClick={() => navigate('/')}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                >
                  Back to Home
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
