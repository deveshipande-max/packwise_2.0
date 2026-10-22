import React from 'react';
import { ArrowRight, Check, Sparkles, BookOpen, Clock, ShieldCheck } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { TopicCategory } from '../types';

interface TopicItem {
  id: TopicCategory;
  title: string;
  subtitle: string;
  bgClass: string;
  hoverClass: string;
  borderClass: string;
}

const TOPICS_CONFIG: TopicItem[] = [
  {
    id: 'Design',
    title: 'Design',
    subtitle: 'Create thoughtful, useful digital experiences.',
    bgClass: 'bg-[#FFD6C9]/60',
    hoverClass: 'hover:bg-[#FFD6C9]/85',
    borderClass: 'border-[#FFBCA8]'
  },
  {
    id: 'IT & Software',
    title: 'Technology',
    subtitle: "Build products with today's most useful tools.",
    bgClass: 'bg-[#E8EDFF]',
    hoverClass: 'hover:bg-[#DDE5FF]',
    borderClass: 'border-[#CBD7FF]'
  },
  {
    id: 'Business',
    title: 'Business',
    subtitle: 'Grow teams, strategy, and leadership skills.',
    bgClass: 'bg-[#E3FCC8]',
    hoverClass: 'hover:bg-[#D4F8B3]',
    borderClass: 'border-[#C1F099]'
  },
  {
    id: 'Data science',
    title: 'Data science',
    subtitle: 'Turn complex data into clear decisions.',
    bgClass: 'bg-[#EDE9FE]',
    hoverClass: 'hover:bg-[#DDD6FE]',
    borderClass: 'border-[#C4B5FD]'
  },
  {
    id: 'Marketing',
    title: 'Marketing',
    subtitle: 'Connect ideas with the people who need them.',
    bgClass: 'bg-[#FEE9AA]',
    hoverClass: 'hover:bg-[#FDE293]',
    borderClass: 'border-[#FCD34D]'
  },
  {
    id: 'Content Creator',
    title: 'Content creation',
    subtitle: 'Tell better stories across every channel.',
    bgClass: 'bg-[#CCFBF1]',
    hoverClass: 'hover:bg-[#99F6E4]',
    borderClass: 'border-[#5EEAD4]'
  }
];

// Aligned budget markers matching reference image
const BUDGET_MIN = 45;
const BUDGET_MAX = 300;
const MARKERS = [45, 120, 210, 300];

export const HomePage: React.FC = () => {
  const { 
    budget, 
    updateUserBudget, 
    selectedTopic, 
    setSelectedTopic, 
    setActiveTab 
  } = useApp();

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateUserBudget(Number(e.target.value));
  };

  const getPercentage = (val: number) => {
    return Math.min(100, Math.max(0, ((val - BUDGET_MIN) / (BUDGET_MAX - BUDGET_MIN)) * 100));
  };

  const currentPercent = getPercentage(budget);

  // Dynamic estimate courses based on budget
  const estimatedCourses = budget <= 60 ? '2-3' : budget <= 120 ? '3-4' : '3-5';

  return (
    <div className="space-y-8 pb-16">
      {/* Top Tag & Hero Header matching reference screenshot */}
      <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
        <div className="space-y-4 max-w-2xl">
          {/* Tag pill: "Your learning, your way" */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#EEF2FF] text-[#4F46E5] text-xs font-bold rounded-full">
            <span>Your learning, your way</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-none">
            Invest in your <span className="text-blue-600">future</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed max-w-xl">
            Set your preferences and we'll do the course matching, scheduling, and budget balancing for you.
          </p>
        </div>

        {/* Top-right Estimated Plan Card (Soft Lime Green from reference) */}
        <div className="p-6 rounded-3xl bg-[#E3FCC8] text-slate-800 border border-[#D0F8AB] shadow-sm w-full lg:w-72 shrink-0 space-y-1">
          <span className="text-xs font-semibold text-slate-600 block">
            Estimated plan
          </span>
          <div className="text-2xl sm:text-3xl font-black text-slate-900">
            {estimatedCourses} courses
          </div>
          <p className="text-xs text-slate-600 font-medium">
            Based on your current choices
          </p>
        </div>
      </div>

      {/* Main Interactive Configuration Card (White container from reference) */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-100 shadow-sm space-y-10">
        
        {/* Step 01: Set your total budget */}
        <div className="space-y-6">
          <div className="flex items-start gap-3.5">
            <div className="w-8 h-8 rounded-xl bg-[#EEF2FF] text-blue-700 font-extrabold text-sm flex items-center justify-center shrink-0 mt-0.5">
              01
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-slate-900">
                Set your total budget
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 font-medium">
                You'll only pay for the courses included in your path.
              </p>
            </div>
          </div>

          {/* Amount Display with large blue text */}
          <div className="pt-2">
            <span className="text-sm font-semibold text-slate-700 mr-2">Your budget</span>
            <span className="text-3xl sm:text-4xl font-black text-blue-600 font-mono tracking-tight">
              ${budget}
            </span>
            <span className="text-xs text-slate-500 font-medium ml-2">one-time total</span>
          </div>

          {/* Mathematically Aligned Budget Slider Track */}
          <div className="space-y-3 pt-2">
            <div className="relative w-full h-8 flex items-center">
              {/* Background Grey Track */}
              <div className="absolute left-0 right-0 h-2.5 bg-slate-100 rounded-full" />

              {/* Active Blue Track */}
              <div 
                className="absolute left-0 h-2.5 bg-blue-600 rounded-full pointer-events-none transition-all duration-75"
                style={{ width: `${currentPercent}%` }}
              />

              {/* Slider Thumb Handle */}
              <div 
                className="absolute w-6 h-6 bg-white border-4 border-blue-600 rounded-full shadow-md pointer-events-none transition-all duration-75 -translate-x-1/2"
                style={{ left: `${currentPercent}%` }}
              />

              {/* Transparent Native Range Input for 100% Native Mouse & Touch Drag */}
              <input
                type="range"
                min={BUDGET_MIN}
                max={BUDGET_MAX}
                step={15}
                value={budget}
                onChange={handleSliderChange}
                aria-label="Set budget slider"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              />
            </div>

            {/* Exactly Aligned Tick Numbers Below Slider Track */}
            <div className="relative w-full h-6 select-none text-xs font-semibold text-slate-400">
              {MARKERS.map((val) => {
                const pct = getPercentage(val);
                const isSelected = budget === val;
                
                // Alignment transform: 0% aligns flush left, 100% aligns flush right, middle centered
                const transformClass = pct === 0 
                  ? 'translate-x-0' 
                  : pct === 100 
                  ? '-translate-x-full' 
                  : '-translate-x-1/2';

                return (
                  <button
                    key={val}
                    type="button"
                    onClick={() => updateUserBudget(val)}
                    style={{ left: `${pct}%` }}
                    className={`absolute top-0 cursor-pointer transition-colors ${transformClass} ${
                      isSelected ? 'text-blue-600 font-bold' : 'hover:text-slate-700'
                    }`}
                  >
                    ${val}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Thin Divider Line matching screenshot */}
        <div className="h-px bg-slate-100" />

        {/* Step 02: What do you want to learn? */}
        <div className="space-y-6">
          <div className="flex items-start gap-3.5">
            <div className="w-8 h-8 rounded-xl bg-[#EEF2FF] text-blue-700 font-extrabold text-sm flex items-center justify-center shrink-0 mt-0.5">
              02
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-slate-900">
                What do you want to learn?
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 font-medium">
                Pick the topic you'd most like to make progress in.
              </p>
            </div>
          </div>

          {/* Multi-Colored Cards Grid matching reference screenshot */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {TOPICS_CONFIG.map((item) => {
              const isSelected = selectedTopic === item.id || (item.id === 'IT & Software' && selectedTopic === 'Technology');

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSelectedTopic(item.id)}
                  className={`p-6 rounded-3xl text-left transition-all relative border flex flex-col justify-between min-h-[140px] group ${item.bgClass} ${item.hoverClass} ${
                    isSelected
                      ? 'border-blue-600 ring-2 ring-blue-600 shadow-sm'
                      : 'border-transparent'
                  }`}
                >
                  {/* Top-Right Checkmark for selected card */}
                  {isSelected && (
                    <div className="absolute top-4 right-4 w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-xs">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                  )}

                  <div>
                    <h3 className="text-base font-extrabold text-slate-900">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-600 font-medium mt-1 leading-snug">
                      {item.subtitle}
                    </p>
                  </div>

                  <div className="pt-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    {item.title === 'Design' ? '12+ Lessons Available' : 'Curated Curriculum'}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Action Button: "Build My Package!" in consistent royal blue */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-100">
          <div className="text-xs text-slate-500 text-center sm:text-left">
            <span>Selected path: <strong className="text-slate-800">{selectedTopic}</strong> at <strong className="text-blue-600 font-mono">${budget}</strong>.</span>
          </div>

          <button
            onClick={() => setActiveTab('packages')}
            className="w-full sm:w-auto px-8 py-3.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold rounded-2xl shadow-lg shadow-blue-500/25 transition-all text-sm flex items-center justify-center gap-2 group"
          >
            <span>Build My Package!</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};
