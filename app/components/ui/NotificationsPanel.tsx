"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bell,
  Calendar,
  MapPin,
  Tag,
  X,
  MessageSquare,
  AlertCircle,
  Info,
  Trash2,
  Settings,
  CheckCircle,
  Clock
} from 'lucide-react';

interface Notification {
  id: string;
  type: 'booking' | 'deal' | 'system' | 'message';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  action?: {
    text: string;
    url: string;
  };
}

interface NotificationsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const NotificationsPanel = ({ isOpen, onClose }: NotificationsPanelProps) => {
  const [activeTab, setActiveTab] = useState<'all' | 'unread'>('all');
  const [notifications, setNotifications] = useState<Notification[]>([]);
  
  // Mock data - in a real app, this would come from an API
  useEffect(() => {
    const mockNotifications: Notification[] = [
      {
        id: '1',
        type: 'booking',
        title: 'Booking Confirmed',
        message: 'Your Santorini Sunset Cruise has been confirmed for July 18, 2023.',
        timestamp: '2023-07-12T10:30:00Z',
        read: false,
        action: {
          text: 'View booking',
          url: '/trip/1'
        }
      },
      {
        id: '2',
        type: 'deal',
        title: 'Flash Sale: Athens',
        message: 'Get 20% off on all activities in Athens for the next 24 hours!',
        timestamp: '2023-07-11T14:15:00Z',
        read: true,
        action: {
          text: 'View deals',
          url: '/explore/athens'
        }
      },
      {
        id: '3',
        type: 'system',
        title: 'Profile Updated',
        message: 'Your profile information has been successfully updated.',
        timestamp: '2023-07-10T09:45:00Z',
        read: true
      },
      {
        id: '4',
        type: 'message',
        title: 'New message from support',
        message: "We've received your inquiry about changing your booking dates and will respond shortly.",
        timestamp: '2023-07-09T16:20:00Z',
        read: false,
        action: {
          text: 'View message',
          url: '/messages'
        }
      },
      {
        id: '5',
        type: 'booking',
        title: 'Upcoming Trip Reminder',
        message: "Your trip to Santorini starts in 5 days. Don't forget to check your itinerary!",
        timestamp: '2023-07-08T11:00:00Z',
        read: true,
        action: {
          text: 'View trip',
          url: '/trip/1'
        }
      },
      {
        id: '6',
        type: 'deal',
        title: 'Weekend Getaway Deals',
        message: 'Check out our special offers for weekend trips to nearby destinations.',
        timestamp: '2023-07-07T15:30:00Z',
        read: true,
        action: {
          text: 'Browse deals',
          url: '/deals'
        }
      },
      {
        id: '7',
        type: 'system',
        title: 'Security Alert',
        message: 'We noticed a login from a new device. Was this you?',
        timestamp: '2023-07-06T20:15:00Z',
        read: true,
        action: {
          text: 'Manage devices',
          url: '/settings/security'
        }
      }
    ];
    
    setNotifications(mockNotifications);
  }, []);
  
  const getFilteredNotifications = () => {
    return notifications.filter(notification => 
      activeTab === 'all' || (activeTab === 'unread' && !notification.read)
    );
  };
  
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
  
  const clearAllNotifications = () => {
    setNotifications([]);
  };
  
  const getNotificationIcon = (type: string) => {
    switch(type) {
      case 'booking':
        return <Calendar className="h-5 w-5 text-blue-500" />;
      case 'deal':
        return <Tag className="h-5 w-5 text-green-500" />;
      case 'system':
        return <Info className="h-5 w-5 text-purple-500" />;
      case 'message':
        return <MessageSquare className="h-5 w-5 text-orange-500" />;
      default:
        return <Bell className="h-5 w-5 text-gray-500" />;
    }
  };
  
  const getTimeAgo = (timestamp: string) => {
    try {
      const now = new Date();
      const notificationTime = new Date(timestamp);
      
      // Check if dates are valid
      if (isNaN(now.getTime()) || isNaN(notificationTime.getTime())) {
        return 'recently';
      }
      
      const diffMs = now.getTime() - notificationTime.getTime();
      const diffMins = Math.floor(diffMs / 60000);
      const diffHours = Math.floor(diffMins / 60);
      const diffDays = Math.floor(diffHours / 24);
      
      if (diffMins < 60) {
        return `${diffMins} min${diffMins !== 1 ? 's' : ''} ago`;
      } else if (diffHours < 24) {
        return `${diffHours} hr${diffHours !== 1 ? 's' : ''} ago`;
      } else {
        return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
      }
    } catch (error) {
      console.error('Error calculating time difference:', error);
      return 'recently';
    }
  };
  
  const notificationCount = notifications.filter(n => !n.read).length;
  
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-40"
            onClick={onClose}
          />
          
          {/* Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed top-0 right-0 h-full w-full sm:w-96 bg-white shadow-lg z-50 overflow-hidden flex flex-col"
          >
            <div className="flex justify-between items-center p-4 border-b">
              <div className="flex items-center">
                <Bell className="h-5 w-5 text-gray-700 mr-2" />
                <h2 className="text-lg font-semibold text-gray-900">Notifications</h2>
                {notificationCount > 0 && (
                  <span className="ml-2 px-2 py-0.5 bg-red-100 text-red-800 text-xs font-medium rounded-full">
                    {notificationCount} new
                  </span>
                )}
              </div>
              <div className="flex">
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <X className="h-5 w-5 text-gray-500" />
                </button>
              </div>
            </div>
            
            <div className="flex border-b">
              <button 
                onClick={() => setActiveTab('all')}
                className={`flex-1 py-3 text-center font-medium ${
                  activeTab === 'all' 
                    ? 'text-[#ff5f1f] border-b-2 border-[#ff5f1f]' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                All
              </button>
              <button 
                onClick={() => setActiveTab('unread')}
                className={`flex-1 py-3 text-center font-medium ${
                  activeTab === 'unread' 
                    ? 'text-[#ff5f1f] border-b-2 border-[#ff5f1f]' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Unread
              </button>
            </div>
            
            <div className="flex justify-between items-center p-3 bg-gray-50 border-b">
              <button 
                onClick={markAllAsRead}
                className="text-sm text-blue-600 hover:text-blue-800 font-medium"
              >
                Mark all as read
              </button>
              <button 
                onClick={clearAllNotifications}
                className="text-sm text-gray-600 hover:text-gray-800 font-medium flex items-center"
              >
                <Trash2 className="h-4 w-4 mr-1" />
                Clear all
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto">
              {getFilteredNotifications().length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full p-6 text-center">
                  <div className="bg-gray-100 p-3 rounded-full">
                    <Bell className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="mt-4 text-gray-700 font-medium">No notifications</h3>
                  <p className="mt-1 text-gray-500 text-sm">
                    {activeTab === 'unread' 
                      ? 'You have no unread notifications' 
                      : 'You have no notifications yet'}
                  </p>
                </div>
              ) : (
                <ul className="divide-y divide-gray-100">
                  {getFilteredNotifications().map(notification => (
                    <li 
                      key={notification.id}
                      onClick={() => markAsRead(notification.id)}
                      className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors ${
                        !notification.read ? 'bg-blue-50' : ''
                      }`}
                    >
                      <div className="flex items-start">
                        <div className="mr-3 mt-0.5">
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start">
                            <p className={`text-sm font-medium ${!notification.read ? 'text-gray-900' : 'text-gray-700'}`}>
                              {notification.title}
                            </p>
                            <span className="text-xs text-gray-500 whitespace-nowrap ml-2">
                              {getTimeAgo(notification.timestamp)}
                            </span>
                          </div>
                          <p className="mt-1 text-sm text-gray-600 line-clamp-2">
                            {notification.message}
                          </p>
                          {notification.action && (
                            <a 
                              href={notification.action.url}
                              className="mt-2 inline-block text-sm font-medium text-[#ff5f1f] hover:text-[#e55214]"
                            >
                              {notification.action.text}
                            </a>
                          )}
                        </div>
                        {!notification.read && (
                          <div className="ml-2 mt-1 h-2 w-2 rounded-full bg-blue-500"></div>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            
            <div className="p-3 border-t bg-gray-50">
              <a 
                href="/settings/notifications"
                className="flex items-center justify-center text-sm text-gray-600 hover:text-gray-900 font-medium"
              >
                <Settings className="h-4 w-4 mr-1" />
                Notification settings
              </a>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default NotificationsPanel; 