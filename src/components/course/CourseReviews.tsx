import { useState } from 'react';
import { Star, ThumbsUp, MessageCircle } from 'lucide-react';

interface CourseReviewsProps {
  courseId?: string;
}

export function CourseReviews({ courseId }: CourseReviewsProps) {
  const [selectedRating, setSelectedRating] = useState<number | null>(null);

  // Mock reviews data - replace with actual API call
  const reviews = [
    {
      id: 1,
      user: {
        name: 'Sarah Johnson',
        avatar: '/image/avatars/sarah.jpg'
      },
      rating: 5,
      date: '2 weeks ago',
      content: 'This course exceeded my expectations! The instructor explains complex concepts in a way that\'s easy to understand. The projects are practical and helped me build a strong portfolio.',
      helpful: 45,
      replies: 3
    },
    {
      id: 2,
      user: {
        name: 'Michael Chen',
        avatar: '/image/avatars/michael.jpg'
      },
      rating: 4,
      date: '1 month ago',
      content: 'Great course overall. The content is up-to-date and relevant. Would have liked more exercises, but the provided ones are well thought out.',
      helpful: 32,
      replies: 2
    }
    // Add more reviews as needed
  ];

  const ratingStats = {
    average: 4.7,
    total: 2840,
    distribution: [
      { stars: 5, count: 1920, percentage: 68 },
      { stars: 4, count: 650, percentage: 23 },
      { stars: 3, count: 180, percentage: 6 },
      { stars: 2, count: 60, percentage: 2 },
      { stars: 1, count: 30, percentage: 1 },
    ],
  };

  return (
    <div className="space-y-8">
      {/* Rating Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Average Rating */}
        <div className="flex items-center space-x-4">
          <div className="text-5xl font-bold text-gray-900">{ratingStats.average}</div>
          <div>
            <div className="flex items-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-5 w-5 ${
                    star <= Math.round(ratingStats.average)
                      ? 'text-yellow-400'
                      : 'text-gray-300'
                  }`}
                  fill="currentColor"
                />
              ))}
            </div>
            <p className="text-sm text-gray-500 mt-1">
              Course Rating • {ratingStats.total.toLocaleString()} reviews
            </p>
          </div>
        </div>

        {/* Rating Distribution */}
        <div className="space-y-2">
          {ratingStats.distribution.map((stat) => (
            <div key={stat.stars} className="flex items-center space-x-2">
              <div className="flex items-center w-20">
                <span className="text-sm text-gray-600">{stat.stars}</span>
                <Star className="h-4 w-4 text-yellow-400 ml-1" fill="currentColor" />
              </div>
              <div className="flex-1 h-2 bg-gray-200 rounded-full">
                <div
                  className="h-2 bg-yellow-400 rounded-full"
                  style={{ width: `${stat.percentage}%` }}
                />
              </div>
              <div className="w-16 text-sm text-gray-500">
                {stat.percentage}%
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Filter Reviews */}
      <div className="flex items-center space-x-4">
        <span className="text-sm text-gray-500">Filter reviews:</span>
        <div className="flex space-x-2">
          {[5, 4, 3, 2, 1].map((rating) => (
            <button
              key={rating}
              onClick={() => setSelectedRating(selectedRating === rating ? null : rating)}
              className={`
                flex items-center space-x-1 px-3 py-1 rounded-full text-sm
                ${selectedRating === rating
                  ? 'bg-blue-100 text-blue-700'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}
              `}
            >
              <span>{rating}</span>
              <Star className="h-4 w-4" fill="currentColor" />
            </button>
          ))}
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        {reviews.map((review) => (
          <div key={review.id} className="border-b border-gray-200 pb-6">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4">
                <img
                  src={review.user.avatar}
                  alt={review.user.name}
                  className="h-10 w-10 rounded-full"
                />
                <div>
                  <div className="flex items-center">
                    <span className="font-medium text-gray-900">
                      {review.user.name}
                    </span>
                    <span className="mx-2 text-gray-300">•</span>
                    <span className="text-sm text-gray-500">{review.date}</span>
                  </div>
                  <div className="flex items-center mt-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-4 w-4 ${
                          star <= review.rating
                            ? 'text-yellow-400'
                            : 'text-gray-300'
                        }`}
                        fill="currentColor"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <p className="mt-4 text-gray-600">{review.content}</p>
            <div className="mt-4 flex items-center space-x-6">
              <button className="flex items-center text-sm text-gray-500 hover:text-gray-700">
                <ThumbsUp className="h-4 w-4 mr-1" />
                Helpful ({review.helpful})
              </button>
              <button className="flex items-center text-sm text-gray-500 hover:text-gray-700">
                <MessageCircle className="h-4 w-4 mr-1" />
                Reply ({review.replies})
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Load More Button */}
      <div className="text-center">
        <button className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200">
          Load More Reviews
        </button>
      </div>
    </div>
  );
}
