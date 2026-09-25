import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import { Search, LogOut, Lock, UserCheck, Shield, Bell, ChevronDown, CheckCircle2 } from 'lucide-react';
import { MOCK_ADMIN_NOTIFICATIONS } from '../../data/mockAdmin';

export const GovtHeader: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const notifications = MOCK_ADMIN_NOTIFICATIONS;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Determine portal context from current route
  const getPortalLabel = () => {
    if (location.pathname.startsWith('/government')) return 'Government Portal';
    if (location.pathname.startsWith('/research')) return 'Research Portal';
    if (location.pathname.startsWith('/institution')) return 'Institution Portal';
    if (location.pathname.startsWith('/admin')) return 'Admin Portal';
    if (location.pathname.startsWith('/public')) return 'Public Info Portal';
    return null;
  };

  const portalLabel = getPortalLabel();

  return (
    <header className="bg-white border-b border-[#D9DEE5] shadow-xs sticky top-0 z-50 select-none">
      <div className="w-full px-6 py-3 flex flex-wrap justify-between items-center gap-4">
        
        {/* BRANDING LOGO */}
        <Link to="/" className="flex items-center space-x-3 group">
          <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-[#123B63] to-[#1D5D91] flex items-center justify-center p-2 shadow-xs border border-[#123B63]/20">
            <svg viewBox="0 0 100 100" className="w-full h-full text-white fill-current">
              <path d="M50 20 C20 20 5 50 5 50 C5 50 20 80 50 80 C80 80 95 50 95 50 C95 50 80 20 50 20 Z M50 70 C38.9 70 30 61.1 30 50 C30 38.9 38.9 30 50 30 C61.1 30 70 38.9 70 50 C70 61.1 61.1 70 50 70 Z" fill="#FFFFFF" opacity="0.9"/>
              <circle cx="50" cy="50" r="12" fill="#C98A18" />
              <path d="M55 25 Q65 15 75 22 Q75 35 60 38 Z" fill="#2E6B45" />
            </svg>
          </div>

          <div>
            <div className="flex items-baseline space-x-1">
              <span className="text-xl font-black tracking-tight text-[#123B63] font-serif">
                Bhoomi<span className="text-[#2E6B45]">Dristi</span>
              </span>
              <span className="inline-block w-2 h-2 rounded-full bg-[#C98A18]"></span>
            </div>
            <p className="text-[10px] font-medium text-[#5B6573] tracking-wide">
              National Land Governance Platform
            </p>
          </div>
        </Link>

        {/* CENTER / NAVIGATION LOGIC */}
        {portalLabel ? (
          <div className="flex items-center space-x-2 bg-[#123B63]/10 border border-[#123B63]/20 px-3 py-1 rounded-md text-xs font-bold text-[#123B63]">
            <span className="w-2 h-2 rounded-full bg-[#C98A18]"></span>
            <span>{portalLabel}</span>
          </div>
        ) : (
          <nav className="flex items-center space-x-6 text-xs font-semibold text-[#1F2933]">
            <Link
              to="/"
              className={`hover:text-[#1D5D91] transition-colors ${
                location.pathname === '/' ? 'text-[#1D5D91] font-bold border-b-2 border-[#1D5D91] pb-1' : ''
              }`}
            >
              Home
            </Link>
            <Link
              to="/public"
              className={`hover:text-[#1D5D91] transition-colors ${
                location.pathname.startsWith('/public') ? 'text-[#1D5D91] font-bold border-b-2 border-[#1D5D91] pb-1' : ''
              }`}
            >
              Public Info Portal
            </Link>
          </nav>
        )}

        {/* RIGHT ACTION CONTROLS */}
        <div className="flex items-center space-x-3 text-xs">
          {/* Admin / System Notification Dropdown */}
          {isAuthenticated && user && (
            <div className="relative">
              <button
                onClick={() => setIsNotifOpen(!isNotifOpen)}
                className="relative p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                title="System Notifications"
              >
                <Bell className="w-4 h-4 text-[#123B63]" />
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-600 text-white text-[9px] font-bold flex items-center justify-center border border-white">
                  3
                </span>
              </button>

              {isNotifOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl border border-slate-200 shadow-2xl p-3 z-50 space-y-2 animate-in fade-in">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2 text-xs font-bold text-[#123B63]">
                    <span>Admin System Notifications</span>
                    <span className="text-[10px] text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded">3 Unread</span>
                  </div>

                  <div className="space-y-1.5 max-h-64 overflow-y-auto">
                    {notifications.map(n => (
                      <Link
                        key={n.id}
                        to={n.link}
                        onClick={() => setIsNotifOpen(false)}
                        className="block p-2 bg-slate-50 hover:bg-slate-100 rounded text-xs border border-slate-100 transition-colors"
                      >
                        <div className="font-bold text-[#123B63]">{n.title}</div>
                        <p className="text-[11px] text-slate-600 line-clamp-2 mt-0.5">{n.message}</p>
                        <span className="text-[9px] text-slate-400 block mt-1">{n.time}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {isAuthenticated && user ? (
            <div className="flex items-center space-x-3">
              <div className="text-right hidden sm:block">
                <span className="font-bold text-[#123B63] block truncate max-w-[160px]">{user.name}</span>
                <span className="text-[10px] text-slate-500 font-semibold uppercase font-mono">{user.role.replace('_', ' ')}</span>
              </div>

              <button
                onClick={handleLogout}
                className="bg-white border border-[#A33A32] text-[#A33A32] hover:bg-[#A33A32] hover:text-white px-3 py-1.5 rounded-md font-bold text-xs transition-colors flex items-center space-x-1.5 shadow-2xs"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Log Out</span>
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="bg-[#123B63] hover:bg-[#1D5D91] text-white px-4 py-1.5 rounded-md text-xs font-bold transition-colors flex items-center space-x-1.5 shadow-2xs"
            >
              <Lock className="w-3.5 h-3.5 text-[#C98A18]" />
              <span>Portal Login</span>
            </Link>
          )}
        </div>

      </div>
    </header>
  );
};
