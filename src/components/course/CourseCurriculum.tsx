import { useState } from 'react';
import { ChevronDown, ChevronUp, PlayCircle, File, Lock } from 'lucide-react';

interface CourseCurriculumProps {
  courseId?: string;
}

export function CourseCurriculum({ courseId }: CourseCurriculumProps) {
  const [expandedSections, setExpandedSections] = useState<string[]>(['section-1']);

  // Mock curriculum data - replace with actual API call
  const curriculum = [
    {
      id: 'section-1',
      title: 'Getting Started',
      duration: '2 hours',
      lessons: [
        {
          id: 'lesson-1-1',
          title: 'Course Introduction',
          duration: '5:00',
          type: 'video',
          isPreview: true,
        },
        {
          id: 'lesson-1-2',
          title: 'Setting Up Your Development Environment',
          duration: '15:00',
          type: 'video',
          isPreview: true,
        },
        {
          id: 'lesson-1-3',
          title: 'Web Development Basics Overview',
          duration: '20:00',
          type: 'video',
          isPreview: false,
        },
      ],
    },
    {
      id: 'section-2',
      title: 'HTML & CSS Fundamentals',
      duration: '4 hours',
      lessons: [
        {
          id: 'lesson-2-1',
          title: 'HTML5 Structure and Semantics',
          duration: '25:00',
          type: 'video',
          isPreview: false,
        },
        {
          id: 'lesson-2-2',
          title: 'CSS Styling and Layout',
          duration: '30:00',
          type: 'video',
          isPreview: false,
        },
        {
          id: 'lesson-2-3',
          title: 'Responsive Design Principles',
          duration: '35:00',
          type: 'video',
          isPreview: false,
        },
        {
          id: 'lesson-2-4',
          title: 'Practice Exercise: Building a Responsive Page',
          duration: '45:00',
          type: 'exercise',
          isPreview: false,
        },
      ],
    },
    // Add more sections as needed
  ];

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) =>
      prev.includes(sectionId)
        ? prev.filter((id) => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">
          Course Curriculum
        </h2>
        <div className="text-sm text-gray-500">
          12 sections • 48 lectures • 24h total length
        </div>
      </div>

      <div className="space-y-4">
        {curriculum.map((section) => (
          <div key={section.id} className="border rounded-lg">
            {/* Section Header */}
            <button
              onClick={() => toggleSection(section.id)}
              className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors duration-200"
            >
              <div className="flex items-center space-x-2">
                {expandedSections.includes(section.id) ? (
                  <ChevronUp className="h-5 w-5 text-gray-400" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-400" />
                )}
                <span className="font-medium text-gray-900">{section.title}</span>
              </div>
              <span className="text-sm text-gray-500">{section.duration}</span>
            </button>

            {/* Section Content */}
            {expandedSections.includes(section.id) && (
              <div className="border-t">
                {section.lessons.map((lesson) => (
                  <div
                    key={lesson.id}
                    className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors duration-200"
                  >
                    <div className="flex items-center space-x-3">
                      {lesson.type === 'video' ? (
                        <PlayCircle className="h-5 w-5 text-blue-500" />
                      ) : (
                        <File className="h-5 w-5 text-blue-500" />
                      )}
                      <span className="text-gray-600">{lesson.title}</span>
                      {lesson.isPreview && (
                        <span className="px-2 py-1 text-xs font-medium text-blue-600 bg-blue-100 rounded">
                          Preview
                        </span>
                      )}
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="text-sm text-gray-500">
                        {lesson.duration}
                      </span>
                      {!lesson.isPreview && (
                        <Lock className="h-4 w-4 text-gray-400" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
