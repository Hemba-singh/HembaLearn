import { Award, Book, Clock, Target } from 'lucide-react';

interface CourseOverviewProps {
  course: any; // Replace with proper type
}

export function CourseOverview({ course }: CourseOverviewProps) {
  const learningObjectives = [
    'Build modern, responsive websites using HTML5, CSS3, and JavaScript',
    'Master React.js and create dynamic single-page applications',
    'Develop backend APIs using Node.js and Express',
    'Work with databases like MongoDB and PostgreSQL',
    'Deploy applications to cloud platforms',
    'Implement authentication and authorization',
  ];

  const requirements = [
    'Basic understanding of HTML, CSS, and JavaScript',
    'Familiarity with web development concepts',
    'A computer with internet access',
    'No advanced programming knowledge required',
  ];

  return (
    <div className="space-y-8">
      {/* What You'll Learn */}
      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          What You'll Learn
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {learningObjectives.map((objective, index) => (
            <div
              key={index}
              className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg"
            >
              <Target className="h-5 w-5 text-blue-500 mt-0.5" />
              <span className="text-gray-600">{objective}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Course Stats */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            icon: Clock,
            label: 'Duration',
            value: '24 hours',
          },
          {
            icon: Book,
            label: 'Modules',
            value: '12 modules',
          },
          {
            icon: Award,
            label: 'Certificate',
            value: 'Yes',
          },
          {
            icon: Target,
            label: 'Skill Level',
            value: 'Intermediate',
          },
        ].map((stat, index) => (
          <div
            key={index}
            className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg"
          >
            <stat.icon className="h-6 w-6 text-blue-500" />
            <div>
              <p className="text-sm text-gray-500">{stat.label}</p>
              <p className="font-semibold text-gray-900">{stat.value}</p>
            </div>
          </div>
        ))}
      </section>

      {/* Requirements */}
      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Requirements
        </h2>
        <ul className="space-y-3">
          {requirements.map((requirement, index) => (
            <li key={index} className="flex items-start space-x-3">
              <div className="flex-shrink-0 h-1.5 w-1.5 rounded-full bg-blue-500 mt-2" />
              <span className="text-gray-600">{requirement}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Description */}
      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Description
        </h2>
        <div className="prose prose-blue max-w-none">
          <p>
            This comprehensive web development bootcamp takes you from the basics to advanced concepts
            in modern web development. You'll learn through hands-on projects and real-world examples.
          </p>
          <p className="mt-4">
            The course is structured to provide both theoretical knowledge and practical experience.
            Each module builds upon the previous one, ensuring a solid foundation in web development
            principles and best practices.
          </p>
          <p className="mt-4">
            By the end of this course, you'll be able to:
          </p>
          <ul>
            <li>Create full-stack web applications</li>
            <li>Work with modern development tools and workflows</li>
            <li>Understand and implement web security best practices</li>
            <li>Deploy and maintain web applications</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
