import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { NotificationProvider } from './context/NotificationContext';
import { WebSocketProvider } from './context/WebSocketContext';
import MainLayout from './layouts/MainLayout';
import EditThresholdPage from './pages/EditThresholdPage';
import NotificationsPage from './pages/NotificationsPage';

const App = () => {
  return (
    <Router>
      <NotificationProvider>
        <WebSocketProvider>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<EditThresholdPage />} />
              <Route path="/notifications" element={<NotificationsPage />} />
            </Route>
          </Routes>
        </WebSocketProvider>
      </NotificationProvider>
    </Router>
  );
};

export default App;

