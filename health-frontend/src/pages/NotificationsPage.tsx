import { useState, useEffect } from 'react';
import axiosInstance from '../services/axiosInstance';
import { useNotification } from '../context/NotificationContext';

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

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);
  const { notifications: realTimeNotifications } = useNotification();

  // Fetch notifications from the backend
  const fetchNotifications = async () => {
    try {
      const response = await axiosInstance.get('/api/notifications');
      setNotifications(response.data);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  const markAsRead = async (id: string) => {
    try {
      await axiosInstance.put(`/api/notifications/${id}/read`);
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, read: true } : n))
      );
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  // Merge real-time notifications with fetched notifications
  useEffect(() => {
    if (realTimeNotifications.length > 0) {
      setNotifications((prev) => [...realTimeNotifications, ...prev]);
    }
  }, [realTimeNotifications]);

  return (
    <div className="relative h-screen flex flex-col bg-gray-50">
      <div className="flex flex-1 overflow-hidden">
        <div className="w-1/3 bg-white border-r p-4 overflow-y-auto">
          <h1 className="text-3xl font-bold mb-4 text-gray-800">Notifications</h1>
          <div className="space-y-4">
            {notifications.map((n) => (
              <div
                key={n.id}
                className={`p-4 border border-gray-200 rounded-lg shadow-md cursor-pointer ${
                  n.read ? 'bg-gray-100' : 'bg-white font-bold'
                } hover:bg-[#f7eef4] transition`}
                onClick={() => {
                  setSelectedNotification(n);
                  if (!n.read) {
                    markAsRead(n.id); // Mark as read when clicked
                  }
                }}
              >
                <p className="text-xl font-medium text-[#4e253a]">{n.patient_name}</p>
                <ul className="text-sm text-gray-600 capitalize">
                  {n.metrics.map((metric, i) => (
                    <li key={i}>
                      {metric.metric}: {metric.value} (Threshold: {metric.lower} - {metric.upper} {metric.unit})
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="flex-1 bg-white p-6 overflow-y-auto">
          {selectedNotification ? (
            <div className="p-6 bg-[#f7eef4] border border-gray-200 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold text-[#4e253a] mb-4">Notification Details</h2>
              <p className="text-gray-800 mb-2 text-2xl">
                <span className="font-semibold">Patient:</span> {selectedNotification.patient_name}
              </p>
              <ul className="text-gray-800 mb-2">
                {selectedNotification.metrics.map((metric, i) => (
                  <li key={i}>
                    <span className="font-semibold text-lg capitalize">{metric.metric}:</span> <span className="text-lg">{metric.value} {metric.unit} (Threshold: {metric.lower} - {metric.upper} {metric.unit})</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="text-gray-600">Select a notification to view details.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationsPage;
