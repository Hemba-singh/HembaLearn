import { CheckCircle2, Circle } from 'lucide-react';
import type { CourseSection, CourseLesson } from '../../types';

interface CourseProgressProps {
  sections: CourseSection[];
  completedLessons: string[];
}

export function CourseProgress({ sections, completedLessons }: CourseProgressProps) {
  const totalLessons = sections.reduce((total, section) => total + section.lessons.length, 0);
  const progress = (completedLessons.length / totalLessons) * 100;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-2">Your Progress</h2>
        <div className="relative h-2 bg-gray-200 rounded-full">
          <div
            className="absolute h-full bg-primary rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="mt-2 text-sm text-gray-600">
          {completedLessons.length} of {totalLessons} lessons completed ({Math.round(progress)}%)
        </p>
      </div>

      <div className="space-y-6">
        {sections.map((section, index) => (
          <div key={section.id} className="space-y-3">
            <h3 className="font-semibold">
              Section {index + 1}: {section.title}
            </h3>
            <div className="space-y-2">
              {section.lessons.map((lesson) => (
                <div
                  key={lesson.id}
                  className="flex items-center gap-3 text-sm"
                >
                  {completedLessons.includes(lesson.id) ? (
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                  ) : (
                    <Circle className="w-5 h-5 text-gray-400" />
                  )}
                  <span>{lesson.title}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
