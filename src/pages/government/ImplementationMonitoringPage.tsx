import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';
import { BarChart3, CheckCircle2, AlertTriangle, ArrowRight, RefreshCw, FileText } from 'lucide-react';

const monitoringData = [
  { project: 'Panvel Housing Hub', 'Predicted Exposure (%)': 18, 'Observed Exposure (%)': 23, variance: '+5%' },
  { project: 'Thane Freight Park', 'Predicted Exposure (%)': 48, 'Observed Exposure (%)': 45, variance: '-3%' },
  { project: 'Haveli Solar Grid', 'Predicted Exposure (%)': 12, 'Observed Exposure (%)': 11, variance: '-1%' },
  { project: 'Nagpur Freight Term', 'Predicted Exposure (%)': 28, 'Observed Exposure (%)': 31, variance: '+3%' },
];

export const ImplementationMonitoringPage: React.FC = () => {
  return (
    <div className="space-y-6 select-none text-xs">
      
      {/* Header Bar */}
      <div className="bg-white p-4 rounded-md border border-[#D9DEE5] shadow-2xs flex justify-between items-center">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#1D5D91] bg-[#1D5D91]/10 px-2 py-0.5 rounded">
            Government Portal &bull; Outcome Evaluation
          </span>
          <h2 className="text-xl font-bold text-[#123B63] font-serif mt-1">
            Implementation Monitoring & Prediction vs. Reality
          </h2>
          <p className="text-xs text-[#5B6573]">
            Track project outcomes, validate simulation accuracy, and generate new evidence for institutional memory
          </p>
        </div>

        <button className="bg-[#123B63] text-white px-3.5 py-1.5 rounded font-bold text-xs shadow-2xs flex items-center space-x-1.5">
          <RefreshCw className="w-4 h-4 text-[#C98A18]" />
          <span>Sync Satellite Observations</span>
        </button>
      </div>

      {/* CHART & COMPARISON */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Prediction vs Reality Chart */}
        <div className="lg:col-span-7 bg-white p-5 rounded-lg border border-[#D9DEE5] shadow-xs space-y-3">
          <h3 className="font-bold text-sm text-[#123B63]">Predicted Flood Exposure vs. Observed Satellite Outcome</h3>
          
          <div className="w-full h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monitoringData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis dataKey="project" stroke="#64748B" fontSize={11} />
                <YAxis stroke="#64748B" fontSize={11} />
                <Tooltip contentStyle={{ backgroundColor: '#123B63', color: '#fff', borderRadius: '6px', fontSize: '11px' }} />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                <Bar dataKey="Predicted Exposure (%)" fill="#1D5D91" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Observed Exposure (%)" fill="#A33A32" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Learning & Evidence Generation Card */}
        <div className="lg:col-span-5 bg-white p-5 rounded-lg border border-[#D9DEE5] shadow-xs space-y-4">
          <div className="border-b border-slate-200 pb-2">
            <h3 className="font-bold text-sm text-[#123B63]">Institutional Memory & Model Calibration</h3>
          </div>

          <div className="bg-amber-50 border border-amber-200 p-3.5 rounded text-[11px] space-y-2">
            <span className="font-bold text-amber-900 block">Variance Highlight: Panvel Housing Hub</span>
            <p className="text-amber-800 leading-relaxed">
              Observed flood exposure exceeded predictions by <strong>+5%</strong> due to localized estuarine siltation. This outcome has been flagged and automatically appended to the <strong>BhoomiDrishti Research Repository</strong> as new evidence for future coastal policy simulations.
            </p>
          </div>

          <div className="space-y-2 text-[11px]">
            <span className="font-bold text-[#123B63] block">Active Monitoring Metrics:</span>
            <ul className="space-y-1.5 text-slate-700">
              <li className="flex items-center justify-between bg-[#F5F7F9] p-2 rounded border border-slate-200">
                <span>Model Calibration Variance:</span>
                <strong className="text-[#2E6B45]">± 2.4% (Acceptable)</strong>
              </li>
              <li className="flex items-center justify-between bg-[#F5F7F9] p-2 rounded border border-slate-200">
                <span>Satellite Sentinel Sync:</span>
                <strong className="text-[#1D5D91]">Active (10m Res)</strong>
              </li>
            </ul>
          </div>
        </div>

      </div>

    </div>
  );
};
