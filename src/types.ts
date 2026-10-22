export type LearningStyle = 'video' | 'notes' | 'mixed';

export type TopicCategory = 
  | 'IT & Software'
  | 'Technology'
  | 'Business'
  | 'Design'
  | 'Data science'
  | 'Marketing'
  | 'Content Creator'
  | 'Content creation';

export interface Lesson {
  id: string;
  topic: TopicCategory;
  title: string;
  description: string;
  price: number; // Transparent per-lesson cost
  durationHours: number;
  format: 'video' | 'notes' | 'mixed' | 'interactive';
  chapterNumber: number;
  instructor: string;
  instructorId?: string;
  enrolledStudentsCount?: number;
  syllabus: string[];
}

export interface LearningPackage {
  id: string;
  topic: TopicCategory;
  tier: 'starter' | 'intermediate' | 'expert';
  title: string;
  badge: string; // e.g., 'Best for beginners', 'Most Popular', 'Most Valuable'
  subtitle: string;
  totalPrice: number;
  totalHours: number;
  lessons: Lesson[];
  colorTheme: 'lime' | 'salmon' | 'sky' | 'lavender';
  targetAudience: string;
}

export interface EnrolledLesson extends Lesson {
  completed: boolean;
  completedAt?: string;
  notes?: string;
}

export interface EnrolledPackage {
  enrollmentId: string;
  packageId: string;
  title: string;
  topic: TopicCategory;
  enrolledAt: string;
  totalPaid: number;
  lessons: EnrolledLesson[];
  colorTheme: 'lime' | 'salmon' | 'sky' | 'lavender';
  status: 'active' | 'completed' | 'refunded';
  refundedAmount?: number;
  refundedAt?: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: string; // e.g. "Student", "Professor / Faculty", "Principal Designer"
  userType: 'student' | 'teacher';
  avatar: string;
  budget: number;
  preferredTopic: TopicCategory;
  preferredStyle: LearningStyle;
  weeklyHoursLogged: number;
  activityDays: { day: string; hours: number }[];
  bio?: string;
  enlistedLessonIds?: string[];
  totalEarnings?: number;
}

export interface PaymentReceipt {
  transactionId: string;
  packageTitle: string;
  itemType: 'package' | 'lesson';
  itemName: string;
  amount: number;
  date: string;
  paymentMethod: string;
  itemizedLessons?: { title: string; price: number }[];
}

export interface RefundReceipt {
  refundId: string;
  packageTitle: string;
  completedLessonsCount: number;
  refundedLessonsCount: number;
  refundedAmount: number;
  totalOriginalAmount: number;
  date: string;
  refundedLessons: { title: string; price: number }[];
}
