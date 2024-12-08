import { Course } from "../types";

export const courses: Course[] = [
  {
    id: '1',
    title: 'Introduction to Web Development',
    description: 'Learn the fundamentals of web development including HTML, CSS, and JavaScript.',
    instructor: 'Sarah Johnson',
    thumbnail: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80&w=1000',
    duration: '8 weeks',
    level: 'Beginner',
    category: 'Web Development'
  },
  {
    id: '2',
    title: 'Data Science Fundamentals',
    description: 'Master the basics of data analysis, statistics, and machine learning.',
    instructor: 'Michael Chen',
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000',
    duration: '10 weeks',
    level: 'Intermediate',
    category: 'Data Science'
  },
  {
    id: '3',
    title: 'Advanced React Development',
    description: 'Deep dive into React hooks, patterns, and best practices.',
    instructor: 'Emily Rodriguez',
    thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=1000',
    duration: '6 weeks',
    level: 'Advanced',
    category: 'Web Development'
  }
] as const;