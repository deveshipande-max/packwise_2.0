import React, { useState } from 'react';
import { 
  BookOpen, 
  Plus, 
  Trash2, 
  RotateCcw, 
  CheckCircle2, 
  Circle, 
  Clock, 
  DollarSign, 
  ArrowRight, 
  AlertTriangle, 
  Award,
  Sparkles
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { EnrolledPackage, EnrolledLesson } from '../types';

export const MyPackagesPage: React.FC = () => {
  const { 
    enrolledPackages, 
    toggleLessonCompletion, 
    removeLessonFromPackage, 
    requestRefund,
    setIsAddLessonModalOpen,
    setSelectedEnrollmentForAddLesson,
    setActiveTab,
    setSelectedCertificate,
    currentUser
  } = useApp();

  const [confirmRefundFor, setConfirmRefundFor] = useState<EnrolledPackage | null>(null);

  // Overall progress calculation across all active packages
  const allLessons = enrolledPackages
    .filter(p => p.status === 'active' || p.status === 'completed')
    .flatMap(p => p.lessons);

  const completedLessons = allLessons.filter(l => l.completed);
  const globalProgress = allLessons.length > 0 
    ? Math.round((completedLessons.length / allLessons.length) * 100) 
    : 0;

  const handleOpenAddLesson = (pkg: EnrolledPackage) => {
    setSelectedEnrollmentForAddLesson(pkg);
    setIsAddLessonModalOpen(true);
  };

  const handleConfirmRefund = () => {
    if (!confirmRefundFor) return;
    requestRefund(confirmRefundFor.enrollmentId);
    setConfirmRefundFor(null);
  };

  if (enrolledPackages.length === 0) {
    return (
      <div className="bg-white rounded-3xl p-12 text-center border border-slate-100 shadow-sm max-w-xl mx-auto my-12 space-y-4">
        <div className="w-16 h-16 mx-auto rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
          <BookOpen className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-black text-slate-900">No Enrolled Packages Yet</h2>
        <p className="text-xs sm:text-sm text-slate-600">
          Customize a learning package matching your exact budget and start mastering new skills today.
        </p>
        <button
          onClick={() => setActiveTab('packages')}
          className="mt-4 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-md shadow-blue-500/25 transition-all text-xs flex items-center gap-2 mx-auto"
        >
          <span>Find Packages For Your Budget</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-16">
      {/* Header & Global Progress Bar */}
      <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">
              My Learning Packages
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 font-medium mt-1">
              Track your syllabus milestones, add or remove modules, or manage flexible unstudied lesson refunds.
            </p>
          </div>
          <button
            onClick={() => setActiveTab('packages')}
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-sm transition-all flex items-center gap-2 shrink-0 self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Enroll in Another Package</span>
          </button>
        </div>

        {/* Global Progress Bar Bar */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-700">
            <span className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-600" />
              Overall Curriculum Progress
            </span>
            <span className="font-mono text-blue-600 text-sm">
              {completedLessons.length} / {allLessons.length} Lessons ({globalProgress}%)
            </span>
          </div>

          <div className="w-full h-3.5 bg-slate-200 rounded-full overflow-hidden p-0.5">
            <div 
              className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full transition-all duration-500 shadow-xs"
              style={{ width: `${globalProgress}%` }}
            />
          </div>
        </div>
      </div>

      {/* List of Enrolled Packages */}
      <div className="space-y-6">
        {enrolledPackages.map((enr) => {
          const totalLessons = enr.lessons.length;
          const completedCount = enr.lessons.filter(l => l.completed).length;
          const pct = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;
          const isRefunded = enr.status === 'refunded';
          const isCompleted = enr.status === 'completed' || (totalLessons > 0 && completedCount === totalLessons);

          return (
            <div
              key={enr.enrollmentId}
              className={`bg-white rounded-3xl p-6 sm:p-8 border shadow-sm transition-all ${
                isRefunded 
                  ? 'border-amber-200 bg-amber-50/20 opacity-80' 
                  : isCompleted 
                  ? 'border-emerald-200' 
                  : 'border-slate-100'
              }`}
            >
              {/* Package Top Header */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-5 border-b border-slate-100">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <span className="text-xs font-extrabold px-3 py-1 bg-blue-50 text-blue-700 rounded-full">
                      {enr.topic}
                    </span>
                    {isRefunded ? (
                      <span className="text-xs font-bold px-3 py-1 bg-amber-100 text-amber-900 rounded-full flex items-center gap-1">
                        <RotateCcw className="w-3 h-3" />
                        Refunded (${enr.refundedAmount || 0} returned)
                      </span>
                    ) : isCompleted ? (
                      <span className="text-xs font-bold px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        Package Completed
                      </span>
                    ) : (
                      <span className="text-xs font-bold px-3 py-1 bg-blue-600 text-white rounded-full">
                        In Progress
                      </span>
                    )}
                  </div>
                  <h2 className="text-2xl font-extrabold text-slate-900">
                    {enr.title}
                  </h2>
                  <p className="text-xs text-slate-500">
                    Enrolled on {new Date(enr.enrolledAt).toLocaleDateString()} · Total Package Value: <strong className="text-slate-800 font-mono">${enr.totalPaid}</strong>
                  </p>
                </div>

                {/* Top Action buttons */}
                <div className="flex items-center gap-2 self-start sm:self-auto flex-wrap">
                  {!isRefunded && (
                    <>
                      <button
                        onClick={() => handleOpenAddLesson(enr)}
                        className="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl shadow-xs transition-all flex items-center gap-1.5"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add Lesson</span>
                      </button>

                      {isCompleted && (
                        <button
                          onClick={() => setSelectedCertificate({
                            studentName: currentUser?.name || 'Student',
                            packageTitle: enr.title,
                            date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
                            hours: enr.lessons.reduce((acc, l) => acc + l.durationHours, 0),
                            id: `CRT-${enr.enrollmentId.slice(-6).toUpperCase()}`
                          })}
                          className="px-3.5 py-2 bg-amber-500 hover:bg-amber-600 text-white text-xs font-semibold rounded-xl shadow-xs transition-all flex items-center gap-1.5"
                        >
                          <Award className="w-3.5 h-3.5" />
                          <span>View Certificate</span>
                        </button>
                      )}

                      <button
                        onClick={() => setConfirmRefundFor(enr)}
                        className="px-3.5 py-2 bg-white hover:bg-rose-50 text-rose-600 border border-rose-200 text-xs font-semibold rounded-xl transition-colors flex items-center gap-1.5"
                        title="Calculate and receive refund for uncompleted lessons"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Request Refund</span>
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* Progress Bar within this Package */}
              <div className="py-4 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-slate-600">
                  <span>Package Milestone Progress:</span>
                  <span className="font-mono text-blue-600">
                    {completedCount} / {totalLessons} Lessons Finished ({pct}%)
                  </span>
                </div>
                <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200/60">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${
                      isRefunded ? 'bg-amber-400' : isCompleted ? 'bg-emerald-500' : 'bg-blue-600'
                    }`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>

              {/* Individual Lessons List with completion checkmark, price transparency, and remove option */}
              <div className="mt-4 space-y-2.5">
                <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase tracking-wider px-1">
                  <span>Itemized Lessons & Status</span>
                  <span>Cost Allocation</span>
                </div>

                {enr.lessons.map((lesson) => (
                  <div
                    key={lesson.id}
                    className={`p-3.5 rounded-2xl border transition-all flex items-center justify-between gap-4 ${
                      lesson.completed
                        ? 'bg-emerald-50/40 border-emerald-200'
                        : 'bg-slate-50/60 border-slate-200/80 hover:bg-white'
                    }`}
                  >
                    {/* Completion Toggle */}
                    <div className="flex items-center gap-3 max-w-xl">
                      <button
                        disabled={isRefunded}
                        onClick={() => toggleLessonCompletion(enr.enrollmentId, lesson.id)}
                        className={`transition-colors p-1 rounded-lg ${
                          lesson.completed 
                            ? 'text-emerald-600 hover:text-emerald-700' 
                            : 'text-slate-400 hover:text-blue-600'
                        } ${isRefunded ? 'opacity-50 cursor-not-allowed' : ''}`}
                        title={lesson.completed ? "Mark as in-progress" : "Mark as completed"}
                      >
                        {lesson.completed ? (
                          <CheckCircle2 className="w-6 h-6 fill-emerald-100" />
                        ) : (
                          <Circle className="w-6 h-6" />
                        )}
                      </button>

                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className={`text-sm font-bold ${lesson.completed ? 'text-slate-900 line-through decoration-emerald-500/60' : 'text-slate-900'}`}>
                            {lesson.title}
                          </h4>
                          {lesson.completed && (
                            <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-md">
                              Completed
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2.5 text-[11px] text-slate-500 mt-0.5">
                          <span>{lesson.durationHours} hours</span>
                          <span>·</span>
                          <span className="capitalize">{lesson.format} Based</span>
                          <span>·</span>
                          <span>{lesson.instructor}</span>
                        </div>
                      </div>
                    </div>

                    {/* Right side: Individual Lesson Cost & Remove button */}
                    <div className="flex items-center gap-4 shrink-0">
                      <div className="text-right">
                        <span className="font-mono text-sm font-extrabold text-slate-900 block">
                          ${lesson.price}
                        </span>
                        <span className="text-[10px] text-slate-400">lesson cost</span>
                      </div>

                      {/* Remove lesson button: allowed if not completed and package is active */}
                      {!isRefunded && (
                        lesson.completed ? (
                          <span 
                            title="Completed lesson is non-refundable"
                            className="text-[11px] text-slate-400 font-medium px-2 py-1 rounded bg-slate-100"
                          >
                            Retained
                          </span>
                        ) : (
                          <button
                            onClick={() => removeLessonFromPackage(enr.enrollmentId, lesson.id)}
                            className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
                            title="Remove this unstarted lesson from package"
                            aria-label={`Remove lesson ${lesson.title}`}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Pre-Refund Confirmation Dialog */}
      {confirmRefundFor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div 
            className="w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-100 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <div>
              <h3 className="text-xl font-bold text-slate-900">
                Confirm Package Refund
              </h3>
              <p className="text-xs text-slate-600 mt-1">
                You will receive a 100% refund for all uncompleted lessons in <strong className="text-slate-800">{confirmRefundFor.title}</strong>.
              </p>
            </div>

            {/* Calculations breakdown */}
            {(() => {
              const uncompleted = confirmRefundFor.lessons.filter(l => !l.completed);
              const completed = confirmRefundFor.lessons.filter(l => l.completed);
              const refundAmount = uncompleted.reduce((acc, l) => acc + l.price, 0);

              return (
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2 text-xs">
                  <div className="flex justify-between text-slate-600">
                    <span>Original package enrollment:</span>
                    <span className="font-mono font-bold">${confirmRefundFor.totalPaid}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Completed lessons retained ({completed.length}):</span>
                    <span className="font-mono">${completed.reduce((acc, l) => acc + l.price, 0)}</span>
                  </div>
                  <div className="pt-2 border-t border-slate-200 flex justify-between text-sm font-bold text-slate-900">
                    <span>Your Refund Credit ({uncompleted.length} lessons):</span>
                    <span className="font-mono text-emerald-600 text-base font-extrabold">+${refundAmount}</span>
                  </div>
                </div>
              );
            })()}

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => setConfirmRefundFor(null)}
                className="w-1/2 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-xs transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmRefund}
                className="w-1/2 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-semibold rounded-xl shadow-sm text-xs transition-colors flex items-center justify-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Process Refund</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
