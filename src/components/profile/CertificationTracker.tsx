import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { useAuthStore } from '../../store/useAuthStore';
import { 
  Plus, 
  Award, 
  Calendar, 
  Link as LinkIcon, 
  Trash2, 
  Edit2 
} from 'lucide-react';

interface Certification {
  id?: string;
  name: string;
  issuingOrganization: string;
  issueDate: string;
  expirationDate?: string;
  verificationLink?: string;
}

export function CertificationTracker() {
  const { user } = useAuthStore();
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [isAddingCertification, setIsAddingCertification] = useState(false);
  const [currentCertification, setCurrentCertification] = useState<Certification>({
    name: '',
    issuingOrganization: '',
    issueDate: '',
    expirationDate: '',
    verificationLink: ''
  });
  const [editingCertificationId, setEditingCertificationId] = useState<string | null>(null);

  // Fetch existing certifications
  useEffect(() => {
    const fetchCertifications = async () => {
      if (!user) return;

      const { data, error } = await supabase
        .from('user_profiles')
        .select('certifications')
        .eq('user_id', user.id)
        .single();

      if (data?.certifications) {
        setCertifications(data.certifications);
      }
    };

    fetchCertifications();
  }, [user]);

  // Save certifications to database
  const saveCertifications = async () => {
    if (!user) return;

    const { error } = await supabase
      .from('user_profiles')
      .upsert({
        user_id: user.id,
        certifications: certifications
      }, { 
        onConflict: 'user_id' 
      });

    if (error) {
      console.error('Error saving certifications:', error);
      alert('Failed to save certifications');
    } else {
      alert('Certifications updated successfully!');
      setIsAddingCertification(false);
      setEditingCertificationId(null);
    }
  };

  // Add or edit certification
  const handleSubmitCertification = async () => {
    if (!currentCertification.name || !currentCertification.issuingOrganization || !currentCertification.issueDate) {
      alert('Please fill in all required fields');
      return;
    }

    let updatedCertifications;
    if (editingCertificationId) {
      // Editing existing certification
      updatedCertifications = certifications.map(cert => 
        cert.id === editingCertificationId 
          ? { ...currentCertification, id: editingCertificationId } 
          : cert
      );
    } else {
      // Adding new certification
      updatedCertifications = [
        ...certifications, 
        { 
          ...currentCertification, 
          id: `cert_${Date.now()}` 
        }
      ];
    }

    setCertifications(updatedCertifications);
    saveCertifications();

    // Reset form
    setCurrentCertification({
      name: '',
      issuingOrganization: '',
      issueDate: '',
      expirationDate: '',
      verificationLink: ''
    });
    setEditingCertificationId(null);
    setIsAddingCertification(false);
  };

  // Remove certification
  const removeCertification = (certId: string) => {
    setCertifications(certifications.filter(cert => cert.id !== certId));
    saveCertifications();
  };

  // Render certification form
  const renderCertificationForm = () => (
    <div className="bg-gray-50 p-6 rounded-lg space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Certification Name
        </label>
        <input
          type="text"
          value={currentCertification.name}
          onChange={(e) => setCurrentCertification(prev => ({
            ...prev, 
            name: e.target.value
          }))}
          className="w-full p-2 border rounded-md"
          placeholder="e.g., AWS Certified Solutions Architect"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Issuing Organization
        </label>
        <input
          type="text"
          value={currentCertification.issuingOrganization}
          onChange={(e) => setCurrentCertification(prev => ({
            ...prev, 
            issuingOrganization: e.target.value
          }))}
          className="w-full p-2 border rounded-md"
          placeholder="e.g., Amazon Web Services"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Issue Date
          </label>
          <input
            type="date"
            value={currentCertification.issueDate}
            onChange={(e) => setCurrentCertification(prev => ({
              ...prev, 
              issueDate: e.target.value
            }))}
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Expiration Date (Optional)
          </label>
          <input
            type="date"
            value={currentCertification.expirationDate}
            onChange={(e) => setCurrentCertification(prev => ({
              ...prev, 
              expirationDate: e.target.value
            }))}
            className="w-full p-2 border rounded-md"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Verification Link (Optional)
        </label>
        <input
          type="url"
          value={currentCertification.verificationLink}
          onChange={(e) => setCurrentCertification(prev => ({
            ...prev, 
            verificationLink: e.target.value
          }))}
          className="w-full p-2 border rounded-md"
          placeholder="https://certification.example.com/verify"
        />
      </div>

      <div className="flex space-x-2">
        <button 
          onClick={handleSubmitCertification}
          className="flex-1 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          {editingCertificationId ? 'Update Certification' : 'Add Certification'}
        </button>
        <button 
          onClick={() => {
            setIsAddingCertification(false);
            setEditingCertificationId(null);
            setCurrentCertification({
              name: '',
              issuingOrganization: '',
              issueDate: '',
              expirationDate: '',
              verificationLink: ''
            });
          }}
          className="flex-1 p-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
        >
          Cancel
        </button>
      </div>
    </div>
  );

  return (
    <div className="bg-white shadow-md rounded-lg p-6 space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
        <Award className="mr-3 h-6 w-6 text-blue-500" />
        Professional Certifications
      </h2>

      {/* Existing Certifications */}
      {certifications.map((certification) => (
        <div 
          key={certification.id} 
          className="bg-gray-50 p-4 rounded-md flex items-start space-x-4"
        >
          <div className="flex-grow">
            <h3 className="text-lg font-semibold text-gray-800">
              {certification.name}
            </h3>
            <p className="text-gray-600 text-sm mb-2">
              Issued by {certification.issuingOrganization}
            </p>
            
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <Calendar className="h-4 w-4" />
              <span>
                Issued: {new Date(certification.issueDate).toLocaleDateString()}
              </span>
              {certification.expirationDate && (
                <span className="ml-2">
                  Expires: {new Date(certification.expirationDate).toLocaleDateString()}
                </span>
              )}
            </div>
            
            {certification.verificationLink && (
              <div className="mt-2 flex items-center space-x-2 text-sm text-gray-500">
                <LinkIcon className="h-4 w-4" />
                <a 
                  href={certification.verificationLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-blue-600 underline"
                >
                  Verify Certification
                </a>
              </div>
            )}
          </div>
          
          <div className="flex flex-col space-y-2">
            <button 
              onClick={() => {
                setCurrentCertification(certification);
                setEditingCertificationId(certification.id || null);
                setIsAddingCertification(true);
              }}
              className="text-blue-500 hover:bg-blue-100 p-1 rounded-full"
            >
              <Edit2 className="h-5 w-5" />
            </button>
            <button 
              onClick={() => removeCertification(certification.id!)}
              className="text-red-500 hover:bg-red-100 p-1 rounded-full"
            >
              <Trash2 className="h-5 w-5" />
            </button>
          </div>
        </div>
      ))}

      {/* Add Certification Button/Form */}
      {!isAddingCertification ? (
        <button 
          onClick={() => setIsAddingCertification(true)}
          className="w-full flex items-center justify-center p-3 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 transition"
        >
          <Plus className="mr-2 h-5 w-5" />
          Add New Certification
        </button>
      ) : (
        renderCertificationForm()
      )}
    </div>
  );
}
