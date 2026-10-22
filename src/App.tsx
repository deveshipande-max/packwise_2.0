/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Sidebar } from './components/Sidebar';
import { TopBar } from './components/TopBar';
import { HomePage } from './pages/HomePage';
import { PackagesPage } from './pages/PackagesPage';
import { MyPackagesPage } from './pages/MyPackagesPage';
import { ExplorePage } from './pages/ExplorePage';
import { CertificatesPage } from './pages/CertificatesPage';
import { TeacherStudioPage } from './pages/TeacherStudioPage';
import { SignInModal } from './components/SignInModal';
import { PackageDetailsModal } from './components/PackageDetailsModal';
import { PaymentSuccessModal } from './components/PaymentSuccessModal';
import { RefundModal } from './components/RefundModal';
import { AddLessonModal } from './components/AddLessonModal';
import { CertificateModal } from './components/CertificateModal';

const AppContent: React.FC = () => {
  const { activeTab } = useApp();

  return (
    <div className="min-h-screen bg-[#FBFDF9] flex flex-col md:flex-row font-sans text-slate-800 antialiased selection:bg-blue-600 selection:text-white">
      {/* Mobile Top Bar */}
      <TopBar />

      {/* Dedicated Left Column Sidebar (Desktop) - Never overlaps main content */}
      <Sidebar />

      {/* Main Content Viewport */}
      <div className="flex-1 min-w-0 flex flex-col">
        <main className="flex-1 w-full max-w-5xl xl:max-w-6xl mx-auto px-4 sm:px-8 lg:px-12 py-6 sm:py-8 lg:py-10">
          {activeTab === 'home' && <HomePage />}
          {activeTab === 'packages' && <PackagesPage />}
          {activeTab === 'my-packages' && <MyPackagesPage />}
          {activeTab === 'explore' && <ExplorePage />}
          {activeTab === 'certificates' && <CertificatesPage />}
          {activeTab === 'teach' && <TeacherStudioPage />}
        </main>
      </div>

      {/* Modals */}
      <SignInModal />
      <PackageDetailsModal />
      <PaymentSuccessModal />
      <RefundModal />
      <AddLessonModal />
      <CertificateModal />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
