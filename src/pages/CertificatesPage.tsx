import React from 'react';
import { Award, CheckCircle2, Clock, Download, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const CertificatesPage: React.FC = () => {
  const { enrolledPackages, currentUser, setSelectedCertificate, setActiveTab } = useApp();

  const completedPackages = enrolledPackages.filter(
    p => p.status === 'completed' || (p.lessons.length > 0 && p.lessons.every(l => l.completed))
  );

  const inProgressPackages = enrolledPackages.filter(
    p => p.status === 'active' && !p.lessons.every(l => l.completed)
  );

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">
              Verified Certificates & Diplomas
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 font-medium">
              Every completed customized package earns an accredited, shareable digital credential.
            </p>
          </div>
        </div>
      </div>

      {/* Earned Certificates */}
      <div className="space-y-4">
        <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
          <span>Earned Credentials</span>
          <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold">
            {completedPackages.length}
          </span>
        </h2>

        {completedPackages.length === 0 ? (
          <div className="p-8 rounded-3xl bg-white border border-slate-100 text-center space-y-3">
            <Award className="w-10 h-10 text-slate-300 mx-auto" />
            <h3 className="text-base font-bold text-slate-800">No Certificates Earned Yet</h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Finish all modules in one of your packages to automatically generate your verified diploma!
            </p>
            <button
              onClick={() => setActiveTab('my-packages')}
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs transition-all inline-flex items-center gap-2"
            >
              <span>Continue Package Milestones</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {completedPackages.map(pkg => {
              const totalHours = pkg.lessons.reduce((acc, l) => acc + l.durationHours, 0);
              const certId = `CRT-${pkg.enrollmentId.slice(-6).toUpperCase()}`;

              return (
                <div
                  key={pkg.enrollmentId}
                  className="p-6 rounded-3xl bg-gradient-to-br from-amber-50/50 via-white to-sky-50/50 border border-amber-200/80 shadow-sm flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold text-amber-800 bg-amber-100 px-2.5 py-1 rounded-full flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5 text-amber-700" />
                        Verified Completion
                      </span>
                      <span className="text-[11px] font-mono text-slate-400">
                        {certId}
                      </span>
                    </div>

                    <h3 className="text-xl font-black text-slate-900 leading-tight">
                      {pkg.title}
                    </h3>
                    <p className="text-xs text-slate-600">
                      Awarded to <strong>{currentUser?.name || 'Student'}</strong> for completing all {pkg.lessons.length} core and elective modules ({totalHours} hours).
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-amber-200/50 flex items-center justify-between">
                    <span className="text-xs text-slate-500 font-medium">
                      Accredited by Pathwise Academy
                    </span>
                    <button
                      onClick={() => setSelectedCertificate({
                        studentName: currentUser?.name || 'Student',
                        packageTitle: pkg.title,
                        date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
                        hours: totalHours,
                        id: certId
                      })}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs transition-all shadow-xs flex items-center gap-1.5"
                    >
                      <Award className="w-3.5 h-3.5" />
                      <span>View Credential</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* In-Progress Certificates */}
      {inProgressPackages.length > 0 && (
        <div className="space-y-4 pt-4">
          <h2 className="text-lg font-extrabold text-slate-900">
            In-Progress Toward Certificate
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {inProgressPackages.map(pkg => {
              const completedCount = pkg.lessons.filter(l => l.completed).length;
              const totalCount = pkg.lessons.length;
              const pct = Math.round((completedCount / totalCount) * 100);

              return (
                <div
                  key={pkg.enrollmentId}
                  className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-slate-900">
                      {pkg.title}
                    </h3>
                    <span className="text-xs font-mono font-bold text-blue-600">
                      {pct}%
                    </span>
                  </div>

                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-blue-600 rounded-full transition-all"
                      style={{ width: `${pct}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
                    <span>{totalCount - completedCount} lessons remaining</span>
                    <button
                      onClick={() => setActiveTab('my-packages')}
                      className="text-blue-600 font-bold hover:underline"
                    >
                      Complete Lessons →
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
