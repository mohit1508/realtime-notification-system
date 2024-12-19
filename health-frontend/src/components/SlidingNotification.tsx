import React from 'react';
import { motion } from 'framer-motion';

interface Metric {
  metric: string;
  value: number;
  lower: number;
  upper: number;
  unit: string;
}

interface SlidingNotificationProps {
  notification: {
    patient_name: string;
    metrics: Metric[];
  };
}

const SlidingNotification: React.FC<SlidingNotificationProps> = ({ notification }) => {
  return (
    <motion.div
      initial={{ x: '100%', opacity: 0 }}
      animate={{ x: '0%', opacity: 1 }}
      exit={{ x: '100%', opacity: 0 }}
      transition={{ x: { type: 'spring', stiffness: 300, damping: 30 }, opacity: { duration: 0.5 } }}
      className="bg-[#4e253a] border-2 border-[#4e253a] text-white rounded-lg shadow-lg fixed right-6 top-20 max-w-md z-50"
    >
      <h3 className="font-bold text-lg px-4 py-2">Alert for {notification.patient_name}</h3>
      <ul className="p-4 bg-white rounded-lg text-[#4e253a]">
        {notification.metrics.map((m, index) => (
          <li key={index} className="mb-1">
            <span className="font-semibold capitalize">{m.metric}:</span> {m.value} (Threshold: {m.lower} -{' '}
            {m.upper} {m.unit})
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

export default SlidingNotification;
