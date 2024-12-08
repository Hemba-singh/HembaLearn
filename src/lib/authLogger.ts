import { supabase } from './supabase';

interface LoginAttemptLog {
  email: string;
  timestamp: string;
  success: boolean;
  ip_address?: string;
}

interface RegistrationAttemptLog {
  email: string;
  timestamp: string;
  success: boolean;
  role?: string;
  registration_source: string;
  ip_address?: string;
}

export async function logLoginAttempt(email: string, success: boolean): Promise<void> {
  try {
    // Get client IP address (this might require a server-side implementation for accuracy)
    const ipResponse = await fetch('https://api.ipify.org?format=json');
    const { ip } = await ipResponse.json();

    const loginLog: LoginAttemptLog = {
      email,
      timestamp: new Date().toISOString(),
      success,
      ip_address: ip
    };

    // Insert log into Supabase
    const { error } = await supabase
      .from('login_attempts')
      .insert(loginLog);

    if (error) {
      console.error('Failed to log login attempt:', error);
    }
  } catch (error) {
    console.error('Error logging login attempt:', error);
  }
}

export async function logRegistrationAttempt(
  email: string, 
  success: boolean, 
  role?: 'student' | 'instructor' | 'admin'
): Promise<void> {
  try {
    // Get client IP address (this might require a server-side implementation for accuracy)
    const ipResponse = await fetch('https://api.ipify.org?format=json');
    const { ip } = await ipResponse.json();

    const registrationLog: RegistrationAttemptLog = {
      email,
      timestamp: new Date().toISOString(),
      success,
      role,
      registration_source: 'web_app',
      ip_address: ip
    };

    // Insert log into Supabase
    const { error } = await supabase
      .from('registration_attempts')
      .insert(registrationLog);

    if (error) {
      console.error('Failed to log registration attempt:', error);
    }
  } catch (error) {
    console.error('Error logging registration attempt:', error);
  }
}

export async function sendPasswordResetEmail(email: string): Promise<{ success: boolean, message: string }> {
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`
    });

    if (error) {
      throw error;
    }

    return {
      success: true,
      message: 'Password reset email sent successfully'
    };
  } catch (error) {
    console.error('Password reset error:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to send password reset email'
    };
  }
}

export async function updateUserPassword(newPassword: string): Promise<{ success: boolean, message: string }> {
  try {
    const { error } = await supabase.auth.updateUser({ password: newPassword });

    if (error) {
      throw error;
    }

    return {
      success: true,
      message: 'Password updated successfully'
    };
  } catch (error) {
    console.error('Password update error:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to update password'
    };
  }
}
