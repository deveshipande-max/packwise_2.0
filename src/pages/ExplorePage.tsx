import React, { useState } from 'react';
import { Search, Filter, Star, Clock, BookOpen, ArrowRight, ShieldCheck, PlayCircle, FileText } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { MASTER_LESSONS, ALL_TOPICS, getCustomPackagesForTopicAndBudget } from '../data/mockData';
import { TopicCategory } from '../types';

export const ExplorePage: React.FC = () => {
  const { setSelectedTopic, setActiveTab, setViewingPackage, budget, allLessons } = useApp();
  const [selectedFilter, setSelectedFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredLessons = allLessons.filter(lesson => {
    const matchesFilter = selectedFilter === 'All' || lesson.topic === selectedFilter;
    const matchesSearch = !searchQuery || 
      lesson.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lesson.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lesson.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleSelectTopicToBuild = (topic: TopicCategory) => {
    setSelectedTopic(topic);
    setActiveTab('packages');
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Header & Search */}
      <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">
              Explore Courses & Masterclasses
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 font-medium mt-1">
              Browse our transparent course catalog. Select individual modules or let our algorithm build your ideal package.
            </p>
          </div>

          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by skill, topic, instructor..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <button
            onClick={() => setSelectedFilter('All')}
            className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
              selectedFilter === 'All'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            All Disciplines
          </button>
          {ALL_TOPICS.map(topic => (
            <button
              key={topic}
              onClick={() => setSelectedFilter(topic)}
              className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                selectedFilter === topic
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              {topic}
            </button>
          ))}
        </div>
      </div>

      {/* Recommended Custom Bundles Banner */}
      {selectedFilter !== 'All' && (
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 rounded-3xl shadow-lg shadow-blue-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <span className="text-xs font-bold bg-white/20 px-3 py-1 rounded-full uppercase tracking-wider">
              Budget Optimizer
            </span>
            <h3 className="text-xl font-extrabold mt-1">
              Want a tailor-made package for {selectedFilter}?
            </h3>
            <p className="text-xs text-blue-100">
              We will assemble the highest-impact modules that fit your exact ${budget} budget.
            </p>
          </div>
          <button
            onClick={() => handleSelectTopicToBuild(selectedFilter as TopicCategory)}
            className="px-6 py-3 bg-white hover:bg-blue-50 text-blue-700 text-xs font-extrabold rounded-2xl shadow-md transition-all whitespace-nowrap flex items-center gap-2"
          >
            <span>Generate {selectedFilter} Packages</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Grid of Courses matching pastel wireframe aesthetic */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredLessons.map((lesson, idx) => {
          // Dynamic soft pastel tints inspired by wireframes 3 & 4
          const colorTints = [
            'bg-[#dcfce7]/60 border-[#bbf7d0]', // mint green
            'bg-[#ffe4e6]/60 border-[#fecdd3]', // peach/salmon
            'bg-[#e0f2fe]/60 border-[#bae6fd]', // sky blue
            'bg-[#ede9fe]/60 border-[#ddd6fe]', // lavender
            'bg-[#fef9c3]/60 border-[#fef08a]'  // soft yellow
          ];
          const tint = colorTints[idx % colorTints.length];

          return (
            <div
              key={lesson.id}
              className={`p-6 rounded-3xl border shadow-xs hover:shadow-md transition-all flex flex-col justify-between ${tint}`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 bg-white/90 text-slate-800 text-[11px] font-bold rounded-full shadow-2xs">
                    {lesson.topic}
                  </span>
                  <div className="flex items-center gap-1 text-amber-600 font-bold text-xs bg-white/80 px-2 py-0.5 rounded-full">
                    <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                    <span>4.9</span>
                  </div>
                </div>

                <div>
                  <h3 className="text-base font-extrabold text-slate-900 leading-snug">
                    {lesson.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-1 line-clamp-2">
                    {lesson.description}
                  </p>
                </div>

                <div className="space-y-1.5 pt-2 text-[11px] text-slate-600">
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>Study Time: <strong>{lesson.durationHours} hours</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    {lesson.format === 'video' ? <PlayCircle className="w-3.5 h-3.5 text-blue-500" /> : <FileText className="w-3.5 h-3.5 text-amber-500" />}
                    <span className="capitalize">{lesson.format} Format</span>
                  </div>
                  <div className="text-slate-500">
                    By {lesson.instructor}
                  </div>
                </div>
              </div>

              {/* Price & Action */}
              <div className="mt-6 pt-4 border-t border-black/10 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-500 font-semibold uppercase block">Transparent Cost</span>
                  <span className="text-xl font-black text-slate-900 font-mono">${lesson.price}</span>
                </div>

                <button
                  onClick={() => handleSelectTopicToBuild(lesson.topic)}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-xs transition-all flex items-center gap-1.5"
                >
                  <span>Build Package</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
