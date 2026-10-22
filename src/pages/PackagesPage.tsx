import React from 'react';
import { useApp } from '../context/AppContext';
import { getCustomPackagesForTopicAndBudget } from '../data/mockData';
import { Sparkles, ArrowRight, Clock, BookOpen, Layers } from 'lucide-react';

export const PackagesPage: React.FC = () => {
  const { 
    budget, 
    selectedTopic, 
    currentUser, 
    setActiveTab, 
    setViewingPackage,
    allLessons
  } = useApp();

  const packages = getCustomPackagesForTopicAndBudget(selectedTopic, budget, allLessons);

  return (
    <div className="pb-16">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left 8 Cols: Main Packages Feed */}
        <div className="lg:col-span-8 space-y-6">
          {/* Header Zone matching Wireframe 1 */}
          <div className="bg-white/80 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm">
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Packages for <span className="text-blue-600">you</span>
            </h1>
            <p className="text-sm text-slate-600 font-medium mt-1">
              We found {packages.length} packages that fit your budget and interests
            </p>

            <div className="mt-4 flex items-center gap-2">
              <span className="px-4 py-1.5 bg-blue-600 text-white text-xs font-bold rounded-full shadow-xs">
                {selectedTopic}
              </span>
              <span className="text-xs text-slate-500 font-medium">
                Target Budget: <strong className="text-slate-800">${budget}</strong>
              </span>
            </div>
          </div>

          {/* 3 Tiered Custom Package Cards matching Wireframe 1 */}
          <div className="space-y-6">
            {packages.map((pkg) => {
              const isLime = pkg.colorTheme === 'lime';
              const isSalmon = pkg.colorTheme === 'salmon';
              const isSky = pkg.colorTheme === 'sky';

              // Theme backgrounds and borders matching wireframe
              const cardBg = isLime 
                ? 'bg-[#eefde5] border-[#d4f8bf]' 
                : isSalmon 
                ? 'bg-[#ffe4e6] border-[#fecdd3]' 
                : 'bg-[#e0f2fe] border-[#bae6fd]';

              return (
                <div
                  key={pkg.id}
                  className={`rounded-3xl p-6 sm:p-8 border shadow-sm transition-all hover:shadow-md ${cardBg}`}
                >
                  {/* Badge */}
                  <div className="mb-3">
                    <span className="inline-block px-3.5 py-1 bg-white/95 text-slate-900 text-xs font-extrabold rounded-full shadow-xs">
                      {pkg.badge}
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                    {pkg.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 font-medium mt-1">
                    {pkg.subtitle}
                  </p>

                  {/* Metrics Row: Price | Courses | Time */}
                  <div className="flex items-center gap-6 sm:gap-8 my-5 py-2 border-y border-black/10">
                    <div>
                      <div className="text-2xl sm:text-3xl font-black text-slate-900 font-mono">
                        ${pkg.totalPrice}
                      </div>
                      <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                        Total
                      </div>
                    </div>

                    <div className="h-8 w-px bg-black/10" />

                    <div>
                      <div className="text-2xl sm:text-3xl font-black text-slate-900 font-mono">
                        {pkg.lessons.length}
                      </div>
                      <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                        Courses
                      </div>
                    </div>

                    <div className="h-8 w-px bg-black/10" />

                    <div>
                      <div className="text-2xl sm:text-3xl font-black text-slate-900 font-mono">
                        {pkg.totalHours}h
                      </div>
                      <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                        Time
                      </div>
                    </div>
                  </div>

                  {/* Lessons and individual pricing table */}
                  <div className="space-y-2 py-2">
                    {pkg.lessons.map((lesson) => (
                      <div
                        key={lesson.id}
                        className="flex items-center justify-between text-xs sm:text-sm font-semibold text-slate-800 py-1"
                      >
                        <span className="truncate pr-4">{lesson.title}</span>
                        <span className="font-mono text-slate-900 shrink-0 font-bold">
                          ${lesson.price}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Action Button: "View Package" in royal blue pill matching wireframe */}
                  <div className="mt-6 flex justify-center">
                    <button
                      onClick={() => setViewingPackage(pkg)}
                      className="w-full sm:w-72 py-3 px-6 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold rounded-full shadow-md shadow-blue-600/30 transition-all text-sm flex items-center justify-center gap-2 group"
                    >
                      <span>View Package</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right 4 Cols: Blue Student Profile Card matching Wireframe 1 exactly */}
        <div className="lg:col-span-4 lg:sticky lg:top-24">
          <div className="rounded-3xl bg-gradient-to-b from-blue-600 to-blue-700 text-white p-6 sm:p-8 shadow-xl shadow-blue-600/25 space-y-6">
            {/* Student Avatar & Name */}
            <div className="text-center">
              <div className="w-24 h-24 mx-auto rounded-full bg-white p-1.5 shadow-md shadow-blue-900/20 mb-3">
                <img
                  src={currentUser?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&h=256&q=80'}
                  alt={currentUser?.name || 'Student'}
                  referrerPolicy="no-referrer"
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
              <h3 className="text-xl font-extrabold tracking-tight">
                {currentUser?.name || 'Robert Milchick'}
              </h3>
              <p className="text-xs text-blue-100 font-medium">
                {currentUser?.role || 'Student'}
              </p>
            </div>

            <div className="h-px bg-white/20" />

            {/* Your Budget */}
            <div>
              <span className="text-xs font-semibold text-blue-200 block mb-1.5">
                Your budget
              </span>
              <div className="bg-white/20 backdrop-blur-md rounded-2xl px-4 py-3 font-mono font-black text-xl text-white flex items-center justify-between">
                <span>${budget}</span>
                <span className="text-xs font-sans text-blue-100 font-normal">total</span>
              </div>
            </div>

            {/* Interests */}
            <div>
              <span className="text-xs font-semibold text-blue-200 block mb-1.5">
                Interests
              </span>
              <span className="inline-block px-4 py-1.5 bg-white text-blue-700 font-extrabold text-xs rounded-full shadow-xs">
                {selectedTopic}
              </span>
            </div>

            <div className="h-px bg-white/20" />

            {/* Weekly Activity */}
            <div>
              <span className="text-xs font-semibold text-blue-200 block mb-3">
                Weekly Activity
              </span>
              
              {/* Activity Bar Chart */}
              <div className="grid grid-cols-7 gap-1.5 items-end h-18 bg-blue-800/40 p-2.5 rounded-2xl">
                {(currentUser?.activityDays || [
                  { day: 'M', hours: 1.5 },
                  { day: 'T', hours: 0.8 },
                  { day: 'W', hours: 1.2 },
                  { day: 'T', hours: 0.5 },
                  { day: 'F', hours: 2.0 },
                  { day: 'S', hours: 0.2 },
                  { day: 'S', hours: 0.1 }
                ]).map((d, idx) => {
                  const maxH = 2.5;
                  const pct = Math.min(100, Math.max(15, (d.hours / maxH) * 100));
                  return (
                    <div key={idx} className="flex flex-col items-center gap-1">
                      <div 
                        className="w-full bg-white rounded-md transition-all"
                        style={{ height: `${pct}%`, minHeight: '8px' }}
                        title={`${d.day}: ${d.hours} hrs`}
                      />
                      <span className="text-[10px] font-bold text-blue-200">{d.day}</span>
                    </div>
                  );
                })}
              </div>

              <p className="text-xs text-blue-100 font-medium text-center mt-3">
                You were active for {currentUser?.weeklyHoursLogged || 6}hrs this week! Good job!
              </p>
            </div>

            {/* Adjust Preferences CTA button */}
            <div className="pt-2">
              <button
                onClick={() => setActiveTab('home')}
                className="w-full py-3 bg-white hover:bg-blue-50 text-blue-700 font-extrabold rounded-2xl shadow-md transition-all text-xs text-center flex items-center justify-center gap-2"
              >
                <span>Adjust Preferences</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
