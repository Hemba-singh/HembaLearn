import React, { useState, useEffect } from 'react';
import { 
  Book,
  Clock,
  Calendar,
  Star,
  Users,
  ChevronRight,
  Search,
  Filter,
  ArrowLeft,
  Loader2,
  GraduationCap,
  DollarSign,
  BookOpen,
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '../components/Header';

interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  rating: number;
  enrolledStudents: number;
  thumbnail: string;
  price: number;
  category: string;
  lastUpdated?: Date;
  topics?: string[];
}

const courseVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, x: -20 }
};

export default function ExploreCourses() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState<Course[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [sortBy, setSortBy] = useState<'popular' | 'rating' | 'newest'>('popular');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockCourses: Course[] = [
        {
          id: '1',
          title: 'Advanced TypeScript Development',
          description: 'Master TypeScript with advanced patterns and best practices',
          instructor: 'John Doe',
          duration: '12 weeks',
          level: 'Advanced',
          rating: 4.8,
          enrolledStudents: 1250,
          thumbnail: '/course-typescript.jpg',
          price: 99.99,
          category: 'Programming',
          lastUpdated: new Date('2024-01-01'),
        },
        {
          id: '2',
          title: 'React Mastery: From Zero to Hero',
          description: 'Complete guide to modern React development',
          instructor: 'Jane Smith',
          duration: '10 weeks',
          level: 'Intermediate',
          rating: 4.9,
          enrolledStudents: 2300,
          thumbnail: '/course-react.jpg',
          price: 79.99,
          category: 'Web Development',
          lastUpdated: new Date('2024-02-01'),
        },
        // Add more mock courses as needed
      ];

      setCourses(mockCourses);
      setIsLoading(false);
    };

    fetchCourses();
  }, []);

  const filteredCourses = courses
    .filter(course => {
      if (searchQuery && !course.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !course.description.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      if (selectedCategory !== 'all' && course.category !== selectedCategory) return false;
      if (selectedLevel !== 'all' && course.level !== selectedLevel) return false;
      if (course.price < priceRange[0] || course.price > priceRange[1]) return false;
      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'popular':
          return b.enrolledStudents - a.enrolledStudents;
        case 'rating':
          return b.rating - a.rating;
        case 'newest':
          return (b.lastUpdated?.getTime() || 0) - (a.lastUpdated?.getTime() || 0);
        default:
          return 0;
      }
    });

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-100 p-4">
        <div className="p-6 max-w-7xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold mb-2">Explore Courses</h1>
            <p className="text-gray-600">Discover our wide range of courses and start learning today</p>
          </div>

          <div className="flex flex-col md:flex-row gap-6 mb-8">
            <div className="w-full md:w-64 space-y-4">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search courses..."
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
              </div>

              <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">All Categories</option>
                    <option value="programming">Programming</option>
                    <option value="design">Design</option>
                    <option value="business">Business</option>
                    <option value="marketing">Marketing</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Level</label>
                  <select
                    value={selectedLevel}
                    onChange={(e) => setSelectedLevel(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">All Levels</option>
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as 'popular' | 'rating' | 'newest')}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="popular">Most Popular</option>
                    <option value="rating">Highest Rated</option>
                    <option value="newest">Newest</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="number"
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                      className="w-24 px-2 py-1 border rounded-lg"
                      min="0"
                    />
                    <span>-</span>
                    <input
                      type="number"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                      className="w-24 px-2 py-1 border rounded-lg"
                      min="0"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-1">
              {isLoading ? (
                <div className="flex justify-center items-center h-64">
                  <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
                </div>
              ) : (
                <AnimatePresence>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredCourses.map((course) => (
                      <motion.div
                        key={course.id}
                        variants={courseVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        className="bg-white rounded-lg border hover:shadow-lg transition-shadow overflow-hidden"
                      >
                        <img
                          src={course.thumbnail}
                          alt={course.title}
                          className="w-full h-48 object-cover"
                        />
                        <div className="p-4">
                          <div className="flex items-start justify-between">
                            <h3 className="text-lg font-semibold line-clamp-2">{course.title}</h3>
                            <span className="flex items-center text-lg font-bold text-green-600">
                              <DollarSign className="w-4 h-4" />
                              {course.price}
                            </span>
                          </div>
                          
                          <p className="mt-2 text-sm text-gray-600 line-clamp-2">{course.description}</p>
                          
                          <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
                            <div className="flex items-center">
                              <GraduationCap className="w-4 h-4 mr-1" />
                              {course.level}
                            </div>
                            <div className="flex items-center">
                              <Clock className="w-4 h-4 mr-1" />
                              {course.duration}
                            </div>
                          </div>

                          <div className="mt-4 flex items-center justify-between">
                            <div className="flex items-center">
                              <Star className="w-4 h-4 text-yellow-400" />
                              <span className="ml-1 text-sm font-medium">{course.rating.toFixed(1)}</span>
                            </div>
                            <div className="flex items-center text-sm text-gray-500">
                              <Users className="w-4 h-4 mr-1" />
                              {course.enrolledStudents.toLocaleString()} students
                            </div>
                          </div>

                          <Link
                            to={`/CoursePage`}
                            className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center"
                          >
                            View Course
                            <ChevronRight className="w-4 h-4 ml-2" />
                          </Link>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </AnimatePresence>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
