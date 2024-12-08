import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Clock, 
  Book, 
  Users,
  Star,
  Play,
  Download,
  Share2
} from 'lucide-react';

export function CoursePage() {
  const { id } = useParams();
  
  // Mock course data - replace with actual API call
  const course = {
    id,
    title: 'Advanced TypeScript Development',
    description: 'Master TypeScript with advanced patterns and best practices. Learn how to build scalable applications with TypeScript\'s powerful type system.',
    instructor: 'John Doe',
    duration: '12 weeks',
    totalLessons: 48,
    enrolledStudents: 1250,
    rating: 4.8,
    thumbnail: '/course-typescript.jpg',
    price: 99.99,
    level: 'Advanced',
    topics: [
      'TypeScript Fundamentals',
      'Advanced Types',
      'Generics',
      'Decorators',
      'Project Architecture',
      'Testing with TypeScript'
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation Bar */}
      <nav className="bg-white shadow-sm py-4 px-6 fixed w-full top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link 
            to="/explore" 
            className="flex items-center text-gray-600 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Courses
          </Link>
          
          <div className="flex items-center space-x-4">
            <button className="text-gray-600 hover:text-blue-600 transition-colors">
              <Share2 className="w-5 h-5" />
            </button>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Enroll Now
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-20 pb-12">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
          <div className="max-w-7xl mx-auto px-6">
            <h1 className="text-4xl font-bold mb-4">{course.title}</h1>
            <p className="text-lg text-blue-100 mb-8">{course.description}</p>
            
            <div className="flex flex-wrap gap-6 text-sm">
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                {course.duration}
              </div>
              <div className="flex items-center">
                <Book className="w-4 h-4 mr-2" />
                {course.totalLessons} lessons
              </div>
              <div className="flex items-center">
                <Users className="w-4 h-4 mr-2" />
                {course.enrolledStudents.toLocaleString()} students
              </div>
              <div className="flex items-center">
                <Star className="w-4 h-4 mr-2 text-yellow-400" />
                {course.rating} rating
              </div>
            </div>
          </div>
        </div>

        {/* Course Content */}
        <div className="max-w-7xl mx-auto px-6 mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Column */}
          <div className="lg:col-span-2">
            <section className="bg-white rounded-lg shadow-sm p-6 mb-8">
              <h2 className="text-2xl font-semibold mb-4">What You'll Learn</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {course.topics.map((topic, index) => (
                  <div key={index} className="flex items-start">
                    <Play className="w-5 h-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span>{topic}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-semibold mb-4">Course Content</h2>
              <div className="space-y-4">
                {/* Sample Module */}
                <div className="border rounded-lg">
                  <div className="p-4 bg-gray-50 border-b">
                    <h3 className="font-medium">Module 1: Getting Started</h3>
                  </div>
                  <div className="p-4 space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center">
                        <Play className="w-4 h-4 mr-2 text-gray-400" />
                        <span>Introduction to TypeScript</span>
                      </div>
                      <span className="text-gray-500">15:00</span>
                    </div>
                    {/* Add more lessons */}
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
              <div className="text-3xl font-bold mb-6">${course.price}</div>
              
              <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors mb-4">
                Enroll Now
              </button>
              
              <button className="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center">
                <Download className="w-4 h-4 mr-2" />
                Download Syllabus
              </button>

              <div className="mt-6 space-y-4 text-sm">
                <div className="flex items-center text-gray-600">
                  <Clock className="w-4 h-4 mr-2" />
                  {course.duration} of content
                </div>
                <div className="flex items-center text-gray-600">
                  <Book className="w-4 h-4 mr-2" />
                  {course.totalLessons} lessons
                </div>
                <div className="flex items-center text-gray-600">
                  <Star className="w-4 h-4 mr-2" />
                  Certificate of completion
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
