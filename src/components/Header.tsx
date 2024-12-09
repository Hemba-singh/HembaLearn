import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, 
  Bell, 
  UserIcon, 
  LogOut,
  X,
  Home,
  Book,
  MessageCircle,
  Briefcase,
  Newspaper,
  Settings,
  UserCircle2
} from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import { AuthModal } from './auth/AuthModal';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  
  const { user, signOut } = useAuthStore();
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut();
    navigate('/'); // Navigate to home page after signing out
    setIsProfileOpen(false);
    setIsMobileMenuOpen(false);
  };

  const mobileMenuVariants = {
    hidden: { 
      opacity: 0,
      x: '100%'
    },
    visible: { 
      opacity: 1,
      x: 0,
      transition: {
        type: 'spring',
        damping: 15,
        stiffness: 200
      }
    },
    exit: { 
      opacity: 0,
      x: '100%',
      transition: {
        type: 'tween',
        duration: 0.2
      }
    }
  };

  const mobileNavItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Book, label: 'Courses', path: '/courses' },
    { icon: MessageCircle, label: 'Contact', path: '/contact' },
    { icon: Newspaper, label: 'Blog', path: '/blog' },
    { icon: Briefcase, label: 'Careers', path: '/careers' }
  ];

  return (
    <>
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex justify-between items-center h-16 md:h-20">
            {/* Left section - Adjusted for better mobile alignment */}
            <div className="flex items-center gap-4 md:gap-8 w-full">
              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="md:hidden flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              >
                <Menu className="h-6 w-6" />
              </button>

              {/* Logo - Left-aligned on mobile */}
              <Link 
                to="/" 
                className="flex items-center gap-2"
              >
                <img 
                  src="/images/MYlogo.png" 
                  alt="HembaLearn Logo" 
                  className="h-7 w-7 md:h-8 md:w-8" 
                />
                <span className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-800 to-blue-400 bg-clip-text text-transparent">
                  Hemba<span className="text-sky-600">Learn</span>
                </span>
              </Link>

              {/* left section for desktop Navigation and user actions */}

              <nav className="hidden md:flex items-center space-x-4">
                <Link to="/courses" className="text-gray-700 hover:text-gray-900">
                  Courses
                </Link>
                <Link to="/careers" className="text-gray-700 hover:text-gray-900">
                  Careers
                </Link>
                <Link to="/contact" className="text-gray-700 hover:text-gray-900">
                  Contact
                </Link>
                <Link to="/blog" className="text-gray-700 hover:text-gray-900">
                  Blog
                </Link>
              </nav>


              {/* Right section for desktop navigation and user actions */}
              <div className="hidden md:flex ml-auto items-center space-x-4">
                {!user ? (
                  <button
                    onClick={() => setIsAuthModalOpen(true)}
                    className="inline-flex items-center px-4 py-2 text-sm border border-transparent font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all hover:shadow-md"
                  >
                    Sign In
                  </button>
                ) : (
                  <div className="flex items-center space-x-6">
                    {/* Notification Button */}
                    <div className="relative group">
                      <button 
                        onClick={() => navigate('/notifications')}
                        className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 relative"
                      >
                        <Bell className="w-6 h-6 text-gray-600" />
                        {/* Notification Badge */}
                        <span className="absolute top-0 right-0 block h-2 w-2 bg-red-500 rounded-full"></span>
                      </button>
                      {/* Hover Dropdown */}
                      <div className="hidden group-hover:block absolute right-0 top-full mt-2 w-80 bg-white shadow-lg rounded-lg border border-gray-200 z-50">
                        <div className="p-4 border-b border-gray-100">
                          <p className="text-sm font-semibold text-gray-800">Notifications</p>
                        </div>
                        <div className="py-1 max-h-64 overflow-y-auto">
                          {/* Placeholder for notifications */}
                          <div className="px-4 py-2 text-sm text-gray-500 hover:bg-gray-100">
                            No new notifications
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Existing Profile Button */}
                    <div className="relative">
                      <button 
                        onClick={() => setIsProfileOpen(!isProfileOpen)}
                        className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 hover:bg-blue-200 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <UserCircle2 className="w-7 h-7 text-blue-600" />
                      </button>
                      {isProfileOpen && (
                        <div className="absolute right-0 top-full mt-2 w-64 bg-white shadow-lg rounded-lg border border-gray-200 z-50">
                          <div className="p-4 border-b border-gray-100">
                            <p className="text-sm font-semibold text-gray-800">{user.displayName || 'User'}</p>
                            <p className="text-xs text-gray-500 truncate">{user.email}</p>
                          </div>
                          <div className="py-1">
                            <Link 
                              to="/profile" 
                              onClick={() => setIsProfileOpen(false)}
                              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                            >
                              <UserIcon className="w-4 h-4 mr-2" /> Profile
                            </Link>
                            <Link 
                              to="/settings" 
                              onClick={() => setIsProfileOpen(false)}
                              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                            >
                              <Settings className="w-4 h-4 mr-2" /> Settings
                            </Link>
                            <button 
                              onClick={handleSignOut}
                              className="w-full text-left flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                            >
                              <LogOut className="w-4 h-4 mr-2" /> Sign Out
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Right section for mobile - User Profile */}
              {user && (
                <div className="ml-auto md:hidden flex items-center space-x-2">
                  {/* Notification Button for Mobile */}
                  <button 
                    onClick={() => navigate('/notifications')}
                    className="md:hidden inline-flex items-center justify-center px-2 py-2 rounded-full w-10 h-10 rounded-full hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 relative"
                  >
                    <Bell className="w-6 h-6 text-gray-600" />
                    {/* Notification Badge */}
                    <span className="absolute top-0 right-0 block h-2 w-2 bg-red-500 rounded-full"></span>
                  </button>

                  {/* Existing Profile Button for Mobile */}
                  <button 
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="md:hidden inline-flex items-center justify-center px-2 py-2 rounded-full w-10 h-10 rounded-full bg-blue-100 hover:bg-blue-200 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <UserCircle2 className="w-7 h-7 text-blue-800" />
                  </button>
                  {isProfileOpen && (
                        <div className="absolute right-0 top-full mt-2 w-64 bg-white shadow-lg rounded-lg border border-gray-200 z-50">
                          <div className="p-4 border-b border-gray-100">
                            <p className="text-sm font-semibold text-gray-800">{user.displayName || 'User'}</p>
                            <p className="text-xs text-gray-500 truncate">{user.email}</p>
                          </div>
                          <div className="py-1">
                            <Link 
                              to="/profile" 
                              onClick={() => setIsProfileOpen(false)}
                              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                            >
                              <UserIcon className="w-4 h-4 mr-2" /> Profile
                            </Link>
                            <Link 
                              to="/settings" 
                              onClick={() => setIsProfileOpen(false)}
                              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                            >
                              <Settings className="w-4 h-4 mr-2" /> Settings
                            </Link>
                            <button 
                              onClick={handleSignOut}
                              className="w-full text-left flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                            >
                              <LogOut className="w-4 h-4 mr-2" /> Sign Out
                            </button>
                          </div>
                        </div>
                      )}
                </div>
              )}
              {!user && (
                <div className="ml-auto md:hidden">
                  <button
                    onClick={() => setIsAuthModalOpen(true)}
                    className="md:hidden inline-flex items-center px-3 py-2 text-xs border border-transparent font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all hover:shadow-md"
                  >
                    Sign In
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Full-Screen Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={mobileMenuVariants}
            className="fixed inset-0 z-[100] bg-white/95 backdrop-blur-md overflow-hidden"
          >
            <div className="flex flex-col h-full">
              {/* Mobile Menu Header */}
              <div className="flex justify-between items-center p-4 border-b border-gray-100 bg-white shadow-sm">
                {/* Logo on Left */}
                <Link 
                  to="/" 
                  className="flex items-center gap-2" 
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <img 
                    src="/images/MYlogo.png" 
                    alt="HembaLearn Logo" 
                    className="h-8 w-8 rounded-full" 
                  />
                  <span className="text-2xl font-bold bg-gradient-to-r from-blue-800 to-blue-400 bg-clip-text text-transparent">
                    Hemba<span className="text-sky-600">Learn</span>
                  </span>
                </Link>

                {/* Close Button on Right */}
                <button 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-gray-600 hover:text-gray-900 transition-colors p-2 rounded-full hover:bg-gray-100"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              {/* Mobile Menu Content */}
              <div className="flex-grow overflow-y-auto">
                <div className="px-4 py-6 space-y-2">
                  {mobileNavItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center gap-4 px-4 py-3 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                    >
                      <item.icon className="h-6 w-6" />
                      <span className="text-lg font-medium">{item.label}</span>
                    </Link>
                  ))}
                </div>

                {/* User Section for Mobile */}
                {user ? (
                  <div className="border-t border-gray-200 px-4 py-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="h-12 w-12 rounded-full bg-gradient-to-r from-blue-600 to-blue-800 flex items-center justify-center text-white">
                        <UserCircle2 className="h-8 w-8" />
                      </div>
                      <div>
                        <p className="text-lg font-semibold text-gray-900">{user.displayName || 'User'}</p>
                        <p className="text-sm text-gray-500 truncate max-w-[200px]">{user.email}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <Link 
                        to="/profile" 
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex flex-col items-center p-3 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <UserIcon className="h-6 w-6 mb-1 text-gray-600" />
                        <span className="text-xs">Profile</span>
                      </Link>
                      <Link 
                        to="/settings" 
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex flex-col items-center p-3 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <Settings className="h-6 w-6 mb-1 text-gray-600" />
                        <span className="text-xs">Settings</span>
                      </Link>
                      <button 
                        onClick={handleSignOut}
                        className="flex flex-col items-center p-3 rounded-lg hover:bg-red-50 transition-colors"
                      >
                        <LogOut className="h-6 w-6 mb-1 text-red-600" />
                        <span className="text-xs text-red-600">Sign Out</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="border-t border-gray-200 px-4 py-6 space-y-4">
                    <button
                      onClick={() => {
                        setIsAuthModalOpen(true);
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-md"
                    >
                      Sign In / Get Started
                    </button>
                  </div>
                )}
              </div>

              {/* Mobile Menu Close Button */}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Auth Modal */}
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
      />
    </>
  );
}