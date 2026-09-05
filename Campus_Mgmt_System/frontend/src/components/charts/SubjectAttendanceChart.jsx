import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell
} from 'recharts';

const data = [
  { subject: 'Java Prog', percentage: 90 },
  { subject: 'DBMS', percentage: 85 },
  { subject: 'Networks', percentage: 78 },
  { subject: 'Maths', percentage: 68 }, // Below 75% warning
];

const SubjectAttendanceChart = () => {
  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
          <XAxis dataKey="subject" stroke="#94a3b8" fontSize={11} />
          <YAxis domain={[0, 100]} stroke="#94a3b8" fontSize={12} unit="%" />
          <Tooltip
            contentStyle={{ backgroundColor: '#1e293b', borderColor: '#475569', borderRadius: '12px', color: '#fff' }}
            formatter={(val) => [`${val}%`, 'Attendance']}
          />
          <Bar dataKey="percentage" radius={[8, 8, 0, 0]}>
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.percentage < 75 ? '#ff70a6' : '#6c5ce7'}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SubjectAttendanceChart;
