import React, { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Loader2 } from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';
import { logRegistrationAttempt } from '../../lib/authLogger';

// Enhanced type for registration
interface RegistrationData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role?: 'student' | 'instructor' | 'admin';
  interests?: string[];
}

interface RegisterFormProps {
  onSuccess: () => void;
  onSignInClick: () => void;
  renderSocialLogins?: () => React.ReactNode;
}

export function RegisterForm({ 
  onSuccess, 
  onSignInClick,
  renderSocialLogins 
}: RegisterFormProps) {
  const [formData, setFormData] = useState<RegistrationData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'student',
    interests: []
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const { signUp } = useAuthStore();

  // Password strength calculation
  const calculatePasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength++;
    return strength;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (name === 'password') {
      setPasswordStrength(calculatePasswordStrength(value));
    }
  };

  const handleInterestToggle = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests?.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...(prev.interests || []), interest]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Comprehensive validation with detailed error messages
    const validationErrors: string[] = [];

    // Name validation with more specific rules
    if (!formData.name.trim()) {
      validationErrors.push('Full name is required');
    } else if (formData.name.trim().split(' ').length < 2) {
      validationErrors.push('Please provide both first and last name');
    }

    // Email validation with more robust regex
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(formData.email)) {
      validationErrors.push('Please enter a valid email address');
    }

    // Enhanced password validation
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(formData.password)) {
      validationErrors.push(
        'Password must:\n' +
        '• Be at least 8 characters long\n' +
        '• Include uppercase and lowercase letters\n' +
        '• Contain a number\n' +
        '• Include a special character'
      );
    }

    if (formData.password !== formData.confirmPassword) {
      validationErrors.push('Passwords do not match. Please re-enter.');
    }

    if (validationErrors.length > 0) {
      setError(validationErrors.join('\n'));
      setLoading(false);
      return;
    }

    try {
      // Check if email already exists
      const { data: existingUser, error: checkError } = await supabase
        .from('users')
        .select('email')
        .eq('email', formData.email)
        .single();

      if (existingUser) {
        setError('An account with this email already exists');
        setLoading(false);
        return;
      }

      // Perform registration
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            name: formData.name,
            role: formData.role,
            interests: formData.interests,
            registration_source: 'web_app',
            registration_date: new Date().toISOString()
          },
          emailRedirectTo: `${window.location.origin}/verify-email`
        }
      });

      if (error) throw error;

      // Log successful registration attempt
      await logRegistrationAttempt(formData.email, true);

      // Optional: Send welcome email or trigger onboarding
      await sendWelcomeEmail(formData.email, formData.name);

      // Trigger success callback
      onSuccess();
    } catch (err) {
      // Log failed registration attempt
      await logRegistrationAttempt(formData.email, false);
      
      setError(err instanceof Error ? err.message : 'Failed to register');
    } finally {
      setLoading(false);
    }
  };

  // Predefined interests for quick selection
  const interestOptions = [
    'Web Development', 
    'Data Science', 
    'Machine Learning', 
    'Mobile Development', 
    'Cybersecurity', 
    'Cloud Computing'
  ];

  return (
    <div className="flex justify-center items-center w-full">
      <form 
        onSubmit={handleSubmit} 
        className="w-full md:max-w-md lg:max-w-lg xl:max-w-2xl space-y-4 p-4"
      >
        {error && (
          <div className="p-3 bg-red-50 text-red-600 rounded-md text-sm">
            {error}
          </div>
        )}
        
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Create Your Account</h2>
          <p className="text-gray-600">Join HembaLearn and start learning</p>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
            {/* Password strength indicator */}
            <div className="mt-2 h-1 w-full bg-gray-200 rounded">
              <div 
                className={`h-1 rounded transition-all duration-300 ${
                  passwordStrength === 0 ? 'bg-red-500 w-[20%]' :
                  passwordStrength === 1 ? 'bg-red-500 w-[40%]' :
                  passwordStrength === 2 ? 'bg-yellow-500 w-[60%]' :
                  passwordStrength === 3 ? 'bg-green-500 w-[80%]' :
                  'bg-green-500 w-full'
                }`}
              ></div>
            </div>
            {/* Password Strength Meter */}
            {formData.password && (
              <div className="mt-1 h-1 w-full bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all duration-300 ease-in-out ${
                    passwordStrength <= 1 
                      ? 'bg-red-500 w-1/4' 
                      : passwordStrength <= 2 
                        ? 'bg-yellow-500 w-1/2' 
                        : passwordStrength <= 3 
                          ? 'bg-blue-500 w-3/4' 
                          : 'bg-green-500 w-full'
                  }`}
                ></div>
              </div>
            )}
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">
              Select Role
            </label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="student">Student</option>
              <option value="instructor">Instructor</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Interests
            </label>
            <div className="grid grid-cols-3 gap-2">
              {interestOptions.map((interest) => (
                <label key={interest} className="inline-flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.interests?.includes(interest)}
                    onChange={() => handleInterestToggle(interest)}
                    className="form-checkbox h-4 w-4 text-blue-600"
                  />
                  <span className="ml-2 text-sm text-gray-700">{interest}</span>
                </label>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed mt-4"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              'Create Account'
            )}
          </button>

          <div className="text-center mt-4">
            <button
              type="button"
              onClick={onSignInClick}
              className="text-sm text-blue-600 hover:text-blue-500"
            >
              Already have an account? Sign In
            </button>
          </div>
        </div>

        {renderSocialLogins && (
          <div className="mt-6">
            <div className="my-4 flex items-center">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="mx-4 text-gray-500 text-sm">or continue with</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>
            {renderSocialLogins()}
          </div>
        )}
      </form>
    </div>
  );
}

// Implement welcome email function
async function sendWelcomeEmail(email: string, name: string) {
  // This is a placeholder. In a real-world scenario, 
  // you would use a transactional email service like SendGrid, Mailgun, etc.
  try {
    // Simulate email sending
    console.log(`Sending welcome email to ${email}`);
    // Implement actual email sending logic here
  } catch (error) {
    console.error('Failed to send welcome email:', error);
  }
}
