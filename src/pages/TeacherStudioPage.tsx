import React, { useState } from 'react';
import { 
  GraduationCap, 
  Plus, 
  DollarSign, 
  Users, 
  Star, 
  BookOpen, 
  Clock, 
  CheckCircle2, 
  Layers, 
  ArrowRight, 
  ShieldCheck,
  Sparkles,
  PlayCircle,
  FileText
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { TopicCategory, Lesson } from '../types';
import { ALL_TOPICS } from '../data/mockData';

export const TeacherStudioPage: React.FC = () => {
  const { 
    currentUser, 
    teacherLessons, 
    enlistNewCourse, 
    setActiveTab, 
    setSelectedTopic,
    allLessons
  } = useApp();

  const [isCreating, setIsCreating] = useState(false);
  const [title, setTitle] = useState('');
  const [topic, setTopic] = useState<TopicCategory>('Design');
  const [price, setPrice] = useState<number>(35);
  const [durationHours, setDurationHours] = useState<number>(8);
  const [format, setFormat] = useState<'video' | 'notes' | 'mixed'>('mixed');
  const [description, setDescription] = useState('');
  const [syllabusInput, setSyllabusInput] = useState('');
  const [successNotice, setSuccessNotice] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    const syllabusItems = syllabusInput
      ? syllabusInput.split('\n').map(s => s.trim()).filter(Boolean)
      : ['Introduction & Core Concepts', 'Hands-on Framework Application', 'Real-world Capstone Practice'];

    const newCourse = enlistNewCourse({
      title: title.trim(),
      topic,
      price: Number(price),
      durationHours: Number(durationHours),
      format,
      chapterNumber: teacherLessons.length + 1,
      instructor: currentUser ? currentUser.name : 'Pathwise Faculty',
      description: description.trim(),
      syllabus: syllabusItems
    });

    setSuccessNotice(`"${newCourse.title}" successfully published! It is now eligible for inclusion in custom student packages for ${topic}.`);
    setIsCreating(false);
    setTitle('');
    setDescription('');
    setSyllabusInput('');
    setPrice(35);
    setDurationHours(8);

    setTimeout(() => {
      setSuccessNotice(null);
    }, 6000);
  };

  // Metrics
  const totalCourses = teacherLessons.length;
  const totalRevenue = currentUser?.totalEarnings || (totalCourses * 1250);
  const estimatedStudents = totalCourses * 142 + 88;

  return (
    <div className="space-y-8 pb-16">
      {/* Top Header */}
      <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-50 text-amber-800 text-xs font-bold rounded-full border border-amber-200/60">
              <GraduationCap className="w-3.5 h-3.5 text-amber-600" />
              <span>Instructor & Faculty Portal</span>
            </div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">
              Teacher Studio
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 font-medium">
              Enlist your courses with transparent per-lesson pricing. Students automatically receive your courses inside tailor-made packages matching their budget.
            </p>
          </div>

          <button
            onClick={() => setIsCreating(true)}
            className="px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-2xl shadow-md shadow-blue-500/25 transition-all flex items-center gap-2 shrink-0 self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Enlist New Course</span>
          </button>
        </div>

        {/* Success Alert Banner */}
        {successNotice && (
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-medium flex items-center justify-between gap-3 animate-in fade-in duration-200">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{successNotice}</span>
            </div>
            <button
              onClick={() => {
                setSelectedTopic(topic);
                setActiveTab('packages');
              }}
              className="text-xs font-bold text-emerald-800 underline shrink-0"
            >
              Preview in Packages →
            </button>
          </div>
        )}
      </div>

      {/* Teacher Performance & Royalties Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-3xl bg-white border border-slate-100 shadow-2xs space-y-2">
          <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-500">Enlisted Modules</span>
            <div className="text-2xl font-black text-slate-900 font-mono mt-0.5">
              {totalCourses}
            </div>
          </div>
        </div>

        <div className="p-5 rounded-3xl bg-white border border-slate-100 shadow-2xs space-y-2">
          <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <DollarSign className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-500">Package Royalties Earned</span>
            <div className="text-2xl font-black text-emerald-600 font-mono mt-0.5">
              ${totalRevenue.toLocaleString()}
            </div>
          </div>
        </div>

        <div className="p-5 rounded-3xl bg-white border border-slate-100 shadow-2xs space-y-2">
          <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-500">Active Students</span>
            <div className="text-2xl font-black text-slate-900 font-mono mt-0.5">
              {estimatedStudents}
            </div>
          </div>
        </div>

        <div className="p-5 rounded-3xl bg-white border border-slate-100 shadow-2xs space-y-2">
          <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <Star className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-500">Instructor Rating</span>
            <div className="text-2xl font-black text-slate-900 font-mono mt-0.5">
              4.9 <span className="text-xs font-normal text-slate-400">/ 5.0</span>
            </div>
          </div>
        </div>
      </div>

      {/* Enlist Course Creation Modal / Form - Resized to fit all viewports */}
      {isCreating && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200"
          onClick={() => setIsCreating(false)}
        >
          <div 
            className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col max-h-[88vh] animate-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Sticky Compact Header */}
            <div className="px-5 py-4 border-b border-slate-100 bg-slate-50/80 flex items-center justify-between shrink-0">
              <div>
                <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider block">
                  Course Creation
                </span>
                <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight leading-tight">
                  Enlist Course in Package Catalog
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setIsCreating(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-full transition-colors"
                title="Close"
              >
                ✕
              </button>
            </div>

            {/* Scrollable Form Body */}
            <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Course / Lesson Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Advanced Design Systems with Token Variables"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Discipline / Topic
                  </label>
                  <select
                    value={topic}
                    onChange={(e) => setTopic(e.target.value as TopicCategory)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  >
                    {ALL_TOPICS.map(t => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Delivery Format
                  </label>
                  <select
                    value={format}
                    onChange={(e) => setFormat(e.target.value as 'video' | 'notes' | 'mixed')}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all capitalize"
                  >
                    <option value="mixed">Mixed (Video & Notes)</option>
                    <option value="video">Video Based Lectures</option>
                    <option value="notes">Notes & Articles Based</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Student Price ($)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-xs">$</span>
                    <input
                      type="number"
                      required
                      min={5}
                      max={200}
                      value={price}
                      onChange={(e) => setPrice(Number(e.target.value))}
                      className="w-full pl-7 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-mono font-bold focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    />
                  </div>
                  <span className="text-[10px] text-slate-400 mt-0.5 block">
                    Transparent cost in packages
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Duration (Hours)
                  </label>
                  <input
                    type="number"
                    required
                    min={1}
                    max={100}
                    value={durationHours}
                    onChange={(e) => setDurationHours(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-mono font-bold focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  />
                  <span className="text-[10px] text-slate-400 mt-0.5 block">
                    Total study time
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Course Synopsis & Objectives
                </label>
                <textarea
                  required
                  rows={2}
                  placeholder="Explain what practical skills students will master in this module..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Syllabus Highlights (1 item per line)
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g.&#10;Architecture principles & setup&#10;Semantic token models & exports"
                  value={syllabusInput}
                  onChange={(e) => setSyllabusInput(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-mono"
                />
              </div>

              {/* Sticky Action Footer */}
              <div className="pt-3 flex items-center justify-end gap-2.5 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsCreating(false)}
                  className="px-4 py-2 bg-white border border-slate-200 text-slate-700 text-xs font-semibold rounded-xl hover:bg-slate-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-md shadow-blue-500/25 transition-all flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Enlist & Publish</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* List of Enlisted Courses by this Teacher */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-extrabold text-slate-900">
            My Enlisted Courses ({teacherLessons.length})
          </h2>
          <span className="text-xs text-slate-500">
            Included in student package bundles for {currentUser?.preferredTopic || 'all topics'}
          </span>
        </div>

        {teacherLessons.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-100 shadow-sm space-y-3">
            <BookOpen className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="text-base font-bold text-slate-800">No Courses Enlisted Yet</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Share your expertise! Enlist your first course with your chosen pricing to have it automatically bundled into student packages.
            </p>
            <button
              onClick={() => setIsCreating(true)}
              className="mt-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-xs inline-flex items-center gap-2 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Enlist Your First Course</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {teacherLessons.map((lesson) => (
              <div
                key={lesson.id}
                className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-2xs hover:shadow-sm transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full">
                      {lesson.topic}
                    </span>
                    <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      Active in Packages
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900">
                    {lesson.title}
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-2">
                    {lesson.description}
                  </p>

                  <div className="flex items-center gap-3 text-[11px] text-slate-500 pt-1">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {lesson.durationHours} hours
                    </span>
                    <span>·</span>
                    <span className="capitalize">{lesson.format} Format</span>
                    <span>·</span>
                    <span>Instructor: {lesson.instructor}</span>
                  </div>

                  {lesson.syllabus && lesson.syllabus.length > 0 && (
                    <div className="pt-2 flex flex-wrap gap-1">
                      {lesson.syllabus.map((s, idx) => (
                        <span key={idx} className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md">
                          ✓ {s}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-semibold block">
                      Student Lesson Price
                    </span>
                    <span className="text-xl font-black text-slate-900 font-mono">
                      ${lesson.price}
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      setSelectedTopic(lesson.topic);
                      setActiveTab('packages');
                    }}
                    className="px-3.5 py-1.5 bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-700 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5"
                  >
                    <span>View in Package</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
