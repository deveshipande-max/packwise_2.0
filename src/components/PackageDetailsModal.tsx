import React from 'react';
import { X, Clock, BookOpen, CheckCircle, ShieldCheck, ArrowRight, PlayCircle, FileText, Layers } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const PackageDetailsModal: React.FC = () => {
  const { viewingPackage, setViewingPackage, enrollInPackage } = useApp();

  if (!viewingPackage) return null;

  const totalCalculated = viewingPackage.lessons.reduce((sum, l) => sum + l.price, 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with theme color accent */}
        <div className={`p-6 sm:p-8 border-b border-slate-100 ${
          viewingPackage.colorTheme === 'lime' 
            ? 'bg-lime-50/70' 
            : viewingPackage.colorTheme === 'salmon' 
            ? 'bg-rose-50/70' 
            : 'bg-sky-50/70'
        }`}>
          <div className="flex items-start justify-between gap-4">
            <div>
              <span className="inline-block px-3 py-1 bg-white/90 text-slate-800 text-xs font-bold rounded-full shadow-xs mb-3">
                {viewingPackage.badge}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {viewingPackage.title}
              </h2>
              <p className="text-sm text-slate-600 mt-1 max-w-lg">
                {viewingPackage.subtitle}
              </p>
            </div>
            <button
              onClick={() => setViewingPackage(null)}
              className="p-2 text-slate-400 hover:text-slate-700 hover:bg-white/80 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Metrics */}
          <div className="flex flex-wrap items-center gap-6 mt-6 pt-4 border-t border-slate-200/50">
            <div>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">Total Price</span>
              <span className="text-2xl font-black text-slate-900 font-mono">${viewingPackage.totalPrice}</span>
            </div>
            <div className="h-8 w-px bg-slate-300" />
            <div>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">Curated Courses</span>
              <span className="text-2xl font-black text-slate-900 font-mono">{viewingPackage.lessons.length}</span>
            </div>
            <div className="h-8 w-px bg-slate-300" />
            <div>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">Study Duration</span>
              <span className="text-2xl font-black text-slate-900 font-mono">{viewingPackage.totalHours}h</span>
            </div>
          </div>
        </div>

        {/* Transparency Banner */}
        <div className="bg-blue-50/60 px-6 sm:px-8 py-3 border-b border-blue-100 flex items-center gap-3">
          <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0" />
          <p className="text-xs text-blue-900 font-medium">
            <strong className="font-bold">100% Price Transparency:</strong> Every dollar in your ${viewingPackage.totalPrice} package is strictly mapped to the instructor lessons below. No platform surcharge or hidden fees.
          </p>
        </div>

        {/* Detailed Lesson Breakdown */}
        <div className="p-6 sm:p-8 max-h-[50vh] overflow-y-auto space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Itemized Lesson Syllabus & Individual Pricing
            </h3>
            <span className="text-xs font-mono text-slate-500">
              {viewingPackage.lessons.length} Modules Included
            </span>
          </div>

          <div className="space-y-3">
            {viewingPackage.lessons.map((lesson, idx) => (
              <div 
                key={lesson.id}
                className="p-4 rounded-2xl border border-slate-200/80 bg-slate-50/50 hover:bg-white hover:border-blue-200 hover:shadow-xs transition-all"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-lg bg-blue-100 text-blue-700 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">
                        {lesson.title}
                      </h4>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {lesson.description}
                      </p>
                      
                      <div className="flex flex-wrap items-center gap-3 mt-2 text-[11px] text-slate-500">
                        <span className="flex items-center gap-1 font-medium">
                          <Clock className="w-3 h-3 text-slate-400" />
                          {lesson.durationHours} hours
                        </span>
                        <span>·</span>
                        <span className="flex items-center gap-1 font-medium capitalize">
                          {lesson.format === 'video' ? <PlayCircle className="w-3 h-3 text-blue-500" /> : <FileText className="w-3 h-3 text-amber-500" />}
                          {lesson.format} Based
                        </span>
                        <span>·</span>
                        <span className="text-slate-600 font-medium">Instructor: {lesson.instructor}</span>
                      </div>

                      {/* Syllabus preview */}
                      <div className="mt-2.5 pt-2 border-t border-slate-200/60 flex flex-wrap gap-1.5">
                        {lesson.syllabus.map((topicItem, sIdx) => (
                          <span 
                            key={sIdx}
                            className="text-[10px] bg-white border border-slate-200 text-slate-600 px-2 py-0.5 rounded-md"
                          >
                            ✓ {topicItem}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Individual Price tag */}
                  <div className="text-right shrink-0">
                    <div className="text-base font-extrabold text-slate-900 font-mono">
                      ${lesson.price}
                    </div>
                    <span className="text-[10px] text-slate-400 uppercase font-semibold">
                      Lesson Cost
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Price Math Summary Table */}
          <div className="mt-4 p-4 rounded-2xl bg-slate-100/80 border border-slate-200 space-y-2 text-xs">
            <div className="flex items-center justify-between text-slate-600">
              <span>Combined individual lesson value:</span>
              <span className="font-mono font-bold text-slate-800">${totalCalculated}</span>
            </div>
            <div className="flex items-center justify-between text-slate-600">
              <span>Transparent package bundle discount:</span>
              <span className="font-mono font-bold text-emerald-600">$0.00 (Zero Hidden Markups)</span>
            </div>
            <div className="pt-2 border-t border-slate-300/60 flex items-center justify-between text-sm font-bold text-slate-900">
              <span>Your Exact Package Total:</span>
              <span className="font-mono text-base text-blue-600">${viewingPackage.totalPrice}</span>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-500 text-center sm:text-left">
            Includes lifetime access, uncompleted lesson refund guarantee, and certificate of completion.
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => setViewingPackage(null)}
              className="w-1/2 sm:w-auto px-5 py-2.5 bg-white hover:bg-slate-100 text-slate-700 font-medium rounded-xl border border-slate-200 transition-colors text-sm"
            >
              Back to Catalog
            </button>
            <button
              onClick={() => enrollInPackage(viewingPackage)}
              className="w-1/2 sm:w-auto px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-md shadow-blue-500/25 transition-all text-sm flex items-center justify-center gap-2"
            >
              <span>Enroll Now for ${viewingPackage.totalPrice}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
