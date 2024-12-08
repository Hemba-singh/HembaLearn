export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: Instructor;
  thumbnail: string;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  category: string;
  price: number;
  rating: number;
  studentsCount: number;
  lastUpdated: string;
  language: string;
  features?: string[];
}

export interface Instructor {
  id: string;
  name: string;
  title: string;
  email: string;
  avatar: string;
  bio: string;
  rating: number;
  students: number;
  courses: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'instructor';
  avatar: string;
}

export interface CourseSection {
  id: string;
  title: string;
  duration: string;
  lessons: CourseLesson[];
}

export interface CourseLesson {
  id: string;
  title: string;
  duration: string;
  type: 'video' | 'resource' | 'exercise' | 'quiz';
  isPreview: boolean;
}

export interface CourseReview {
  id: string;
  user: {
    name: string;
    avatar: string;
  };
  rating: number;
  date: Date;
  content: string;
  helpful: number;
  replies: number;
}

export interface NotificationType {
  id: string;
  type: 'course' | 'announcement' | 'achievement' | 'reminder';
  title: string;
  message: string;
  date: Date;
  read: boolean;
  actionUrl?: string;
}