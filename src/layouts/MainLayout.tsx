import React from 'react';
import { Outlet } from 'react-router-dom';
import { GovtTopBar } from '../components/common/GovtTopBar';
import { GovtHeader } from '../components/common/GovtHeader';
import { GovtFooter } from '../components/common/GovtFooter';

export const MainLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#F5F7F9] text-[#1F2933]">
      <GovtTopBar />
      <GovtHeader />
      <main id="main-content" className="flex-1">
        <Outlet />
      </main>
      <GovtFooter />
    </div>
  );
};
