import { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { 
  Layout, 
  BookOpen, 
  Clock, 
  Award, 
  Settings, 
  Heart,
  Bell,
  User,
  ChevronRight
} from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';

const navigationItems = [
  { name: 'Overview', href: '/dashboard', icon: Layout },
  { name: 'My Courses', href: '/dashboard/courses', icon: BookOpen },
  { name: 'In Progress', href: '/dashboard/progress', icon: Clock },
  { name: 'Certificates', href: '/dashboard/certificates', icon: Award },
  { name: 'Wishlist', href: '/dashboard/wishlist', icon: Heart },
  { name: 'Notifications', href: '/dashboard/notifications', icon: Bell },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
];

export function DashboardLayout() {
  const location = useLocation();
  const { user } = useAuthStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-20 left-4 z-50">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 rounded-lg bg-white shadow-md hover:bg-gray-50"
        >
          <ChevronRight className={`h-6 w-6 transform transition-transform ${isMobileMenuOpen ? 'rotate-180' : ''}`} />
        </button>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`
          fixed top-16 bottom-0 lg:left-0 w-64 bg-white border-r border-gray-200
          transform transition-transform duration-200 ease-in-out
          ${isMobileMenuOpen ? 'left-0' : '-left-64'}
          lg:transform-none lg:translate-x-0
        `}>
          <div className="h-full flex flex-col">
            {/* User Profile Summary */}
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                {user?.avatar ? (
                  <img src={user.avatar} alt={user.name} className="h-10 w-10 rounded-full" />
                ) : (
                  <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <User className="h-6 w-6 text-blue-600" />
                  </div>
                )}
                <div>
                  <h2 className="font-semibold text-gray-900">{user?.name || 'User'}</h2>
                  <p className="text-sm text-gray-500">{user?.email}</p>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto p-4">
              <ul className="space-y-1">
                {navigationItems.map((item) => {
                  const isActive = location.pathname === item.href;
                  return (
                    <li key={item.name}>
                      <Link
                        to={item.href}
                        className={`
                          flex items-center px-3 py-2 rounded-lg text-sm font-medium
                          transition-colors duration-200
                          ${isActive 
                            ? 'bg-blue-50 text-blue-700' 
                            : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'}
                        `}
                      >
                        <item.icon className={`h-5 w-5 mr-3 ${isActive ? 'text-blue-700' : 'text-gray-400'}`} />
                        {item.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* Progress Summary */}
            <div className="p-4 border-t border-gray-200">
              <div className="bg-blue-50 rounded-lg p-3">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-blue-700">Course Progress</span>
                  <span className="text-sm text-blue-700">75%</span>
                </div>
                <div className="h-2 bg-blue-100 rounded-full">
                  <div className="h-2 bg-blue-600 rounded-full w-3/4" />
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className={`
          flex-1 py-6 px-4 sm:px-6 lg:px-8
          transition-all duration-200 ease-in-out
          ${isMobileMenuOpen ? 'lg:ml-64' : 'ml-0 lg:ml-64'}
        `}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
