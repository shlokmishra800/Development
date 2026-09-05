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
  { department: 'CSE', students: 620, teachers: 28 },
  { department: 'ECE', students: 480, teachers: 22 },
  { department: 'MECH', students: 350, teachers: 18 },
  { department: 'CIVIL', students: 290, teachers: 15 },
  { department: 'IT', students: 410, teachers: 20 },
];

const DepartmentAnalyticsChart = () => {
  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
          <XAxis dataKey="department" stroke="#94a3b8" fontSize={11} />
          <YAxis stroke="#94a3b8" fontSize={12} />
          <Tooltip
            contentStyle={{ backgroundColor: '#1e293b', borderColor: '#475569', borderRadius: '12px', color: '#fff' }}
          />
          <Legend />
          <Bar dataKey="students" name="Students Enrolled" fill="#6c5ce7" radius={[4, 4, 0, 0]} />
          <Bar dataKey="teachers" name="Faculty Members" fill="#ff70a6" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DepartmentAnalyticsChart;
