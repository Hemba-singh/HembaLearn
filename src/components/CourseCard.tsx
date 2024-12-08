import { Clock, BookOpen, Trophy } from 'lucide-react';
import { Course } from '../types';
import { Card } from './ui/Card';
import { Button } from './ui/Button';

interface CourseCardProps {
  course: Course;
}

export function CourseCard({ course }: CourseCardProps) {
  return (
    <Card className="flex flex-col h-full">
      <img
        src={course.thumbnail}
        alt={course.title}
        className="h-48 w-full object-cover"
      />
      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-center gap-2 mb-2">
          <span className={`px-2 py-1 text-xs rounded-full ${
            course.level === 'Beginner' ? 'bg-green-100 text-green-800' :
            course.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
            'bg-red-100 text-red-800'
          }`}>
            {course.level}
          </span>
          <span className="text-sm text-gray-500">{course.category}</span>
        </div>
        <h3 className="text-lg font-semibold mb-2">{course.title}</h3>
        <p className="text-gray-600 text-sm mb-4 flex-1">{course.description}</p>
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{course.duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <BookOpen className="w-4 h-4" />
            <span>{course.instructor.name}</span>
          </div>
        </div>
        <Button variant="primary" className="w-full">
          Enroll Now
        </Button>
      </div>
    </Card>
  );
}