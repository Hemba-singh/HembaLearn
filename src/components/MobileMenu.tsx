import { type FC } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { X, Bell, Home, Search, BookOpen, LogIn } from 'lucide-react';
import { Flex, Icon, Text } from '@chakra-ui/react';
import { FaUserCircle } from 'react-icons/fa';
import type { ExtendedUser } from '../store/useAuthStore';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  user: ExtendedUser | null;
  onSignOut: () => void;
  unreadNotifications?: number;
}

const MobileMenu: FC<MobileMenuProps> = ({ 
  isOpen, 
  onClose, 
  user, 
  onSignOut,
  unreadNotifications = 0 
}) => {
  const location = useLocation();
  if (!isOpen) return null;

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div className="fixed inset-0 bg-black/50 transition-opacity duration-300 ease-in-out" onClick={onClose} />
      <div className="fixed right-0 top-0 bottom-0 w-64 bg-white p-6 shadow-xl transform transition-transform duration-300 ease-in-out">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xl font-semibold">Menu</h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200">
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <nav className="space-y-4">
          <Link
            to="/"
            className={`block py-2 px-3 rounded-lg transition-all duration-200 ${
              isActive('/') 
                ? 'bg-blue-50 text-blue-600' 
                : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
            }`}
            onClick={onClose}
          >
            <Home className="w-5 h-5 mr-2" />
            Home
          </Link>
          <Link
            to="/explore"
            className={`block py-2 px-3 rounded-lg transition-all duration-200 ${
              isActive('/explore') 
                ? 'bg-blue-50 text-blue-600' 
                : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
            }`}
            onClick={onClose}
          >
            <BookOpen className="w-5 h-5 mr-2" />
            Explore
          </Link>
          <Link
            to="/search"
            className={`block py-2 px-3 rounded-lg transition-all duration-200 ${
              isActive('/search') 
                ? 'bg-blue-50 text-blue-600' 
                : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
            }`}
            onClick={onClose}
          >
            <Search className="w-5 h-5 mr-2" />
            Search
          </Link>
          <Link
            to="/courses"
            className={`block py-2 px-3 rounded-lg transition-all duration-200 ${
              isActive('/courses') 
                ? 'bg-blue-50 text-blue-600' 
                : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
            }`}
            onClick={onClose}
          >
            Courses
          </Link>
          <Link
            to="/blog"
            className={`block py-2 px-3 rounded-lg transition-all duration-200 ${
              isActive('/blog') 
                ? 'bg-blue-50 text-blue-600' 
                : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
            }`}
            onClick={onClose}
          >
            Blog
          </Link>
          
          {user ? (
            <>
              <Link
                to="/dashboard"
                className={`block py-2 px-3 rounded-lg transition-all duration-200 ${
                  isActive('/dashboard') 
                    ? 'bg-blue-50 text-blue-600' 
                    : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                }`}
                onClick={onClose}
              >
                Dashboard
              </Link>
              
              <Link
                to="/notifications"
                className={`flex items-center justify-between py-2 px-3 rounded-lg transition-all duration-200 ${
                  isActive('/notifications') 
                    ? 'bg-blue-50 text-blue-600' 
                    : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                }`}
                onClick={onClose}
              >
                <span className="flex items-center">
                  <Bell className="w-5 h-5 mr-2" />
                  Notifications
                </span>
                {unreadNotifications > 0 && (
                  <span className="bg-red-500 text-white text-xs font-medium px-2 py-1 rounded-full">
                    {unreadNotifications}
                  </span>
                )}
              </Link>

              <Link to="/profile" onClick={onClose}>
                <Flex alignItems="center" p={2} _hover={{ bg: 'gray.100' }}>
                  <Icon as={FaUserCircle} mr={3} />
                  <Text>Profile</Text>
                </Flex>
              </Link>

              <hr className="my-4 border-gray-200" />
              
              <button
                onClick={() => {
                  onSignOut();
                  onClose();
                }}
                className="w-full text-left py-2 px-3 text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
              >
                Sign Out
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="block py-2 px-3 text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
              onClick={onClose}
            >
              <LogIn className="w-5 h-5 mr-2" />
              Sign In
            </Link>
          )}
        </nav>
      </div>
    </div>
  );
};

export default MobileMenu;
