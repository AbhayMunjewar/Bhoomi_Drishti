import React from 'react';
import { Outlet } from 'react-router-dom';
import { GovtTopBar } from '../components/common/GovtTopBar';
import { GovtHeader } from '../components/common/GovtHeader';
import { GovtFooter } from '../components/common/GovtFooter';
import { Sidebar } from '../components/common/Sidebar';

export const ResearchLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#F5F7F9] text-[#1F2933]">
      <GovtTopBar />
      <GovtHeader />
      <div className="flex-1 flex w-full">
        <Sidebar portalType="research" />
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

export const InstitutionLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#F5F7F9] text-[#1F2933]">
      <GovtTopBar />
      <GovtHeader />
      <div className="flex-1 flex w-full">
        <Sidebar portalType="institution" />
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

export const PublicLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#F5F7F9] text-[#1F2933]">
      <GovtTopBar />
      <GovtHeader />
      <div className="flex-1 flex w-full">
        <Sidebar portalType="public" />
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

export const AdminLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#F5F7F9] text-[#1F2933]">
      <GovtTopBar />
      <GovtHeader />
      <div className="flex-1 flex w-full">
        <Sidebar portalType="admin" />
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

export const DataLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#F5F7F9] text-[#1F2933]">
      <GovtTopBar />
      <GovtHeader />
      <div className="flex-1 flex w-full">
        <Sidebar portalType="data" />
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

