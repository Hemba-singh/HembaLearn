import { File, Video, Book, Link as LinkIcon } from 'lucide-react';
import type { CourseSection, CourseLesson } from '../../types';

interface CourseContentProps {
  sections: CourseSection[];
}

export function CourseContent({ sections }: CourseContentProps) {
  const getModuleIcon = (type: CourseLesson['type']) => {
    switch (type) {
      case 'resource':
        return <File className="w-5 h-5" />;
      case 'video':
        return <Video className="w-5 h-5" />;
      case 'quiz':
        return <Book className="w-5 h-5" />;
      case 'exercise':
        return <LinkIcon className="w-5 h-5" />;
      default:
        return <Book className="w-5 h-5" />;
    }
  };

  return (
    <div className="space-y-4">
      {sections.map((section) => (
        <div key={section.id} className="border rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold">{section.title}</h3>
            <span className="text-sm text-gray-500">{section.duration}</span>
          </div>
          <div className="space-y-2">
            {section.lessons.map((lesson) => (
              <div
                key={lesson.id}
                className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-md"
              >
                <div className="flex items-center space-x-3">
                  {getModuleIcon(lesson.type)}
                  <span className="text-sm">{lesson.title}</span>
                  {lesson.isPreview && (
                    <span className="px-2 py-0.5 text-xs bg-blue-100 text-blue-700 rounded">
                      Preview
                    </span>
                  )}
                </div>
                <span className="text-sm text-gray-500">{lesson.duration}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}