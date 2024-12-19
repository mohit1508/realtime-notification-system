import { useState, useEffect } from 'react';
import axiosInstance from '../services/axiosInstance';

interface Metric {
    metric: string; // Name of the metric (e.g., Heart Rate)
    lower_limit: number; // Lower threshold
    upper_limit: number; // Upper threshold
    unit: string; // Unit mesaure
  }

const EditThresholdPage = () => {
    const [metrics, setMetrics] = useState<Metric[]>([]);

  useEffect(() => {
    // Fetch metrics data
    axiosInstance.get('/api/thresholds').then((res) => setMetrics(res.data));
  }, []);

  const handleUpdate = async (metric: string, lower: number, upper: number, unit: string) => {
    await axiosInstance.put('/api/thresholds/update', {
      metric,
      lower_limit: lower,
      upper_limit: upper,
      unit,
    });
    alert(`Threshold updated for ${metric}`);
  };

  return (
    <div className="p-6 rounded-xl">
      <h1 className="text-3xl font-bold mb-4 ">Edit Thresholds</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {metrics.map((m: Metric, index: number) => (
          <div key={`${m.metric}-${index}`} className="p-4 border rounded-xl shadow bg-[#f7eef4]">
            <h2 className="text-xl font-medium text-[#4e253a]">{m.metric}</h2>
            <div className='grid grid-cols-2 gap-16'>
              <div className="mt-2">
                <label className="block px-2 text-lg">Lower Limit:</label>
                <div className='flex items-center gap-2'>
                  <input
                    type="number"
                    className="border px-3 py-2 w-full rounded-lg text-lg"
                    defaultValue={m.lower_limit}
                    onChange={(e) => (m.lower_limit = parseInt(e.target.value))}
                  /> <span className='text-lg'>{m.unit}</span>
                </div>
              </div>
              <div className="mt-2">
                <label className="block px-2 text-lg">Upper Limit:</label>
                <div className='flex items-center gap-2'>
                <input
                  type="number"
                  className="border px-3 py-2 w-full rounded-lg text-lg"
                  defaultValue={m.upper_limit}
                  onChange={(e) => (m.upper_limit = parseInt(e.target.value))}
                /> <span className='text-lg'>{m.unit}</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => handleUpdate(m.metric, m.lower_limit, m.upper_limit, m.unit)}
              className="mt-4 bg-[#4e253a] text-white py-2 px-4 rounded-lg text-lg"
            >
              Update
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EditThresholdPage;
