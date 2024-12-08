import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bell,
  Calendar,
  ArrowLeft,
  CheckCircle,
  AlertCircle,
  Info,
  Star,
  Clock,
  Filter,
  X
} from 'lucide-react';
import { format } from 'date-fns';
import Header from '../components/Header';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'warning' | 'info';
  timestamp: Date;
  read: boolean;
  priority: 'high' | 'medium' | 'low';
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'Course Completion',
    message: 'Congratulations! You have completed the React Fundamentals course.',
    type: 'success',
    timestamp: new Date('2024-12-08T10:00:00'),
    read: false,
    priority: 'high'
  },
  {
    id: '2',
    title: 'New Course Available',
    message: 'A new course "Advanced TypeScript" is now available.',
    type: 'info',
    timestamp: new Date('2024-12-07T15:30:00'),
    read: true,
    priority: 'medium'
  },
  {
    id: '3',
    title: 'Assignment Due',
    message: 'Your JavaScript assignment is due in 2 days.',
    type: 'warning',
    timestamp: new Date('2024-12-06T09:15:00'),
    read: false,
    priority: 'high'
  }
];

function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all');
  const [priorityFilter, setPriorityFilter] = useState<'all' | 'high' | 'medium' | 'low'>('all');

  const groupNotificationsByDate = (notifications: Notification[]) => {
    return notifications.reduce((groups: { [key: string]: Notification[] }, notification) => {
      const date = format(notification.timestamp, 'yyyy-MM-dd');
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(notification);
      return groups;
    }, {});
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const filteredNotifications = notifications
    .filter(n => {
      if (filter === 'unread') return !n.read;
      if (filter === 'read') return n.read;
      return true;
    })
    .filter(n => {
      if (priorityFilter === 'all') return true;
      return n.priority === priorityFilter;
    });

  const groupedNotifications = groupNotificationsByDate(filteredNotifications);

  return (
    <>
      <Header />
      <div className="w-full">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <Link 
                to="/" 
                className="flex items-center text-gray-600 hover:text-blue-600 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back
              </Link>
              <div className="flex items-center">
                <Bell className="w-6 h-6 text-blue-600 mr-2" />
                <h1 className="text-2xl font-bold">Notifications</h1>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setNotifications([])}
                className="text-gray-600 hover:text-red-600 transition-colors text-sm"
              >
                Clear All
              </button>
              <span className="text-sm text-gray-500">
                {filteredNotifications.length} notification{filteredNotifications.length !== 1 ? 's' : ''}
              </span>
            </div>
          </div>

          {/* Filter Controls */}
          <div className="mb-6 flex flex-wrap gap-4">
            <select 
              className="px-4 py-2 rounded-lg border border-gray-200"
              value={filter}
              onChange={(e) => setFilter(e.target.value as typeof filter)}
            >
              <option value="all">All Notifications</option>
              <option value="unread">Unread</option>
              <option value="read">Read</option>
            </select>

            <select 
              className="px-4 py-2 rounded-lg border border-gray-200"
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value as typeof priorityFilter)}
            >
              <option value="all">All Priorities</option>
              <option value="high">High Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="low">Low Priority</option>
            </select>
          </div>

          {/* Notifications List */}
          <AnimatePresence>
            {Object.entries(groupedNotifications).length > 0 ? (
              <div className="space-y-8">
                {Object.entries(groupedNotifications).map(([date, notifications]) => (
                  <div key={date} className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-700">
                      {format(new Date(date), 'MMMM d, yyyy')}
                    </h3>
                    <div className="space-y-4">
                      {notifications.map((notification) => (
                        <motion.div
                          key={notification.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          className={`p-4 rounded-lg shadow-sm border ${
                            notification.read ? 'bg-white' : 'bg-blue-50'
                          } ${
                            notification.priority === 'high' ? 'border-red-200' :
                            notification.priority === 'medium' ? 'border-yellow-200' :
                            'border-gray-200'
                          }`}
                        >
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <h4 className="text-lg font-medium mb-1">{notification.title}</h4>
                              <p className="text-gray-600">{notification.message}</p>
                              <div className="mt-2 flex items-center gap-4 text-sm text-gray-500">
                                <span className="flex items-center gap-1">
                                  <Clock className="w-4 h-4" />
                                  {format(notification.timestamp, 'h:mm a')}
                                </span>
                                {notification.priority !== 'low' && (
                                  <span className={`flex items-center gap-1 ${
                                    notification.priority === 'high' ? 'text-red-500' : 'text-yellow-500'
                                  }`}>
                                    <AlertCircle className="w-4 h-4" />
                                    {notification.priority} priority
                                  </span>
                                )}
                              </div>
                            </div>
                            <div className="flex gap-2">
                              {!notification.read && (
                                <button
                                  onClick={() => markAsRead(notification.id)}
                                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-full"
                                  title="Mark as read"
                                >
                                  <CheckCircle className="w-5 h-5" />
                                </button>
                              )}
                              <button
                                onClick={() => deleteNotification(notification.id)}
                                className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full"
                                title="Delete notification"
                              >
                                <X className="w-5 h-5" />
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12 bg-white rounded-lg"
              >
                <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No notifications</h3>
                <p className="text-gray-500">You're all caught up!</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}

export default NotificationsPage;
