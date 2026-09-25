import React, { useState } from 'react';
import { Globe, HelpCircle, Eye, FileText, ExternalLink } from 'lucide-react';

export const GovtTopBar: React.FC = () => {
  const [lang, setLang] = useState<'EN' | 'HI' | 'MR'>('EN');

  return (
    <div className="bg-[#123B63] text-white text-xs py-1.5 px-4 border-b border-[#1D5D91] select-none">
      <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
        {/* Left side government affiliation */}
        <div className="flex items-center space-x-3">
          <span className="font-semibold tracking-wide flex items-center gap-1.5">
            <span className="inline-block w-2 h-2 rounded-full bg-[#C98A18]"></span>
            भारत सरकार | Government of India
          </span>
          <span className="text-slate-400">|</span>
          <span className="text-slate-300 hidden sm:inline">Ministry of Housing & Urban Affairs / NITI Aayog</span>
        </div>

        {/* Right side accessibility & language */}
        <div className="flex items-center space-x-4">
          <a
            href="#main-content"
            className="hover:underline text-slate-200 hidden md:flex items-center gap-1"
          >
            <Eye className="w-3 h-3 text-[#C98A18]" /> Skip to Main Content
          </a>

          <div className="hidden sm:flex items-center space-x-2 text-slate-300">
            <button className="hover:text-white px-1">A-</button>
            <button className="hover:text-white px-1 font-bold">A</button>
            <button className="hover:text-white px-1">A+</button>
          </div>

          <span className="text-slate-400 hidden sm:inline">|</span>

          {/* Language Selector */}
          <div className="flex items-center space-x-1 bg-[#1D5D91]/60 px-2 py-0.5 rounded border border-slate-600/50">
            <Globe className="w-3 h-3 text-[#C98A18]" />
            <button
              onClick={() => setLang('EN')}
              className={`px-1 rounded ${lang === 'EN' ? 'font-bold text-white bg-[#123B63]' : 'text-slate-300 hover:text-white'}`}
            >
              English
            </button>
            <button
              onClick={() => setLang('HI')}
              className={`px-1 rounded ${lang === 'HI' ? 'font-bold text-white bg-[#123B63]' : 'text-slate-300 hover:text-white'}`}
            >
              हिन्दी
            </button>
            <button
              onClick={() => setLang('MR')}
              className={`px-1 rounded ${lang === 'MR' ? 'font-bold text-white bg-[#123B63]' : 'text-slate-300 hover:text-white'}`}
            >
              मराठी
            </button>
          </div>

          <span className="bg-[#C98A18]/20 text-[#C98A18] px-2 py-0.5 rounded font-mono font-bold text-[10px] border border-[#C98A18]/40">
            SIH 2026 PROTOTYPE
          </span>
        </div>
      </div>
    </div>
  );
};
