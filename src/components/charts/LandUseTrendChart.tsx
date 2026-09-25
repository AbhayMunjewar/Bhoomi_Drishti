import React from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';

const data = [
  { year: '2020', Agricultural: 8600, Urban: 1800, Forest: 2032 },
  { year: '2021', Agricultural: 8520, Urban: 1910, Forest: 2002 },
  { year: '2022', Agricultural: 8410, Urban: 2040, Forest: 1982 },
  { year: '2023', Agricultural: 8300, Urban: 2160, Forest: 1972 },
  { year: '2024', Agricultural: 8210, Urban: 2250, Forest: 1972 },
  { year: '2025', Agricultural: 8150, Urban: 2310, Forest: 1972 },
  { year: '2026', Agricultural: 8124, Urban: 2341, Forest: 1967 },
];

export const LandUseTrendChart: React.FC = () => {
  return (
    <div className="w-full h-64 select-none">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
          <XAxis dataKey="year" stroke="#64748B" fontSize={11} />
          <YAxis stroke="#64748B" fontSize={11} />
          <Tooltip
            contentStyle={{ backgroundColor: '#123B63', color: '#fff', borderRadius: '6px', fontSize: '11px' }}
          />
          <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
          <Area type="monotone" dataKey="Agricultural" stackId="1" stroke="#2E6B45" fill="#2E6B45" fillOpacity={0.6} />
          <Area type="monotone" dataKey="Urban" stackId="1" stroke="#1D5D91" fill="#1D5D91" fillOpacity={0.6} />
          <Area type="monotone" dataKey="Forest" stackId="1" stroke="#C98A18" fill="#C98A18" fillOpacity={0.6} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
