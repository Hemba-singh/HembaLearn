import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { 
  Clock, 
  Users, 
  Star, 
  Award, 
  Book, 
  PlayCircle,
  ChevronDown,
  ChevronUp,
  Globe,
  MessageCircle,
  ThumbsUp
} from 'lucide-react';
import { CourseOverview } from './CourseOverview';
import { CourseCurriculum } from './CourseCurriculum';
import { CourseInstructor } from './CourseInstructor';
import { CourseReviews } from './CourseReviews';
import type { Course } from '../../types';

const tabs = [
  { id: 'overview', label: 'Overview' },
  { id: 'curriculum', label: 'Curriculum' },
  { id: 'instructor', label: 'Instructor' },
  { id: 'reviews', label: 'Reviews' },
];

export function CoursePage() {
  const { courseId } = useParams();
  const [activeTab, setActiveTab] = useState('overview');

  // Mock course data - replace with actual API call
  const course: Course = {
    id: courseId || '',
    title: 'Advanced Web Development Bootcamp',
    description: 'Master modern web development with this comprehensive bootcamp. Learn React, Node.js, and more.',
    instructor: {
      id: '1',
      name: 'John Doe',
      title: 'Senior Web Developer',
      email: 'john@example.com',
      avatar: '/image/instructors/john-doe.jpg',
      bio: '10+ years of experience in web development. Previously worked at Google and Amazon.',
      rating: 4.8,
      students: 15000,
      courses: 12,
    },
    thumbnail: '/image/courses/web-dev-bootcamp.jpg',
    duration: '24 hours',
    level: 'Intermediate',
    category: 'Web Development',
    rating: 4.7,
    studentsCount: 5280,
    lastUpdated: '2023-12-01',
    language: 'English',
    price: 89.99,
    features: [
      '24 hours of video content',
      'Certificate of completion',
      'Lifetime access',
      'Downloadable resources',
      'Mobile and TV access',
    ],
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return <CourseOverview course={course} />;
      case 'curriculum':
        return <CourseCurriculum courseId={courseId} />;
      case 'instructor':
        return <CourseInstructor instructor={course.instructor} />;
      case 'reviews':
        return <CourseReviews courseId={courseId} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-6">
      {/* Course Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Course Info */}
            <div className="lg:col-span-2">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {course.title}
              </h1>
              <p className="text-lg text-gray-600 mb-6">
                {course.description}
              </p>
              
              <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600">
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-yellow-400 mr-1" />
                  <span>{course.rating} ({course.studentsCount} students)</span>
                </div>
                <div className="flex items-center">
                  <Users className="h-5 w-5 text-gray-400 mr-1" />
                  <span>Created by {course.instructor.name}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-gray-400 mr-1" />
                  <span>Last updated {course.lastUpdated}</span>
                </div>
                <div className="flex items-center">
                  <Globe className="h-5 w-5 text-gray-400 mr-1" />
                  <span>{course.language}</span>
                </div>
              </div>
            </div>

            {/* Course Card */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-lg p-6 sticky top-24">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-48 object-cover rounded-lg mb-6"
                />
                <div className="text-3xl font-bold text-gray-900 mb-6">
                  ${course.price}
                </div>
                <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 mb-4">
                  Enroll Now
                </button>
                <button className="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors duration-200 mb-6">
                  Add to Wishlist
                </button>
                
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900">This course includes:</h3>
                  <ul className="space-y-3">
                    {course.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-sm text-gray-600">
                        <CheckIcon className="h-5 w-5 text-green-500 mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Course Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  py-4 px-1 border-b-2 font-medium text-sm
                  ${activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
                `}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
}

function CheckIcon(props: React.ComponentProps<'svg'>) {
  return (
    <svg
      {...props}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5 13l4 4L19 7"
      />
    </svg>
  );
}
