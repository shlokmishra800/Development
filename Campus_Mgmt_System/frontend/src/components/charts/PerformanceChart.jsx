import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';

const data = [
  { subject: 'Java', midTerm: 92, assignment: 95, finalTarget: 90 },
  { subject: 'DBMS', midTerm: 85, assignment: 88, finalTarget: 86 },
  { subject: 'Networks', midTerm: 78, assignment: 82, finalTarget: 80 },
  { subject: 'Maths', midTerm: 65, assignment: 70, finalTarget: 75 },
];

const PerformanceChart = () => {
  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
          <XAxis dataKey="subject" stroke="#94a3b8" fontSize={11} />
          <YAxis domain={[0, 100]} stroke="#94a3b8" fontSize={12} />
          <Tooltip
            contentStyle={{ backgroundColor: '#1e293b', borderColor: '#475569', borderRadius: '12px', color: '#fff' }}
          />
          <Legend />
          <Bar dataKey="midTerm" name="Mid-Semester" fill="#6c5ce7" radius={[4, 4, 0, 0]} />
          <Bar dataKey="assignment" name="Assignments" fill="#00b4d8" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PerformanceChart;
