import React, { useState } from 'react';
import type { ApplicationForm } from '../types';
import { Upload, CheckCircle, Loader2 } from 'lucide-react';

export const Apply: React.FC = () => {
  const [formData, setFormData] = useState<ApplicationForm>({
    fullName: '',
    nationalId: '',
    location: '',
    assistanceType: '',
    description: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      // Store in local storage for "Admin" demo
      const existing = JSON.parse(localStorage.getItem('applications') || '[]');
      localStorage.setItem('applications', JSON.stringify([...existing, { ...formData, id: Date.now(), status: 'Pending', date: new Date().toLocaleDateString() }]));
    }, 2000);
  };

  if (isSuccess) {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
          <div className="bg-white p-8 rounded-2xl shadow-xl max-w-lg w-full text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-kenya-green" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Application Received</h2>
            <p className="text-gray-600 mb-8">
              Thank you, {formData.fullName}. We have received your request for {formData.assistanceType} assistance.
              Our team will review your case and contact you within 5 working days.
            </p>
            <button
                onClick={() => window.location.reload()}
                className="bg-gray-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors"
            >
              Submit Another Application
            </button>
          </div>
        </div>
    );
  }

  return (
      <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-kenya-red p-8 text-center">
              <h1 className="text-3xl font-serif font-bold text-white mb-2">Apply for Assistance</h1>
              <p className="text-red-100">We are here to support you. Please fill out the form below truthfully.</p>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-8">
              {/* Personal Info */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input
                        type="text"
                        name="fullName"
                        required
                        value={formData.fullName}
                        onChange={handleInputChange}
                        className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-kenya-green focus:border-kenya-green p-3 border text-gray-900 bg-white"
                        placeholder="John Kamau"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">National ID / Guardian ID</label>
                    <input
                        type="text"
                        name="nationalId"
                        required
                        value={formData.nationalId}
                        onChange={handleInputChange}
                        className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-kenya-green focus:border-kenya-green p-3 border text-gray-900 bg-white"
                        placeholder="12345678"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location (County & Town)</label>
                  <input
                      type="text"
                      name="location"
                      required
                      value={formData.location}
                      onChange={handleInputChange}
                      className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-kenya-green focus:border-kenya-green p-3 border text-gray-900 bg-white"
                      placeholder="e.g. Nairobi, Kibera"
                  />
                </div>
              </div>

              {/* Request Details */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Assistance Details</h3>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Type of Assistance Needed</label>
                  <select
                      name="assistanceType"
                      required
                      value={formData.assistanceType}
                      onChange={handleInputChange}
                      className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-kenya-green focus:border-kenya-green p-3 border bg-white text-gray-900"
                  >
                    <option value="">Select a program...</option>
                    <option value="Medical">Medical Treatment</option>
                    <option value="Education">Education Support</option>
                    <option value="Business">Small Business Funding</option>
                    <option value="Emergency">Emergency Relief</option>
                  </select>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="block text-sm font-medium text-gray-700">Description of Situation</label>
                  </div>
                  <textarea
                      name="description"
                      required
                      rows={6}
                      value={formData.description}
                      onChange={handleInputChange}
                      className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-kenya-green focus:border-kenya-green p-3 border text-gray-900 bg-white"
                      placeholder="Please describe why you need help, your current situation, and how this assistance will change your life..."
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    Tip: Be honest and detailed to help us understand your needs better.
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Supporting Documents</label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-kenya-green transition-colors cursor-pointer bg-gray-50">
                    <div className="space-y-1 text-center">
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="flex text-sm text-gray-600">
                        <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-kenya-green hover:text-green-500 focus-within:outline-none">
                          <span>Upload files</span>
                          <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">
                        ID Copy, Medical Reports, School Fee Structures (PDF, JPG up to 5MB)
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex justify-center py-4 px-4 border border-transparent rounded-full shadow-sm text-lg font-bold text-white bg-kenya-green hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all disabled:opacity-70"
                >
                  {isSubmitting ? (
                      <span className="flex items-center gap-2">
                    <Loader2 className="animate-spin w-5 h-5"/> Processing...
                  </span>
                  ) : (
                      "Submit Application"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
  );
};