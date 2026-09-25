import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, Search, MapPin, Database, BarChart3, ShieldCheck, Send, CheckCircle2 } from 'lucide-react';
import { PUBLIC_FAQS } from '../../data/mockPublic';

export const PublicHelpPage: React.FC = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [issueSubmitted, setIssueSubmitted] = useState<boolean>(false);
  const [issueFormData, setIssueFormData] = useState({
    name: '',
    email: '',
    category: 'Data Inquiry',
    description: ''
  });

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const handleIssueSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!issueFormData.description) return;
    setIssueSubmitted(true);
  };

  return (
    <div className="space-y-8 select-none">
      {/* Header */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-2">
        <div className="flex items-center space-x-2 text-[#1D5D91] text-xs font-bold uppercase tracking-wider mb-1">
          <HelpCircle className="w-4 h-4 text-[#C98A18]" />
          <span>Public Knowledge & Data Guide</span>
        </div>
        <h1 className="text-2xl font-serif font-bold text-[#123B63]">
          Help Center, FAQs & Data Guide
        </h1>
        <p className="text-xs text-slate-600 max-w-3xl">
          Learn how to search land governance research, navigate the interactive MapLibre GIS portal, download machine-readable open datasets, and interpret spatial indicators.
        </p>
      </div>

      {/* Portal Usage Guides */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-3">
          <div className="w-9 h-9 rounded-lg bg-blue-50 text-[#1D5D91] flex items-center justify-center font-bold">
            <Search className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-[#123B63]">1. Searching Research</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Use the Research Knowledge Portal filters to search by topic (e.g. Land Records, Climate Resilience), state/district location, institution, or publication year. Click any paper to view abstract, methodology, key findings, and GIS location.
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-3">
          <div className="w-9 h-9 rounded-lg bg-amber-50 text-amber-800 flex items-center justify-center font-bold">
            <MapPin className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-[#123B63]">2. Navigating the GIS Map</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Use the Left Layer Controls on the Public GIS Map page to toggle vector categories (Land Use, Climate Grids, Infrastructure). Click any district pin or spatial polygon to open the Feature Details drawer.
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-3">
          <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-800 flex items-center justify-center font-bold">
            <Database className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-[#123B63]">3. Downloading Open Datasets</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Navigate to Open Data, select your required category (LULC, Rainfall, Infrastructure), inspect the schema definition table and data preview table, then click Download to export machine-readable CSV or GeoJSON files.
          </p>
        </div>
      </div>

      {/* FAQ Accordion */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
        <h2 className="text-lg font-bold text-[#123B63] border-b border-slate-100 pb-2">
          Frequently Asked Questions (FAQs)
        </h2>

        <div className="space-y-3">
          {PUBLIC_FAQS.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div key={idx} className="border border-slate-200 rounded-lg overflow-hidden transition-colors">
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full text-left p-4 bg-slate-50 hover:bg-slate-100 transition-colors flex items-center justify-between font-bold text-xs text-[#123B63]"
                >
                  <span className="pr-4">{faq.question}</span>
                  {isOpen ? <ChevronUp className="w-4 h-4 text-[#C98A18] shrink-0" /> : <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />}
                </button>

                {isOpen && (
                  <div className="p-4 bg-white border-t border-slate-200 text-xs text-slate-700 leading-relaxed animate-in fade-in duration-200">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Report an Issue / Data Feedback Form */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4 max-w-2xl">
        <h2 className="text-base font-bold text-[#123B63]">Report a Public Data Issue or Submit Inquiry</h2>

        {issueSubmitted ? (
          <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-lg text-emerald-900 text-xs flex items-center space-x-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <div>
              <h4 className="font-bold">Feedback / Issue Ticket Submitted</h4>
              <p>Thank you. Your public data feedback ticket has been logged for review by the BhoomiDrishti Data Governance Cell.</p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleIssueSubmit} className="space-y-3 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  value={issueFormData.name}
                  onChange={e => setIssueFormData({ ...issueFormData, name: e.target.value })}
                  placeholder="Citizen / Researcher Name"
                  className="w-full bg-slate-50 border border-slate-300 rounded p-2 focus:outline-none focus:border-[#1D5D91]"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={issueFormData.email}
                  onChange={e => setIssueFormData({ ...issueFormData, email: e.target.value })}
                  placeholder="email@example.com"
                  className="w-full bg-slate-50 border border-slate-300 rounded p-2 focus:outline-none focus:border-[#1D5D91]"
                />
              </div>
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Inquiry Category</label>
              <select
                value={issueFormData.category}
                onChange={e => setIssueFormData({ ...issueFormData, category: e.target.value })}
                className="w-full bg-slate-50 border border-slate-300 rounded p-2 focus:outline-none focus:border-[#1D5D91]"
              >
                <option value="Data Inquiry">Data Inquiry / Schema Question</option>
                <option value="Report Discrepancy">Report Spatial Discrepancy</option>
                <option value="Research Submission">Submit Research Paper for Indexing</option>
                <option value="Technical Issue">Technical / GIS Map Bug</option>
              </select>
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Description / Issue Details</label>
              <textarea
                rows={3}
                required
                value={issueFormData.description}
                onChange={e => setIssueFormData({ ...issueFormData, description: e.target.value })}
                placeholder="Describe your inquiry or data feedback..."
                className="w-full bg-slate-50 border border-slate-300 rounded p-2 focus:outline-none focus:border-[#1D5D91]"
              />
            </div>

            <button
              type="submit"
              className="px-5 py-2.5 bg-[#1D5D91] hover:bg-[#123B63] text-white font-bold rounded shadow-xs transition-colors flex items-center space-x-2"
            >
              <Send className="w-4 h-4" />
              <span>Submit Ticket</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
