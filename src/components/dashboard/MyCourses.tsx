import { useState } from 'react';
import { Search, Filter, Clock, Award } from 'lucide-react';

const courses = [
  {
    id: 1,
    title: 'Advanced Web Development',
    instructor: 'John Doe',
    progress: 75,
    thumbnail: '/image/courses/web-dev.jpg',
    lastAccessed: '2 days ago',
    status: 'in-progress',
  },
  {
    id: 2,
    title: 'UI/UX Design Fundamentals',
    instructor: 'Jane Smith',
    progress: 30,
    thumbnail: '/image/courses/uiux.jpg',
    lastAccessed: '1 week ago',
    status: 'in-progress',
  },
  {
    id: 3,
    title: 'React for Beginners',
    instructor: 'Mike Johnson',
    progress: 100,
    thumbnail: '/image/courses/react.jpg',
    lastAccessed: '1 month ago',
    status: 'completed',
  },
  // Add more courses as needed
];

export function MyCourses() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all'); // 'all', 'in-progress', 'completed'

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filter === 'all' || course.status === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-900">My Courses</h1>
        
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search courses..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
            />
          </div>

          {/* Filter */}
          <div className="relative">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
            >
              <option value="all">All Courses</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          </div>
        </div>
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <div
            key={course.id}
            className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            {/* Course Image */}
            <div className="relative h-48">
              <img
                src={course.thumbnail}
                alt={course.title}
                className="w-full h-full object-cover rounded-t-lg"
              />
              {course.status === 'completed' && (
                <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center">
                  <Award className="h-4 w-4 mr-1" />
                  Completed
                </div>
              )}
            </div>

            {/* Course Info */}
            <div className="p-4">
              <h3 className="text-lg font-medium text-gray-900">{course.title}</h3>
              <p className="text-sm text-gray-500 mt-1">
                Instructor: {course.instructor}
              </p>

              {/* Progress Bar */}
              <div className="mt-4">
                <div className="flex justify-between text-sm text-gray-500 mb-1">
                  <span>Progress</span>
                  <span>{course.progress}%</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full">
                  <div
                    className="h-2 bg-blue-600 rounded-full transition-all duration-300"
                    style={{ width: `${course.progress}%` }}
                  />
                </div>
              </div>

              {/* Last Accessed */}
              <div className="mt-4 flex items-center text-sm text-gray-500">
                <Clock className="h-4 w-4 mr-1" />
                Last accessed {course.lastAccessed}
              </div>

              {/* Continue Button */}
              <button className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200">
                {course.status === 'completed' ? 'Review Course' : 'Continue Learning'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
