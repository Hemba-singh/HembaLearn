import { Course } from '../types';

export const sampleCourses: Course[] = [
  {
    id: '1',
    title: 'Introduction to Web Development',
    description: 'Learn the fundamentals of web development including HTML, CSS, and JavaScript.',
    instructor: {
      id: '1',
      name: 'John Doe',
      title: 'Senior Web Developer',
      bio: 'Experienced web developer with 10+ years in the industry',
      avatar: 'https://ui-avatars.com/api/?name=John+Doe',
      rating: 4.8,
      studentsCount: 15000,
      coursesCount: 12,
    },
    thumbnail: 'https://placehold.co/600x400?text=Web+Development',
    duration: '12 weeks',
    level: 'Beginner',
    category: 'Web Development',
    price: 49.99,
    rating: 4.7,
    studentsCount: 1200,
    lastUpdated: '2024-01-15',
    language: 'English',
    features: ['24/7 Support', 'Certificate', 'Downloadable Resources'],
  },
  {
    id: '2',
    title: 'Advanced React Patterns',
    description: 'Master advanced React concepts and design patterns for scalable applications.',
    instructor: {
      id: '2',
      name: 'Jane Smith',
      title: 'React Specialist',
      bio: 'React expert and tech lead at a Fortune 500 company',
      avatar: 'https://ui-avatars.com/api/?name=Jane+Smith',
      rating: 4.9,
      studentsCount: 12000,
      coursesCount: 8,
    },
    thumbnail: 'https://placehold.co/600x400?text=React+Patterns',
    duration: '8 weeks',
    level: 'Advanced',
    category: 'React',
    price: 79.99,
    rating: 4.9,
    studentsCount: 800,
    lastUpdated: '2024-02-01',
    language: 'English',
    features: ['Project Files', 'Live Sessions', 'Community Access'],
  },
  {
    id: '3',
    title: 'Python for Data Science',
    description: 'Learn Python programming with a focus on data analysis and machine learning.',
    instructor: {
      id: '3',
      name: 'Mike Johnson',
      title: 'Data Scientist',
      bio: 'PhD in Machine Learning with industry experience',
      avatar: 'https://ui-avatars.com/api/?name=Mike+Johnson',
      rating: 4.7,
      studentsCount: 9000,
      coursesCount: 5,
    },
    thumbnail: 'https://placehold.co/600x400?text=Python+Data+Science',
    duration: '10 weeks',
    level: 'Intermediate',
    category: 'Data Science',
    price: 69.99,
    rating: 4.8,
    studentsCount: 950,
    lastUpdated: '2024-01-20',
    language: 'English',
    features: ['Practice Exercises', 'Real-world Projects', 'Career Guidance'],
  },
];