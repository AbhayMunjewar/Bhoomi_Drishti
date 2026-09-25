import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import { UserRole } from '../types/auth';
import { Lock, User, ShieldCheck, RefreshCw, KeyRound, Globe, ArrowRight } from 'lucide-react';

export const Login: React.FC = () => {
  const { login } = useAuthStore();
  const navigate = useNavigate();

  const [officialId, setOfficialId] = useState('GOV-MH-NGP-8841');
  const [password, setPassword] = useState('••••••••••••');
  const [captchaInput, setCaptchaInput] = useState('B7K9');
  const [selectedRole, setSelectedRole] = useState<UserRole>('POLICY_PLANNING_OFFICER');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login(selectedRole);

    switch (selectedRole) {
      case 'ADMIN':
        navigate('/admin/dashboard');
        break;
      case 'DATA_GIS_OFFICER':
        navigate('/data/dashboard');
        break;
      case 'RESEARCHER':
        navigate('/research/dashboard');
        break;
      case 'POLICY_PLANNING_OFFICER':
        navigate('/government/dashboard');
        break;
      case 'INSTITUTION_USER':
        navigate('/institution/dashboard');
        break;
      default:
        navigate('/public');
    }
  };

  return (
    <div className="min-h-[calc(100vh-140px)] flex items-center justify-center p-4 bg-[#F5F7F9] select-none">
      <div className="bg-white rounded-lg border border-[#D9DEE5] shadow-xl max-w-md w-full overflow-hidden text-xs">
        
        {/* Header Bar */}
        <div className="bg-[#123B63] text-white p-5 text-center space-y-1">
          <div className="w-10 h-10 rounded-full bg-[#1D5D91] text-white flex items-center justify-center mx-auto mb-2 border border-white/20">
            <Lock className="w-5 h-5 text-[#C98A18]" />
          </div>
          <h3 className="font-bold text-base font-serif tracking-tight">Authorized Portal Authentication</h3>
          <p className="text-[11px] text-slate-300">Single Sign-On for Institutional & Government Stakeholders</p>
          <span className="inline-block bg-[#C98A18]/20 text-[#C98A18] text-[9px] px-2 py-0.5 rounded font-mono font-bold border border-[#C98A18]/40 mt-1">
            SIH 2026 PROTOTYPE
          </span>
        </div>

        {/* Public Notice */}
        <div className="bg-blue-50 border-b border-blue-200 p-3 text-center text-blue-900 flex items-center justify-between text-[11px]">
          <span>Public citizens do not require login.</span>
          <Link to="/public" className="font-bold text-[#1D5D91] hover:underline inline-flex items-center space-x-1">
            <span>Public Info Portal</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="p-6 space-y-4">
          
          {/* Role Selection */}
          <div className="space-y-1 bg-[#F5F7F9] p-3 rounded border border-slate-200">
            <label className="font-bold text-[#123B63] text-[11px] block">Select Authorized Stakeholder Role:</label>
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value as UserRole)}
              className="w-full p-2 bg-white border border-[#D9DEE5] rounded font-semibold text-slate-800 focus:outline-none focus:border-[#1D5D91]"
            >
              <option value="POLICY_PLANNING_OFFICER">📜 Role 4 — Policy & Planning Officer</option>
              <option value="DATA_GIS_OFFICER">🗺️ Role 2 — Data & GIS Officer</option>
              <option value="RESEARCHER">🔬 Role 3 — Researcher</option>
              <option value="INSTITUTION_USER">🏫 Role 5 — Institutional User</option>
              <option value="ADMIN">⚙️ Role 1 — System Administrator</option>
            </select>
          </div>

          {/* Official ID / Email */}
          <div className="space-y-1">
            <label className="font-bold text-slate-700 block">Official ID / Email</label>
            <div className="relative">
              <input
                type="text"
                value={officialId}
                onChange={(e) => setOfficialId(e.target.value)}
                required
                className="w-full pl-9 pr-3 py-2 bg-[#F5F7F9] border border-[#D9DEE5] rounded text-slate-800 font-medium focus:outline-none focus:border-[#1D5D91]"
              />
              <User className="w-4 h-4 text-slate-400 absolute left-2.5 top-2.5" />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-1">
            <label className="font-bold text-slate-700 block">Password</label>
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-9 pr-3 py-2 bg-[#F5F7F9] border border-[#D9DEE5] rounded text-slate-800 font-medium focus:outline-none focus:border-[#1D5D91]"
              />
              <KeyRound className="w-4 h-4 text-slate-400 absolute left-2.5 top-2.5" />
            </div>
          </div>

          {/* CAPTCHA Placeholder */}
          <div className="space-y-1">
            <label className="font-bold text-slate-700 block">Security Verification (CAPTCHA)</label>
            <div className="flex items-center space-x-3">
              <div className="bg-[#123B63] text-white px-4 py-2 rounded font-mono font-bold tracking-widest text-sm select-none">
                B7K9
              </div>
              <button type="button" className="text-slate-500 hover:text-slate-800" title="Refresh CAPTCHA">
                <RefreshCw className="w-4 h-4" />
              </button>
              <input
                type="text"
                placeholder="Enter CAPTCHA"
                value={captchaInput}
                onChange={(e) => setCaptchaInput(e.target.value)}
                className="flex-1 px-3 py-2 bg-[#F5F7F9] border border-[#D9DEE5] rounded text-slate-800 font-medium focus:outline-none focus:border-[#1D5D91]"
              />
            </div>
          </div>

          {/* Remember & Forgot */}
          <div className="flex items-center justify-between text-[11px] text-slate-600">
            <label className="flex items-center space-x-1.5 cursor-pointer">
              <input type="checkbox" defaultChecked className="rounded border-slate-300 text-[#1D5D91]" />
              <span>Remember session</span>
            </label>
            <a href="#" className="text-[#1D5D91] hover:underline font-semibold">Forgot Password?</a>
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            className="w-full bg-[#123B63] hover:bg-[#1D5D91] text-white py-2.5 rounded font-bold text-xs shadow-md transition-colors flex items-center justify-center space-x-2 cursor-pointer"
          >
            <ShieldCheck className="w-4 h-4 text-[#C98A18]" />
            <span>Sign In to Authorized Portal</span>
          </button>

        </form>

        <div className="bg-slate-50 p-3 text-center border-t border-[#D9DEE5] text-[10px] text-slate-500">
          Role-Based Access Control (RBAC) &bull; Protected Government Infrastructure
        </div>

      </div>
    </div>
  );
};
