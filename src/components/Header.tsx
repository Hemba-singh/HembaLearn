import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Menu, 
  Bell, 
  UserIcon, 
  LogOut 
} from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import { AuthModal } from './auth/AuthModal';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  
  const { user, signOut } = useAuthStore();
  const navigate = useNavigate();

  return (
    <>
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Left section */}
            <div className="flex items-center gap-8">
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 md:hidden"
              >
                <Menu className="h-6 w-6" />
              </button>
              <Link to="/" className="flex items-center gap-2">
              <img src="/public/images/MYlogo.png" alt="HembaLearn Logo" className="h-8 w-8" />
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-800 to-blue-400 bg-clip-text text-transparent">
                  Hemba<span className="text-sky-600">Learn</span>
                </span>
              </Link>
              <nav className="hidden md:flex items-center gap-6">
                <Link to="/courses" className="text-gray-600 hover:text-blue-600 transition-colors">
                  Courses
                </Link>
                <Link to="/contact" className="text-gray-600 hover:text-blue-600 transition-colors">
                  Contact
                </Link>
                <Link to="/careers" className="text-gray-600 hover:text-blue-600 transition-colors">
                  Careers
                </Link>
                <Link to="/blog" className="text-gray-600 hover:text-blue-600 transition-colors">
                  Blog
                </Link>
              </nav>
            </div>

          
            {/* Right section */}
            <div className="flex items-center gap-4">
              {user ? (
                <>
                  <Link
                    to="/notifications"
                    className="p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100 rounded-full transition-colors relative"
                  >
                    <Bell className="h-6 w-6" />
                    <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
                  </Link>
                  <div className="relative">
                    <button
                      onClick={() => setIsProfileOpen(!isProfileOpen)}
                      className="flex items-center gap-2 focus:outline-none group"
                    >
                      <div className="h-9 w-9 rounded-full bg-gradient-to-r from-blue-600 to-blue-800 flex items-center justify-center text-white transition-transform group-hover:scale-105">
                        <UserIcon className="h-5 w-5" />
                      </div>
                    </button>
                    {isProfileOpen && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="absolute right-0 mt-2 w-48 rounded-lg shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100"
                      >
                        <div className="px-4 py-3">
                          <p className="text-sm">Signed in as</p>
                          <p className="text-sm font-medium text-gray-900 truncate">{user.email}</p>
                        </div>
                        <div className="py-1">
                          <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                            Profile
                          </Link>
                          <Link to="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                            Settings
                          </Link>
                        </div>
                        <div className="py-1">
                          <button
                            onClick={() => {
                              signOut();
                              setIsProfileOpen(false);
                            }}
                            className="flex w-full items-center px-4 py-2 text-sm text-red-700 hover:bg-red-50"
                          >
                            <LogOut className="h-4 w-4 mr-2" />
                            Sign out
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </>
              ) : (
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setIsAuthModalOpen(true)}
                    className="text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    Sign in
                  </button>
                  <button
                    onClick={() => setIsAuthModalOpen(true)}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all hover:shadow-md"
                  >
                    Get Started
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Auth Modal */}
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
      />
    </>
  );
}