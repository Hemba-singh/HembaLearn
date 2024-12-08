import { Book, Clock, Award, TrendingUp } from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';

const stats = [
  { name: 'Enrolled Courses', icon: Book, value: '12', change: '+2 this month' },
  { name: 'Hours Learned', icon: Clock, value: '156', change: '+8 this week' },
  { name: 'Certificates', icon: Award, value: '4', change: '+1 this month' },
  { name: 'Current Streak', icon: TrendingUp, value: '15', change: 'days' },
];

export function DashboardOverview() {
  const { user } = useAuthStore();

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Welcome back, {user?.name || 'Learner'}!
        </h1>
        <p className="mt-2 text-gray-600">
          Track your progress and continue your learning journey.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <stat.icon className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-500">{stat.name}</h3>
                <div className="mt-1">
                  <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                  <p className="text-sm text-gray-500">{stat.change}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6">
          <h2 className="text-lg font-medium text-gray-900">Recent Activity</h2>
          <div className="mt-6 flow-root">
            <ul className="-my-5 divide-y divide-gray-200">
              {[
                {
                  title: 'Completed Module 3',
                  course: 'Advanced Web Development',
                  time: '2 hours ago',
                },
                {
                  title: 'Started New Course',
                  course: 'UI/UX Design Fundamentals',
                  time: '1 day ago',
                },
                {
                  title: 'Earned Certificate',
                  course: 'React for Beginners',
                  time: '3 days ago',
                },
              ].map((activity, idx) => (
                <li key={idx} className="py-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {activity.title}
                      </p>
                      <p className="text-sm text-gray-500 truncate">
                        {activity.course}
                      </p>
                    </div>
                    <div className="flex-shrink-0">
                      <span className="text-sm text-gray-500">{activity.time}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Continue Learning */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6">
          <h2 className="text-lg font-medium text-gray-900">Continue Learning</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            {[
              {
                title: 'Advanced Web Development',
                progress: 75,
                nextLesson: 'API Integration',
                timeLeft: '45 min',
              },
              {
                title: 'UI/UX Design Fundamentals',
                progress: 30,
                nextLesson: 'User Research',
                timeLeft: '1.5 hours',
              },
            ].map((course, idx) => (
              <div
                key={idx}
                className="relative rounded-lg border border-gray-200 p-4 hover:border-blue-500 transition-colors duration-200 cursor-pointer"
              >
                <h3 className="text-base font-medium text-gray-900">
                  {course.title}
                </h3>
                <div className="mt-2">
                  <div className="flex justify-between text-sm text-gray-500 mb-1">
                    <span>Progress</span>
                    <span>{course.progress}%</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full">
                    <div
                      className="h-2 bg-blue-600 rounded-full"
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                </div>
                <div className="mt-4 flex justify-between items-center text-sm">
                  <span className="text-gray-500">Next: {course.nextLesson}</span>
                  <span className="text-blue-600">{course.timeLeft}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
