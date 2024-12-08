import { Star, Users, Award } from 'lucide-react';

interface CourseInstructorProps {
  instructor: {
    name: string;
    title: string;
    avatar: string;
    bio: string;
    rating: number;
    students: number;
    courses: number;
  };
}

export function CourseInstructor({ instructor }: CourseInstructorProps) {
  return (
    <div className="space-y-6">
      {/* Instructor Header */}
      <div className="flex items-start space-x-4">
        <img
          src={instructor.avatar}
          alt={instructor.name}
          className="h-16 w-16 rounded-full object-cover"
        />
        <div>
          <h2 className="text-xl font-semibold text-gray-900">
            {instructor.name}
          </h2>
          <p className="text-gray-600">{instructor.title}</p>
        </div>
      </div>

      {/* Instructor Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="flex items-center space-x-2">
          <Star className="h-5 w-5 text-yellow-400" />
          <div>
            <div className="font-semibold text-gray-900">{instructor.rating} Rating</div>
            <div className="text-sm text-gray-500">Instructor Rating</div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Users className="h-5 w-5 text-blue-500" />
          <div>
            <div className="font-semibold text-gray-900">{instructor.students.toLocaleString()} Students</div>
            <div className="text-sm text-gray-500">Total Students</div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Award className="h-5 w-5 text-green-500" />
          <div>
            <div className="font-semibold text-gray-900">{instructor.courses} Courses</div>
            <div className="text-sm text-gray-500">Total Courses</div>
          </div>
        </div>
      </div>

      {/* Instructor Bio */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-3">About Me</h3>
        <div className="prose prose-blue max-w-none">
          <p className="text-gray-600">{instructor.bio}</p>
          <p className="mt-4 text-gray-600">
            I specialize in creating comprehensive, practical courses that help students
            master modern web development technologies. My teaching approach focuses on
            real-world applications and best practices.
          </p>
        </div>
      </div>

      {/* Featured Courses */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">My Other Courses</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {[
            {
              title: 'React.js Masterclass',
              students: 3200,
              rating: 4.8,
              price: 79.99,
              thumbnail: '/image/courses/react-masterclass.jpg',
            },
            {
              title: 'Node.js Backend Development',
              students: 2800,
              rating: 4.7,
              price: 89.99,
              thumbnail: '/image/courses/nodejs-backend.jpg',
            },
          ].map((course, index) => (
            <div
              key={index}
              className="flex space-x-4 p-4 border rounded-lg hover:shadow-md transition-shadow duration-200"
            >
              <img
                src={course.thumbnail}
                alt={course.title}
                className="h-20 w-20 object-cover rounded-lg"
              />
              <div>
                <h4 className="font-medium text-gray-900">{course.title}</h4>
                <div className="mt-1 flex items-center text-sm text-gray-500">
                  <Star className="h-4 w-4 text-yellow-400 mr-1" />
                  <span>{course.rating}</span>
                  <span className="mx-1">•</span>
                  <span>{course.students.toLocaleString()} students</span>
                </div>
                <div className="mt-1 font-medium text-gray-900">
                  ${course.price}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
