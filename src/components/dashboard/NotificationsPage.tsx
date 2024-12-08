import React, { useState, useEffect } from 'react';
import { 
  Bell,
  MessageCircle,
  Award,
  Calendar,
  Gift,
  Clock,
  Check,
  Trash2,
  Filter,
  ChevronDown,
  X,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';

interface Notification {
  id: string;
  type: 'course' | 'announcement' | 'achievement' | 'reminder' | 'system';
  title: string;
  message: string;
  date: Date;
  read: boolean;
  priority?: 'low' | 'medium' | 'high';
  actionUrl?: string;
}

export function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [selectedType, setSelectedType] = useState<string>('all');
  const [showUnreadOnly, setShowUnreadOnly] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Mock data - Replace with actual API call
  useEffect(() => {
    const fetchNotifications = async () => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockNotifications: Notification[] = [
        {
          id: '1',
          type: 'course',
          title: 'New Course Content Available',
          message: 'The latest module "Advanced TypeScript Patterns" has been added to your React course.',
          date: new Date(2024, 11, 8, 10, 30),
          read: false,
          priority: 'medium',
          actionUrl: '/course/react-advanced'
        },
        {
          id: '2',
          type: 'achievement',
          title: ' Achievement Unlocked!',
          message: 'You\'ve completed 5 courses! Keep up the great work!',
          date: new Date(2024, 11, 7, 15, 45),
          read: true,
          priority: 'low',
          actionUrl: '/achievements'
        },
        {
          id: '3',
          type: 'announcement',
          title: ' Holiday Special Offer',
          message: 'Exclusive holiday discount: 50% off on all premium courses. Limited time offer!',
          date: new Date(2024, 11, 7, 9, 0),
          read: false,
          priority: 'high',
          actionUrl: '/offers'
        },
        {
          id: '4',
          type: 'reminder',
          title: ' Course Deadline Approaching',
          message: 'Only 2 days left to complete "UI/UX Fundamentals". Don\'t miss out!',
          date: new Date(2024, 11, 6, 12, 15),
          read: false,
          priority: 'high',
          actionUrl: '/course/uiux-basics'
        },
        {
          id: '5',
          type: 'system',
          title: ' Account Update Required',
          message: 'Please update your profile information to enhance your learning experience.',
          date: new Date(2024, 11, 5, 8, 0),
          read: true,
          priority: 'medium',
          actionUrl: '/settings/profile'
        }
      ];

      setNotifications(mockNotifications);
      setIsLoading(false);
    };

    fetchNotifications();
  }, []);

  const filterTypes = [
    { value: 'all', label: 'All Notifications', icon: Bell },
    { value: 'course', label: 'Course Updates', icon: MessageCircle },
    { value: 'achievement', label: 'Achievements', icon: Award },
    { value: 'announcement', label: 'Announcements', icon: Calendar },
    { value: 'reminder', label: 'Reminders', icon: Clock },
    { value: 'system', label: 'System', icon: AlertCircle }
  ];

  const filteredNotifications = notifications
    .filter(notification => 
      (selectedType === 'all' || notification.type === selectedType) &&
      (!showUnreadOnly || !notification.read)
    )
    .sort((a, b) => b.date.getTime() - a.date.getTime());

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev =>
      prev.filter(notification => notification.id !== id)
    );
  };

  const getPriorityColor = (priority: string = 'low') => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
            <p className="mt-1 text-sm text-gray-500">
              You have {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
            </p>
          </div>
          <div className="flex items-center gap-4">
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="flex items-center px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100"
              >
                <Check className="h-4 w-4 mr-2" />
                Mark all as read
              </button>
            )}
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          {filterTypes.map(type => (
            <button
              key={type.value}
              onClick={() => setSelectedType(type.value)}
              className={`
                flex items-center px-3 py-1.5 rounded-full text-sm font-medium
                ${selectedType === type.value
                  ? 'bg-blue-100 text-blue-700'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}
              `}
            >
              <type.icon className="h-4 w-4 mr-2" />
              {type.label}
            </button>
          ))}
          <label className="flex items-center ml-2 text-sm text-gray-700">
            <input
              type="checkbox"
              checked={showUnreadOnly}
              onChange={(e) => setShowUnreadOnly(e.target.checked)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 mr-2"
            />
            Unread only
          </label>
        </div>
      </div>

      <div className="space-y-4">
        {filteredNotifications.map(notification => (
          <div
            key={notification.id}
            className={`
              relative bg-white rounded-lg border p-4 transition-all duration-200
              ${notification.read ? 'border-gray-200' : 'border-blue-200 bg-blue-50'}
              hover:shadow-md
            `}
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <span className={`inline-flex p-2 rounded-full ${getPriorityColor(notification.priority)}`}>
                  {notification.type === 'course' && <MessageCircle className="h-5 w-5" />}
                  {notification.type === 'achievement' && <Award className="h-5 w-5" />}
                  {notification.type === 'announcement' && <Calendar className="h-5 w-5" />}
                  {notification.type === 'reminder' && <Clock className="h-5 w-5" />}
                  {notification.type === 'system' && <AlertCircle className="h-5 w-5" />}
                </span>
              </div>
              <div className="flex-grow min-w-0">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-base font-semibold text-gray-900">
                      {notification.title}
                    </h3>
                    <p className="mt-1 text-sm text-gray-600">
                      {notification.message}
                    </p>
                  </div>
                  <div className="flex-shrink-0 flex items-center gap-2">
                    <time className="text-xs text-gray-500">
                      {format(notification.date, 'MMM d, h:mm a')}
                    </time>
                  </div>
                </div>
                <div className="mt-2 flex items-center gap-4">
                  {notification.actionUrl && (
                    <Link
                      to={notification.actionUrl}
                      className="text-sm font-medium text-blue-600 hover:text-blue-700"
                    >
                      View Details
                    </Link>
                  )}
                  {!notification.read && (
                    <button
                      onClick={() => markAsRead(notification.id)}
                      className="text-sm text-gray-500 hover:text-gray-700"
                    >
                      Mark as read
                    </button>
                  )}
                  <button
                    onClick={() => deleteNotification(notification.id)}
                    className="text-sm text-red-600 hover:text-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {filteredNotifications.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
            <Bell className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No notifications</h3>
            <p className="mt-1 text-sm text-gray-500">
              {showUnreadOnly
                ? 'No unread notifications to show'
                : 'You\'re all caught up!'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
