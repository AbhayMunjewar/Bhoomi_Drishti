import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';

const data = [
  { metric: 'Land Affected (ha)', 'Scenario A': 2341, 'Scenario B': 1420, 'Scenario C': 680 },
  { metric: 'Risk Score (%)', 'Scenario A': 78, 'Scenario B': 48, 'Scenario C': 24 },
  { metric: 'Infra Pressure (%)', 'Scenario A': 82, 'Scenario B': 51, 'Scenario C': 29 },
];

export const ScenarioComparisonChart: React.FC = () => {
  return (
    <div className="w-full h-72 select-none">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
          <XAxis dataKey="metric" stroke="#64748B" fontSize={11} />
          <YAxis stroke="#64748B" fontSize={11} />
          <Tooltip contentStyle={{ backgroundColor: '#123B63', color: '#fff', borderRadius: '6px', fontSize: '11px' }} />
          <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
          <Bar dataKey="Scenario A" fill="#A33A32" radius={[4, 4, 0, 0]} />
          <Bar dataKey="Scenario B" fill="#C98A18" radius={[4, 4, 0, 0]} />
          <Bar dataKey="Scenario C" fill="#2E6B45" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
