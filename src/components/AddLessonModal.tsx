import React, { useState } from 'react';
import { X, Plus, Clock, PlayCircle, FileText, Search, ShieldCheck } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { MASTER_LESSONS } from '../data/mockData';
import { Lesson } from '../types';

export const AddLessonModal: React.FC = () => {
  const { 
    isAddLessonModalOpen, 
    setIsAddLessonModalOpen, 
    selectedEnrollmentForAddLesson, 
    addLessonToPackage,
    allLessons
  } = useApp();

  const [searchTerm, setSearchTerm] = useState('');

  if (!isAddLessonModalOpen || !selectedEnrollmentForAddLesson) return null;

  // Filter lessons that aren't already in this enrolled package
  const existingLessonIds = new Set(selectedEnrollmentForAddLesson.lessons.map(l => l.id));
  
  // First prioritize lessons from the same topic, then other relevant lessons
  const availableLessons = allLessons.filter(l => !existingLessonIds.has(l.id))
    .filter(l => {
      if (!searchTerm) return true;
      const term = searchTerm.toLowerCase();
      return (
        l.title.toLowerCase().includes(term) ||
        l.description.toLowerCase().includes(term) ||
        l.topic.toLowerCase().includes(term) ||
        l.instructor.toLowerCase().includes(term)
      );
    })
    .sort((a, b) => {
      // Prioritize same topic first
      if (a.topic === selectedEnrollmentForAddLesson.topic && b.topic !== selectedEnrollmentForAddLesson.topic) return -1;
      if (b.topic === selectedEnrollmentForAddLesson.topic && a.topic !== selectedEnrollmentForAddLesson.topic) return 1;
      return a.price - b.price;
    });

  const handleAdd = (lesson: Lesson) => {
    addLessonToPackage(selectedEnrollmentForAddLesson.enrollmentId, lesson);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 sm:p-8 border-b border-slate-100 bg-slate-50/60">
          <div className="flex items-start justify-between gap-4">
            <div>
              <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full uppercase tracking-wider">
                Expand Curriculum
              </span>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight mt-2">
                Add Individual Lesson
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Customize <strong className="text-slate-800">{selectedEnrollmentForAddLesson.title}</strong> by adding specific masterclasses with transparent pricing.
              </p>
            </div>
            <button
              onClick={() => setIsAddLessonModalOpen(false)}
              className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Search Bar */}
          <div className="relative mt-4">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search available lessons by skill, instructor, or topic..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </div>
        </div>

        {/* List of Available Lessons */}
        <div className="p-6 sm:p-8 max-h-[50vh] overflow-y-auto space-y-3">
          {availableLessons.length === 0 ? (
            <div className="text-center py-8 text-slate-500 text-xs">
              No additional lessons found matching your query.
            </div>
          ) : (
            availableLessons.map(lesson => (
              <div
                key={lesson.id}
                className="p-4 rounded-2xl border border-slate-200/80 hover:border-blue-300 hover:bg-blue-50/20 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="space-y-1 max-w-md">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md">
                      {lesson.topic}
                    </span>
                    <h3 className="text-sm font-bold text-slate-900">
                      {lesson.title}
                    </h3>
                  </div>
                  <p className="text-xs text-slate-500 line-clamp-2">
                    {lesson.description}
                  </p>
                  <div className="flex items-center gap-3 text-[11px] text-slate-500 pt-1">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-400" />
                      {lesson.durationHours}h
                    </span>
                    <span>·</span>
                    <span className="capitalize">{lesson.format} Based</span>
                    <span>·</span>
                    <span>By {lesson.instructor}</span>
                  </div>
                </div>

                <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100 gap-2 shrink-0">
                  <div className="text-right">
                    <span className="text-base font-extrabold text-slate-900 font-mono">
                      ${lesson.price}
                    </span>
                    <span className="text-[10px] text-slate-400 block">individual price</span>
                  </div>
                  <button
                    onClick={() => handleAdd(lesson)}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-xs transition-all text-xs flex items-center gap-1.5"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Purchase & Add</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-6 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Adds instantly to your package progress. Uncompleted added lessons remain eligible for refund.</span>
          </div>
          <button
            onClick={() => setIsAddLessonModalOpen(false)}
            className="px-4 py-2 bg-white border border-slate-200 text-slate-700 text-xs font-semibold rounded-xl hover:bg-slate-100 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
