import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SlidingNotification from '../components/SlidingNotification';
import { AnimatePresence } from 'framer-motion';

interface Metric {
  metric: string;
  value: number;
  lower: number;
  upper: number;
  unit: string;
}

interface Notification {
  id: string;
  patient_name: string;
  metrics: Metric[];
  timestamp: string;
  read: boolean;
}

interface NotificationContextType {
  notifications: Notification[]; // Store real-time notifications
  triggerNotification: (notification: Notification) => void;
  markAsRead: (id: string) => void; 
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [tempNotification, setTempNotification] = useState<Notification | null>(null);
  const navigate = useNavigate(); // Use navigate to programmatically redirect

  const triggerNotification = (notification: Notification) => {
    // Update the notifications list
    setNotifications(() => [notification]);

    // Trigger sliding notification
    setTempNotification(notification);

    // Auto-clear sliding notification after 4 seconds
    setTimeout(() => setTempNotification(null), 4000);
  };

  const handleNotificationClick = () => {
    // Redirect to the notifications page
    navigate('/notifications');
  };

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  return (
    <NotificationContext.Provider value={{ notifications, triggerNotification, markAsRead }}>
      {children}
      {/* Sliding Notification */}
      <div className="absolute top-10 right-10 max-w-sm z-50">
        <AnimatePresence>
          {tempNotification && (
            <div onClick={handleNotificationClick} className="cursor-pointer">
              <SlidingNotification notification={tempNotification} />
            </div>
          )}
        </AnimatePresence>
      </div>
    </NotificationContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};
