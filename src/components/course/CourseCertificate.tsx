import { Award, Download } from 'lucide-react';

interface CourseCertificateProps {
  courseTitle: string;
  studentName: string;
  completionDate: string;
  certificateId: string;
}

export function CourseCertificate({
  courseTitle,
  studentName,
  completionDate,
  certificateId,
}: CourseCertificateProps) {
  const handleDownload = () => {
    // TODO: Implement certificate download logic
    console.log('Downloading certificate:', certificateId);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="text-center mb-6">
        <Award className="w-16 h-16 text-primary mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-2">Certificate of Completion</h2>
        <p className="text-gray-600">
          Congratulations on completing the course!
        </p>
      </div>

      <div className="space-y-4 mb-6">
        <div className="border-b pb-3">
          <p className="text-sm text-gray-600">Course</p>
          <p className="font-semibold">{courseTitle}</p>
        </div>
        <div className="border-b pb-3">
          <p className="text-sm text-gray-600">Student Name</p>
          <p className="font-semibold">{studentName}</p>
        </div>
        <div className="border-b pb-3">
          <p className="text-sm text-gray-600">Completion Date</p>
          <p className="font-semibold">{completionDate}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Certificate ID</p>
          <p className="font-semibold">{certificateId}</p>
        </div>
      </div>

      <button
        onClick={handleDownload}
        className="w-full bg-primary text-white py-3 rounded-md font-semibold flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors"
      >
        <Download className="w-5 h-5" />
        Download Certificate
      </button>
    </div>
  );
}
