import React, { useState } from 'react';
import { X, LogOut, UserCheck, Plus, Sparkles, CheckCircle2, GraduationCap, BookOpen } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ALL_TOPICS } from '../data/mockData';
import { TopicCategory } from '../types';

export const SignInModal: React.FC = () => {
  const { 
    isSignInModalOpen, 
    setIsSignInModalOpen, 
    currentUser, 
    users, 
    switchUser, 
    createNewUser,
    setActiveTab 
  } = useApp();

  const [activeMode, setActiveMode] = useState<'switch' | 'new'>('switch');
  const [userType, setUserType] = useState<'student' | 'teacher'>('student');
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newRole, setNewRole] = useState('');
  const [newBudget, setNewBudget] = useState(120);
  const [newTopic, setNewTopic] = useState<TopicCategory>('Design');
  const [newBio, setNewBio] = useState('');

  if (!isSignInModalOpen) return null;

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newEmail.trim()) return;

    const defaultRole = userType === 'teacher' ? (newRole || 'Course Instructor') : (newRole || 'Student');

    createNewUser(
      newName.trim(), 
      newEmail.trim(), 
      defaultRole, 
      newBudget, 
      newTopic, 
      userType, 
      newBio.trim()
    );

    setNewName('');
    setNewEmail('');
    setNewRole('');
    setNewBio('');
  };

  const students = users.filter(u => u.userType !== 'teacher');
  const teachers = users.filter(u => u.userType === 'teacher');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <UserCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Sign In & Profiles</h2>
              <p className="text-xs text-slate-500">Sign in as a student or enlist courses as an instructor</p>
            </div>
          </div>
          <button
            onClick={() => setIsSignInModalOpen(false)}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switch */}
        <div className="flex border-b border-slate-100 px-6 pt-3 gap-6">
          <button
            onClick={() => setActiveMode('switch')}
            className={`pb-3 text-sm font-semibold transition-all relative ${
              activeMode === 'switch' ? 'text-blue-600' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Switch Account
            {activeMode === 'switch' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full" />
            )}
          </button>
          <button
            onClick={() => setActiveMode('new')}
            className={`pb-3 text-sm font-semibold transition-all relative flex items-center gap-1.5 ${
              activeMode === 'new' ? 'text-blue-600' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Plus className="w-4 h-4" />
            Register / Join
            {activeMode === 'new' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full" />
            )}
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 max-h-[70vh] overflow-y-auto">
          {activeMode === 'switch' ? (
            <div className="space-y-5">
              {/* Teachers Section */}
              <div className="space-y-2">
                <span className="text-[11px] font-bold text-amber-700 uppercase tracking-wider flex items-center gap-1.5">
                  <GraduationCap className="w-3.5 h-3.5 text-amber-600" />
                  Teachers & Course Instructors
                </span>

                <div className="space-y-2">
                  {teachers.map(u => {
                    const isCurrent = currentUser?.id === u.id;
                    return (
                      <div
                        key={u.id}
                        onClick={() => {
                          switchUser(u.id);
                          setActiveTab('teach');
                        }}
                        className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between group ${
                          isCurrent 
                            ? 'border-amber-400 bg-amber-50/50 shadow-xs' 
                            : 'border-slate-200 hover:border-amber-300 hover:bg-slate-50'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={u.avatar}
                            alt={u.name}
                            referrerPolicy="no-referrer"
                            className="w-10 h-10 rounded-full object-cover border border-amber-200"
                          />
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-bold text-slate-900 group-hover:text-amber-700 transition-colors">
                                {u.name}
                              </span>
                              <span className="px-2 py-0.5 bg-amber-100 text-amber-800 text-[10px] font-bold rounded-md">
                                Teacher
                              </span>
                            </div>
                            <p className="text-xs text-slate-500">{u.role} · {u.email}</p>
                            <p className="text-[11px] text-amber-700 font-medium">
                              Enlists courses in {u.preferredTopic}
                            </p>
                          </div>
                        </div>

                        <button
                          className={`text-xs font-semibold px-3 py-1.5 rounded-xl transition-all ${
                            isCurrent
                              ? 'bg-amber-600 text-white'
                              : 'bg-white text-slate-700 border border-slate-200 group-hover:border-amber-500 group-hover:text-amber-700'
                          }`}
                        >
                          {isCurrent ? 'Signed In' : 'Sign In as Teacher'}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Students Section */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <span className="text-[11px] font-bold text-blue-700 uppercase tracking-wider flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-blue-600" />
                  Student Learners
                </span>

                <div className="space-y-2">
                  {students.map(u => {
                    const isCurrent = currentUser?.id === u.id;
                    return (
                      <div
                        key={u.id}
                        onClick={() => {
                          switchUser(u.id);
                          setActiveTab('packages');
                        }}
                        className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between group ${
                          isCurrent 
                            ? 'border-blue-600 bg-blue-50/50 shadow-xs' 
                            : 'border-slate-200 hover:border-blue-300 hover:bg-slate-50'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={u.avatar}
                            alt={u.name}
                            referrerPolicy="no-referrer"
                            className="w-10 h-10 rounded-full object-cover border border-slate-200"
                          />
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                                {u.name}
                              </span>
                              {isCurrent && (
                                <span className="px-2 py-0.5 bg-blue-600 text-white text-[10px] font-semibold rounded-full flex items-center gap-1">
                                  <CheckCircle2 className="w-2.5 h-2.5" />
                                  Active
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-slate-500">{u.role} · {u.email}</p>
                            <p className="text-[11px] text-blue-600 font-medium">
                              Budget: ${u.budget} · Interest: {u.preferredTopic}
                            </p>
                          </div>
                        </div>

                        <button
                          className={`text-xs font-semibold px-3 py-1.5 rounded-xl transition-all ${
                            isCurrent
                              ? 'bg-blue-600 text-white'
                              : 'bg-white text-slate-700 border border-slate-200 group-hover:border-blue-600 group-hover:text-blue-600'
                          }`}
                        >
                          {isCurrent ? 'Signed In' : 'Sign In'}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : (
            <form onSubmit={handleCreateSubmit} className="space-y-4">
              {/* Account Type Selector */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  I want to join as:
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setUserType('student')}
                    className={`py-2.5 px-3 rounded-2xl border text-left transition-all ${
                      userType === 'student'
                        ? 'border-blue-600 bg-blue-50/60 ring-2 ring-blue-500 text-blue-900 font-bold'
                        : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-blue-600" />
                      <span className="text-xs">Student Learner</span>
                    </div>
                    <span className="text-[10px] text-slate-500 block mt-0.5">
                      Build custom course packages for your budget
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setUserType('teacher')}
                    className={`py-2.5 px-3 rounded-2xl border text-left transition-all ${
                      userType === 'teacher'
                        ? 'border-amber-500 bg-amber-50/60 ring-2 ring-amber-400 text-amber-950 font-bold'
                        : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <GraduationCap className="w-4 h-4 text-amber-600" />
                      <span className="text-xs">Teacher / Faculty</span>
                    </div>
                    <span className="text-[10px] text-slate-500 block mt-0.5">
                      Enlist courses with transparent student pricing
                    </span>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder={userType === 'teacher' ? 'e.g. Prof. Jordan Bell' : 'e.g. Alex Morgan'}
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@institution.edu"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {userType === 'teacher' ? 'Faculty / Teaching Title' : 'Role / Background'}
                  </label>
                  <input
                    type="text"
                    placeholder={userType === 'teacher' ? 'Lead Design Instructor' : 'Student / Learner'}
                    value={newRole}
                    onChange={(e) => setNewRole(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {userType === 'teacher' ? 'Primary Discipline' : 'Initial Budget ($)'}
                  </label>
                  {userType === 'teacher' ? (
                    <select
                      value={newTopic}
                      onChange={(e) => setNewTopic(e.target.value as TopicCategory)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    >
                      {ALL_TOPICS.map(t => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type="number"
                      min={15}
                      max={500}
                      value={newBudget}
                      onChange={(e) => setNewBudget(Number(e.target.value))}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    />
                  )}
                </div>
              </div>

              {userType === 'student' && (
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Primary Interest Area
                  </label>
                  <select
                    value={newTopic}
                    onChange={(e) => setNewTopic(e.target.value as TopicCategory)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  >
                    {ALL_TOPICS.map(t => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
              )}

              {userType === 'teacher' && (
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Instructor Bio & Credentials
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Briefly describe your experience and teaching focus..."
                    value={newBio}
                    onChange={(e) => setNewBio(e.target.value)}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  />
                </div>
              )}

              <button
                type="submit"
                className="w-full mt-2 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-md shadow-blue-500/25 transition-all text-sm flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>
                  {userType === 'teacher' ? 'Create Teacher Profile & Enlist Courses' : 'Create Account & Start Learning'}
                </span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
