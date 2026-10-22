import React from 'react';
import { BookOpen, DollarSign, LogIn, ChevronDown, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const TopBar: React.FC = () => {
  const { currentUser, budget, setIsSignInModalOpen, activeTab, setActiveTab, enrolledPackages } = useApp();

  const activeCount = enrolledPackages.filter(p => p.status === 'active').length;

  return (
    <header className="md:hidden sticky top-0 z-30 w-full bg-white/90 backdrop-blur-md border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-3">
        {/* Mobile Brand */}
        <button 
          onClick={() => setActiveTab('home')}
          className="flex items-center gap-2 text-left"
        >
          <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-sm">
            <BookOpen className="w-4 h-4" />
          </div>
          <span className="text-lg font-black tracking-tight text-slate-900">
            Pathwise
          </span>
        </button>

        {/* Mobile Nav links */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-full text-xs font-semibold">
          <button
            onClick={() => setActiveTab('home')}
            className={`px-2.5 py-1 rounded-full transition-colors ${
              activeTab === 'home' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600'
            }`}
          >
            Home
          </button>
          <button
            onClick={() => setActiveTab('packages')}
            className={`px-2.5 py-1 rounded-full transition-colors ${
              activeTab === 'packages' ? 'bg-white text-blue-600 shadow-2xs' : 'text-slate-600'
            }`}
          >
            Packages
          </button>
          <button
            onClick={() => setActiveTab('my-packages')}
            className={`px-2.5 py-1 rounded-full transition-colors flex items-center gap-1 ${
              activeTab === 'my-packages' ? 'bg-white text-blue-600 shadow-2xs' : 'text-slate-600'
            }`}
          >
            My Packages
            {activeCount > 0 && (
              <span className="w-3.5 h-3.5 bg-blue-600 text-white rounded-full text-[9px] flex items-center justify-center">
                {activeCount}
              </span>
            )}
          </button>
        </div>

        {/* Profile trigger */}
        <button
          onClick={() => setIsSignInModalOpen(true)}
          className="p-1 rounded-full border border-slate-200"
          title="Account / Sign in"
        >
          {currentUser ? (
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              referrerPolicy="no-referrer"
              className="w-7 h-7 rounded-full object-cover"
            />
          ) : (
            <div className="w-7 h-7 rounded-full bg-slate-900 text-white flex items-center justify-center">
              <LogIn className="w-3.5 h-3.5" />
            </div>
          )}
        </button>
      </div>
    </header>
  );
};
