import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  UserProfile, 
  TopicCategory, 
  LearningStyle, 
  LearningPackage, 
  EnrolledPackage, 
  Lesson,
  PaymentReceipt,
  RefundReceipt
} from '../types';
import { DEMO_USERS, INITIAL_ENROLLED_PACKAGES, MASTER_LESSONS, getCustomPackagesForTopicAndBudget } from '../data/mockData';

export type ActiveTab = 'home' | 'packages' | 'my-packages' | 'explore' | 'certificates' | 'teach';

interface AppContextType {
  currentUser: UserProfile | null;
  users: UserProfile[];
  switchUser: (userId: string) => void;
  createNewUser: (
    name: string, 
    email: string, 
    role: string, 
    budget: number, 
    topic: TopicCategory, 
    userType: 'student' | 'teacher',
    bio?: string
  ) => void;
  signOut: () => void;
  updateUserBudget: (newBudget: number) => void;
  updateUserType: (type: 'student' | 'teacher') => void;
  isTeacher: boolean;
  
  // Customization Wizard State
  budget: number;
  setBudget: (budget: number) => void;
  selectedTopic: TopicCategory;
  setSelectedTopic: (topic: TopicCategory) => void;
  learningStyle: LearningStyle;
  setLearningStyle: (style: LearningStyle) => void;

  // Navigation
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;

  // Enrolled Packages & Progress
  enrolledPackages: EnrolledPackage[];
  enrollInPackage: (pkg: LearningPackage) => void;
  addLessonToPackage: (enrollmentId: string, lesson: Lesson) => void;
  removeLessonFromPackage: (enrollmentId: string, lessonId: string) => void;
  toggleLessonCompletion: (enrollmentId: string, lessonId: string) => void;
  requestRefund: (enrollmentId: string) => void;

  // Teacher Studio & Course Enlistment
  allLessons: Lesson[];
  teacherLessons: Lesson[];
  enlistNewCourse: (courseData: Omit<Lesson, 'id' | 'enrolledStudentsCount'>) => Lesson;

  // Modals & Receipts
  viewingPackage: LearningPackage | null;
  setViewingPackage: (pkg: LearningPackage | null) => void;
  lastPaymentReceipt: PaymentReceipt | null;
  setLastPaymentReceipt: (receipt: PaymentReceipt | null) => void;
  lastRefundReceipt: RefundReceipt | null;
  setLastRefundReceipt: (receipt: RefundReceipt | null) => void;
  isSignInModalOpen: boolean;
  setIsSignInModalOpen: (open: boolean) => void;
  isAddLessonModalOpen: boolean;
  setIsAddLessonModalOpen: (open: boolean) => void;
  selectedEnrollmentForAddLesson: EnrolledPackage | null;
  setSelectedEnrollmentForAddLesson: (enr: EnrolledPackage | null) => void;
  selectedCertificate: { studentName: string; packageTitle: string; date: string; hours: number; id: string } | null;
  setSelectedCertificate: (cert: { studentName: string; packageTitle: string; date: string; hours: number; id: string } | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Users state
  const [users, setUsers] = useState<UserProfile[]>(() => {
    const saved = localStorage.getItem('pathwise_users');
    return saved ? JSON.parse(saved) : DEMO_USERS;
  });

  const [currentUserId, setCurrentUserId] = useState<string>(() => {
    const savedId = localStorage.getItem('pathwise_current_user_id');
    return savedId || DEMO_USERS[0].id;
  });

  const currentUser = users.find(u => u.id === currentUserId) || users[0] || null;
  const isTeacher = currentUser?.userType === 'teacher';

  // Custom/enlisted lessons by teachers
  const [customLessons, setCustomLessons] = useState<Lesson[]>(() => {
    const saved = localStorage.getItem('pathwise_custom_lessons');
    return saved ? JSON.parse(saved) : [];
  });

  // Customization state
  const [budget, setBudget] = useState<number>(currentUser ? (currentUser.budget || 135) : 135);
  const [selectedTopic, setSelectedTopic] = useState<TopicCategory>(currentUser ? currentUser.preferredTopic : 'Design');
  const [learningStyle, setLearningStyle] = useState<LearningStyle>(currentUser ? currentUser.preferredStyle : 'mixed');

  // Navigation
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');

  // Enrolled packages map keyed by user id
  const [enrolledMap, setEnrolledMap] = useState<Record<string, EnrolledPackage[]>>(() => {
    const saved = localStorage.getItem('pathwise_enrolled_map');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return {
      [DEMO_USERS[0].id]: INITIAL_ENROLLED_PACKAGES
    };
  });

  // Modals state
  const [viewingPackage, setViewingPackage] = useState<LearningPackage | null>(null);
  const [lastPaymentReceipt, setLastPaymentReceipt] = useState<PaymentReceipt | null>(null);
  const [lastRefundReceipt, setLastRefundReceipt] = useState<RefundReceipt | null>(null);
  const [isSignInModalOpen, setIsSignInModalOpen] = useState<boolean>(false);
  const [isAddLessonModalOpen, setIsAddLessonModalOpen] = useState<boolean>(false);
  const [selectedEnrollmentForAddLesson, setSelectedEnrollmentForAddLesson] = useState<EnrolledPackage | null>(null);
  const [selectedCertificate, setSelectedCertificate] = useState<{ studentName: string; packageTitle: string; date: string; hours: number; id: string } | null>(null);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('pathwise_users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem('pathwise_current_user_id', currentUserId);
  }, [currentUserId]);

  useEffect(() => {
    localStorage.setItem('pathwise_enrolled_map', JSON.stringify(enrolledMap));
  }, [enrolledMap]);

  useEffect(() => {
    localStorage.setItem('pathwise_custom_lessons', JSON.stringify(customLessons));
  }, [customLessons]);

  // Combined lessons catalog (Master + Teacher-enlisted)
  const allLessons: Lesson[] = [...MASTER_LESSONS, ...customLessons];

  // Lessons taught or enlisted by current user
  const teacherLessons: Lesson[] = currentUser 
    ? allLessons.filter(l => 
        l.instructorId === currentUser.id || 
        (currentUser.enlistedLessonIds && currentUser.enlistedLessonIds.includes(l.id)) ||
        l.instructor.toLowerCase().includes(currentUser.name.toLowerCase())
      )
    : [];

  // When user changes, update default budget & topic
  useEffect(() => {
    if (currentUser) {
      if (currentUser.budget > 0) setBudget(currentUser.budget);
      setSelectedTopic(currentUser.preferredTopic);
      setLearningStyle(currentUser.preferredStyle);
    }
  }, [currentUserId]);

  const enrolledPackages = (currentUser && enrolledMap[currentUser.id]) || [];

  const switchUser = (userId: string) => {
    setCurrentUserId(userId);
    setIsSignInModalOpen(false);
  };

  const updateUserType = (type: 'student' | 'teacher') => {
    if (!currentUser) return;
    setUsers(prev => prev.map(u => u.id === currentUser.id ? { ...u, userType: type } : u));
  };

  const createNewUser = (
    name: string, 
    email: string, 
    role: string, 
    userBudget: number, 
    topic: TopicCategory,
    userType: 'student' | 'teacher',
    bio?: string
  ) => {
    const newUser: UserProfile = {
      id: `user-${Date.now()}`,
      name,
      email,
      role: role || (userType === 'teacher' ? 'Instructor' : 'Student'),
      userType,
      avatar: `https://api.dicebear.com/7.x/notionists/svg?seed=${encodeURIComponent(name)}&backgroundColor=${userType === 'teacher' ? 'ffe4e6' : 'e0f2fe'}`,
      budget: userType === 'teacher' ? 0 : userBudget,
      preferredTopic: topic,
      preferredStyle: 'mixed',
      weeklyHoursLogged: userType === 'teacher' ? 12 : 0,
      bio: bio || (userType === 'teacher' ? 'Independent Course Instructor on Pathwise' : 'Student Learner'),
      enlistedLessonIds: [],
      totalEarnings: 0,
      activityDays: [
        { day: 'M', hours: 0 },
        { day: 'T', hours: 0 },
        { day: 'W', hours: 0 },
        { day: 'T', hours: 0 },
        { day: 'F', hours: 0 },
        { day: 'S', hours: 0 },
        { day: 'S', hours: 0 }
      ]
    };

    setUsers(prev => [...prev, newUser]);
    setCurrentUserId(newUser.id);
    setIsSignInModalOpen(false);

    if (userType === 'teacher') {
      setActiveTab('teach');
    }
  };

  const enlistNewCourse = (courseData: Omit<Lesson, 'id' | 'enrolledStudentsCount'>): Lesson => {
    const newLessonId = `tch-${Date.now()}`;
    const newLesson: Lesson = {
      ...courseData,
      id: newLessonId,
      instructorId: currentUser ? currentUser.id : 'anon-teacher',
      instructor: currentUser ? currentUser.name : courseData.instructor,
      enrolledStudentsCount: 0
    };

    setCustomLessons(prev => [newLesson, ...prev]);

    // Update teacher's enlistedLessonIds
    if (currentUser) {
      setUsers(prev => prev.map(u => {
        if (u.id === currentUser.id) {
          return {
            ...u,
            enlistedLessonIds: [...(u.enlistedLessonIds || []), newLessonId]
          };
        }
        return u;
      }));
    }

    return newLesson;
  };

  const signOut = () => {
    setIsSignInModalOpen(true);
  };

  const updateUserBudget = (newBudget: number) => {
    setBudget(newBudget);
    if (currentUser && currentUser.userType === 'student') {
      setUsers(prev => prev.map(u => u.id === currentUser.id ? { ...u, budget: newBudget } : u));
    }
  };

  const enrollInPackage = (pkg: LearningPackage) => {
    if (!currentUser) return;

    const newEnrollment: EnrolledPackage = {
      enrollmentId: `enr-${Date.now()}`,
      packageId: pkg.id,
      title: `${pkg.title} (${pkg.topic})`,
      topic: pkg.topic,
      enrolledAt: new Date().toISOString(),
      totalPaid: pkg.totalPrice,
      colorTheme: pkg.colorTheme,
      status: 'active',
      lessons: pkg.lessons.map(l => ({
        ...l,
        completed: false
      }))
    };

    setEnrolledMap(prev => ({
      ...prev,
      [currentUser.id]: [newEnrollment, ...(prev[currentUser.id] || [])]
    }));

    // Create payment receipt
    const receipt: PaymentReceipt = {
      transactionId: `TXN-${Math.floor(100000 + Math.random() * 900000)}`,
      packageTitle: pkg.title,
      itemType: 'package',
      itemName: `${pkg.title} - ${pkg.topic}`,
      amount: pkg.totalPrice,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      paymentMethod: 'Student Learning Account (Simulated)',
      itemizedLessons: pkg.lessons.map(l => ({ title: l.title, price: l.price }))
    };

    setLastPaymentReceipt(receipt);
    setViewingPackage(null);
  };

  const addLessonToPackage = (enrollmentId: string, lesson: Lesson) => {
    if (!currentUser) return;

    setEnrolledMap(prev => {
      const userList = prev[currentUser.id] || [];
      const updated = userList.map(enr => {
        if (enr.enrollmentId === enrollmentId) {
          const alreadyExists = enr.lessons.some(l => l.id === lesson.id);
          if (alreadyExists) return enr;
          return {
            ...enr,
            totalPaid: enr.totalPaid + lesson.price,
            lessons: [
              ...enr.lessons,
              {
                ...lesson,
                completed: false
              }
            ]
          };
        }
        return enr;
      });
      return { ...prev, [currentUser.id]: updated };
    });

    const receipt: PaymentReceipt = {
      transactionId: `TXN-${Math.floor(100000 + Math.random() * 900000)}`,
      packageTitle: 'Custom Lesson Addition',
      itemType: 'lesson',
      itemName: lesson.title,
      amount: lesson.price,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      paymentMethod: 'Student Learning Account (Simulated)',
      itemizedLessons: [{ title: lesson.title, price: lesson.price }]
    };

    setLastPaymentReceipt(receipt);
    setIsAddLessonModalOpen(false);
  };

  const removeLessonFromPackage = (enrollmentId: string, lessonId: string) => {
    if (!currentUser) return;

    setEnrolledMap(prev => {
      const userList = prev[currentUser.id] || [];
      const updated = userList.map(enr => {
        if (enr.enrollmentId === enrollmentId) {
          const lessonToRemove = enr.lessons.find(l => l.id === lessonId);
          if (!lessonToRemove || lessonToRemove.completed) return enr;
          return {
            ...enr,
            totalPaid: Math.max(0, enr.totalPaid - lessonToRemove.price),
            lessons: enr.lessons.filter(l => l.id !== lessonId)
          };
        }
        return enr;
      });
      return { ...prev, [currentUser.id]: updated };
    });
  };

  const toggleLessonCompletion = (enrollmentId: string, lessonId: string) => {
    if (!currentUser) return;

    setEnrolledMap(prev => {
      const userList = prev[currentUser.id] || [];
      const updated = userList.map(enr => {
        if (enr.enrollmentId === enrollmentId) {
          const newLessons = enr.lessons.map(l => {
            if (l.id === lessonId) {
              const nextState = !l.completed;
              return {
                ...l,
                completed: nextState,
                completedAt: nextState ? new Date().toISOString() : undefined
              };
            }
            return l;
          });

          const allCompleted = newLessons.length > 0 && newLessons.every(l => l.completed);

          return {
            ...enr,
            lessons: newLessons,
            status: allCompleted ? ('completed' as const) : ('active' as const)
          };
        }
        return enr;
      });
      return { ...prev, [currentUser.id]: updated };
    });
  };

  const requestRefund = (enrollmentId: string) => {
    if (!currentUser) return;

    const userList = enrolledMap[currentUser.id] || [];
    const target = userList.find(enr => enr.enrollmentId === enrollmentId);
    if (!target) return;

    const uncompletedLessons = target.lessons.filter(l => !l.completed);
    const completedLessons = target.lessons.filter(l => l.completed);
    const refundAmount = uncompletedLessons.reduce((sum, l) => sum + l.price, 0);

    setEnrolledMap(prev => {
      const updated = (prev[currentUser.id] || []).map(enr => {
        if (enr.enrollmentId === enrollmentId) {
          return {
            ...enr,
            status: 'refunded' as const,
            refundedAmount: refundAmount,
            refundedAt: new Date().toISOString()
          };
        }
        return enr;
      });
      return { ...prev, [currentUser.id]: updated };
    });

    const receipt: RefundReceipt = {
      refundId: `RFD-${Math.floor(100000 + Math.random() * 900000)}`,
      packageTitle: target.title,
      completedLessonsCount: completedLessons.length,
      refundedLessonsCount: uncompletedLessons.length,
      refundedAmount: refundAmount,
      totalOriginalAmount: target.totalPaid,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      refundedLessons: uncompletedLessons.map(l => ({ title: l.title, price: l.price }))
    };

    setLastRefundReceipt(receipt);
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        users,
        switchUser,
        createNewUser,
        signOut,
        updateUserBudget,
        updateUserType,
        isTeacher,
        budget,
        setBudget,
        selectedTopic,
        setSelectedTopic,
        learningStyle,
        setLearningStyle,
        activeTab,
        setActiveTab,
        enrolledPackages,
        enrollInPackage,
        addLessonToPackage,
        removeLessonFromPackage,
        toggleLessonCompletion,
        requestRefund,
        allLessons,
        teacherLessons,
        enlistNewCourse,
        viewingPackage,
        setViewingPackage,
        lastPaymentReceipt,
        setLastPaymentReceipt,
        lastRefundReceipt,
        setLastRefundReceipt,
        isSignInModalOpen,
        setIsSignInModalOpen,
        isAddLessonModalOpen,
        setIsAddLessonModalOpen,
        selectedEnrollmentForAddLesson,
        setSelectedEnrollmentForAddLesson,
        selectedCertificate,
        setSelectedCertificate
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
