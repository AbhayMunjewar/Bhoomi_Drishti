import React from 'react';
import { Outlet } from 'react-router-dom';
import { GovtTopBar } from '../components/common/GovtTopBar';
import { GovtHeader } from '../components/common/GovtHeader';
import { GovtFooter } from '../components/common/GovtFooter';
import { Sidebar } from '../components/common/Sidebar';

export const GovernmentLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#F5F7F9] text-[#1F2933]">
      <GovtTopBar />
      <GovtHeader />
      <div className="flex-1 flex w-full">
        <Sidebar portalType="government" />
        <main id="main-content" className="flex-1 p-6 overflow-x-hidden">
          <div className="max-w-7xl space-y-6">
            <Outlet />
          </div>
        </main>
      </div>
      <GovtFooter />
    </div>
  );
};
