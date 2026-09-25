import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { CheckCircle2, ArrowLeft, ShieldCheck, AlertCircle, FileText, UserCheck, Check, X, MessageSquare } from 'lucide-react';
import { MOCK_ADMIN_APPROVALS, AdminApproval } from '../../data/mockAdmin';
import { DataSourceBadge } from '../../components/common/DataSourceBadge';

export const AdminApprovalDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const item = MOCK_ADMIN_APPROVALS.find(a => a.id === id) || MOCK_ADMIN_APPROVALS[0];
  const [status, setStatus] = useState<string>(item.status);
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);
  const [modalAction, setModalAction] = useState<'Approve' | 'Reject' | 'Request Changes'>('Approve');
  const [reviewerComment, setReviewerComment] = useState<string>('');
  const [actionDoneMsg, setActionDoneMsg] = useState<string | null>(null);

  const handleExecuteAction = () => {
    let newStatus = 'Approved';
    if (modalAction === 'Reject') newStatus = 'Rejected';
    if (modalAction === 'Request Changes') newStatus = 'Needs Changes';

    setStatus(newStatus);
    setShowConfirmModal(false);
    setActionDoneMsg(`Submission status set to ${newStatus}. Immutable audit log event logged.`);
    setTimeout(() => setActionDoneMsg(null), 5000);
  };

  return (
    <div className="space-y-6 select-none">
      <button
        onClick={() => navigate('/admin/approvals')}
        className="inline-flex items-center space-x-1.5 text-xs font-bold text-[#1D5D91] hover:text-[#123B63] transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Approval Workflows Queue</span>
      </button>

      {/* Header */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="px-3 py-1 text-xs font-bold uppercase rounded bg-amber-50 text-amber-900 border border-amber-200">
            Submission Type: {item.type}
          </span>
          <DataSourceBadge status="PROTOTYPE_DERIVED" size="md" />
        </div>

        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-serif font-bold text-[#123B63] leading-tight">
              {item.title}
            </h1>
            <p className="text-xs text-slate-500 font-mono mt-0.5">Submitted By: {item.submittedBy} ({item.submitterRole}) • {item.institution}</p>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => {
                setModalAction('Request Changes');
                setShowConfirmModal(true);
              }}
              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded border border-slate-300"
            >
              Request Changes
            </button>
            <button
              onClick={() => {
                setModalAction('Reject');
                setShowConfirmModal(true);
              }}
              className="px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-700 font-bold text-xs rounded border border-red-200"
            >
              Reject
            </button>
            <button
              onClick={() => {
                setModalAction('Approve');
                setShowConfirmModal(true);
              }}
              className="px-4 py-2 bg-[#2E6B45] hover:bg-[#235335] text-white font-bold text-xs rounded shadow-xs"
            >
              Approve Submission
            </button>
          </div>
        </div>

        {actionDoneMsg && (
          <div className="bg-emerald-50 border border-emerald-200 p-3 rounded text-xs text-emerald-900 flex items-center space-x-2 font-bold animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{actionDoneMsg}</span>
          </div>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-slate-50 rounded-lg border border-slate-200 text-xs text-slate-700">
          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Submission ID</span>
            <span className="font-bold font-mono text-slate-900">{item.id}</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Submission Date</span>
            <span className="font-bold text-slate-900">{item.submittedDate}</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Automated Validation</span>
            <span className="font-bold text-emerald-700">{item.validationStatus}</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Current Status</span>
            <span className="font-bold text-[#1D5D91]">{status}</span>
          </div>
        </div>
      </div>

      {/* Metadata Panel */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
        <h3 className="text-base font-bold text-[#123B63] border-b border-slate-100 pb-2">Submission Metadata & Payload</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          {Object.entries(item.metadata).map(([key, val]) => (
            <div key={key} className="p-3 bg-slate-50 rounded border border-slate-200">
              <span className="text-slate-400 text-[10px] block uppercase font-bold">{key}</span>
              <span className="font-bold text-slate-900">{val}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Review Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl border border-slate-200 shadow-2xl p-6 max-w-md w-full space-y-4">
            <h3 className="text-base font-bold text-[#123B63]">
              Confirm Administrative Action: {modalAction}
            </h3>

            <p className="text-xs text-slate-600">
              You are performing action <strong>{modalAction}</strong> on submission item <strong>"{item.title}"</strong>. This will log an immutable audit event.
            </p>

            <div className="space-y-1.5 text-xs">
              <label className="font-bold text-slate-700 block">Reviewer Comment / Rationale (Optional)</label>
              <textarea
                rows={3}
                value={reviewerComment}
                onChange={e => setReviewerComment(e.target.value)}
                placeholder="Enter justification or feedback for the submitter..."
                className="w-full bg-slate-50 border border-slate-300 rounded p-2 text-xs focus:outline-none focus:border-[#1D5D91]"
              />
            </div>

            <div className="flex items-center justify-end space-x-2 pt-3 border-t border-slate-100">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleExecuteAction}
                className="px-4 py-2 bg-[#123B63] hover:bg-[#1D5D91] text-white font-bold text-xs rounded shadow-xs"
              >
                Confirm & Create Audit Event
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
