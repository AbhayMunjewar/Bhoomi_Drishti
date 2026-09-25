import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Users, Search, Filter, ShieldCheck, UserCheck, Lock, AlertCircle, RefreshCw, Eye, Edit, UserX, Key } from 'lucide-react';
import { MOCK_ADMIN_USERS, AdminUser } from '../../data/mockAdmin';
import { DataSourceBadge } from '../../components/common/DataSourceBadge';

export const AdminUsersPage: React.FC = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<AdminUser[]>(MOCK_ADMIN_USERS);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedRole, setSelectedRole] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [selectedUserForAction, setSelectedUserForAction] = useState<AdminUser | null>(null);
  const [actionType, setActionType] = useState<'deactivate' | 'activate' | 'role' | null>(null);
  const [newRole, setNewRole] = useState<string>('RESEARCHER');

  const filteredUsers = users.filter(user => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.institution.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesRole = selectedRole === 'All' || user.role === selectedRole;
    const matchesStatus = selectedStatus === 'All' || user.status === selectedStatus;

    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleConfirmAction = () => {
    if (!selectedUserForAction || !actionType) return;

    if (actionType === 'deactivate') {
      setUsers(prev => prev.map(u => u.id === selectedUserForAction.id ? { ...u, status: 'Deactivated' } : u));
    } else if (actionType === 'activate') {
      setUsers(prev => prev.map(u => u.id === selectedUserForAction.id ? { ...u, status: 'Active' } : u));
    } else if (actionType === 'role') {
      const roleLabels: Record<string, string> = {
        ADMIN: 'System Administrator',
        DATA_GIS_OFFICER: 'Data & GIS Officer',
        RESEARCHER: 'Researcher',
        POLICY_PLANNING_OFFICER: 'Policy & Planning Officer',
        INSTITUTION_USER: 'Institutional User',
        PUBLIC: 'Public User'
      };
      setUsers(prev => prev.map(u => u.id === selectedUserForAction.id ? {
        ...u,
        role: newRole as any,
        roleLabel: roleLabels[newRole] || newRole
      } : u));
    }

    setSelectedUserForAction(null);
    setActionType(null);
  };

  return (
    <div className="space-y-6 select-none">
      {/* Header */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-2">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-[#1D5D91] text-xs font-bold uppercase tracking-wider mb-1">
              <Users className="w-4 h-4 text-[#C98A18]" />
              <span>Platform Administration</span>
            </div>
            <h1 className="text-2xl font-serif font-bold text-[#123B63]">
              User Management & Access Control
            </h1>
            <p className="text-xs text-slate-600 max-w-3xl">
              Manage registered user accounts, role assignments (System Administrator, Data & GIS Officer, Researcher, Policy & Planning Officer, Institutional User), account verification, and security permissions.
            </p>
          </div>
          <DataSourceBadge status="PROTOTYPE_DERIVED" size="md" />
        </div>
      </div>

      {/* Controls & Search */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-4">
        <div className="relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search users by name, email, or institution..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm focus:outline-none focus:border-[#1D5D91] text-slate-800"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div>
            <label className="font-bold text-slate-700 block mb-1">Filter by Role</label>
            <select
              value={selectedRole}
              onChange={e => setSelectedRole(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-md py-1.5 px-2 text-slate-800 focus:outline-none focus:border-[#1D5D91]"
            >
              <option value="All">All Roles</option>
              <option value="ADMIN">System Administrator</option>
              <option value="DATA_GIS_OFFICER">Data & GIS Officer</option>
              <option value="RESEARCHER">Researcher</option>
              <option value="POLICY_PLANNING_OFFICER">Policy & Planning Officer</option>
              <option value="INSTITUTION_USER">Institutional User</option>
            </select>
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Filter by Account Status</label>
            <select
              value={selectedStatus}
              onChange={e => setSelectedStatus(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-md py-1.5 px-2 text-slate-800 focus:outline-none focus:border-[#1D5D91]"
            >
              <option value="All">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Pending Approval">Pending Approval</option>
              <option value="Deactivated">Deactivated</option>
            </select>
          </div>

          <div className="flex items-end">
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedRole('All');
                setSelectedStatus('All');
              }}
              className="w-full py-1.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-md border border-slate-300 transition-colors flex items-center justify-center space-x-1"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset Filters</span>
            </button>
          </div>
        </div>
      </div>

      {/* User Table */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-3">
        <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
          <span>Showing {filteredUsers.length} platform user accounts</span>
          <span>Role-Based Access Control (RBAC) Active</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#123B63] text-white font-bold">
                <th className="p-2.5">User Details</th>
                <th className="p-2.5">Assigned Role</th>
                <th className="p-2.5">Institution / Department</th>
                <th className="p-2.5">Status</th>
                <th className="p-2.5">Last Active</th>
                <th className="p-2.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredUsers.map(u => (
                <tr key={u.id} className="hover:bg-slate-50">
                  <td className="p-2.5">
                    <div className="font-bold text-[#123B63]">{u.name}</div>
                    <div className="text-[11px] text-slate-500 font-mono">{u.email}</div>
                  </td>
                  <td className="p-2.5">
                    <span className="px-2 py-0.5 rounded font-semibold text-[11px] bg-blue-50 text-blue-800 border border-blue-200">
                      {u.roleLabel}
                    </span>
                  </td>
                  <td className="p-2.5 text-slate-700 font-medium max-w-[200px] truncate">
                    {u.institution}
                  </td>
                  <td className="p-2.5">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        u.status === 'Active'
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                          : u.status === 'Pending Approval'
                          ? 'bg-amber-50 text-amber-800 border border-amber-200'
                          : 'bg-red-50 text-red-800 border border-red-200'
                      }`}
                    >
                      {u.status}
                    </span>
                  </td>
                  <td className="p-2.5 text-slate-500 font-mono">{u.lastActive}</td>
                  <td className="p-2.5 text-right">
                    <div className="flex items-center justify-end space-x-1.5">
                      <Link
                        to={`/admin/users/${u.id}`}
                        className="p-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700"
                        title="View Full User Details"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </Link>
                      <button
                        onClick={() => {
                          setSelectedUserForAction(u);
                          setActionType('role');
                          setNewRole(u.role);
                        }}
                        className="p-1 rounded bg-blue-50 hover:bg-blue-100 text-blue-700"
                        title="Change Role"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      {u.status === 'Active' ? (
                        <button
                          onClick={() => {
                            setSelectedUserForAction(u);
                            setActionType('deactivate');
                          }}
                          className="p-1 rounded bg-red-50 hover:bg-red-100 text-red-700"
                          title="Deactivate Account"
                        >
                          <UserX className="w-3.5 h-3.5" />
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            setSelectedUserForAction(u);
                            setActionType('activate');
                          }}
                          className="p-1 rounded bg-emerald-50 hover:bg-emerald-100 text-emerald-700"
                          title="Activate Account"
                        >
                          <UserCheck className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Confirmation Modal for Admin Actions */}
      {selectedUserForAction && actionType && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl border border-slate-200 shadow-2xl p-6 max-w-md w-full space-y-4">
            <h3 className="text-base font-bold text-[#123B63]">
              Confirm Administrative Action
            </h3>

            {actionType === 'deactivate' && (
              <p className="text-xs text-slate-600">
                Are you sure you want to deactivate the account for <strong>{selectedUserForAction.name}</strong> ({selectedUserForAction.email})? Deactivating will prevent them from signing in.
              </p>
            )}

            {actionType === 'activate' && (
              <p className="text-xs text-slate-600">
                Are you sure you want to activate the account for <strong>{selectedUserForAction.name}</strong>?
              </p>
            )}

            {actionType === 'role' && (
              <div className="space-y-2 text-xs">
                <p className="text-slate-600">
                  Select new platform role for <strong>{selectedUserForAction.name}</strong>:
                </p>
                <select
                  value={newRole}
                  onChange={e => setNewRole(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded p-2 text-slate-800 font-bold focus:outline-none focus:border-[#1D5D91]"
                >
                  <option value="ADMIN">System Administrator</option>
                  <option value="DATA_GIS_OFFICER">Data & GIS Officer</option>
                  <option value="RESEARCHER">Researcher</option>
                  <option value="POLICY_PLANNING_OFFICER">Policy & Planning Officer</option>
                  <option value="INSTITUTION_USER">Institutional User</option>
                </select>
              </div>
            )}

            <div className="flex items-center justify-end space-x-2 pt-3 border-t border-slate-100">
              <button
                onClick={() => {
                  setSelectedUserForAction(null);
                  setActionType(null);
                }}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmAction}
                className="px-4 py-2 bg-[#123B63] hover:bg-[#1D5D91] text-white font-bold text-xs rounded shadow-xs"
              >
                Confirm & Log Audit Event
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
