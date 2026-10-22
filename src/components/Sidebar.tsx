import React from 'react';
import { Home, Compass, Award, Package, BookOpen, Sparkles, LogIn, GraduationCap } from 'lucide-react';
import { useApp, ActiveTab } from '../context/AppContext';

export const Sidebar: React.FC = () => {
  const { 
    activeTab, 
    setActiveTab, 
    enrolledPackages, 
    currentUser, 
    setIsSignInModalOpen,
    isTeacher,
    teacherLessons
  } = useApp();

  const activeCount = enrolledPackages.filter(p => p.status === 'active').length;

  const navItems: { id: ActiveTab; label: string; icon: React.ReactNode; badge?: number; isSpecial?: boolean }[] = [
    {
      id: 'home',
      label: 'Home',
      icon: <Home className="w-5 h-5" />
    },
    {
      id: 'explore',
      label: 'Explore',
      icon: <Compass className="w-5 h-5" />
    },
    {
      id: 'certificates',
      label: 'Certificates',
      icon: <Award className="w-5 h-5" />
    },
    {
      id: 'my-packages',
      label: 'My packages',
      icon: <Package className="w-5 h-5" />,
      badge: activeCount > 0 ? activeCount : undefined
    },
    {
      id: 'teach',
      label: isTeacher ? 'Teacher Studio' : 'Teach on Pathwise',
      icon: <GraduationCap className="w-5 h-5" />,
      badge: isTeacher && teacherLessons.length > 0 ? teacherLessons.length : undefined,
      isSpecial: isTeacher
    }
  ];

  return (
    <aside className="w-64 xl:w-72 bg-white border-r border-slate-100 flex-shrink-0 flex flex-col justify-between p-6 h-screen sticky top-0 hidden md:flex z-20">
      {/* Top: Brand Logo with Book Icon + Navigation */}
      <div className="space-y-8">
        {/* Brand: Book Logo + Pathwise */}
        <button
          onClick={() => setActiveTab('home')}
          className="flex items-center gap-3 text-left group w-full"
        >
          <div className="w-10 h-10 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/25 group-hover:scale-105 transition-transform shrink-0">
            <BookOpen className="w-5 h-5" />
          </div>
          <span className="text-2xl font-black tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors">
            Pathwise
          </span>
        </button>

        {/* Navigation Links */}
        <nav className="space-y-1.5" aria-label="Main Sidebar Navigation">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-semibold transition-all ${
                  isActive
                    ? item.isSpecial
                      ? 'bg-amber-50 text-amber-900 shadow-2xs font-bold border border-amber-200/60'
                      : 'bg-blue-50/90 text-blue-700 shadow-2xs font-bold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={isActive ? (item.isSpecial ? 'text-amber-600' : 'text-blue-600') : 'text-slate-500'}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </div>

                {item.badge !== undefined && (
                  <span className={`w-5 h-5 text-white text-[11px] font-bold rounded-full flex items-center justify-center shadow-2xs ${
                    item.isSpecial ? 'bg-amber-600' : 'bg-blue-600'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom: Lime promo card + User profile trigger */}
      <div className="space-y-4 pt-6">
        {/* Soft Lime Callout Card (matching reference screenshot) */}
        <div className="p-4 rounded-2xl bg-[#E3FCC8] text-slate-800 space-y-1.5 border border-[#D0F8AB]/80">
          <div className="w-6 h-6 rounded-lg bg-blue-600 text-white flex items-center justify-center">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <p className="text-xs font-bold text-slate-900 leading-snug">
            {isTeacher 
              ? 'Enlist courses and earn royalties on every package sold.'
              : 'Build a plan around your goals, not a subscription.'
            }
          </p>
        </div>

        {/* Sign In / Active User Profile Button */}
        <button
          onClick={() => setIsSignInModalOpen(true)}
          className="w-full p-2.5 rounded-2xl hover:bg-slate-50 border border-slate-100 transition-all flex items-center gap-3 text-left group"
        >
          {currentUser ? (
            <>
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                referrerPolicy="no-referrer"
                className={`w-9 h-9 rounded-full object-cover border shrink-0 ${
                  isTeacher ? 'border-amber-300 ring-2 ring-amber-100' : 'border-slate-200'
                }`}
              />
              <div className="min-w-0 flex-1 leading-tight">
                <div className="flex items-center gap-1.5">
                  <p className="text-xs font-bold text-slate-900 truncate group-hover:text-blue-600 transition-colors">
                    {currentUser.name}
                  </p>
                  {isTeacher && (
                    <span className="px-1.5 py-0.2 bg-amber-100 text-amber-800 text-[9px] font-bold rounded">
                      Teacher
                    </span>
                  )}
                </div>
                <p className="text-[10px] text-slate-500 truncate">
                  {currentUser.role} {isTeacher ? '' : `· $${currentUser.budget}`}
                </p>
              </div>
            </>
          ) : (
            <>
              <div className="w-9 h-9 rounded-full bg-slate-900 text-white flex items-center justify-center shrink-0">
                <LogIn className="w-4 h-4" />
              </div>
              <div className="leading-tight">
                <p className="text-xs font-bold text-slate-900">Sign in</p>
                <p className="text-[10px] text-slate-500">Sync your learning</p>
              </div>
            </>
          )}
        </button>
      </div>
    </aside>
  );
};
