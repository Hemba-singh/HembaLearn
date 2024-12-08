import { CourseCard } from './CourseCard';
import { Course } from '../types';

interface CourseGridProps {
  courses: Course[];
}

export default function CourseGrid({ courses }: CourseGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4">
      {courses.map((course) => (
        <div key={course.id} className="transform transition-all duration-200 hover:scale-[1.02]">
          <CourseCard course={course} />
        </div>
      ))}
    </div>
  );
}