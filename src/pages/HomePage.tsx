import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Bell, User as UserIcon, Menu, LogOut, BookOpen, Users, Award } from 'lucide-react';
import CourseGrid from '../components/CourseGrid';
import { useAuthStore } from '../store/useAuthStore';
import MobileMenu from '../components/MobileMenu';
import { useDebounce } from '../hooks/useDebounce';
import { sampleCourses } from '../data/sampleCourses';
import { Course } from '../types';
import { motion } from 'framer-motion';
import Header from '../components/Header';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const statsItems = [
  { icon: BookOpen, label: 'Courses', value: '1000+' },
  { icon: Users, label: 'Students', value: '50,000+' },
  { icon: Award, label: 'Certificates', value: '30,000+' }
];

function HomePage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>(sampleCourses);
  const { user } = useAuthStore();
  const navigate = useNavigate();
  
  const debouncedSearch = useDebounce(searchQuery, 500);

  const handleSearch = async (query: string) => {
    setIsSearching(true);
    setTimeout(() => {
      const filtered = sampleCourses.filter(course => 
        course.title.toLowerCase().includes(query.toLowerCase()) ||
        course.description.toLowerCase().includes(query.toLowerCase()) ||
        course.category.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredCourses(filtered);
      setIsSearching(false);
    }, 500);
  };

  useEffect(() => {
    if (debouncedSearch) {
      handleSearch(debouncedSearch);
    } else {
      setFilteredCourses(sampleCourses);
    }
  }, [debouncedSearch]);

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-950 to-blue-600"></div>
          <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:30px_30px]"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl lg:text-7xl">
                Learn Without Limits
              </h1>
              <p className="mt-6 max-w-2xl mx-auto text-xl text-blue-100 sm:text-2xl">
                Start, switch, or advance your career with thousands of courses from
                world-class instructors.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/Courses')}
                  className="inline-flex items-center px-8 py-3 rounded-lg text-blue-600 bg-white hover:bg-blue-50 transition-colors text-lg font-medium shadow-lg"
                >
                  Browse Courses
                </motion.button>
              </div>
            </motion.div>

            {/* Stats */}
            <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-3">
              {statsItems.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.5 }}
                  className="flex flex-col items-center p-6 bg-white bg-opacity-10 backdrop-blur-sm rounded-lg"
                >
                  <item.icon className="h-8 w-8 text-blue-100 mb-3" />
                  <div className="text-3xl font-bold text-white mb-1">{item.value}</div>
                  <div className="text-blue-100">{item.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="bg-gradient-to-b from-blue-600 to-gray-900">
         <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Featured Courses */}
          <motion.section 
            className="mb-16"
            {...fadeIn}
          >
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-white">Featured Courses</h2>
              <Link 
                to="/courses" 
                className="underline text-white underline-offset-4 hover:text-blue-900 font-medium"
              >
                View all
              </Link>
            </div>
            <CourseGrid courses={filteredCourses} />
          </motion.section>

          {user && (
            <motion.section 
              className="mb-16"
              {...fadeIn}
            >
              <h2 className="text-2xl font-bold text-white mb-8">Recommended for You</h2>
              <CourseGrid courses={sampleCourses.slice(0, 2)} />
            </motion.section>
          )}
         </main>
        </section>

        {/* Mobile Menu */}
        <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
      </div>
    </>
  );
}

export default HomePage;
