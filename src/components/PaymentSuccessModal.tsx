import React from 'react';
import { CheckCircle2, ArrowRight, X, ShieldCheck, Sparkles, BookOpen } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const PaymentSuccessModal: React.FC = () => {
  const { lastPaymentReceipt, setLastPaymentReceipt, setActiveTab } = useApp();

  if (!lastPaymentReceipt) return null;

  const handleContinueLearning = () => {
    setLastPaymentReceipt(null);
    setActiveTab('my-packages');
  };

  const handleClose = () => {
    setLastPaymentReceipt(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header bar with quick Exit button on top-right */}
        <div className="flex items-center justify-between px-6 pt-5 pb-3 border-b border-slate-100 bg-emerald-50/50">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
              Payment Confirmed
            </span>
          </div>

          <button
            onClick={handleClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-full transition-colors"
            title="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Receipt Body */}
        <div className="p-6 overflow-y-auto space-y-4">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 mx-auto bg-emerald-500 text-white rounded-2xl flex items-center justify-center shadow-md shadow-emerald-500/25">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h2 className="text-xl font-black text-slate-900 tracking-tight">
              Payment Successful!
            </h2>
            <p className="text-xs text-slate-600 max-w-xs mx-auto">
              {lastPaymentReceipt.itemType === 'package' 
                ? `You're enrolled in ${lastPaymentReceipt.itemName}! All lessons are unlocked.`
                : `"${lastPaymentReceipt.itemName}" added to your custom package.`
              }
            </p>
          </div>

          {/* Compact Receipt Card */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-2.5 text-xs">
            <div className="flex justify-between items-center text-slate-500">
              <span>Transaction Ref</span>
              <span className="font-mono font-bold text-slate-800">{lastPaymentReceipt.transactionId}</span>
            </div>

            <div className="flex justify-between items-center text-slate-500">
              <span>Date</span>
              <span className="font-medium text-slate-800">{lastPaymentReceipt.date}</span>
            </div>

            {lastPaymentReceipt.itemizedLessons && lastPaymentReceipt.itemizedLessons.length > 0 && (
              <div className="pt-2 border-t border-slate-200">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                  Itemized Modules ({lastPaymentReceipt.itemizedLessons.length})
                </span>
                <div className="space-y-1 max-h-24 overflow-y-auto pr-1">
                  {lastPaymentReceipt.itemizedLessons.map((item, idx) => (
                    <div key={idx} className="flex justify-between text-slate-700 text-[11px]">
                      <span className="truncate pr-2">• {item.title}</span>
                      <span className="font-mono font-semibold shrink-0">${item.price}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="pt-2.5 border-t border-slate-200 flex justify-between items-center text-sm font-bold text-slate-900">
              <span>Total Paid</span>
              <span className="text-lg font-black text-blue-600 font-mono">${lastPaymentReceipt.amount}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 p-2.5 bg-blue-50/70 rounded-xl text-[11px] text-blue-900">
            <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
            <span>Eligible for automatic refund on any uncompleted lessons.</span>
          </div>
        </div>

        {/* Sticky Action Footer with prominent "Continue Learning" */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center gap-3">
          <button
            onClick={handleClose}
            className="w-1/3 py-2.5 bg-white hover:bg-slate-100 text-slate-700 text-xs font-semibold rounded-xl border border-slate-200 transition-colors"
          >
            Close
          </button>
          <button
            onClick={handleContinueLearning}
            className="w-2/3 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-md shadow-blue-500/25 transition-all flex items-center justify-center gap-2"
          >
            <span>Continue Learning</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
