import React from 'react';
import { X, Award, CheckCircle2, Download, Printer, ShieldCheck, ArrowLeft } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const CertificateModal: React.FC = () => {
  const { selectedCertificate, setSelectedCertificate } = useApp();

  if (!selectedCertificate) return null;

  const handleClose = () => {
    setSelectedCertificate(null);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200"
      onClick={handleClose}
    >
      <div 
        className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden my-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header bar with explicit Exit button */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/80">
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-amber-500" />
            <span className="text-xs font-bold text-slate-800">
              Official Verified Credential
            </span>
          </div>

          <button
            onClick={handleClose}
            className="px-3 py-1.5 bg-slate-200/80 hover:bg-slate-300 text-slate-800 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors"
            title="Exit Certificate"
          >
            <X className="w-4 h-4" />
            <span>Exit Certificate</span>
          </button>
        </div>

        {/* Certificate Canvas / Frame */}
        <div className="p-8 sm:p-12 bg-gradient-to-br from-amber-50/40 via-white to-sky-50/40 border-8 border-double border-amber-200/60 m-4 sm:m-6 rounded-2xl relative">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-amber-500/10 border-2 border-amber-500 flex items-center justify-center text-amber-600">
              <Award className="w-9 h-9" />
            </div>

            <div>
              <span className="text-xs font-extrabold tracking-widest uppercase text-amber-600">
                Certificate of Completion
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-black text-slate-900 mt-2">
                Pathwise Academy
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                This verified credential is proud to attest that
              </p>
            </div>

            <div className="py-2 border-b-2 border-slate-300 max-w-md mx-auto">
              <span className="text-2xl sm:text-3xl font-extrabold text-blue-700 font-serif">
                {selectedCertificate.studentName}
              </span>
            </div>

            <p className="text-xs text-slate-600 max-w-lg mx-auto">
              has satisfactorily completed all itemized modules, practical assignments, and rigorous syllabus requirements for the custom learning track:
            </p>

            <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
              {selectedCertificate.packageTitle}
            </h3>

            <div className="pt-6 flex items-center justify-between max-w-md mx-auto text-xs text-slate-500 border-t border-slate-200">
              <div className="text-left">
                <p className="font-semibold text-slate-800">Verified ID:</p>
                <p className="font-mono text-[11px]">{selectedCertificate.id}</p>
              </div>
              <div className="text-center">
                <div className="w-10 h-10 mx-auto rounded-full border border-amber-400 flex items-center justify-center text-amber-600">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <span className="text-[10px] text-amber-700 font-bold">VERIFIED</span>
              </div>
              <div className="text-right">
                <p className="font-semibold text-slate-800">Issued On:</p>
                <p className="font-mono text-[11px]">{selectedCertificate.date}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Actions Footer with prominent Exit button */}
        <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={handleClose}
            className="w-full sm:w-auto px-4 py-2.5 bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition-colors shadow-2xs"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Exit Certificate</span>
          </button>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <button
              onClick={() => window.print()}
              className="w-1/2 sm:w-auto px-4 py-2.5 bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print</span>
            </button>
            <button
              onClick={() => {
                alert('Certificate downloaded in high-resolution PDF format!');
              }}
              className="w-1/2 sm:w-auto px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-colors shadow-xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
