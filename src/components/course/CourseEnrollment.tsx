import { useState } from 'react';
import { CreditCard, Lock } from 'lucide-react';

interface CourseEnrollmentProps {
  courseId: string;
  price: number;
  title: string;
}

export function CourseEnrollment({ courseId, price, title }: CourseEnrollmentProps) {
  const [loading, setLoading] = useState(false);

  const handleEnrollment = async () => {
    setLoading(true);
    try {
      // TODO: Implement enrollment logic
      console.log('Enrolling in course:', courseId);
    } catch (error) {
      console.error('Error enrolling in course:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4">Enroll in Course</h2>
      <div className="mb-6">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-2xl font-bold text-primary mt-2">${price}</p>
      </div>
      
      <button
        onClick={handleEnrollment}
        disabled={loading}
        className="w-full bg-primary text-white py-3 rounded-md font-semibold flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors"
      >
        <CreditCard className="w-5 h-5" />
        {loading ? 'Processing...' : 'Enroll Now'}
      </button>

      <div className="mt-4 flex items-center gap-2 text-sm text-gray-600">
        <Lock className="w-4 h-4" />
        <span>Secure payment</span>
      </div>

      <div className="mt-6 space-y-3">
        <h4 className="font-semibold">What you'll get:</h4>
        <ul className="space-y-2">
          <li className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-primary rounded-full" />
            <span>Full lifetime access</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-primary rounded-full" />
            <span>Access on mobile and desktop</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-primary rounded-full" />
            <span>Certificate of completion</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
