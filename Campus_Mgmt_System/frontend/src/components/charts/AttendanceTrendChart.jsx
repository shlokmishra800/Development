import React from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';

const data = [
  { month: 'Jan', attendance: 78 },
  { month: 'Feb', attendance: 82 },
  { month: 'Mar', attendance: 85 },
  { month: 'Apr', attendance: 88 },
  { month: 'May', attendance: 87 },
];

const AttendanceTrendChart = () => {
  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 10, right: 20, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
          <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} />
          <YAxis domain={[50, 100]} stroke="#94a3b8" fontSize={12} unit="%" />
          <Tooltip
            contentStyle={{ backgroundColor: '#1e293b', borderColor: '#475569', borderRadius: '12px', color: '#fff' }}
            formatter={(value) => [`${value}%`, 'Attendance']}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="attendance"
            name="Overall Attendance (%)"
            stroke="#00b4d8"
            strokeWidth={3}
            dot={{ r: 5, fill: '#00b4d8' }}
            activeDot={{ r: 8, fill: '#6c5ce7' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AttendanceTrendChart;
